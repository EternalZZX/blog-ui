<template>
    <div class="et-user">
        <img class="et-user__avatar" :src="avatar" :title="user.nick">
        <div class="et-user__info">
            <span class="et-user__nick" :title="user.nick">
                {{ user.nick }}
            </span>
            <span class="et-user__remark" :title="user.remark">
                {{ user.remark | none }}
            </span>
        </div>
    </div>
</template>

<script>
import Utils from '@/common/utils';
export default {
    name: 'EtUser',
    props: {
        user: {
            type: Object,
            default () {
                return {
                    avatar: null,
                    nick: '-',
                    remark: ''
                };
            },
            required: true
        }
    },
    filters: {
        'none': value => Utils.formatNone(value)
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
        display: inline-block;
        max-width: 100%;
        font-size: $subtitleFontSize;
        color: $subtitleColor;
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
        @extend %text-overview;
    }
}
</style>
