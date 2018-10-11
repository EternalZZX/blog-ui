<template>
    <div class="et-layout">
        <et-nav :title="$t('album.nav.title')"
            :index.sync="loadType"
            :options="navOptions"
            @select="init">
            <el-button slot="button" type="text"
                class="et-nav__button"
                v-perm:album-add
                @click="add('album')">
                {{ $t("album.nav.add") }}
            </el-button>
        </et-nav>

        <div class="et-content">
            <et-scroll class="et-content__wrapper"
                ref="scroll"
                @more="loadMore">
                <div v-if="loadType !== 'other'" class="et-photo__container">
                    <et-photo v-for="(album, index) in dataList"
                        type="album"
                        :key="album.uuid"
                        :data="album"
                        :selectable="editMode"
                        :deletable="editMode"
                        :editable="editMode"
                        @upvote="upvoteAlbum(album, index)"
                        @comment="getAlbum(album.uuid)"
                        @edit="editAlbum(album, index)"
                        @delete="removeData"
                        @click="editMode ? selectData(album) : getAlbum(album.uuid)">
                    </et-photo>
                    <div class="et-photo__wrapper et-photo__wrapper_add">
                        <div class="et-photo__add"
                            :title="$t('album.create.title')"
                            @click="add">
                            <i class="et-icon ei-plus"></i>
                        </div>
                    </div>
                </div>
                <div v-else class="et-photo__container">
                    <et-photo v-for="(photo, index) in dataList"
                        :key="photo.uuid"
                        :data="photo"
                        :selectable="editMode"
                        :deletable="editMode"
                        :editable="editMode"
                        @upvote="upvotePhoto(photo, index)"
                        @comment="getPreview(index)"
                        @edit="editPhoto(photo, index)"
                        @delete="removeData"
                        @click="editMode ? selectData(photo) : getPreview(index)">
                    </et-photo>
                    <div class="et-photo__wrapper et-photo__wrapper_add">
                        <div class="et-photo__add"
                            :title="$t('photo.create.title')"
                            @click="add">
                            <i class="et-icon ei-plus"></i>
                        </div>
                    </div>
                </div>
            </et-scroll>
            <et-toolbar></et-toolbar>
        </div>

        <et-album-add v-perm:album-add
            :show.sync="albumAddShow"
            :edit-data="editData"
            @create="init(loadType)"
            @edit="editModeInit">
        </et-album-add>

        <et-photo-add v-perm:photo-add
            :show.sync="photoAddShow"
            :edit-data="editData"
            @create="init(loadType)"
            @edit="editModeInit">
        </et-photo-add>

        <et-confirm
            :show.sync="confirm.show"
            :data="confirm.data"
            :message="confirm.message"
            :type="confirm.type"
            @confirm="deleteData">
        </et-confirm>

        <et-preview
            :show.sync="preview.show"
            :index.sync="preview.index"
            :data="dataList"
            @update="updateData">
        </et-preview>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { EVENT } from '@/common/bus';
import Common from '@/common/common';
import Utils from '@/common/utils';
import Permission from '@/common/permission';
import Album, { AlbumApi } from '@/common/api/albums';
import Photo from '@/common/api/photos';
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
            loadType: 'all',
            albumAddShow: false,
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
            hasIdentity: 'hasIdentity',
            userUuid: 'userUuid'
        }),
        navOptions () {
            const options = {
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
            };
            if (this.isSelf) {
                options.menu = this.loadType === 'other' ? [{
                    icon: 'ei-round-plus',
                    label: this.$t('photo.nav.create'),
                    event: this.add,
                    disabled: !Permission.hasPermission('photo-add')
                }, {
                    icon: 'ei-square-check',
                    label: this.$t('photo.nav.check'),
                    event: this.checkAllData,
                    show: this.editMode &&
                        (this.dataList.length === 0 ||
                        this.dataChecked.length !== this.dataList.length),
                    disabled: this.dataList.length === 0
                }, {
                    icon: 'ei-square',
                    label: this.$t('photo.nav.uncheck'),
                    event: this.uncheckAllData,
                    show: this.editMode &&
                        this.dataList.length !== 0 &&
                        this.dataChecked.length === this.dataList.length
                }, {
                    icon: 'ei-trash',
                    label: this.$t('photo.nav.delete'),
                    event: this.removeData,
                    show: this.editMode,
                    disabled: !Permission.hasPermission('photo-delete-self')
                }, {
                    icon: this.editMode ? 'ei-exit' : 'ei-edit',
                    label: this.editMode ?
                        this.$t('photo.nav.browse') :
                        this.$t('photo.nav.edit'),
                    event: this.editModeTrigger
                }] : [{
                    icon: 'ei-round-plus',
                    label: this.$t('album.nav.create'),
                    event: this.add,
                    disabled: !Permission.hasPermission('album-add')
                }, {
                    icon: 'ei-square-check',
                    label: this.$t('album.nav.check'),
                    event: this.checkAllData,
                    show: this.editMode &&
                        (this.dataList.length === 0 ||
                        this.dataChecked.length !== this.dataList.length),
                    disabled: this.dataList.length === 0
                }, {
                    icon: 'ei-square',
                    label: this.$t('album.nav.uncheck'),
                    event: this.uncheckAllData,
                    show: this.editMode &&
                        this.dataList.length !== 0 &&
                        this.dataChecked.length === this.dataList.length
                }, {
                    icon: 'ei-trash',
                    label: this.$t('album.nav.delete'),
                    event: this.removeData,
                    show: this.editMode,
                    disabled: !Permission.hasPermission('photo-delete-self')
                }, {
                    icon: this.editMode ? 'ei-exit' : 'ei-edit',
                    label: this.editMode ?
                        this.$t('album.nav.browse') :
                        this.$t('album.nav.edit'),
                    event: this.editModeTrigger
                }];
            }
            return options;
        },
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
        },
        isSelf () {
            return this.identityUuid === this.userUuid;
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
            const items = data.map(item => {
                item.checked = false;
                return item;
            });
            this.dataList = this.dataList.concat(items);
            this.params.page ++;
            total === this.dataList.length ?
                state.complete() :
                state.loaded();
        },
        upvoteAlbum (photo, index) {
            Album.upvote(photo.uuid).then(response => {
                this.updateData({ data: response.data, index });
            }).catch(err => {
                Utils.errorLog(err, 'ALBUM-UPVOTE');
                Common.notify(Utils.errorMessage(err), 'error');
            });
        },
        deleteAlbums (data) {
            Album.deleteAlbums(data).then(response => {
                this.editModeInit();
                Common.notify(this.$t('album.delete.success'), 'success');
            }).catch(err => {
                Utils.errorLog(err, 'ALBUM-DELETE');
                Common.notify(Utils.errorMessage(err,
                    this.$t('album.create.error')
                ), 'error');
            });
        },
        editAlbum (album, index) {
            this.editData = { album, index };
            this.albumAddShow = true;
        },
        upvotePhoto (photo, index) {
            Photo.upvote(photo.uuid).then(response => {
                this.updateData({ data: response.data, index });
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
        editPhoto (photo, index) {
            this.editData = { photo, index };
            this.photoAddShow = true;
        },
        add (type) {
            this.editData = null;
            this.editMode = false;
            if (this.loadType !== 'other' || type === 'album') {
                this.albumAddShow = true;
            } else {
                this.photoAddShow = true;
            }
        },
        removeData (data) {
            const type = this.loadType === 'other' ? 'photo' : 'album';
            if (data) {
                this.confirm = {
                    show: true,
                    message: this.$t(`${type}.delete.confirm`),
                    data: [data],
                    type: 'confirm'
                };
            } else {
                this.confirm = this.dataChecked.length ? {
                    show: true,
                    message: this.$t(`${type}.delete.confirmPhotos`),
                    data: this.dataChecked,
                    type: 'confirm'
                } : {
                    show: true,
                    message: this.$t(`${type}.delete.confirmSelect`),
                    type: 'alert'
                };
            }
        },
        deleteData (data) {
            this.loadType === 'other' ?
                this.deletePhotos(data) :
                this.deleteAlbums(data);
        },
        updateData (data) {
            this.dataList.splice(data.index, 1, data.data);
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
        },
        editModeTrigger () {
            this.editMode = !this.editMode;
        },
        selectData (data) {
            data.checked = !data.checked;
            data.checked ?
                this.dataChecked.push(data) :
                this.dataChecked.splice(this.dataChecked.findIndex(
                    item => item.uuid === data.uuid
                ), 1);
        },
        selectItems (checked) {
            for (const item of this.dataList) {
                item.checked = checked;
            }
            this.dataChecked = checked ? Utils.deepClone(this.dataList) : [];
        },
        checkAllData () {
            this.selectItems(true);
        },
        uncheckAllData () {
            this.selectItems(false);
        },
        editModeInit () {
            this.init(this.loadType);
            this.editMode = true;
        }
    }
};
</script>
