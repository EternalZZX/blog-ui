<template>
    <div class="et-comment-scroll">
        <et-editor v-model="content"></et-editor>
    </div>
</template>

<script>
export default {
    name: 'EtCommentScroll',
    data () {
        return {
            content: ''
        };
    }
};
</script>

<style lang="scss" scoped>
@import "~static/styles/style-common";

</style>
