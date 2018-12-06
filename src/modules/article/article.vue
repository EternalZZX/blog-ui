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
                <et-article-block :data.sync="article"></et-article-block>
                <et-comment-scroll
                    :resource-type="RESOURCE_TYPE.ARTICLE"
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
import { CommentApi } from '@/common/api/comments';
export default {
    name: 'EtArticle',
    data () {
        return {
            article: {
                last_editor: {},
                metadata: {}
            },
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
        },
        RESOURCE_TYPE () {
            return CommentApi.RESOURCE_TYPE;
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
