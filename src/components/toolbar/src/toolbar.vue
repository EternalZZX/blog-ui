<template>
    <div class="et-toolbar">
        <div class="et-toolbar__header">
            <span class="et-toolbar__title">ToolBar</span>
        </div>
        <div class="et-toolbar__body">
            Advertise
        </div>
    </div>
</template>

<script>
export default {
    name: 'EtToolbar'
};
</script>

<style lang="scss" scoped>
@import "~static/styles/style-common";

.et-toolbar {
    width: $navWidth;
    border: $splitBorder;
    border-radius: $radiusTiny;
    background-color: $blockBackground;

    .et-toolbar__header {
        height: $toolbarHeaderHeight;
        padding: $spaceSmall;
        line-height: $toolbarHeaderHeight;
        background-color: $mainBackground;
        border-bottom: $splitBorder;
    }

    .et-toolbar__title {
        font-size: .938rem;
        font-weight: $subtitleFontWeight;
        color: $subtitleColor;
    }

    .et-toolbar__body {
        padding: $spaceSmall;
    }
}
</style>
