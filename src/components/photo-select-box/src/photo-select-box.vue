<template>
    <div class="et-photo-select"
        :class="{
            'et-photo-select_large': size === 'large',
            'et-photo-select_disabled': disabled
        }"
        @click="handleClick">
        <div class="et-photo-select__image"
            :style="imageUrl"
            v-if="data">
        </div>
        <template v-else>
            <i class="et-icon" :class="icon"></i>
            <slot></slot>
        </template>
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
        },
        icon: {
            type: String,
            default: 'ei-plus'
        },
        size: {
            type: String,
            default: 'small',
            validator (val) {
                return [
                    'small',
                    'large'
                ].indexOf(val) !== -1;
            }
        }
    },
    computed: {
        imageUrl () {
            const backgroundImage = `url(${
                this.size === 'large' ? this.data.image_middle : this.data.image_small
            })`;
            return this.data ? { backgroundImage } : null;
        }
    },
    methods: {
        handleClick () {
            !this.disabled && this.$emit('click');
        }
    }
};
</script>
