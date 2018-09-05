<template>
    <div class="et-comment">
        <div class="et-comment__header">
            <et-user
                :user="data.author"
                :subtitle="data.create_at">
            </et-user>
        </div>
        <div class="et-comment__body">
            <div class="et-comment__content et-writing ql-editor"
                v-html="content">
            </div>
            <div class="et-comment__panel">
                <i class="et-icon ei-appreciate"></i>{{ data.metadata.like_count | count }}
                <i class="et-icon ei-talk"></i>{{ data.metadata.comment_count | count }}
                <i class="et-icon ei-oppose"></i>
            </div>
        </div>
    </div>
</template>

<script>
import sanitizeHtml from 'sanitize-html';
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
        }
    }
};
</script>

<style lang="scss" scoped>
@import "~static/styles/style-common";

.et-comment {
    width: 100%;
    margin-bottom: $spaceLarge;

    // .et-comment__header {
    //
    // }

    .et-comment__body {
        padding-left: $userHeight + $spaceSmall;

        .et-comment__content {
            padding: $spaceLarge 0;
        }

        .et-comment__panel {
            color: $descriptionColor;
        }
    }
}
</style>
