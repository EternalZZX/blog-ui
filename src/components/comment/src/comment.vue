<template>
    <div class="et-comment">
        <div class="et-comment__header">
            <et-user :user="data.author"
                :subtitle="data.create_at">
            </et-user>
        </div>
        <div class="et-comment__body">
            <div class="et-comment__content et-writing ql-editor"
                v-html="content">
            </div>
            <div class="et-comment__panel">
                <div class="et-comment__button"
                    :title="$t('comment.like')">
                    <i class="et-icon"
                        :class="data.is_like_user === LIKE_TYPE.LIKE ?
                            'ei-appreciate-fill' : 'ei-appreciate'">
                    </i>
                    {{ data.metadata.like_count | count }}
                </div>
                <div v-if="data.metadata.comment_count"
                    class="et-comment__button"
                    :title="$t('comment.viewDialog')">
                    <i class="et-icon ei-talk"></i>
                    {{ $t("comment.dialog") }}
                </div>
                <div class="et-comment__button et-comment__button_hide"
                    :title="$t('comment.reply')">
                    <i class="et-icon ei-reply"></i>
                    {{ $t("comment.reply") }}
                </div>
                <div class="et-comment__button et-comment__button_hide"
                    :title="$t('comment.dislike')">
                    <i class="et-icon"
                        :class="data.is_like_user === LIKE_TYPE.DISLIKE ?
                            'ei-oppose-fill' : 'ei-oppose'">
                    </i>
                    {{ $t("comment.dislike") }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import sanitizeHtml from 'sanitize-html';
import { CommentApi } from '@/common/api/comments';
export default {
    name: 'EtComment',
    props: {
        data: {
            type: Object,
            default () {
                return {
                    user: null,
                    nick: '',
                    remark: ''
                };
            },
            required: true
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
        LIKE_TYPE () {
            return CommentApi.LIKE_TYPE;
        }
    }
};
</script>

<style lang="scss" scoped>
@import "~static/styles/style-common";

.et-comment {
    width: 100%;
    margin-bottom: $spaceLarge;

    .et-comment__header {
        height: $userHeight;
    }

    .et-comment__body {
        padding-right: $spaceSmall;
        padding-left: $userHeight + $spaceSmall;

        .et-comment__content {
            padding: $spaceLarge 0;
        }

        /deep/ .et-comment__content.et-writing.ql-editor,
        /deep/ .et-comment__content.et-writing.ql-editor * {
            font-size: $subtitleFontSize;
        }

        .et-comment__panel {
            display: flex;
            padding: $spaceTiny 0;
        }

        .et-comment__panel .et-comment__button {
            margin-right: $spaceLarge;
            font-size: $descriptionFontSize;
            color: $descriptionColor;
            line-height: $descriptionFontSize;
            cursor: pointer;
            user-select: none;
        }

        .et-comment__panel .et-comment__button.et-comment__button_hide {
            opacity: 0;
            transition: opacity .2s;
        }

        @at-root .et-comment:hover .et-comment__body .et-comment__panel .et-comment__button.et-comment__button_hide {
            opacity: 1;
            transition: opacity .2s;
        }

        .et-comment__panel .et-comment__button:hover {
            color: $subThemeColor;
        }

        .et-comment__panel .et-comment__button .et-icon {
            font-size: $iconFontSizeSmall;
            vertical-align: middle;
        }
    }
}
</style>
