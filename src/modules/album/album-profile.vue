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

        <et-dialog v-perm:album-add
            :show.sync="albumAddShow"
            :title="$t('album.create.title')">
        </et-dialog>
    </div>
</template>

<script>
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
            albumAddShow: false
        };
    },
    methods: {
    }
};
</script>
