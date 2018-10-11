<template>
<transition enter-active-class="animated jackInTheBox fast">
    <div class="et-photo__wrapper"
        :class="{
            'et-photo__wrapper_albums': type === 'album',
            'et-photo__wrapper_deletable': deletable
        }">
        <div ref="photo"
            class="et-photo"
            :class="{'et-photo_selectable': selectable}"
            :style="coverUrl"
            v-on="$listeners">
            <ul class="et-photo__body"
                :class="{'et-photo__body_fixed': selectable}"
                @click.stop>
                <li class="et-photo__info">
                    <span :title="data[property[type].title]">
                        {{ data[property[type].title] }}
                    </span>
                    <span v-if="!selectable"
                        class="et-photo__info_button"
                        :title="data.metadata.like_count">
                        <i class="et-icon"
                            :class="data.is_like_user === LIKE_TYPE.LIKE ?
                            'ei-like-fill' : 'ei-like'"
                            @click="eventHandle('upvote')">
                        </i>
                        {{ data.metadata.like_count | count }}
                    </span>
                    <span v-if="editable"
                        class="et-photo__info_button"
                        :title="$t('common.edit')">
                        <i class="et-icon ei-edit"
                            @click="eventHandle('edit')">
                        </i>
                    </span>
                </li>
                <li v-if="!selectable" class="et-photo__info">
                    <span>{{ data.create_at | date }}</span>
                    <span class="et-photo__info_button"
                        :title="data.metadata.comment_count">
                        <i class="et-icon ei-message"
                            @click="eventHandle('comment')">
                        </i>
                        {{ data.metadata.comment_count | count }}
                    </span>
                </li>
            </ul>
        </div>
        <i v-if="selectable && data.checked"
            class="et-photo__checked">
        </i>
        <i v-if="deletable"
            class="et-photo__delete et-icon ei-round-close-fill"
            @click="eventHandle('delete')">
        </i>
    </div>
</transition>
</template>

<script>
import { AlbumApi } from '@/common/api/albums';
import { PhotoApi } from '@/common/api/photos';
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
        deletable: {
            type: Boolean,
            default: false
        },
        editable: {
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
        },
        LIKE_TYPE () {
            return this.type === 'album' ?
                AlbumApi.LIKE_TYPE : PhotoApi.LIKE_TYPE;
        }
    },
    methods: {
        eventHandle (command) {
            this.$emit(command, this.data);
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

    .et-photo__checked {
        position: absolute;
        top: 0;
        right: 0;

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
            top: .66rem;
            right: .85rem;
            font-size: $iconFontSizeTiny;
            font-family: 'et-icon';
            color: $darkContentColor;
        }
    }

    .et-photo__delete {
        position: absolute;
        top: 0;
        left: 0;
        font-size: $iconFontSizeMiddle;
        color: $descriptionColor;
        cursor: pointer;

        &:hover {
            color: $darkHoverColor;
        }
    }

    &.et-photo__wrapper_deletable {
        animation: swing .25s infinite;
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
        color: $darkContentColor;
        background: linear-gradient(
            rgba(51, 51, 51, 0),
            rgba(51, 51, 51, 0.5),
            rgba(51, 51, 51, 0.7),
            rgba(51, 51, 51, 0.7)
        );
        transition: bottom .3s;
        cursor: default;

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

        .et-photo__info > span.et-photo__info_button {
            flex: none;
        }

        .et-photo__info > span > .et-icon {
            display: inline-block;
            height: 1.5rem;
            line-height: 1.5rem;
            font-size: $iconFontSizeSmall;
            cursor: pointer;
        }

        .et-photo__info > span.et-photo__info_button:hover > .et-icon {
            color: $darkHoverColor;
        }

        &.et-photo__body_fixed {
            bottom: -1.5rem;
        }
    }

    &.et-photo_selectable:hover {
        border-color: $headerHoverBackground;
        transition: border-color .3s;
    }
}

@keyframes swing {
    from {
        transform: rotate3d(0, 0, 1, -1deg);
    }

    50% {
        transform: rotate3d(0, 0, 1, 1deg);
    }

    to {
        transform: rotate3d(0, 0, 1, -1deg);
    }
}
</style>
