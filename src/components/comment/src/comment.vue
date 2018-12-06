<template>
    <div class="et-comment"
        :class="{'et-comment_dark': theme === 'dark'}">
        <div class="et-comment__header">
            <et-user :user="data.author"
                :subtitle="data.create_at"
                :reply="data.reply_user"
                :theme="theme">
            </et-user>
            <el-dropdown v-if="type === 'normal' && isAuthor"
                trigger="click"
                @command="handleCommand">
                <button class="et-comment__button"
                    :title="$t('common.menu')">
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
        <div class="et-comment__body" v-if="editShow">
            <div class="et-comment__editor et-comment__editor_edit">
                <et-editor ref="editor"
                    v-model="editContent"
                    :length.sync="editContentLength"
                    :max-length="contentMaxLength"
                    :placeholder="$t('comment.placeholder')"
                    type="simple">
                </et-editor>
                <div class="et-comment__editor-panel">
                    <span class="et-comment__editor-info">
                        {{ editContentLength }} / {{ contentMaxLength }}
                    </span>
                    <el-button @click="editCancel">
                        {{ $t("common.cancelButton") }}
                    </el-button>
                    <el-button type="primary"
                        @click="updateComment">
                        {{ $t("common.saveButton") }}
                    </el-button>
                </div>
            </div>
        </div>
        <div class="et-comment__body" v-else>
            <div class="et-comment__content et-writing ql-editor"
                v-html="content">
            </div>
            <div v-if="!replyShow" class="et-comment__panel">
                <button class="et-comment__button"
                    :title="$t('common.like')"
                    @click="upvoteComment">
                    <i class="et-icon"
                        :class="data.is_like_user === LIKE_TYPE.LIKE ?
                            'ei-appreciate-fill' : 'ei-appreciate'">
                    </i>
                    {{ data.metadata.like_count | count }}
                </button>
                <button class="et-comment__button"
                    :title="$t('comment.viewDialog')"
                    @click="viewDialog"
                    v-if="type === 'normal' &&
                        (data.metadata.comment_count || data.dialog_uuid)">
                    <i class="et-icon ei-talk"></i>
                    {{ $t("comment.dialog") }}
                </button>
                <button class="et-comment__button et-comment__button_hide"
                    :title="$t('common.reply')"
                    @click="reply"
                    v-if="type === 'normal' && !isAuthor">
                    <i class="et-icon ei-reply"></i>
                    <span>{{ $t("common.reply") }}</span>
                </button>
                <button class="et-comment__button et-comment__button_hide"
                    :title="$t('common.dislike')"
                    @click="downvoteComment">
                    <i class="et-icon"
                        :class="data.is_like_user === LIKE_TYPE.DISLIKE ?
                            'ei-oppose-fill' : 'ei-oppose'">
                    </i>
                    <span>{{ $t("common.dislike") }}</span>
                </button>
            </div>
            <div v-else class="et-comment__editor">
                <et-editor ref="reply-editor"
                    v-model="replyContent"
                    :length.sync="replyContentLength"
                    :max-length="contentMaxLength"
                    :placeholder="$t('comment.replyUser', {
                        name: data.author.nick
                    })"
                    type="simple">
                </et-editor>
                <div class="et-comment__editor-panel">
                    <span class="et-comment__editor-info">
                        {{ replyContentLength }} / {{ contentMaxLength }}
                    </span>
                    <el-button @click="replyCancel">
                        {{ $t("common.cancel") }}
                    </el-button>
                    <el-button type="primary"
                        @click="replyComment">
                        {{ $t("common.reply") }}
                    </el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import sanitizeHtml from 'sanitize-html';
import Common from '@/common/common';
import Utils from '@/common/utils';
import Bus, { EVENT } from '@/common/bus';
import Comments, { CommentApi } from '@/common/api/comments';
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
        },
        index: {
            type: Number
        },
        type: {
            type: String,
            default: 'normal',
            validator (val) {
                return [
                    'normal',
                    'simple'
                ].indexOf(val) !== -1;
            }
        },
        theme: {
            type: String,
            default: 'light',
            validator (val) {
                return [
                    'dark',
                    'light'
                ].indexOf(val) !== -1;
            }
        }
    },
    data () {
        return {
            replyContent: '',
            replyContentLength: 0,
            replyShow: false,
            editContent: '',
            editContentLength: 0,
            contentMaxLength: 500,
            editShow: false
        };
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
        notifyStyle () {
            return this.theme === 'dark' ? 'fullscreen' : 'normal';
        },
        LIKE_TYPE () {
            return CommentApi.LIKE_TYPE;
        }
    },
    mounted () {
        this.$root.Bus.$on(EVENT.REPLY_TRIGGER, () => {
            !this._inacitve && this.replyCancel();
        });
    },
    methods: {
        replyComment () {
            if (!this.replyContentLength) {
                Common.notify(this.$t('validate.none'), 'error', this.notifyStyle);
                return;
            }
            Comments.reply(
                this.replyContent,
                this.data.resource_uuid,
                this.data.resource_type,
                this.data.uuid
            ).then(response => {
                this.replyShow = false;
                this.replyContent = '';
                this.$emit('create', response.data);
                Common.notify(this.$t('comment.create.success'), 'success', this.notifyStyle);
            }).catch(err => {
                Utils.errorLog(err, 'COMMENT-REPLY');
                Common.notify(Utils.errorMessage(err,
                    this.$t('comment.create.error')
                ), err.type || 'error', this.notifyStyle);
            });
        },
        updateComment () {
            if (!this.editContentLength) {
                Common.notify(this.$t('validate.none'), 'error', this.notifyStyle);
                return;
            }
            Comments.edit(
                this.data.uuid,
                this.editContent
            ).then(response => {
                this.editShow = false;
                this.editContent = '';
                this.updateView(response.data);
                Common.notify(this.$t('comment.edit.success'), 'success', this.notifyStyle);
            }).catch(err => {
                Utils.errorLog(err, 'COMMENT-EDIT');
                Common.notify(Utils.errorMessage(err,
                    this.$t('comment.edit.error')
                ), err.type || 'error', this.notifyStyle);
            });
        },
        upvoteComment () {
            Comments.upvote(this.data.uuid).then(response => {
                this.updateView(response.data);
            }).catch(err => {
                Utils.errorLog(err, 'COMMENT-UPVOTE');
                Common.notify(Utils.errorMessage(err), 'error', this.notifyStyle);
            });
        },
        downvoteComment () {
            Comments.downvote(this.data.uuid).then(response => {
                this.updateView(response.data);
            }).catch(err => {
                Utils.errorLog(err, 'COMMENT-DOWNVOTE');
                Common.notify(Utils.errorMessage(err), 'error', this.notifyStyle);
            });
        },
        deleteComment () {
            this.$emit('delete', this.data);
        },
        viewDialog () {
            this.$emit('view-dialog', this.data);
        },
        reply () {
            Bus.$emit(EVENT.REPLY_TRIGGER);
            this.replyShow = true;
            this.$nextTick(() => {
                this.$refs['reply-editor'].restoreFocus();
            });
        },
        replyCancel () {
            this.replyShow = false;
        },
        edit () {
            Bus.$emit(EVENT.REPLY_TRIGGER);
            this.editContent = this.data.content;
            this.editShow = true;
            this.$nextTick(() => {
                this.$refs.editor.restoreFocus();
            });
        },
        editCancel () {
            this.editShow = false;
        },
        updateView (data) {
            this.$emit('update', {
                comment: data,
                index: this.index
            });
        },
        handleCommand (command) {
            const operate = {
                edit: this.edit,
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
        /deep/ .et-comment__content.et-writing.ql-editor *,
        /deep/ .et-comment__reply .ql-editor,
        /deep/ .et-comment__reply .ql-editor *,
        /deep/ .et-comment__reply .ql-editor.ql-blank:before {
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

    .et-comment__editor {
        .et-comment__editor-panel {
            display: flex;
            padding: $spaceSmall 0;
        }

        .et-comment__editor-info {
            flex: auto;
            display: block;
            padding: 0 $spaceTiny;
            line-height: $buttonHeight;
            font-size: $descriptionFontSize;
            color: $descriptionColor;
        }

        .et-comment__editor-panel .el-button {
            min-width: 4.5rem;
        }

        &.et-comment__editor_edit {
            margin-top: $spaceLarge;
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

    &.et-comment_dark /deep/ {
        .et-comment__content.et-writing.ql-editor {
            color: $darkContentColor;
        }

        .et-comment__editor .et-editor .ql-container.ql-snow {
            border-color: $darkContentColor;
            background-color: transparent;
        }

        .et-comment__editor .et-editor .ql-snow .ql-editor {
            color: $darkContentColor;
        }

        .et-comment__editor .et-editor .ql-editor.ql-blank:before,
        .et-comment__editor .et-comment-scroll__editor-info,
        .et-comment__button {
            color: $darkDescriptionColor;
        }

        .et-comment__button:hover {
            color: $darkHoverColor;
        }
    }
}
</style>
