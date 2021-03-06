<template>
    <div class="et-layout">
        <et-nav :title="$t('photo.nav.title')"
            :index.sync="loadType"
            :options="navOptions"
            @select="init">
            <el-button slot="button" type="text"
                class="et-nav__button"
                @click="back">
                {{ $t("common.back") }}
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
                        :selectable="editMode"
                        :deletable="editMode"
                        :editable="editMode"
                        @upvote="upvotePhoto(photo, index)"
                        @comment="getPreview(index)"
                        @edit="editPhoto(photo, index)"
                        @delete="removePhoto"
                        @click="editMode ? selectPhoto(photo) : getPreview(index)">
                    </et-photo>
                    <div class="et-photo__wrapper et-photo__wrapper_add"
                        v-perm:photo-add>
                        <div class="et-photo__add"
                            :title="$t('photo.create.title')"
                            @click="addPhoto">
                            <i class="et-icon ei-plus"></i>
                        </div>
                    </div>
                </div>
            </et-scroll>
            <et-toolbar></et-toolbar>
        </div>

        <et-photo-add v-perm:photo-add
            :show.sync="photoAddShow"
            :album="album"
            :edit-data="editData"
            @create="init(loadType)"
            @edit="editModeInit">
        </et-photo-add>

        <et-confirm
            :show.sync="confirm.show"
            :data="confirm.data"
            :message="confirm.message"
            :type="confirm.type"
            @confirm="deletePhotos">
        </et-confirm>

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
import Common from '@/common/common';
import Utils from '@/common/utils';
import Permission from '@/common/permission';
import Album from '@/common/api/albums';
import Photo, { PhotoApi } from '@/common/api/photos';
import EtPhotoAdd from './photo-add';
export default {
    name: 'EtAlbum',
    components: {
        EtPhotoAdd
    },
    data () {
        return {
            album: null,
            dataList: [],
            params: {
                page: 1,
                page_size: 10
            },
            loadType: 'all',
            photoAddShow: false,
            editMode: false,
            editData: null,
            dataChecked: [],
            confirm: {
                show: false,
                message: '',
                data: null,
                type: 'confirm'
            },
            preview: {
                show: false,
                index: 0
            }
        };
    },
    computed: {
        ...mapGetters({
            userUuid: 'userUuid'
        }),
        navOptions () {
            return {
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
                menu: this.isSelfAlbum ? [{
                    icon: 'ei-round-plus',
                    label: this.$t('photo.nav.create'),
                    event: this.addPhoto,
                    disabled: !Permission.hasPermission('photo-add')
                }, {
                    icon: 'ei-square-check',
                    label: this.$t('photo.nav.check'),
                    event: this.checkAllPhotos,
                    show: this.editMode &&
                        (this.dataList.length === 0 ||
                        this.dataChecked.length !== this.dataList.length),
                    disabled: this.dataList.length === 0
                }, {
                    icon: 'ei-square',
                    label: this.$t('photo.nav.uncheck'),
                    event: this.uncheckAllPhotos,
                    show: this.editMode &&
                        this.dataList.length &&
                        this.dataChecked.length === this.dataList.length
                }, {
                    icon: 'ei-trash',
                    label: this.$t('photo.nav.delete'),
                    event: this.removePhoto,
                    show: this.editMode,
                    disabled: !Permission.hasPermission('photo-delete-self')
                }, {
                    icon: this.editMode ? 'ei-exit' : 'ei-edit',
                    label: this.editMode ?
                        this.$t('photo.nav.browse') :
                        this.$t('photo.nav.edit'),
                    event: this.editModeTrigger
                }] : []
            };
        },
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
        },
        isSelfAlbum () {
            return this.album && this.album.author.uuid === this.userUuid;
        }
    },
    watch: {
        editMode (val) {
            if (!val) {
                for (const item of this.dataList) {
                    item.checked = false;
                }
                this.dataChecked = [];
            }
        }
    },
    mounted () {
        this.$root.Bus.$on(EVENT.IDENTITY_REFRESH, () => {
            !this._inacitve && this.init();
        });
    },
    activated () {
        this.getAlbum();
        this.init();
    },
    methods: {
        init (loadType) {
            this.dataList = [];
            this.params.page = 1;
            this.editMode = false;
            this.loadType = loadType || 'all';
            this.$refs.scroll.reset();
        },
        loadMore (state) {
            if (!Permission.hasPermission('photo-list')) {
                state.complete();
                return;
            }
            this.loadPhotos(state);
        },
        loadPhotos (state) {
            const args = { ...this.params };
            this.privacy !== null && (args.privacy = this.privacy);
            Photo.listAlbumPhotos(this.albumUuid, args).then(response => {
                const photos = response.data.photos.map(item => {
                    item.checked = false;
                    return item;
                });
                this.dataList = this.dataList.concat(photos);
                this.params.page ++;
                response.data.total === this.dataList.length ?
                    state.complete() :
                    state.loaded();
            }).catch(err => {
                state.complete();
                Utils.errorLog(err, 'PHOTO-LIST');
            });
        },
        upvotePhoto (photo, index) {
            Photo.upvote(photo.uuid).then(response => {
                this.updatePhoto({ data: response.data, index });
            }).catch(err => {
                Utils.errorLog(err, 'PHOTO-UPVOTE');
                Common.notify(Utils.errorMessage(err), 'error');
            });
        },
        deletePhotos (data) {
            Photo.deletePhotos(data).then(response => {
                this.editModeInit();
                Common.notify(this.$t('photo.delete.success'), 'success');
            }).catch(err => {
                Utils.errorLog(err, 'PHOTO-DELETE');
                Common.notify(Utils.errorMessage(err,
                    this.$t('photo.create.error')
                ), 'error');
            });
        },
        getAlbum () {
            Album.get(this.albumUuid).then(response => {
                this.album = response.data;
            }).catch(err => {
                Utils.errorLog(err, 'ALBUM-GET');
            });
        },
        getPreview (index) {
            this.preview.show = true;
            this.preview.index = index;
        },
        back () {
            this.$router.go(-1);
        },
        addPhoto () {
            this.editData = null;
            this.editMode = false;
            this.photoAddShow = true;
        },
        editPhoto (photo, index) {
            this.editData = { photo, index };
            this.photoAddShow = true;
        },
        removePhoto (data) {
            if (data) {
                this.confirm = {
                    show: true,
                    message: this.$t('photo.delete.confirm'),
                    data: [data],
                    type: 'confirm'
                };
            } else {
                this.confirm = this.dataChecked.length ? {
                    show: true,
                    message: this.$t('photo.delete.confirmPhotos'),
                    data: this.dataChecked,
                    type: 'confirm'
                } : {
                    show: true,
                    message: this.$t('photo.delete.confirmSelect'),
                    type: 'alert'
                };
            }
        },
        editModeTrigger () {
            this.editMode = !this.editMode;
        },
        selectPhoto (photo) {
            photo.checked = !photo.checked;
            photo.checked ?
                this.dataChecked.push(photo) :
                this.dataChecked.splice(this.dataChecked.findIndex(
                    item => item.uuid === photo.uuid
                ), 1);
        },
        selectPhotos (checked) {
            for (const item of this.dataList) {
                item.checked = checked;
            }
            this.dataChecked = checked ? Utils.deepClone(this.dataList) : [];
        },
        checkAllPhotos () {
            this.selectPhotos(true);
        },
        uncheckAllPhotos () {
            this.selectPhotos(false);
        },
        editModeInit () {
            this.init(this.loadType);
            this.editMode = true;
        },
        updatePhoto (data) {
            this.dataList.splice(data.index, 1, data.data);
        }
    }
};
</script>
