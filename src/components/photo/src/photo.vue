<template>
<transition enter-active-class="animated fadeIn fast">
    <div class="et-photo__wrapper"
        :class="{
            'et-photo__wrapper_albums': type === 'album',
            'et-photo__wrapper_checked': type === 'photo' && data.checked
        }">
        <div ref="photo"
            class="et-photo"
            :class="{'et-photo_selectable': selectable}"
            :style="coverUrl"
            v-on="$listeners">
            <ul class="et-photo__body"
                :class="{'et-photo__body_fixed': selectable}">
                <li class="et-photo__info">
                    <span :title="data[property[type].title]">
                        {{ data[property[type].title] }}
                    </span>
                    <span v-if="!selectable"
                        class="et-photo__info_count"
                        :title="data.metadata.like_count">
                        <i class="et-icon ei-like"></i>
                        {{ data.metadata.like_count | count }}
                    </span>
                </li>
                <li v-if="!selectable" class="et-photo__info">
                    <span>{{ data.create_at | date }}</span>
                    <span class="et-photo__info_count"
                        :title="data.metadata.comment_count">
                        <i class="et-icon ei-message"></i>
                        {{ data.metadata.comment_count | count }}
                    </span>
                </li>
            </ul>
        </div>
    </div>
</transition>
</template>

<script>
export default {
    name: 'EtPhoto',
    props: {
        data: {
            type: Object,
            required: true
        },
        type: {
            type: String,
            default: 'photo',
            validator (val) {
                return [
                    'photo',
                    'album'
                ].indexOf(val) !== -1;
            }
        },
        selectable: {
            type: Boolean,
            default: false
        },
        hash: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            property: {
                photo: {
                    title: 'description',
                    cover: 'image_small'
                },
                album: {
                    title: 'name',
                    cover: 'cover'
                }
            }
        };
    },
    computed: {
        coverUrl () {
            const url = this.data[this.property[this.type].cover],
                backgroundImage = this.hash ?
                    `url(${url}?hash=${this.hash})` :
                    `url(${url})`;
            return url ? { backgroundImage } : null;
        }
    }
};
</script>

<style lang="scss" scoped>
@import '~static/styles/style-common';

%album-border {
    content: '';
    position: absolute;
    top: $spaceMiddle;
    left: $spaceMiddle;
    z-index: -1;
    background-color: #efefef;
    border: $splitBorder;
    border-radius: $radiusTiny;
    width: calc(100% - 1.2rem);
    height: calc(100% - 1.2rem);
    box-shadow: $cardShadow;
}

.et-photo__wrapper {
    position: relative;
    z-index: 0;
    width: 100%;
    height: 0;
    padding: $spaceMiddle;
    padding-bottom: calc(100% - .6rem);
    box-sizing: border-box;

    &.et-photo__wrapper_albums:before {
        transform: rotate(4.2deg);
        @extend %album-border;
    }

    &.et-photo__wrapper_albums:after {
        transform: rotate(1.2deg);
        @extend %album-border;
    }

    &.et-photo__wrapper_albums .et-photo {
        box-shadow: $cardShadow;
    }

    &.et-photo__wrapper_checked {
        &:before {
            content: '';
            display: block;
            position: absolute;
            top: .6rem;
            right: .6rem;
            z-index: 1;
            width: 0;
            height: 0;
            border: 1rem solid $themeColor;
            border-bottom-color: transparent;
            border-left-color: transparent;
        }

        &:after {
            content: '\e721';
            position: absolute;
            z-index: 1;
            top: .6rem;
            right: .8rem;
            font-size: .9375rem;
            font-family: 'et-icon';
            color: $darkContentColor;
        }
    }
}

.et-photo {
    position: absolute;
    top: $spaceMiddle;
    right: $spaceMiddle;
    bottom: $spaceMiddle;
    left: $spaceMiddle;
    border: $spaceSmall solid $blockBackground;
    border-radius: .2rem;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50%;
    box-shadow: $deepenShadow;
    overflow: hidden;
    transition: border-color .3s;
    cursor: pointer;

    .et-photo__body {
        position: absolute;
        bottom: -1.5rem;
        left: 0;
        height: 3.5rem;
        width: 100%;
        box-sizing: border-box;
        padding: 0 .5rem;
        padding-top: .5rem;
        margin: 0;
        color: #fff;
        background: linear-gradient(
            rgba(51, 51, 51, 0),
            rgba(51, 51, 51, 0.5),
            rgba(51, 51, 51, 0.7),
            rgba(51, 51, 51, 0.7)
        );
        transition: bottom .3s;

        @at-root .et-photo:hover .et-photo__body {
            bottom: 0;
        }

        .et-photo__info {
            display: flex;
            height: 1.5rem;
            line-height: 1.5rem;
        }

        .et-photo__info > span {
            flex: auto;
            font-size: $subtitleFontSize;
            font-weight: $subtitleFontWeight;
            @extend %text-overview;
        }

        .et-photo__info > span.et-photo__info_count {
            flex: none;
        }

        .et-photo__info > span > .et-icon {
            font-size: $iconFontSizeSmall;
            margin-right: .1rem;
        }

        &.et-photo__body_fixed {
            bottom: -1.5rem;
        }
    }

    &.et-photo_selectable:hover {
        border-color: $dropdownHoverBackground;
        transition: border-color .3s;
    }
}
</style>
