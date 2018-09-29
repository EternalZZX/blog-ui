<template>
    <nav class="et-nav">
        <div class="et-nav__wrapper">
            <div class="et-nav__header">
                <span class="et-nav__title">{{ title }}</span>
                <slot name="button"></slot>
            </div>
            <div class="et-nav__body">
                <el-menu :default-active="index" @select="select">
                    <el-menu-item v-for="item in menu"
                        :key="item.value"
                        :index="item.value">
                        <span slot="title">{{ item.label }}</span>
                    </el-menu-item>
                </el-menu>
                <ul class="et-nav__panel"
                    v-if="panel.length">
                    <li class="et-nav__button"
                        v-for="item in panel"
                        :key="item.label"
                        @click="item.event">
                        <i v-if="item.icon"
                            class="et-icon"
                            :class="item.icon">
                        </i>
                        <span>{{ item.label }}</span>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'EtNav',
    props: {
        title: {
            type: String,
            default: ''
        },
        index: {
            type: String,
            default: ''
        },
        menu: {
            type: Array,
            default () {
                return [];
            }
        },
        panel: {
            type: Array,
            default () {
                return [];
            }
        }
    },
    methods: {
        select (index) {
            this.$emit('update:index', index);
            this.$emit('select', index);
        }
    }
};
</script>

<style lang="scss" scoped>
@import "~static/styles/style-common";

.et-nav {
    width: $navWidth;
    margin: $spaceLarge;

    .et-nav__header {
        display: flex;
        height: 2rem;
        margin: $spaceTiny;
        margin-top: 0;
        border-bottom: $splitBorder;
    }

    .et-nav__title {
        flex: auto;
        font-size: .938rem;
        font-weight: $subtitleFontWeight;
        line-height: 2rem;
        color: $contentColor;
    }

    .et-nav__button {
        color: $descriptionColor;
        padding: 0;

        &:hover {
            color: $subThemeColor;
        }
    }

    .et-nav__body /deep/ .el-menu {
        padding: $spaceTiny 0;
        border: none;
        background-color: $mainBackground;

        .el-menu-item {
            height: auto;
            margin-bottom: $spaceTiny;
            padding: $spaceTiny !important;
            line-height: $navHeight;
            font-size: $descriptionFontSize;
            font-weight: $navFontWeight;
            color: $navColor;
            border-radius: $radiusTiny;
        }

        .el-menu-item:hover {
            color: $subThemeColor;
            background-color: $mainBackground;
        }

        .el-menu-item.is-active {
            background: $navActiveBackground;
        }
    }

    .et-nav__panel {
        margin: 0;
        padding: $spaceSmall 0;
        border-top: $splitBorder;

        .et-nav__button {
            margin-bottom: $spaceTiny;
            padding: $spaceTiny !important;
            line-height: $navHeight;
            font-size: $descriptionFontSize;
            font-weight: $navFontWeight;
            color: $navColor;
            list-style: none;
            cursor: pointer;
        }

        .et-nav__button:hover {
            color: $subThemeColor;
        }

        .et-nav__button .et-icon {
            font-size: $iconFontSizeTiny;
            vertical-align: middle;
        }
    }
}
</style>
