<template>
    <div class="et-article-block">
        <div class="et-article-block__header">
            <div class="et-article-block__cover"
                :style="coverUrl"
                v-if="data.cover">
            </div>
            <h4 class="et-article-block__title">{{ data.title }}</h4>
            <et-user :user="data.author"></et-user>
        </div>
        <div class="et-article-block__body">
            <div class="et-article-block__content et-writing ql-editor"
                v-html="data.content">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'EtArticleBlock',
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
    }
};
</script>

<style lang="scss" scoped>
@import "~static/styles/style-common";

.et-article-block {
    margin-bottom: $spaceLarge;
    background-color: $blockBackground;
    border-radius: $radiusSmall;

    .et-article-block__header {
        .et-article-block__cover {
            height: 200px;
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
            background-color: $commentBackground;
            border-radius: $radiusSmall $radiusSmall 0 0;
        }

        .et-article-block__title {
            margin: 0 $spaceLarge;
            padding: $spaceLarge 0;
            font-size: $titleLargeFontSize;
            font-weight: $titleFontWeight;
            line-height: 1.8rem;
            color: $titleColor;
            border-bottom: $splitBorder;
        }

        .et-user {
            margin: $spaceLarge;
        }
    }

    @include max-screen($phoneMaxWidth) {
    }
}
</style>
