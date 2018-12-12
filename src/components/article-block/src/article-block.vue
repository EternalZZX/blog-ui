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
                v-html="content"
                v-highlight>
            </div>
            <p class="et-article-block__sign">
                {{ data.last_editor.nick }}{{ $t("article.edited") }}{{ data.edit_at | time }}
            </p>
            <div class="et-article-block__panel">
                <button class="et-article-block__button"
                    :title="$t('common.commentCount')"
                    @click="commentArticle">
                    <i class="et-icon ei-message"></i>
                    <span>{{ $t("common.commentCount") }} · </span>{{ data.metadata.comment_count | count }}
                </button>
                <button class="et-article-block__button"
                    :title="$t('common.like')"
                    @click="upvoteArticle">
                    <i class="et-icon"
                        :class="data.is_like_user === LIKE_TYPE.LIKE ?
                            'ei-appreciate-fill' : 'ei-appreciate'">
                    </i>
                    <span>{{ $t("common.like") }} · </span>{{ data.metadata.like_count | count }}
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
            </div>
        </div>
    </div>
</template>

<script>
import sanitizeHtml from 'sanitize-html';
import Common from '@/common/common';
import Utils from '@/common/utils';
import Articles, { ArticleApi } from '@/common/api/articles';
export default {
    name: 'EtArticleBlock',
    props: {
        data: {
            type: Object,
            default () {
                return {
                    last_editor: {},
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
        content () {
            const indentArr = [
                'ql-indent-1', 'ql-indent-2', 'ql-indent-3', 'ql-indent-4',
                'ql-indent-5', 'ql-indent-6', 'ql-indent-7', 'ql-indent-8'
            ];
            return sanitizeHtml(this.data.content, {
                allowedTags: [
                    'p', 'h2', 'em', 'strong', 'ol', 'ul', 'li',
                    'pre', 'blockquote', 'br', 'a', 'img'
                ],
                allowedClasses: {
                    'p': indentArr,
                    'h2': indentArr,
                    'li': indentArr,
                    'pre': ['ql-syntax', ...indentArr],
                    'blockquote': indentArr
                },
                allowedAttributes: {
                    'pre': ['spellcheck'],
                    'a': ['href', 'target'],
                    'img': ['src']
                }
            });
        },
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
            Articles.upvote(this.data.uuid).then(response => {
                this.updateView(response.data);
            }).catch(err => {
                Utils.errorLog(err, 'ARTICLE-UPVOTE');
                Common.notify(Utils.errorMessage(err), 'error');
            });
        },
        downvoteArtilce () {
            Articles.downvote(this.data.uuid).then(response => {
                this.updateView(response.data);
            }).catch(err => {
                Utils.errorLog(err, 'ARTICLE-DOWNVOTE');
                Common.notify(Utils.errorMessage(err), 'error');
            });
        },
        commentArticle () {
            this.$emit('comment');
        },
        updateView (data) {
            this.$emit('update:data', data);
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
            user-select: none;
        }
    }

    .et-article-block__body {
        margin: 0 $spaceSmall;

        .et-article-block__sign {
            margin: 0 $spaceSmall;
            padding: $spaceLarge;
            font-size: $descriptionFontSize;
            text-align: center;
            color: $descriptionColor;
            border-bottom: $splitBorder;
        }
    }

    .et-article-block__panel {
        display: flex;
        padding: $spaceSmall;
        padding-bottom: $spaceLarge;

        .et-article-block__button {
            margin-right: $spaceLarge;
            font-size: $descriptionFontSize;
            line-height: $descriptionFontSize;
            color: $descriptionColor;
            user-select: none;
            cursor: pointer;

            &:hover {
                color: $subThemeColor;
            }

            .et-icon {
                font-size: $iconFontSizeSmall;
                vertical-align: middle;
            }
        }
    }

    @include max-screen($phoneMaxWidth) {
        border-radius: 0;

        .et-article-block__panel {
            .et-article-block__button span {
                display: none;
            }
        }
    }
}
</style>
