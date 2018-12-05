<template>
<transition enter-active-class="animated fadeIn fast">
    <et-card class="et-article-card">
        <div slot="header" class="et-section-card__cover"
            :style="coverUrl"
            @click="handleClick">
        </div>
        <template slot="body">
            <ul class="et-section-card__panel">
                <li class="et-section-card__panel-item">
                    <a class="et-section-card__title" @click="handleClick">
                        {{ data.title | none }}
                    </a>
                </li>
                <li class="et-section-card__panel-item">
                    <span class="et-section-card__description">
                        {{ data.description | none }}
                    </span>
                    <span>
                        {{ data.create_at | date }}
                    </span>
                </li>
            </ul>
        </template>
    </et-card>
</transition>
</template>

<script>
export default {
    name: 'EtArticleCard',
    props: {
        data: {
            type: Object,
            default () {
                return {};
            }
        },
        hash: {
            type: String,
            default: ''
        }
    },
    computed: {
        coverUrl () {
            const backgroundImage = this.hash ?
                `url(${this.data.cover}?hash=${this.hash})` :
                `url(${this.data.cover})`;
            return this.data.cover ? { backgroundImage } : null;
        }
    },
    methods: {
        handleClick () {
            this.$router.push({
                name: 'sectionDetail',
                params: {
                    name: this.data.name
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
@import "~static/styles/style-common";

.et-article-card {
    /deep/ .et-section-card__cover {
        height: 160px;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: 50%;
        transition: .5s;
        cursor: pointer;

        @include min-screen($laptopMinWidth) {
            & {
                border-radius: $radiusTiny $radiusTiny 0 0;
            }
        }

        @at-root .et-section-card.et-section-card_disabled .et-section-card__cover {
            cursor: not-allowed;
        }
    }

    &:hover /deep/ .et-section-card__cover {
        background-position-y: 55%;
    }

    /deep/ .et-card__body .et-section-card__panel {
        padding: $spaceSmall;

        .et-section-card__panel-item {
            display: flex;
            font-size: $descriptionFontSize;
            color: $descriptionColor;
            user-select: none;
        }
    }

    .et-section-card__title {
        flex: auto;
        display: block;
        width: 0;
        font-size: $titleFontSize;
        font-weight: $titleFontWeight;
        line-height: $titleFontSize;
        color: $titleColor;
        user-select: none;
        cursor: pointer;
        @extend %text-overview;

        @at-root .et-section-card.et-section-card_disabled .et-section-card__title {
            cursor: not-allowed;
        }

        @at-root .et-section-card:not(.et-section-card_disabled) .et-section-card__title:hover {
            color: $subThemeColor;
        }
    }

    .et-section-card__description {
        flex: auto;
        display: block;
        width: 0;
        font-size: $descriptionFontSize;
        color: $descriptionColor;
        user-select: none;
        @extend %text-overview;
    }

    .et-section-card__button-group {
        display: flex;
        justify-content: flex-end;
        align-items: center;

        .et-icon {
            display: block;
            font-size: $iconFontSizeSmall;
        }

        .et-section-card__button {
            margin-left: $spaceTiny;
            font-size: $iconFontSizeMiddle;
            color: $descriptionColor;
            cursor: pointer;

            &:hover {
                color: $subThemeColor;
            }
        }
    }

    @at-root .et-section-card__popover {
        max-width: $userWidth * 3;

        /deep/ .el-form .el-form-item .el-form-item__label {
            font-size: $descriptionFontSize;
            line-height: $descriptionFontSize;
            color: $descriptionColor;
        }
    }
}
</style>
