<template>
    <div class="et-load-scroll"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loadBusy"
        infinite-scroll-distance="500">
        <slot></slot>
        <div class="et-load-scroll__load" v-show="loadShow">
            <div v-loading="true"></div>
        </div>
        <p class="et-load-scroll__line" v-show="loadBusy && !loadShow">{{ $t("common.noMore") }}</p>
    </div>
</template>

<script>
import infiniteScroll from 'vue-infinite-scroll';
export default {
    name: 'EtScroll',
    directives: {
        infiniteScroll
    },
    model: {
        prop: 'loadStatus',
        event: 'more'
    },
    props: {
        loadStatus: {
            type: String,
            required: true,
            validator (val) {
                return [
                    'active',
                    'pending',
                    'end'
                ].indexOf(val) !== -1;
            }
        }
    },
    data () {
        return {
            loadShow: false
        };
    },
    computed: {
        loadBusy () {
            return this.loadStatus !== 'active';
        }
    },
    watch: {
        loadStatus (val) {
            val === 'end' && (this.loadShow = false);
        }
    },
    methods: {
        loadMore () {
            this.loadShow = true;
            this.$emit('more', 'pending');
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
