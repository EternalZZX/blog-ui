<template>
    <el-dialog class="et-dialog"
        :title="$t('comment.viewDialog')"
        :append-to-body="true"
        :visible="show"
        top="5%"
        @open="open"
        @close="close"
        @keyup.enter.native="cancel">
        <et-scroll ref="scroll"
            @more="loadMore">
            <et-comment v-for="(comment, index) in dataList"
                :key="comment.uuid"
                :index="index"
                :data="comment"
                type="simple"
                @update="updateComment">
            </et-comment>
        </et-scroll>
        <div slot="footer">
            <el-button @click="cancel">
                {{ $t("common.closeButton") }}
            </el-button>
        </div>
    </el-dialog>
</template>

<script>
import Utils from '@/common/utils';
import Permission from '@/common/permission';
import Comments from '@/common/api/comments';
export default {
    name: 'EtCommentDialog',
    props: {
        show: {
            type: Boolean,
            default: false
        },
        dialogComment: {
            type: Object,
            default () {
                return {};
            }
        }
    },
    data () {
        return {
            dataList: [],
            params: {
                page: 1,
                page_size: 10
            }
        };
    },
    methods: {
        open () {
            this.init();
        },
        close () {
            this.closeDialog();
        },
        init () {
            this.dataList = [];
            this.params.page = 1;
            this.$refs.scroll && this.$refs.scroll.reset();
        },
        loadMore (state) {
            if (!this.show ||
                !Permission.hasPermission('comment-list')) {
                state.complete();
                return;
            }
            this.loadComments(state);
        },
        loadComments (state) {
            const def = this.dialogComment.dialog_uuid ?
                Comments.listDialogComments(
                    this.dialogComment.resourceType,
                    this.dialogComment.resourceUuid,
                    this.dialogComment.dialog_uuid
                ) :
                Comments.listReplyComments(
                    this.dialogComment.resourceType,
                    this.dialogComment.resourceUuid,
                    this.dialogComment.uuid
                );
            def.then(response => {
                this.dataList = this.dataList.concat(response.data.comments);
                this.params.page ++;
                response.data.total === this.dataList.length ?
                    state.complete() :
                    state.loaded();
            }).catch(err => {
                state.complete();
                Utils.errorLog(err, 'COMMENT-LIST');
            });
        },
        updateComment (data) {
            this.dataList.splice(data.index, 1, data.comment);
            this.$emit('update', data.comment);
        },
        cancel () {
            this.closeDialog();
        },
        closeDialog () {
            this.$emit('update:show', false);
        }
    }
};
</script>
