<template>
    <div class="et-user" :class="{ 'dark': theme === 'dark' }">
        <img class="et-user__avatar" :src="avatar" :title="user.nick">
        <div class="et-user__info">
            <span class="et-user__nick" :title="user.nick">
                {{ user.nick | none }}
            </span>
            <span v-if="subtitle"
                class="et-user__remark"
                :title="subtitle">
                <template v-if="type === 'time'">{{ subtitle | time }}</template>
                <template v-else-if="type === 'date'">{{ subtitle | date }}</template>
                <template v-else>{{ subtitle | none }}</template>
            </span>
            <span v-else class="et-user__remark"
                :title="user.remark">
                {{ user.remark | none }}
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'EtUser',
    props: {
        user: {
            type: Object,
            default () {
                return {
                    avatar: null,
                    nick: '',
                    remark: ''
                };
            },
            required: true
        },
        subtitle: {
            type: String,
            default: null
        },
        type: {
            type: String,
            default: 'time',
            validator (val) {
                return [
                    'time',
                    'date',
                    'string'
                ].indexOf(val) !== -1;
            }
        },
        theme: {
            type: String,
            default: 'light',
            validator (val) {
                return [
                    'dark',
                    'light'
                ].indexOf(val) !== -1;
            }
        }
    },
    computed: {
        avatar () {
            const defaultAvator = '/static/images/et-avatar.png';
            return this.user.avatar ? this.user.avatar : defaultAvator;
        }
    }
};
</script>

<style lang="scss" scoped>
@import '~static/styles/style-common';

.et-user {
    display: inline-flex;
    width: $userWidth;

    @include max-screen($phoneMaxWidth) {
        & {
            width: 8rem;
        }
    }

    .et-user__avatar {
        width: $userHeight;
        height: $userHeight;
        border-radius: 50%;
        cursor: pointer;
    }

    .et-user__info {
        flex: auto;
        width: 0;
        padding: 0 $spaceSmall;
    }

    .et-user__nick {
        display: block;
        max-width: 100%;
        font-size: $subtitleFontSize;
        font-weight: $titleFontWeight;
        line-height: $userHeight / 2;
        color: $contentColor;
        cursor: pointer;
        @extend %text-overview;

        &:hover {
            color: $subThemeColor;
        }
    }

    .et-user__remark {
        display: block;
        width: 100%;
        color: $descriptionColor;
        font-size: $descriptionFontSize;
        line-height: $userHeight / 2;
        @extend %text-overview;
    }

    &.dark {
        .et-user__nick {
            color: #fff;
        }

        .et-user__nick:hover {
            color: $subThemeColor;
        }

        .et-user__remark {
            color: #b9b9b9;
        }
    }
}
</style>
