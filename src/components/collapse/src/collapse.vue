<template>
    <div class="et-collapse">
        <div class="et-collapse__header"
            @click="trigger">
            <span class="et-collapse__title">{{ title }}</span>
            <i class="et-icon ei-angle-down"
                :class="{'et-icon_reverse': show}">
            </i>
        </div>
        <el-collapse-transition>
            <div class="et-collapse__body" v-show="show">
                <slot></slot>
            </div>
        </el-collapse-transition>
    </div>
</template>

<script>
export default {
    name: 'EtCollapse',
    props: {
        show: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: ''
        }
    },
    methods: {
        trigger () {
            this.$emit('update:show', !this.show);
        }
    }
};
</script>

<style lang="scss" scoped>
@import "~static/styles/style-common";

.et-collapse {
    .et-collapse__header {
        position: relative;
        margin-top: $spaceSmall;
        margin-bottom: $spaceLarge;
        user-select: none;
        cursor: pointer;

        &::before {
            content: '';
            position: absolute;
            display: block;
            top: 50%;
            left: $formLabelWidth;
            right: $elementHeight;
            border-bottom: 1px dashed $splitBorderColor;
        }

        .et-collapse__title {
            display: block;
            width: $formLabelWidth;
            padding-right: $spaceMiddle;
            font-size: $descriptionFontSize;
            line-height: $elementHeight;
            color: $descriptionColor;
            text-align: right;
            box-sizing: border-box;
        }

        .et-icon {
            position: absolute;
            display: block;
            top: 0;
            right: 0;
            width: $elementHeight;
            text-align: center;
            line-height: $elementHeight;
            font-size: $iconFontSizeTiny;
            color: $splitBorderColor;
        }

        &:hover::before {
            border-color: $elementHoverColor;
        }

        &:hover .et-icon {
            color: $elementHoverColor;
        }
    }
}
</style>
