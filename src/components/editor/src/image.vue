<template>
    <el-dialog class="et-dialog"
        :title="$t('editor.insertImage')"
        :visible="show"
        top="5%"
        @open="open"
        @close="close"
        @keyup.enter.native="submit">
        <div class="et-dialog__panel">
            <el-button disabled>
                <i class="et-icon ei-undo"></i>
            </el-button>
            <el-input :placeholder="$t('editor.image.search')">
                <i slot="prefix" class="el-input__icon et-icon ei-search"></i>
            </el-input>
            <el-button>
                {{ $t("editor.image.upload") }}
            </el-button>
        </div>
        <et-scroll v-model="loadStatus" @more="loadMore">
            <div class="et-photo__container">
                <et-photo v-for="album in albumList"
                    :key="album.uuid"
                    :data="album"
                    :selectable="true"
                    type="album">
                </et-photo>
                <et-photo v-for="photo in photoList"
                    :key="photo.uuid"
                    :data="photo"
                    :selectable="true">
                </et-photo>
                <div class="et-photo__wrapper et-photo__wrapper_add">
                    <div class="et-photo__add" :title="$t('photo.create.title')">
                        <i class="et-icon ei-plus"></i>
                    </div>
                </div>
            </div>
        </et-scroll>
        <div slot="footer">
            <el-button @click="cancel">
                {{ $t("common.cancel") }}
            </el-button>
            <el-button type="primary" @click="submit">
                {{ $t("common.submit") }}
            </el-button>
        </div>
    </el-dialog>
</template>

<script>
import Album, { AlbumApi } from '@/common/api/albums';
import Photo from '@/common/api/photos';
import { mapState, mapGetters } from 'vuex';
import Utils from '@/common/utils';
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
            albumList: [],
            photoList: [],
            params: {
                page: 1,
                page_size: 10
            },
            loadType: 'album',
            loadStatus: 'active'
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
    methods: {
        open () {
            console.warn('image open');
        },
        close () {
            this.restoreFocus();
            this.closeDialog();
        },
        submit () {
            this.closeDialog();
        },
        init () {
            this.albumList = [];
            this.params.page = 1;
            this.loadMore();
        },
        loadMore () {
            if (!this.hasIdentity) {
                this.loadStatus = 'end';
                return;
            }
            this.loadType === 'album' ?
                this.loadAlbums() :
                this.loadPhotos();
        },
        loadAlbums () {
            Album.listSelfAlbums(
                this.identity.uuid,
                AlbumApi.PRIVACY.PUBLIC,
                this.params
            ).then(response => {
                this.albumList = this.albumList.concat(response.data.albums);
                this.loadStatus = 'active';
                this.params.page ++;
                if (response.data.total === this.albumList.length) {
                    this.loadType = 'photo';
                    this.params.page = 1;
                }
            }).catch(err => {
                Utils.errorLog(err, 'ALBUM-LIST');
            });
        },
        loadPhotos () {
            Photo.listSelfOtherPhotos(
                this.identity.uuid,
                this.params
            ).then(response => {
                this.photoList = this.photoList.concat(response.data.photos);
                this.loadStatus = response.data.total === this.photoList.length ? 'end' : 'active';
                this.params.page ++;
            }).catch(err => {
                Utils.errorLog(err, 'PHOTO-LIST');
            });
        },
        restoreFocus () {
            const scrollTop = this.editor.scrollingContainer.scrollTop;
            this.editor.focus();
            this.editor.scrollingContainer.scrollTop = scrollTop;
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
