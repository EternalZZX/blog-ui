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
                <div class="et-album__container">
                    <div class="et-album__wrapper"
                        v-for="album in dataList" :key="album.uuid">
                        <div class="et-album" :style="getCover(album)">
                            <!-- <div class="et-album__cover" :style="getCover(album)"></div> -->
                            <div class="et-album__body">
                                {{ album.name }}
                            </div>
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
    </div>
</template>

<script>
import Album, { AlbumApi } from '@/common/api/albums';
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
            albumAddShow: false
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
    },
    methods: {
        init (loadType) {
            this.dataList = [];
            this.params.page = 1;
            this.loadType = loadType || 'all';
            this.hashCode = Utils.randString();
            this.loadMore();
        },
        loadMore () {
            if (!this.hasIdentity) {
                this.loadStatus = 'end';
                return;
            }
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
        getCover (data) {
            return data.cover ? {
                backgroundImage: `url(${data.cover}?hash=${this.hashCode})`
            } : null;
        }
    }
};
</script>
