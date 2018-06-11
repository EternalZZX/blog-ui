<template>
    <el-dialog class="et-dialog"
        :title="$t('editor.insertImage')"
        :visible="show"
        @open="open"
        @close="close"
        @keyup.enter.native="submit">
        <et-scroll v-model="loadStatus"
            @more="loadMore">
            <div class="et-photo__container">
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
                        :title="$t('album.create.title')">
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
            dataList: [],
            params: {
                page: 1,
                page_size: 10
            },
            loadStatus: 'active',
            blockSize: null
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
    mounted () {
        window.onresize = () => {
            this.blockSize = this.getSize();
        };
    },
    methods: {
        open () {
            this.blockSize = this.getSize();
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
            this.dataList = [];
            this.params.page = 1;
            this.loadMore();
        },
        loadMore () {
            if (!this.hasIdentity) {
                this.loadStatus = 'end';
                return;
            }
            this.loadAlbums();
        },
        loadAlbums () {
            Album.listSelfAlbums(
                this.identity.uuid,
                AlbumApi.PRIVACY.PUBLIC,
                this.params
            ).then(response => {
                this.dataList = this.dataList.concat(response.data.albums);
                this.loadStatus = response.data.total === this.dataList.length ? 'end' : 'active';
                this.params.page ++;
            }).catch(err => {
                Utils.errorLog(err, 'ALBUM-LIST');
            });
        },
        restoreFocus () {
            const scrollTop = this.editor.scrollingContainer.scrollTop;
            this.editor.focus();
            this.editor.scrollingContainer.scrollTop = scrollTop;
        },
        getSize () {
            const el = document.getElementsByClassName('et-photo__add')[0];
            return el ? document.defaultView.getComputedStyle(el, null).width : 0;
        },
        getStyle (url) {
            const style = { height: this.blockSize };
            url && (style.backgroundImage = `url(${url})`);
            return style;
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
