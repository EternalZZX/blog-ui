<template>
    <et-card class="et-section-card"
        :class="{ 'et-section-card_disabled': !data.read_permission }">
        <div slot="header" class="et-section-card__cover"
            :style="coverUrl">
        </div>
        <template slot="body">
            <div class="et-section-card__body_left">
                <a class="et-section-card__title">
                    {{ data.nick | none }}
                </a>
                <span class="et-section-card__description">
                    {{ data.description | none }}
                </span>
            </div>
            <div class="et-section-card__body_right">
                <span>
                    <i v-if="!data.read_permission"
                        class="et-icon ei-lock"
                        :title="$t('section.card.noPermission')">
                    </i>
                    <el-popover placement="left" trigger="click">
                        <div class="et-section-card__popover">
                            <el-form label-position="top">
                                <el-form-item :label="$t('section.card.owner')">
                                    <et-user :user="data.owner"></et-user>
                                </el-form-item>
                                <el-form-item v-if="data.moderators.length"
                                    :label="$t('section.card.moderator')">
                                    <et-user v-for="moderator in data.moderators"
                                        :key="moderator.uuid"
                                        :user="moderator">
                                    </et-user>
                                </el-form-item>
                                <el-form-item v-if="data.assistants.length"
                                    :label="$t('section.card.assistant')">
                                    <et-user v-for="assistant in data.assistants"
                                        :key="assistant.uuid"
                                        :user="assistant">
                                    </et-user>
                                </el-form-item>
                            </el-form>
                        </div>
                        <i class="et-section-card__popover_button et-icon ei-group"
                            slot="reference"
                            :title="$t('section.card.detail')">
                        </i>
                    </el-popover>
                </span>
                <span>
                    {{ data.create_at | date }}
                </span>
            </div>
        </template>
    </et-card>
</template>

<script>
export default {
    name: 'EtSectionCard',
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

.et-section-card {
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
        background-position-y: 60%;
    }

    /deep/ .et-card__body {
        display: flex;

        .et-section-card__body_left {
            flex: auto;
            width: 0;
            padding: $spaceSmall;
        }

        .et-section-card__body_right {
            display: flex;
            flex-direction: column;
            padding: $spaceSmall;
        }

        .et-section-card__body_right > span {
            display: block;
            text-align: right;
            font-size: $descriptionFontSize;
            color: $descriptionColor;
            user-select: none;
        }

        .et-section-card__body_right > span:first-child {
            flex: auto;
        }

        .et-section-card__body_right i {
            font-size: $iconFontSizeSmall;
        }
    }

    .et-section-card__title {
        display: inline-block;
        max-width: 100%;
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
        display: block;
        width: 100%;
        font-size: $descriptionFontSize;
        color: $descriptionColor;
        user-select: none;
        @extend %text-overview;
    }

    @at-root .et-section-card__popover {
        max-width: $userWidth * 3;

        /deep/ .el-form .el-form-item .el-form-item__label {
            font-size: $descriptionFontSize;
            line-height: $descriptionFontSize;
            color: $descriptionColor;
        }
    }

    .et-section-card__popover_button {
        font-size: $iconFontSizeMiddle;
        cursor: pointer;

        &:hover {
            color: $subThemeColor;
        }
    }
}
</style>
