<template>
    <div class="et-comment">
        <div class="et-comment__header">
            <et-user
                :user="data.author"
                :subtitle="data.create_at">
            </et-user>
        </div>
        <div class="et-comment__body">
            <p class="et-comment__content">{{ data.content }}</p>
            <div class="et-comment__panel">
                <i class="et-icon ei-appreciate"></i>{{ data.metadata.like_count }}
                <i class="et-icon ei-talk"></i>{{ data.metadata.comment_count }}
                <i class="et-icon ei-oppose"></i>
            </div>
        </div>
    </div>
</template>

<script>
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
    }
};
</script>

<style lang="scss" scoped>
@import "~static/styles/style-common";

.et-comment {
    margin-bottom: $spaceLarge;

    .et-comment__body {
        padding-left: $userHeight + $spaceSmall;

        .et-comment__content {
            margin: 0;
            padding: $spaceSmall 0;
        }
    }

    .et-comment__panel {
        color: $descriptionColor;
    }
}
</style>
