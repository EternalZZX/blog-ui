<template>
    <div class="et-comment-scroll"
        :class="{'et-comment-scroll_dark': theme === 'dark'}"
        v-on="$listeners">
        <div class="et-comment-scroll__editor">
            <et-editor v-model="content"
                :length.sync="contentLength"
                :max-length="contentMaxLength"
                :placeholder="$t('comment.placeholder')"
                type="simple">
            </et-editor>
            <div class="et-comment-scroll__editor-panel">
                <span class="et-comment-scroll__editor-info">
                    {{ contentLength }} / {{ contentMaxLength }}
                </span>
                <el-button type="primary"
                    @click="createComment">
                    {{ $t("comment.comment") }}
                </el-button>
            </div>
        </div>

        <et-scroll ref="scroll"
            v-show="commentScrollShow"
            @more="loadMore">
            <et-comment v-for="(comment, index) in dataList"
                :key="comment.uuid"
                :index="index"
                :data="comment"
                :theme="theme"
                @create="init"
                @update="updateComment"
                @delete="deleteConfirm"
                @view-dialog="viewDialog">
            </et-comment>
        </et-scroll>

        <et-comment-dialog
            :show.sync="dialogShow"
            :dialog-comment="comment"
            @update="updateComment">
        </et-comment-dialog>

        <et-confirm
            :show.sync="confirmShow"
            :data="comment"
            :message="$t('comment.delete.confirm')"
            @confirm="deleteComment">
        </et-confirm>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Comments, { CommentApi } from '@/common/api/comments';
import Common from '@/common/common';
import Utils from '@/common/utils';
import EtCommentDialog from './comment-dialog';
export default {
    name: 'EtCommentScroll',
    components: {
        EtCommentDialog
    },
    props: {
        resourceType: {
            type: Number,
            default: CommentApi.RESOURCE_TYPE.ARTICLE
        },
        resourceUuid: {
            type: String,
            default: ''
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
            content: '',
            contentLength: 0,
            contentMaxLength: 500,
            dataList: [],
            params: {
                page: 1,
                page_size: 10
            },
            comment: null,
            dialogShow: false,
            confirmShow: false,
            commentScrollShow: true
        };
    },
    computed: {
        ...mapGetters({
            hasIdentity: 'hasIdentity'
        })
    },
    methods: {
        init () {
            this.dataList = [];
            this.params.page = 1;
            this.commentScrollShow = true;
            this.$refs.scroll.reset();
        },
        reset () {
            this.content = '';
            this.contentLength = 0;
            this.init();
        },
        loadMore (state) {
            if (!this.hasIdentity) {
                state.complete();
                return;
            }
            this.loadComments(state);
        },
        loadComments (state) {
            Comments.listResourceComments(
                this.resourceType,
                this.resourceUuid,
                this.params
            ).then(response => {
                this.dataList = this.dataList.concat(response.data.comments);
                this.params.page ++;
                response.data.total === this.dataList.length ?
                    state.complete() :
                    state.loaded();
                this.commentScrollShow = response.data.total !== 0;
            }).catch(err => {
                Utils.errorLog(err, 'COMMENT-LIST');
            });
        },
        createComment () {
            Comments.reply(
                this.content,
                this.resourceUuid,
                this.resourceType
            ).then(response => {
                this.content = '';
                this.init();
                Common.notify(this.$t('comment.create.success'), 'success');
            }).catch(err => {
                Utils.errorLog(err, 'COMMENT-CREATE');
                Common.notify(Utils.errorMessage(err), 'error');
            });
        },
        updateComment (data) {
            if (data.index !== void 0) {
                this.dataList.splice(data.index, 1, data.comment);
            } else {
                const index = this.dataList.findIndex(item => item.uuid === data.uuid);
                index !== -1 && this.dataList.splice(index, 1, data);
            }
        },
        deleteComment (data) {
            Comments.delete(data.uuid).then(response => {
                Common.notify(this.$t('comment.delete.success'), 'success');
                this.init();
            }).catch(err => {
                Utils.errorLog(err, 'COMMENT-DELETE');
                Common.notify(Utils.errorMessage(err), 'error');
            });
        },
        deleteConfirm (data) {
            this.comment = data;
            this.confirmShow = true;
        },
        viewDialog (data) {
            this.comment = data;
            this.dialogShow = true;
        }
    }
};
</script>

<style lang="scss" scoped>
@import "~static/styles/style-common";

.et-comment-scroll {
    padding: $spaceLarge;
    border-radius: $radiusSmall;
    background-color: $commentBackground;

    .et-comment-scroll__editor {
        margin-bottom: $spaceLarge;

        .et-comment-scroll__editor-panel {
            display: flex;
            padding: $spaceSmall 0;
        }

        .et-comment-scroll__editor-info {
            flex: auto;
            display: block;
            padding: 0 $spaceTiny;
            line-height: $buttonHeight;
            font-size: $descriptionFontSize;
            color: $descriptionColor;
        }

        .et-comment-scroll__editor-panel .el-button {
            min-width: 4.5rem;
        }
    }

    /deep/ .et-load-scroll > .et-comment:nth-last-child(2) {
        margin-bottom: 0;
    }

    &.et-comment-scroll_dark {
        background-color: transparent;

        .et-comment-scroll__editor /deep/ .et-editor .ql-container.ql-snow {
            border-color: $darkContentColor;
            background-color: transparent;
        }

        .et-comment-scroll__editor /deep/ .et-editor .ql-editor.ql-blank:before,
        .et-comment-scroll__editor .et-comment-scroll__editor-info, {
            color: $darkDescriptionColor;
        }

        .et-comment-scroll__editor /deep/ .et-editor .ql-snow .ql-editor {
            color: $darkContentColor;
        }
    }
}
</style>
