<template>
    <div class="et-layout">
        <et-nav :title="$t('section.nav.title')"
            :index.sync="loadType"
            :options="navOptions">
        </et-nav>
        <div class="et-content">
            <div class="et-content__wrapper">
                <et-comment-scroll
                    :resource-type="2"
                    resource-uuid="e541cd39-3de9-5bef-ad9f-b80df3b82327">
                </et-comment-scroll>
            </div>
            <et-toolbar></et-toolbar>
        </div>
    </div>
</template>

<script>
export default {
    name: 'EtArticle',
    data () {
        return {
            navOptions: {
                nav: [{
                    value: 'all',
                    label: this.$t('section.nav.all')
                }, {
                    value: 'hot',
                    label: this.$t('section.nav.hot')
                }, {
                    value: 'follow',
                    label: this.$t('section.nav.follow')
                }, {
                    value: 'manage',
                    label: this.$t('section.nav.manage')
                }]
            },
            loadType: 'all',
            imageUrl: ''
        };
    },
    methods: {
    }
};
</script>
