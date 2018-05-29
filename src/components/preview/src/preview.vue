<template>
    <transition name="wrapper">
        <div v-show="show" class="et-wrapper" @click="close">
            <span class="et-wrapper__close"
                :class="{ 'hide': imageZoom, 'opacity': commentShow }"
                :title="$t('common.close')"
                @click="close">
                <i class="et-icon ei-close"></i>
            </span>
            <div ref="preview" class="et-preview"
                @touchstart="start"
                @mousedown="start"
                @touchmove="move"
                @mousemove="move"
                @touchend="stop"
                @mouseup="stop"
                @mouseleave="stop"
                @dragstart.prevent="void 0">
                <div class="et-preview__inner">
                    <div class="et-preview__container"
                        :style="{ height: containerHeight }">
                        <div class="et-preview__header"
                            :class="{ 'hide': imageZoom }">
                            <div class="et-preview__header-inner">
                                <et-user class="light"
                                    :user="imageData.author">
                                </et-user>
                            </div>
                        </div>
                        <transition
                            enter-active-class="animated zoomIn"
                            leave-active-class="animated zoomOut">
                            <img v-show="show" ref="image"
                                class="et-preview__image"
                                :class="{ 'zoom-in': imageZoom }"
                                :src="image.image_large"
                                :style="imageStyle"
                                @click.stop="zoomTrigger">
                        </transition>
                        <div class="et-preview__tools"
                            :class="{ 'hide': imageZoom }">
                            <div class="et-preview__tools-inner">
                                <div class="et-preview__tools-inner_left">
                                    <span class="et-preview__tools-info"
                                        :title="`${$t('common.readCount')} ${imageData.metadata.read_count}`">
                                        {{ $t("common.readCount") }}
                                    </span>
                                    <span class="et-preview__tools-info"
                                        :title="`${$t('common.readCount')} ${imageData.metadata.read_count}`">
                                        {{ imageData.metadata.read_count | number }}
                                    </span>
                                </div>
                                <div class="et-preview__tools-inner_right">
                                    <span class="et-preview__tools-info button"
                                        :title="`${$t('common.likeCount')} ${imageData.metadata.like_count}`"
                                        @click.stop="likeImage">
                                        <i class="et-icon ei-like"></i>
                                        {{ imageData.metadata.like_count | count }}
                                    </span>
                                    <span class="et-preview__tools-info button"
                                        :title="`${$t('common.commentCount')} ${imageData.metadata.comment_count}`"
                                        @click.stop="showComment">
                                        <i class="et-icon ei-message"></i>
                                        {{ imageData.metadata.comment_count | count }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-show="commentShow"
                        class="et-comment__container"
                        :class="{ 'hide': imageZoom }">
                        comment
                    </div>
                </div>
                <div class="et-zoom-tools"
                    :class="{ 'hide': !imageZoom }">
                    <div class="et-zoom-tools__inner">
                        <span class="et-zoom-tools__button"
                            :title="$t('preview.exitPreview')"
                            @click.stop="zoomTrigger">
                            <i class="et-icon ei-exit"></i>
                        </span>
                        <span class="et-zoom-tools__button"
                            :title="$t('preview.zoomIn')"
                            @click="zoomIn">
                            <i class="et-icon ei-zoom-in"></i>
                        </span>
                        <span class="et-zoom-tools__button"
                            :title="$t('preview.zoomOut')"
                            @click="zoomOut">
                            <i class="et-icon ei-zoom-out"></i>
                        </span>
                        <span class="et-zoom-tools__button"
                            :title="$t('preview.originSize')"
                            @click="imageScale = 1">
                            <i class="et-icon ei-narrow"></i>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import Photo from '@/common/api/photos';
import Utils from '@/common/utils';
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
            imageData: {
                metadata: {
                    like_count: 0,
                    comment_count: 0
                }
            },
            imageZoom: false,
            imageScale: 1.3,
            imageStyle: null,
            position: {
                drag: false,
                start: {
                    x: 0,
                    y: 0
                },
                stop: {
                    x: 0,
                    y: 0
                }
            },
            containerHeight: null,
            imageElement: null,
            commentShow: false
        };
    },
    computed: {
        image () {
            return this.index < this.data.length ? this.data[this.index] : {
                image_large: null
            };
        },
        imagePrev () {
            const index = this.index - 1;
            return index >= 0 && index < this.data.length ? this.data[index] : {
                uuid: null,
                image_large: null
            };
        },
        imageNext () {
            const index = this.index + 1;
            return index < this.data.length ? this.data[index] : {
                uuid: null,
                image_large: null
            };
        }
    },
    watch: {
        show (val) {
            if (val) {
                document.body.style.overflow = 'hidden';
                this.loadImage(this.image.uuid);
                this.$nextTick(() => {
                    this.containerHeight = this.getContainerHeight();
                });
            } else {
                document.body.style.overflow = null;
                this.imageZoom = false;
            }
        },
        imageScale (val) {
            this.imageStyle && (this.imageStyle.transform = `scale(${val})`);
        }
    },
    mounted () {
        window.onresize = () => {
            this.containerHeight = this.getContainerHeight();
        };
        this.$nextTick(() => {
            this.$refs.preview.addEventListener('scroll', this.previewScroll);
        });
    },
    methods: {
        loadImage (uuid) {
            if (!uuid) {
                return;
            }
            Photo.get(uuid).then(response => {
                this.imageData = response.data;
            }).catch(err => {
                Utils.errorLog(err, 'PHOTO-GET');
            });
        },
        zoomTrigger () {
            this.imageZoom = !this.imageZoom;
            if (this.imageZoom) {
                this.imageElement = this.$refs.image;
                this.imageStyle = {
                    left: `${(document.body.clientWidth - this.imageElement.naturalWidth) / 2}px`,
                    top: `${(document.body.clientHeight - this.imageElement.naturalHeight) / 2}px`,
                    transform: `scale(${this.imageScale})`
                };
            } else {
                this.imageScale = 1.3;
                this.imageStyle = null;
            }
        },
        zoomIn () {
            if (this.imageScale < 2) {
                this.imageScale = this.imageScale === 1 ? 1.3 : this.imageScale * 1.5;
            }
        },
        zoomOut () {
            if (this.imageScale > 0.3) {
                this.imageScale = this.imageScale === 1 ? 1.3 / 1.5 : this.imageScale / 1.5;
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
                this.imageStyle = {
                    left: `${this.imageElement.offsetLeft + x}px`,
                    top: `${this.imageElement.offsetTop + y}px`,
                    transform: `scale(${this.imageScale})`
                };
                this.position.start.x = this.position.stop.x;
                this.position.start.y = this.position.stop.y;
            }
        },
        previewScroll (event) {
            this.commentShow = event.srcElement.scrollTop > 0;
        },
        close () {
            !this.imageZoom && this.$emit('update:show', false);
        },
        getContainerHeight () {
            return `${document.body.clientHeight}px`;
        },
        likeImage () {
            return 0;
        },
        showComment () {
            return 0;
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
    background: rgba(0, 0, 0, 0.6);
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
        margin: .9rem;
        color: #ffffff;
        transition: opacity .3s;
        cursor: pointer;

        &:hover {
            color: #f6f6f6;
        }

        .et-icon {
            font-size: $iconFontSizeMiddle;
        }

        @include max-screen($padMaxWidth) {
            &.opacity {
                opacity: 0;
                transition: opacity .3s;
            }
        }
    }
}

%preview-toolbar {
    position: absolute;
    left: 0;
    width: 100%;
    height: $headerHeight;
    box-sizing: border-box;

    @include min-screen($laptopMinWidth) {
        & {
            padding: 0 $navWidth;
        }
    }
}

%preview-toolbar-inner {
    display: flex;
    color: #fff;

    @include min-screen($laptopMinWidth) {
        & {
            padding: 0 $spaceSmall;
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
        position: relative;
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
            max-width: initial;
            max-height: initial;
            transition: transform .1s;
            cursor: zoom-out;
        }

        .et-preview__header {
            top: 0;
            @extend %preview-toolbar;
        }

        .et-preview__header-inner {
            @extend %preview-toolbar-inner;
        }

        .et-preview__header .et-user {
            padding: $spaceSmall / 2 $spaceSmall;
        }

        .et-preview__tools {
            bottom: 0;
            @extend %preview-toolbar;
        }

        .et-preview__tools-inner {
            @extend %preview-toolbar-inner;
        }

        .et-preview__tools-inner_left {
            flex: auto;
            display: flex;
        }

        .et-preview__tools-inner_right {
            display: flex;
        }

        .et-preview__tools-info {
            display: block;
            margin-left: $spaceSmall;
            font-size: $subtitleFontSize;
            line-height: $headerHeight;
            text-align: center;
            cursor: default;
        }

        .et-preview__tools-info.button {
            margin: 0 $spaceSmall;
            cursor: pointer;
        }

        .et-preview__tools .et-icon {
            margin-right: $spaceTiny;
            font-size: $iconFontSizeMiddle;
            vertical-align: middle;
        }
    }
}

.et-zoom-tools {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: $headerHeight;
    background: rgba(51, 51, 51, .3);
    color: #fff;

    .et-zoom-tools__inner {
        flex-direction: row-reverse;
        @extend %inner;
    }

    .et-zoom-tools__button {
        display: block;
        width: $headerHeight;
        text-align: center;
        cursor: pointer;

        &:hover {
            background: rgba(51, 51, 51, 0.2);
        }

        .et-icon {
            font-size: $iconFontSizeMiddle;
            line-height: $headerHeight;
        }
    }
}

.et-comment__container {
    color: #fff
}
</style>