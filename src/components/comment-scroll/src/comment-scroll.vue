<template>
    <div class="et-comment-scroll">
        <et-editor v-model="content"></et-editor>
        <et-scroll ref="scroll"
            @more="loadMore">
            <et-comment v-for="comment in dataList"
                :key="comment.uuid"
                :data="comment">
            </et-comment>
        </et-scroll>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Comments, { CommentApi } from '@/common/api/comments';
import Utils from '@/common/utils';
export default {
    name: 'EtCommentScroll',
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
            }
        };
    },
    computed: {
        ...mapGetters({
            hasIdentity: 'hasIdentity'
        })
    },
    methods: {
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
}
</style>
