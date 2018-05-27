<template>
    <transition name="wrapper">
        <div v-show="show" class="et-wrapper" @click="close">
            <span class="et-wrapper__close"
                :class="{ 'hide': imageZoom }"
                @click="close">
                <i class="et-icon ei-close"></i>
            </span>
            <div class="et-preview"
                @touchstart="start"
                @mousedown="start"
                @touchmove="move"
                @mousemove="move"
                @touchend="stop"
                @mouseup="stop"
                @mouseleave="stop"
                @dragstart.prevent>
                <div class="et-preview__inner">
                    <div class="et-preview__container"
                        :style="{ height: containerHeight }">
                        <transition
                            enter-active-class="animated zoomIn"
                            leave-active-class="animated zoomOut">
                            <img v-show="show"
                                class="et-preview__image"
                                :class="{ 'zoom-in': imageZoom }"
                                :src="image"
                                :style="position.style"
                                @click.stop="zoom">
                        </transition>
                    </div>
                    <div class="et-preview__comment"
                        :class="{ 'hide': imageZoom }">
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
            imageZoom: false,
            position: {
                drag: false,
                start: {
                    x: 0,
                    y: 0
                },
                stop: {
                    x: 0,
                    y: 0
                },
                style: {
                    top: 0,
                    left: 0
                }
            },
            containerHeight: null,
            imageElement: null
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
                this.imageZoom = false;
            }
        }
    },
    mounted () {
        window.onresize = () => {
            this.containerHeight = this.getContainerHeight();
        };
    },
    methods: {
        zoom () {
            this.imageZoom = !this.imageZoom;
            if (this.imageZoom) {
                this.imageElement = document.getElementsByClassName('et-preview__image')[0];
                this.position.style = {
                    left: `${(document.body.clientWidth - this.imageElement.naturalWidth) / 2}px`,
                    top: `${(document.body.clientHeight - this.imageElement.naturalHeight) / 2}px`
                };
            }
        },
        start (event) {
            if (this.imageZoom && (event.button === 0 || event.type === 'touchstart')) {
                this.position.drag = true;
                this.position.start = {
                    x: event.clientX || event.targetTouches[0].clientX,
                    y: event.clientY || event.targetTouches[0].clientY
                };
            }
        },
        stop (event) {
            if (this.imageZoom) {
                this.position.drag = false;
            }
        },
        move (event) {
            if (this.imageZoom && this.position.drag) {
                this.position.stop = {
                    x: event.clientX || event.targetTouches[0].clientX,
                    y: event.clientY || event.targetTouches[0].clientY
                };
                const x = this.position.stop.x - this.position.start.x,
                    y = this.position.stop.y - this.position.start.y;
                this.position.style = {
                    left: `${this.imageElement.offsetLeft + x}px`,
                    top: `${this.imageElement.offsetTop + y}px`
                };
                this.position.start.x = this.position.stop.x;
                this.position.start.y = this.position.stop.y;
            }
        },
        close () {
            !this.imageZoom && this.$emit('update:show', false);
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

        &.hide {
            display: none;
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
            animation-duration: .2s;
            box-shadow: 0px 5px 5px 5px rgba(0, 0, 0, .1);
            user-select: none;
            cursor: zoom-in;
        }

        .et-preview__image.zoom-in {
            position: fixed;
            transform: scale(1.5);
            max-width: initial;
            max-height: initial;
            transition: transform .1s;
            cursor: zoom-out;
        }
    }
}

.et-preview__comment {
    &.hide {
        display: none;
    }
}
</style>
