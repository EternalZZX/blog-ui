<template>
<transition enter-active-class="animated fadeIn fast">
    <et-card class="et-section-card"
        :class="{ 'et-section-card_disabled': !data.read_permission }">
        <div slot="header" class="et-section-card__cover"
            :style="coverUrl"
            @click="handleClick">
        </div>
        <template slot="body">
            <ul class="et-section-card__panel">
                <li class="et-section-card__panel-item">
                    <a class="et-section-card__title" @click="handleClick">
                        {{ data.nick | none }}
                    </a>
                    <div class="et-section-card__button-group">
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
                            <button class="et-section-card__button"
                                slot="reference"
                                :title="$t('section.card.detail')">
                                <i class="et-icon ei-service"></i>
                            </button>
                        </el-popover>
                        <button class="et-section-card__button"
                            :title="$t('common.menu')"
                            @click="setting">
                            <i class="et-icon ei-setup"></i>
                        </button>
                    </div>
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
    },
    methods: {
        handleClick () {
            this.$router.push({
                name: 'sectionDetail',
                params: {
                    name: this.data.name
                }
            });
        },
        setting () {
            this.$router.push({
                name: 'sectionSetting',
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

.et-section-card {
    /deep/ .et-section-card__cover {
        height: 160px;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: 50%;
        transition: .5s;
        cursor: pointer;

        @include min-screen($laptopMinWidth) {
            border-radius: $radiusTiny $radiusTiny 0 0;
        }

        @at-root .et-section-card.et-section-card_disabled .et-section-card__cover {
            cursor: not-allowed;
        }
    }

    &:hover /deep/ .et-section-card__cover {
        background-position-y: 55%;
    }

    /deep/ .et-card__body .et-section-card__panel {
        padding: $spaceSmall $spaceLarge;

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
        line-height: 1.5rem;
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
