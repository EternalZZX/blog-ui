<template>
<transition enter-active-class="animated fadeIn fast">
    <et-card class="et-article-card">
        <a slot="header" class="et-article-card__title"
            @click="handleClick">
            {{ data.title | none }}
        </a>
        <div slot="body" class="et-article-card__body">
            <ul class="et-article-card__content">
                <li class="et-article-card__item">
                    <et-user :user="data.author"
                        :subtitle="data.create_at">
                    </et-user>
                    <p class="et-article-card__overview"
                        v-if="data.overview"
                        @click="handleClick">
                        {{ data.overview }} (<a>{{ $t('article.more') }}</a>)
                    </p>
                </li>
                <li class="et-article-card__item" v-if="data.cover">
                    <div class="et-article-card__cover"
                        :style="coverUrl"
                        @click="handleClick">
                    </div>
                </li>
            </ul>
            <ul class="et-article-card__panel">
                <li class="et-article-card__panel-item"
                    :title="$t('common.readCount')">
                    <i class="et-icon ei-user"></i>
                    {{ $t("common.readCount") }} · {{ data.metadata.read_count | count }}
                </li>
                <li class="et-article-card__panel-item"
                    :title="$t('common.likeCount')">
                    <i class="et-icon ei-appreciate"></i>
                    {{ $t("common.likeCount") }} · {{ data.metadata.like_count | count }}
                </li>
                <li class="et-article-card__panel-item"
                    :title="$t('common.commentCount')">
                    <i class="et-icon ei-message"></i>
                    {{ $t("common.commentCount") }} · {{ data.metadata.comment_count | count }}
                </li>
            </ul>
        </div>
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
                name: 'article',
                params: {
                    uuid: this.data.uuid
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
@import "~static/styles/style-common";

.et-article-card {
    &.et-card {
        margin-bottom: $spaceSmall;
        border: $splitBorder;
        box-shadow: none;
    }

    .et-article-card__title {
        display: block;
        padding: $spaceLarge;
        padding-bottom: $spaceBig;
        font-size: $titleFontSize;
        font-weight: $titleFontWeight;
        line-height: $titleFontSize;
        color: $titleColor;
        cursor: pointer;
        @extend %text-overview;

        &:hover {
            color: $subThemeColor;
        }
    }

    .et-article-card__body {
        padding: $spaceLarge;
        padding-top: 0;

        .et-article-card__content {
            display: flex;
        }

        .et-article-card__item {
            list-style: none;
        }

        .et-article-card__item:first-child {
            flex: auto;
            width: 0;
            padding-right: $spaceSmall;
        }

        .et-article-card__item:last-child {
            padding-right: 0;
        }

        .et-article-card__overview {
            margin: 0;
            margin-top: $spaceTiny;
            font-size: $contentFontSize;
            line-height: 1.5rem;
            cursor: pointer;
        }

        .et-article-card__overview > a {
            color: $submitColor;
        }

        .et-article-card__overview > a:hover {
            color: $submitHoverColor;
        }

        .et-article-card__cover {
            width: 15rem;
            height: 100%;
            background-position: center;
            background-size: contain;
            background-repeat: no-repeat;
            background-color: $commentBackground;
            border-radius: $radiusSmall;
            cursor: pointer;
        }
    }

    .et-article-card__panel {
        display: flex;
        margin-top: $spaceSmall;
        font-size: $descriptionFontSize;
        color: $descriptionColor;
        user-select: none;
        cursor: default;

        .et-article-card__panel-item {
            margin-right: $spaceLarge;
            list-style: none;
        }

        .et-icon {
            font-size: $iconFontSizeSmall;
            vertical-align: middle;
        }
    }

    @include max-screen($phoneMaxWidth) {
        &.et-card {
            border-right: none;
            border-left: none;
        }

        .et-article-card__body {
            .et-article-card__content {
                flex-direction: column;
            }

            .et-article-card__item:first-child {
                width: 100%;
                padding-right: 0;
            }

            .et-article-card__cover {
                width: 100%;
                height: 200px;
                margin-top: $spaceSmall;
            }
        }

        .et-article-card__panel .et-icon {
            display: none;
        }
    }
}
</style>
