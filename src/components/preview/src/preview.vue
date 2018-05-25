<template>
    <transition name="wrapper">
        <div v-show="show" class="et-wrapper">
            <span class="et-wrapper__close" @click="close">
                <i class="et-icon ei-close"></i>
            </span>
            <div class="et-preview">
                <div class="et-preview__inner">
                    <!-- <img :src="data[index].image_large"> -->
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'EtPreview',
    props: {
        show: {
            type: Boolean,
            default: false
        },
        data: {
            type: Array,
            default () {
                return [];
            }
        }
    },
    data () {
        return {
            index: 0
        };
    },
    methods: {
        close () {
            this.$emit('update:show', false);
        }
    }
};
</script>

<style lang="scss" scoped>
@import "~static/styles/style-common";

.et-wrapper {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: $wrapperIndex;

    &.wrapper-enter-active {
        animation: wrapper-enter .2s ease;
    }

    &.wrapper-leave-active {
        animation: wrapper-enter .2s ease reverse;
    }

    @keyframes wrapper-enter {
        from {
          opacity: 0;
        }

        to {
          opacity: 1;
        }
    }

    .et-wrapper__close {
        position: fixed;
        display: block;
        top: 0;
        right: 0;
        margin: .5rem;
        color: #a6a6a6;
        cursor: pointer;

        &:hover {
            color: #c1c1c1;
        }

        .et-icon {
            font-size: 2rem;
            font-weight: bold;
        }
    }
}

.et-preview {
    width: 100%;
    height: 100%;

    .et-preview__inner {
        height: 100%;
        margin: auto;
    }
}
</style>
