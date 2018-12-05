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
                    <p class="et-article-card__overview" v-if="data.overview">
                        {{ data.overview }}
                    </p>
                </li>
                <li class="et-article-card__item" v-if="data.cover">
                    <div class="et-article-card__cover" :style="coverUrl"></div>
                </li>
            </ul>
            <div class="et-article-card__panel"></div>
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
    &.et-card {
        margin-bottom: $spaceSmall;
        border: $splitBorder;
        box-shadow: none;
    }

    .et-article-card__title {
        display: block;
        padding: $spaceLarge;
        padding-bottom: 0;
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
        padding-top: $spaceSmall;

        .et-article-card__content {
            display: flex;
        }

        .et-article-card__item {
            list-style: none;
        }

        .et-article-card__item:first-child {
            flex: auto;
            width: 0;
        }

        .et-article-card__overview {
            margin: 0;
            margin-top: $spaceTiny;
            font-size: $contentFontSize;
            line-height: 1.5rem;
        }

        .et-article-card__cover {
            width: 15rem;
            height: 100%;
            background-position: center;
            background-size: contain;
            background-repeat: no-repeat;
            border-radius: $radiusSmall;
        }
    }
}
</style>
