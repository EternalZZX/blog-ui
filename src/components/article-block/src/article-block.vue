<template>
    <div class="et-article-block">
        <div class="et-article-block__header">
            <div class="et-article-block__cover"
                :style="coverUrl"
                v-if="data.cover">
            </div>
            <h4 class="et-article-block__title">{{ data.title }}</h4>
            <div class="et-article-block__subtitle">
                <et-user :user="data.author"></et-user>
                <ul class="et-article-block__info">
                    <li>{{ $t("article.published") }}{{ data.create_at | time }}</li>
                    <li>{{ data.metadata.read_count | count }} {{ $t("common.readCount") }}</li>
                </ul>
            </div>
        </div>
        <div class="et-article-block__body">
            <div class="et-article-block__content et-writing ql-editor"
                v-html="data.content">
            </div>
            <p>{{ data.edit_at | time }}</p>
            <div class="et-article-block__panel">
                <button class="et-article-block__button"
                    :title="$t('common.like')"
                    @click="upvoteArticle">
                    <i class="et-icon"
                        :class="data.is_like_user === LIKE_TYPE.LIKE ?
                            'ei-appreciate-fill' : 'ei-appreciate'">
                    </i>
                    {{ data.metadata.like_count | count }}
                </button>
                <button class="et-article-block__button"
                    :title="$t('common.dislike')"
                    @click="downvoteArtilce">
                    <i class="et-icon"
                        :class="data.is_like_user === LIKE_TYPE.DISLIKE ?
                            'ei-oppose-fill' : 'ei-oppose'">
                    </i>
                    <span>{{ $t("common.dislike") }}</span>
                </button>
                <button class="et-article-block__button"
                    :title="$t('common.commentCount')"
                    @click="commentArticle">
                    <i class="et-icon ei-message"></i>
                    <span>{{ $t("common.commentCount") }}</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { ArticleApi } from '@/common/api/articles';
export default {
    name: 'EtArticleBlock',
    props: {
        data: {
            type: Object,
            default () {
                return {
                    metadata: {}
                };
            }
        },
        hash: {
            type: String,
            default: ''
        }
    },
    computed: {
        coverUrl () {
            const backgroundImage = this.hash ?
                `url(${this.data.cover}?hash=${this.hash})` :
                `url(${this.data.cover})`;
            return this.data.cover ? { backgroundImage } : null;
        },
        LIKE_TYPE () {
            return ArticleApi.LIKE_TYPE;
        }
    },
    methods: {
        upvoteArticle () {
            //
        },
        downvoteArtilce () {
            //
        },
        commentArticle () {
            //
        }
    }
};
</script>

<style lang="scss" scoped>
@import "~static/styles/style-common";

.et-article-block {
    margin-bottom: $spaceLarge;
    background-color: $blockBackground;
    border-radius: $radiusSmall;

    .et-article-block__header {
        .et-article-block__cover {
            height: 200px;
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
            background-color: $commentBackground;
            border-radius: $radiusSmall $radiusSmall 0 0;
        }

        .et-article-block__title {
            margin: 0 $spaceLarge;
            padding: $spaceLarge 0;
            font-size: $titleLargeFontSize;
            font-weight: $titleFontWeight;
            line-height: 1.8rem;
            color: $titleColor;
            border-bottom: $splitBorder;
        }

        .et-article-block__subtitle {
            display: flex;
            margin: $spaceLarge;
        }

        .et-user {
            flex: auto;
        }

        .et-article-block__info {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            height: $userHeight;
        }

        .et-article-block__info li {
            font-size: $descriptionFontSize;
            text-align: right;
            color: $descriptionColor;
            list-style: none;
        }
    }

    .et-article-block__body {
        margin: 0 $spaceSmall;
    }

    @include max-screen($phoneMaxWidth) {
    }
}
</style>
