<template>
    <el-dialog class="et-dialog"
        :title="$t('editor.insertImage')"
        :visible="show"
        top="5%"
        @open="open"
        @close="close"
        @keyup.enter.native="submit">
        <div class="et-dialog__panel">
            <el-button :title="$t('editor.image.back')"
                :disabled="!loadAlbumUuid"
                @click="back">
                <i class="et-icon ei-undo"></i>
            </el-button>
            <el-input v-model="searchStr"
                :placeholder="$t('editor.image.search')"
                :clearable="true"
                @change="debouncedSearch"
                @keyup.native="debouncedSearch">
                <i slot="prefix" class="el-input__icon et-icon ei-search"></i>
            </el-input>
            <el-upload action="upload"
                :http-request="uploadPhoto"
                :show-file-list="false"
                :multiple="false">
                <el-button type="file">
                    {{ $t("editor.image.upload") }}
                </el-button>
            </el-upload>
        </div>
        <et-scroll ref="scroll" @more="loadMore">
            <div class="et-photo__container">
                <et-photo v-for="album in albumList"
                    :key="album.uuid"
                    :data="album"
                    :selectable="true"
                    type="album"
                    @click="selectAlbum(album)">
                </et-photo>
                <et-photo v-for="photo in photoList"
                    :key="photo.uuid"
                    :data="photo"
                    :selectable="true"
                    @click="selectPhoto(photo)">
                </et-photo>
                <div class="et-photo__wrapper et-photo__wrapper_add">
                    <el-upload action="upload"
                        :http-request="uploadPhoto"
                        :show-file-list="false"
                        :multiple="false">
                        <div class="et-photo__add" :title="$t('photo.create.title')">
                            <i class="et-icon ei-plus"></i>
                        </div>
                    </el-upload>
                </div>
            </div>
        </et-scroll>
        <div slot="footer">
            <el-button @click="cancel">
                {{ $t("common.cancelButton") }}
            </el-button>
            <el-button type="primary"
                :disabled="!selectPhotos.length"
                @click="submit">
                {{ $t("common.submitButton") }}
            </el-button>
        </div>
    </el-dialog>
</template>

<script>
import { debounce } from 'throttle-debounce';
import { mapState, mapGetters } from 'vuex';
import Quill from 'quill';
import Common from '@/common/common';
import Utils from '@/common/utils';
import Photo from '@/common/api/photos';
import Album from '@/common/api/albums';
export default {
    name: 'EtEditorImage',
    props: {
        show: {
            type: Boolean,
            default: false
        },
        editor: {
            type: Object
        }
    },
    data () {
        return {
            selectPhotos: [],
            albumList: [],
            photoList: [],
            params: {
                page: 1,
                page_size: 10
            },
            loadType: 'album',
            loadAlbumUuid: null,
            searchStr: ''
        };
    },
    computed: {
        ...mapState({
            identity: 'identity'
        }),
        ...mapGetters({
            hasIdentity: 'hasIdentity'
        })
    },
    created () {
        this.debouncedSearch = debounce(500, this.search);
    },
    methods: {
        open () {
            this.init();
        },
        close () {
            this.selectPhotos = [];
            this.$emit('restore-focus');
            this.closeDialog();
        },
        submit () {
            for (const photo of this.selectPhotos) {
                this.insertImage(photo.image_middle);
            }
            this.closeDialog();
        },
        init (albumUuid = null, searchStr = '') {
            this.albumList = [];
            this.photoList = [];
            this.params.page = 1;
            this.loadAlbumUuid = albumUuid;
            this.searchStr = searchStr;
            this.loadType = albumUuid || searchStr ? 'photo' : 'album';
            this.$refs.scroll && this.$refs.scroll.reset();
        },
        loadMore (state) {
            if (!this.show || !this.hasIdentity) {
                state.complete();
                return;
            }
            this.loadType === 'album' ?
                this.loadAlbums(state) :
                this.loadPhotos(state, this.loadAlbumUuid, this.searchStr);
        },
        loadAlbums (state) {
            Album.listSelfAlbums(
                this.identity.uuid,
                null,
                this.params
            ).then(response => {
                this.albumList = this.albumList.concat(response.data.albums);
                this.params.page ++;
                state.loaded();
                if (response.data.total === this.albumList.length) {
                    this.loadType = 'photo';
                    this.params.page = 1;
                }
            }).catch(err => {
                Utils.errorLog(err, 'ALBUM-LIST');
            });
        },
        loadPhotos (state, albumUuid, searchStr) {
            let def = null;
            if (searchStr) {
                def = Photo.listSelfPhotos(this.identity.uuid, searchStr, this.params);
            } else if (albumUuid) {
                def = Photo.listAlbumPhotos(albumUuid, this.params);
            } else {
                def = Photo.listSelfOtherPhotos(this.identity.uuid, this.params);
            }
            def.then(response => {
                const photos = response.data.photos.map(item => {
                    item.checked = this.selectPhotos.find(
                        photo => photo.uuid === item.uuid
                    );
                    return item;
                });
                this.photoList = this.photoList.concat(photos);
                this.params.page ++;
                response.data.total === this.photoList.length ?
                    state.complete() :
                    state.loaded();
            }).catch(err => {
                Utils.errorLog(err, 'PHOTO-LIST');
            });
        },
        selectAlbum (album) {
            this.init(album.uuid);
        },
        selectPhoto (photo) {
            photo.checked = !photo.checked;
            photo.checked ?
                this.selectPhotos.push(photo) :
                this.selectPhotos.splice(this.selectPhotos.findIndex(
                    item => item.uuid === photo.uuid
                ), 1);
        },
        back () {
            this.init();
        },
        search () {
            this.init(null, this.searchStr);
        },
        uploadPhoto (content) {
            Photo.create(content.file).then(response => {
                this.selectPhotos.push(response.data);
                this.init();
                Common.notify(this.$t('photo.create.success'), 'success', 'dialog');
                content.onSuccess(response);
            }).catch(err => {
                Utils.errorLog(err, 'PHOTO-CREATE');
                Common.notify(Utils.errorMessage(err,
                    this.$t('photo.create.error')
                ), 'error', 'dialog');
                content.onError(err);
            });
        },
        insertImage (url) {
            const selection = this.editor.getSelection(true);
            this.editor.insertText(selection.index, '\n', Quill.sources.USER);
            this.editor.insertEmbed(
                selection.index + 1,
                'image',
                url,
                Quill.sources.USER
            );
            this.editor.setSelection(selection.index + 2, Quill.sources.SILENT);
        },
        cancel () {
            this.closeDialog();
        },
        closeDialog () {
            this.$emit('update:show', false);
        }
    }
};
</script>
