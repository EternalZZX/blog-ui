<template>
    <div class="et-layout">
        <et-nav :title="$t('article.nav.title')"
            :index.sync="loadType"
            :options="navOptions">
            <el-button slot="button" type="text"
                class="et-nav__button"
                @click="back">
                {{ $t("common.back") }}
            </el-button>
        </et-nav>
        <div class="et-content">
            <div class="et-content__wrapper">
                <et-article-block :data="article"></et-article-block>
                <et-comment-scroll
                    :resource-type="2"
                    :resource-uuid="articleUuid">
                </et-comment-scroll>
            </div>
            <et-toolbar></et-toolbar>
        </div>
    </div>
</template>

<script>
import Utils from '@/common/utils';
import Article from '@/common/api/articles';
export default {
    name: 'EtArticle',
    data () {
        return {
            article: {},
            loadType: 'all'
        };
    },
    computed: {
        navOptions () {
            return {
                nav: []
            };
        },
        articleUuid () {
            return this.$route.params.uuid;
        }
    },
    activated () {
        this.init();
    },
    methods: {
        init () {
            this.getArticle();
        },
        getArticle () {
            Article.get(this.articleUuid).then(response => {
                this.article = response.data;
            }).catch(err => {
                Utils.errorLog(err, 'ARTICLE-GET');
            });
        },
        back () {
            this.$router.go(-1);
        }
    }
};
</script>
