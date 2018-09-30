<template>
    <div class="et-layout">
        <et-nav :title="$t('album.nav.title')"
            :index.sync="loadType"
            :options="navOptions"
            @select="init">
            <el-button slot="button" type="text"
                class="et-nav__button"
                v-perm:album-add
                @click="add">
                {{ $t("album.nav.create") }}
            </el-button>
        </et-nav>

        <div class="et-content">
            <et-scroll class="et-content__wrapper"
                ref="scroll"
                @more="loadMore">
                <div v-if="loadType !== 'other'" class="et-photo__container">
                    <et-photo v-for="album in dataList"
                        :key="album.uuid"
                        :data="album"
                        type="album"
                        @click="getAlbum(album.uuid)">
                    </et-photo>
                    <div class="et-photo__wrapper et-photo__wrapper_add">
                        <div class="et-photo__add"
                            :title="$t('album.create.title')"
                            @click="albumAddShow = true">
                            <i class="et-icon ei-plus"></i>
                        </div>
                    </div>
                </div>
                <div v-else class="et-photo__container">
                    <et-photo v-for="(photo, index) in dataList"
                        :key="photo.uuid"
                        :data="photo"
                        @click="getPreview(index)">
                    </et-photo>
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
            :data="dataList"
            @update="updatePhoto">
        </et-preview>
    </div>
</template>

<script>
import Album, { AlbumApi } from '@/common/api/albums';
import Photo from '@/common/api/photos';
import Utils from '@/common/utils';
import { EVENT } from '@/common/bus';
import { mapGetters } from 'vuex';
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
            navOptions: {
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
                }]
            },
            loadType: 'all',
            albumAddShow: false,
            photoAddShow: false,
            preview: {
                show: false,
                index: 0
            }
        };
    },
    computed: {
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
        },
        identityUuid () {
            return this.$route.params.uuid;
        }
    },
    mounted () {
        this.$root.Bus.$on(EVENT.IDENTITY_REFRESH, () => {
            !this._inacitve && this.init();
        });
    },
    activated () {
        this.init();
    },
    methods: {
        init (loadType) {
            this.dataList = [];
            this.params.page = 1;
            this.loadType = loadType || 'all';
            this.$refs.scroll.reset();
        },
        loadMore (state) {
            if (!this.hasIdentity) {
                state.complete();
                return;
            }
            this.loadType === 'other' ?
                this.loadPhotos(state) :
                this.loadAlbums(state);
        },
        loadAlbums (state) {
            Album.listSelfAlbums(
                this.identityUuid,
                this.privacy,
                this.params
            ).then(response => {
                this.loadData(state, response.data.albums, response.data.total);
            }).catch(err => {
                Utils.errorLog(err, 'ALBUM-LIST');
            });
        },
        loadPhotos (state) {
            Photo.listSelfOtherPhotos(
                this.identityUuid,
                this.params
            ).then(response => {
                this.loadData(state, response.data.photos, response.data.total);
            }).catch(err => {
                Utils.errorLog(err, 'PHOTO-LIST');
            });
        },
        loadData (state, data, total) {
            this.dataList = this.dataList.concat(data);
            this.params.page ++;
            total === this.dataList.length ?
                state.complete() :
                state.loaded();
        },
        updatePhoto (data) {
            this.dataList.splice(data.index, 1, data.photo);
        },
        add () {
            if (this.loadType === 'other') {
                this.photoAddShow = true;
            } else {
                this.albumAddShow = true;
            }
        },
        getAlbum (uuid) {
            this.$router.push({
                name: 'album',
                params: {
                    uuid
                }
            });
        },
        getPreview (index) {
            this.preview.show = true;
            this.preview.index = index;
        }
    }
};
</script>
