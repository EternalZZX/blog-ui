<template>
    <div class="et-layout">
        <et-nav :title="$t('album.nav.title')"
            :index.sync="loadType"
            :menu="nav"
            @select="init">
            <el-button slot="button" type="text"
                class="et-nav__button"
                v-perm:album-add
                @click="albumAddShow = true">
                {{ $t("album.nav.create") }}
            </el-button>
        </et-nav>

        <div class="et-content">
            <et-scroll class="et-content__wrapper"
                v-model="loadStatus"
                @more="loadMore">
                <div v-if="loadType !== 'other'" class="et-photo__container">
                    <div class="et-photo__wrapper et-photo__wrapper_albums"
                        v-for="album in dataList" :key="album.uuid">
                        <div class="et-photo" :style="getStyle(album.cover)">
                            <ul class="et-photo__body">
                                <li class="et-photo__info">
                                    <span :title="album.name">{{ album.name }}</span>
                                    <span class="et-photo__info_count" :title="album.metadata.like_count">
                                        <i class="et-icon ei-like"></i>{{ album.metadata.like_count | count }}
                                    </span>
                                </li>
                                <li class="et-photo__info">
                                    <span>{{ album.create_at | date }}</span>
                                    <span class="et-photo__info_count" :title="album.metadata.comment_count">
                                        <i class="et-icon ei-message"></i>{{ album.metadata.comment_count | count }}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="et-photo__wrapper et-photo__wrapper_add">
                        <div class="et-photo__add"
                            :style="{ height: blockSize, lineHeight: blockSize }"
                            :title="$t('album.create.title')"
                            @click="albumAddShow = true">
                            <i class="et-icon ei-plus"></i>
                        </div>
                    </div>
                </div>
                <div v-else class="et-photo__container">
                    <div class="et-photo__wrapper"
                        v-for="photo in dataList" :key="photo.uuid">
                        <div class="et-photo" :style="getStyle(photo.image_small)">
                            <ul class="et-photo__body">
                                <li class="et-photo__info">
                                    <span :title="photo.description">{{ photo.description }}</span>
                                    <span class="et-photo__info_count" :title="photo.metadata.like_count">
                                        <i class="et-icon ei-like"></i>{{ photo.metadata.like_count | count }}
                                    </span>
                                </li>
                                <li class="et-photo__info">
                                    <span>{{ photo.create_at | date }}</span>
                                    <span class="et-photo__info_count" :title="photo.metadata.comment_count">
                                        <i class="et-icon ei-message"></i>{{ photo.metadata.comment_count | count }}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="et-photo__wrapper et-photo__wrapper_add">
                        <div class="et-photo__add"
                            :style="{ height: blockSize, lineHeight: blockSize }"
                            :title="$t('album.create.title')"
                            @click="photoAddShow = true">
                            <i class="et-icon ei-plus"></i>
                        </div>
                    </div>
                </div>
            </et-scroll>
            <et-toolbar></et-toolbar>
        </div>

        <et-dialog v-perm:album-add
            :show.sync="albumAddShow"
            :title="$t('album.create.title')">
        </et-dialog>

        <et-dialog v-perm:photo-add
            :show.sync="photoAddShow"
            :title="$t('photo.create.title')">
        </et-dialog>
    </div>
</template>

<script>
import Album, { AlbumApi } from '@/common/api/albums';
import Photo from '@/common/api/photos';
import Utils from '@/common/utils';
import { EVENT } from '@/common/bus';
import { mapState, mapGetters } from 'vuex';
export default {
    name: 'EtAlbumProfile',
    data () {
        return {
            dataList: [],
            params: {
                page: 1,
                page_size: 10
            },
            nav: [{
                value: 'all',
                label: this.$t('album.nav.all')
            }, {
                value: 'public',
                label: this.$t('album.nav.public')
            }, {
                value: 'private',
                label: this.$t('album.nav.private')
            }, {
                value: 'other',
                label: this.$t('album.nav.other')
            }],
            loadType: 'all',
            loadStatus: 'active',
            hashCode: Utils.randString(),
            albumAddShow: false,
            photoAddShow: false,
            blockSize: '160px'
        };
    },
    computed: {
        ...mapState({
            identity: 'identity'
        }),
        ...mapGetters({
            hasIdentity: 'hasIdentity'
        }),
        privacy () {
            const privacyDict = {
                'all': null,
                'public': AlbumApi.PRIVACY.PUBLIC,
                'private': AlbumApi.PRIVACY.PRIVATE,
                'other': null
            };
            return privacyDict[this.loadType];
        }
    },
    mounted () {
        this.$root.Bus.$on(EVENT.IDENTITY_REFRESH, this.init);
        window.onresize = () => {
            this.blockSize = this.getSize();
        };
        this.$nextTick(() => {
            this.blockSize = this.getSize();
        });
    },
    methods: {
        init (loadType) {
            this.dataList = [];
            this.params.page = 1;
            this.loadType = loadType || 'all';
            this.hashCode = Utils.randString();
            this.albumAddShow = false;
            this.loadMore();
        },
        loadMore () {
            if (!this.hasIdentity) {
                this.loadStatus = 'end';
                return;
            }
            if (this.loadType === 'other') {
                this.loadPhotos();
            } else {
                this.loadAlbums();
            }
        },
        loadAlbums () {
            const params = {
                ...this.params,
                author_uuid: this.identity.uuid
            };
            this.privacy !== null && (params.privacy = this.privacy);
            Album.list(params).then(response => {
                this.dataList = this.dataList.concat(response.data.albums);
                this.loadStatus = response.data.total === this.dataList.length ? 'end' : 'active';
                this.params.page ++;
            }).catch(err => {
                Utils.errorLog(err, 'ALBUM-LIST');
            });
        },
        loadPhotos () {
            const params = {
                ...this.params,
                author_uuid: this.identity.uuid,
                album_uuid: ''
            };
            Photo.list(params).then(response => {
                this.dataList = this.dataList.concat(response.data.photos);
                this.loadStatus = response.data.total === this.dataList.length ? 'end' : 'active';
                this.params.page ++;
            }).catch(err => {
                Utils.errorLog(err, 'PHOTO-LIST');
            });
        },
        getSize () {
            const el = document.getElementsByClassName('et-photo__add')[0];
            return document.defaultView.getComputedStyle(el, null).width;
        },
        getStyle (url) {
            const style = { height: this.blockSize };
            url && (style.backgroundImage = `url(${url}?hash=${this.hashCode})`);
            return style;
        }
    }
};
</script>
