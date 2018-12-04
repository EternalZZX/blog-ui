<template>
    <div class="et-photo-select"
        :class="{'et-photo-select_disabled': disabled}"
        @click="handleClick">
        <img :src="data.image_small" v-if="data">
        <i class="et-icon ei-plus" v-else></i>
    </div>
</template>

<script>
export default {
    name: 'EtPhotoSelectBox',
    props: {
        data: {
            type: Object,
            default () {
                return null;
            }
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        handleClick () {
            !this.disabled && this.$emit('click');
        }
    }
};
</script>
