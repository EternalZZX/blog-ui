<template>
    <div v-show="show">
        <div class="et-dialog__panel">
            <el-button :title="$t('common.back')"
                @click="back">
                <i class="et-icon ei-undo"></i>
            </el-button>
            <el-input v-model="searchStr"
                :placeholder="$t('photo.search')"
                :clearable="true"
                @change="debouncedSearch"
                @keyup.native="debouncedSearch">
                <i slot="prefix" class="el-input__icon et-icon ei-search"></i>
            </el-input>
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
            </div>
        </et-scroll>
    </div>
</template>

<script>
import { debounce } from 'throttle-debounce';
import { mapGetters } from 'vuex';
import Utils from '@/common/utils';
import Permission from '@/common/permission';
import Photo from '@/common/api/photos';
import Album from '@/common/api/albums';
export default {
    name: 'EtPhotoSelect',
    model: {
        prop: 'photo',
        event: 'update:photo'
    },
    props: {
        show: {
            type: Boolean,
            default: false
        },
        photo: {
            type: Object,
            default () {
                return null;
            }
        },
        systemType: {
            default: null
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
            loadAlbumUuid: null,
            searchStr: ''
        };
    },
    computed: {
        ...mapGetters({
            userUuid: 'userUuid'
        })
    },
    watch: {
        show (val) {
            val ? this.init() : this.close();
        }
    },
    created () {
        this.debouncedSearch = debounce(500, this.search);
    },
    methods: {
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
            if (!this.show || !Permission.hasPermission(
                this.loadType === 'album' ? 'album-list' : 'photo-list')
            ) {
                state.complete();
                return;
            }
            this.loadType === 'album' ?
                this.loadAlbums(state) :
                this.loadPhotos(state, this.loadAlbumUuid, this.searchStr);
        },
        loadAlbums (state) {
            Album.listSelfAndSystemAlbums(
                this.userUuid,
                this.systemType,
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
                state.complete();
                Utils.errorLog(err, 'ALBUM-LIST');
            });
        },
        loadPhotos (state, albumUuid, searchStr) {
            let def = null;
            if (searchStr) {
                def = Photo.listSelfPhotos(this.userUuid, searchStr, this.params);
            } else if (albumUuid) {
                def = Photo.listAlbumPhotos(albumUuid, this.params);
            } else {
                def = Photo.listSelfOtherPhotos(this.userUuid, this.params);
            }
            def.then(response => {
                const photos = response.data.photos.map(item => {
                    item.checked = this.photo && this.photo.uuid === item.uuid;
                    return item;
                });
                this.photoList = this.photoList.concat(photos);
                this.params.page ++;
                response.data.total === this.photoList.length ?
                    state.complete() :
                    state.loaded();
            }).catch(err => {
                state.complete();
                Utils.errorLog(err, 'PHOTO-LIST');
            });
        },
        selectAlbum (album) {
            this.init(album.uuid);
        },
        selectPhoto (photo) {
            const checked = !photo.checked;
            for (const item of this.photoList) {
                item.checked = false;
            }
            photo.checked = checked;
            this.$emit('update:photo', checked ? photo : null);
            this.close();
        },
        search () {
            this.init(null, this.searchStr);
        },
        back () {
            this.loadAlbumUuid ? this.init() : this.close();
        },
        close () {
            this.$emit('update:show', false);
        }
    }
};
</script>
