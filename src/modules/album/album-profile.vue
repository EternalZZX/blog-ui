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
                            :title="$t('album.create.title')"
                            @click="albumAddShow = true">
                            <i class="et-icon ei-plus"></i>
                        </div>
                    </div>
                </div>
                <div v-else class="et-photo__container">
                    <div class="et-photo__wrapper"
                        v-for="(photo, index) in dataList" :key="photo.uuid">
                        <div class="et-photo" :style="getStyle(photo.image_small)"
                            @click="getPreview(index)">
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
                            :title="$t('photo.create.title')"
                            @click="photoAddShow = true">
                            <i class="et-icon ei-plus"></i>
                        </div>
                    </div>
                </div>
            </et-scroll>
            <et-toolbar></et-toolbar>
        </div>

        <et-album-add v-perm:album-add
            :show.sync="albumAddShow">
        </et-album-add>

        <et-photo-add v-perm:photo-add
            :show.sync="photoAddShow">
        </et-photo-add>

        <et-preview
            :show.sync="preview.show"
            :index.sync="preview.index"
            :data="dataList">
        </et-preview>
    </div>
</template>

<script>
import Album, { AlbumApi } from '@/common/api/albums';
import Photo from '@/common/api/photos';
import Utils from '@/common/utils';
import { EVENT } from '@/common/bus';
import { mapState, mapGetters } from 'vuex';
import EtAlbumAdd from './album-add';
import EtPhotoAdd from './photo-add';
export default {
    name: 'EtAlbumProfile',
    components: {
        EtAlbumAdd,
        EtPhotoAdd
    },
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
            loadType: 'other',
            loadStatus: 'active',
            hashCode: Utils.randString(),
            albumAddShow: false,
            photoAddShow: false,
            preview: {
                show: false,
                index: 0
            },
            blockSize: null
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
    },
    activated () {
        this.blockSize = this.getSize();
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
            Album.listSelfAlbums(this.identity.uuid, this.privacy, this.params).then(response => {
                this.dataList = this.dataList.concat(response.data.albums);
                this.loadStatus = response.data.total === this.dataList.length ? 'end' : 'active';
                this.params.page ++;
            }).catch(err => {
                Utils.errorLog(err, 'ALBUM-LIST');
            });
        },
        loadPhotos () {
            Photo.listSelfOtherPhotos(this.identity.uuid, this.params).then(response => {
                this.dataList = this.dataList.concat(response.data.photos);
                this.loadStatus = response.data.total === this.dataList.length ? 'end' : 'active';
                this.params.page ++;
            }).catch(err => {
                Utils.errorLog(err, 'PHOTO-LIST');
            });
        },
        getPreview (index) {
            this.preview.show = true;
            this.preview.index = index;
        },
        getSize () {
            const el = document.getElementsByClassName('et-photo__add')[0];
            return el ? document.defaultView.getComputedStyle(el, null).width : 0;
        },
        getStyle (url) {
            const style = {};
            url && (style.backgroundImage = `url(${url}?hash=${this.hashCode})`);
            return style;
        }
    }
};
</script>
