<template>
    <div class="et-comment-scroll">
        <et-editor v-model="content"
            class="et-comment-scroll__editor">
        </et-editor>
        <et-scroll ref="scroll"
            @more="loadMore">
            <et-comment v-for="(comment, index) in dataList"
                :key="comment.uuid"
                :index="index"
                :data="comment"
                @create="init"
                @update="updateComment"
                @view-dialog="viewDialog">
            </et-comment>
        </et-scroll>

        <et-comment-dialog
            :show.sync="dialogShow"
            :dialog-comment="dialogComment"
            @update="updateComment">
        </et-comment-dialog>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Comments, { CommentApi } from '@/common/api/comments';
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
        }
    },
    data () {
        return {
            content: '',
            dataList: [],
            params: {
                page: 1,
                page_size: 10
            },
            dialogComment: null,
            dialogShow: false
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
            this.$refs.scroll.reset();
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
            }).catch(err => {
                Utils.errorLog(err, 'COMMENT-LIST');
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
        viewDialog (data) {
            this.dialogComment = data;
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
    }

    /deep/ .et-load-scroll > .et-comment:nth-last-child(2) {
        margin-bottom: 0;
    }
}
</style>
