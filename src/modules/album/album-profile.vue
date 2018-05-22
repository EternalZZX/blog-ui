<template>
    <div class="et-layout">
        <et-nav :title="$t('album.nav.title')"
            :index.sync="loadType"
            :menu="nav">
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
import { mapState } from 'vuex';
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
        privacy () {
            const privacyDict = {
                'all': null,
                'public': AlbumApi.PRIVACY.PUBLIC,
                'private': AlbumApi.PRIVACY.PRIVATE
            };
            return privacyDict[this.loadType];
        }
    },
    watch: {
        loadType (val) {
            this.init(val);
        }
    },
    mounted () {
        this.$root.Bus.$on(EVENT.REFRESH, this.init);
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
        }
    }
};
</script>
