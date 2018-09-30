<template>
    <div class="et-layout">
        <et-nav :title="$t('photo.nav.title')"
            :index.sync="loadType"
            :options="navOptions"
            @select="init">
            <el-button slot="button" type="text"
                class="et-nav__button"
                v-perm:photo-add
                @click="back">
                {{ $t("photo.nav.back") }}
            </el-button>
        </et-nav>

        <div class="et-content">
            <et-scroll class="et-content__wrapper"
                ref="scroll"
                @more="loadMore">
                <div class="et-photo__container">
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
import { mapGetters } from 'vuex';
import { EVENT } from '@/common/bus';
import Utils from '@/common/utils';
import Permission from '@/common/permission';
import Photo, { PhotoApi } from '@/common/api/photos';
import EtPhotoAdd from './photo-add';
export default {
    name: 'EtAlbum',
    components: {
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
                    label: this.$t('photo.nav.all')
                }, {
                    value: 'public',
                    label: this.$t('photo.nav.public')
                }, {
                    value: 'private',
                    label: this.$t('photo.nav.private')
                }],
                menu: [{
                    icon: 'ei-round-plus',
                    label: this.$t('photo.nav.create'),
                    event: this.addPhoto,
                    disabled: !Permission.hasPermission('photo-add')
                }, {
                    icon: 'ei-edit',
                    label: this.$t('photo.nav.edit'),
                    event: this.addPhoto
                }]
            },
            loadType: 'all',
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
                'public': PhotoApi.PRIVACY.PUBLIC,
                'private': PhotoApi.PRIVACY.PRIVATE
            };
            return privacyDict[this.loadType];
        },
        albumUuid () {
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
            this.loadPhotos(state);
        },
        loadPhotos (state) {
            const args = { ...this.params };
            this.privacy !== null && (args.privacy = this.privacy);
            Photo.listAlbumPhotos(this.albumUuid, args).then(response => {
                this.dataList = this.dataList.concat(response.data.photos);
                this.params.page ++;
                response.data.total === this.dataList.length ?
                    state.complete() :
                    state.loaded();
            }).catch(err => {
                Utils.errorLog(err, 'PHOTO-LIST');
            });
        },
        back () {
            this.$router.go(-1);
        },
        addPhoto () {
            this.photoAddShow = true;
        },
        updatePhoto (data) {
            this.dataList.splice(data.index, 1, data.photo);
        },
        getPreview (index) {
            this.preview.show = true;
            this.preview.index = index;
        }
    }
};
</script>
