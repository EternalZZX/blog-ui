<template>
    <transition name="wrapper">
        <div v-show="show" class="et-wrapper">
            <span class="et-wrapper__close" @click="close">
                <i class="et-icon ei-close"></i>
            </span>
            <div class="et-preview">
                <div class="et-preview__inner">
                    <div class="et-preview__container"
                        :style="{ height: containerHeight }">
                        <transition
                            enter-active-class="animated zoomIn"
                            leave-active-class="animated zoomOut">
                            <img v-show="show"
                                class="et-preview__image"
                                :src="image">
                        </transition>
                    </div>
                    <div class="et-preview__comment">
                        123
                    </div>
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
        },
        index: {
            type: Number,
            default: 0
        }
    },
    data () {
        return {
            imagePrev: null,
            imageNext: null,
            containerHeight: null
        };
    },
    computed: {
        image () {
            return this.index < this.data.length ? this.data[this.index].image_large : null;
        }
    },
    watch: {
        show (val) {
            if (val) {
                document.body.style.overflow = 'hidden';
                this.$nextTick(() => {
                    this.containerHeight = this.getContainerHeight();
                });
            } else {
                document.body.style.overflow = null;
            }
        }
    },
    mounted () {
        window.onresize = () => {
            this.containerHeight = this.getContainerHeight();
        };
    },
    methods: {
        close () {
            this.$emit('update:show', false);
        },
        getContainerHeight () {
            return `${document.body.clientHeight}px`;
        }
    }
};
</script>

<style lang="scss" scoped>
@import "~static/styles/style-common";

.et-wrapper {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
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
        margin: $spaceSmall;
        color: #a6a6a6;
        cursor: pointer;

        &:hover {
            color: #c1c1c1;
        }

        .et-icon {
            font-size: $elementHeight;
            font-weight: bold;
        }
    }
}

.et-preview {
    width: 100%;
    height: 100%;
    overflow: auto;

    .et-preview__inner {
        margin: auto;
    }

    .et-preview__container {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding: $headerHeight 0;

        .et-preview__image {
            display: block;
            max-width: 100%;
            max-height: 100%;
            margin: auto;
            animation-duration: .3s;
            box-shadow: 0px 5px 5px 5px rgba(0, 0, 0, .1);
        }
    }
}
</style>
