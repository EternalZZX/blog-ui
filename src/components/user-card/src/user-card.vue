<template>
    <div class="et-user">
        <img class="et-user__avatar" :src="user.avatar">
        <div class="et-user__info">
            <span class="et-user__nick">
                {{ user.nick }}
            </span>
            <span class="et-user__remark">
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
    }
};
</script>

<style lang="scss" scoped>
@import '~static/styles/style-common';

.et-user {
    display: flex;
    width: 10rem;

    .et-user__avatar {
        width: 2.5rem;
        height: 2.5rem;
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
        width: 100%;
        font-size: $subtitleFontSize;
        color: $subtitleColor;
        cursor: pointer;
        @extend %text-overview;
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
