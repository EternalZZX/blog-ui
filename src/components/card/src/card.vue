<template>
    <div class="et-card">
        <div class="et-card__header">
            <slot name="header"></slot>
        </div>
        <div class="et-card__body">
            <slot name="body"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'EtCard'
};
</script>

<style lang="scss" scoped>
@import "~static/styles/style-common";

.et-card {
    margin-bottom: $spaceLarge;
    background-color: $blockBackground;
    box-shadow: $cardShadow;

    @include min-screen($laptopMinWidth) {
        & {
            border-radius: $radiusTiny;
        }
    }
}
</style>
