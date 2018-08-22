<template>
    <div class="et-load-scroll">
        <slot></slot>
        <infinite-loading
            ref="infiniteLoading"
            spinner="waveDots"
            @infinite="infiniteHandler">
            <p slot="no-more" class="et-load-scroll__line">
                {{ $t("common.noMore") }}
            </p>
            <p slot="no-results" class="et-load-scroll__line">
                {{ $t("common.noMore") }}
            </p>
        </infinite-loading>
    </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';
export default {
    name: 'EtScroll',
    components: {
        InfiniteLoading
    },
    methods: {
        infiniteHandler (state) {
            this.$emit('more', state);
        },
        reset () {
            setTimeout(() => {
                this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
            }, 100);
        }
    }
};
</script>

<style lang="scss" scoped>
@import '~static/styles/style-common';

.et-load-scroll {
    .et-load-scroll__load {
        height: 3rem;
        margin-bottom: 1rem;

        & > div {
            height: 100%;
        }

        /deep/ .el-loading-mask {
            background-color: transparent;
        }
    }

    .et-load-scroll__line {
        position: relative;
        margin-top: -.3rem;
        text-align: center;
        font-size: $descriptionFontSize;
        color: $loadingColor;

        &:before, &:after {
            content: "";
            position: absolute;
            top: 50%;
            width: 43%;
            height: 1px;

            @include max-screen($phoneMaxWidth) {
                & {
                    width: 38%;
                }
            }
        }

        &:before {
            background: linear-gradient(to left, $loadingColor, $mainBackground);
            left: 0;
        }

        &:after {
            background: linear-gradient(to right, $loadingColor, $mainBackground);
            right: 0;
        }
    }
}
</style>
