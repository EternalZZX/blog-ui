<template>
    <div class="et-comment">
        <div class="et-comment__header">
            <et-user :user="data.author"
                :subtitle="data.create_at"
                :reply="data.reply_user">
            </et-user>
            <el-dropdown v-if="isAuthor"
                trigger="click"
                @command="handleCommand">
                <button class="et-comment__button"
                    :title="$t('comment.menu')">
                    <i class="et-icon ei-edit"></i>
                </button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="edit">
                        <i class="et-icon ei-editor"></i>{{ $t("common.edit") }}
                    </el-dropdown-item>
                    <el-dropdown-item command="delete">
                        <i class="et-icon ei-trash"></i>{{ $t("common.delete") }}
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <div class="et-comment__body">
            <div class="et-comment__content et-writing ql-editor"
                v-html="content">
            </div>
            <div class="et-comment__panel">
                <button class="et-comment__button"
                    :title="$t('comment.like')">
                    <i class="et-icon"
                        :class="data.is_like_user === LIKE_TYPE.LIKE ?
                            'ei-appreciate-fill' : 'ei-appreciate'">
                    </i>
                    {{ data.metadata.like_count | count }}
                </button>
                <button v-if="data.metadata.comment_count"
                    class="et-comment__button"
                    :title="$t('comment.viewDialog')">
                    <i class="et-icon ei-talk"></i>
                    {{ $t("comment.dialog") }}
                </button>
                <button class="et-comment__button et-comment__button_hide"
                    :title="$t('comment.reply')"
                    v-if="!isAuthor">
                    <i class="et-icon ei-reply"></i>
                    <span>{{ $t("comment.reply") }}</span>
                </button>
                <button class="et-comment__button et-comment__button_hide"
                    :title="$t('comment.dislike')">
                    <i class="et-icon"
                        :class="data.is_like_user === LIKE_TYPE.DISLIKE ?
                            'ei-oppose-fill' : 'ei-oppose'">
                    </i>
                    <span>{{ $t("comment.dislike") }}</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
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
        ...mapGetters({
            userUuid: 'userUuid'
        }),
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
        isAuthor () {
            return this.data.author.uuid === this.userUuid;
        },
        LIKE_TYPE () {
            return CommentApi.LIKE_TYPE;
        }
    },
    methods: {
        updateComment () {
            // Todo
        },
        deleteComment () {
            // Todo
        },
        handleCommand (command) {
            const operate = {
                edit: this.updateComment,
                delete: this.deleteComment
            };
            operate[command].call(this, command);
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

        .el-dropdown {
            float: right;
            height: 100%;
            line-height: $userHeight;
        }

        .el-dropdown .et-comment__button {
            height: 100%;
            padding: 0 $spaceSmall;
        }
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
        }

        @include max-screen($phoneMaxWidth) {
            & {
                padding: 0 $spaceSmall;
            }

            .et-comment__panel .et-comment__button > span {
                display: none;
            }
        }
    }

    .et-comment__button {
        font-size: $descriptionFontSize;
        color: $descriptionColor;
        line-height: $descriptionFontSize;
        cursor: pointer;
        user-select: none;

        &.et-comment__button_hide {
            opacity: 0;
            transition: opacity .2s;
        }

        @at-root .et-comment:hover .et-comment__button.et-comment__button_hide {
            opacity: 1;
            transition: opacity .2s;
        }

        &:hover {
            color: $subThemeColor;
        }

        .et-icon {
            font-size: $iconFontSizeSmall;
            vertical-align: middle;
        }
    }
}
</style>
