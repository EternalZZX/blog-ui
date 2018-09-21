<template>
    <el-dialog class="et-dialog"
        :title="$t('photo.create.title')"
        :visible="show"
        @open="open"
        @close="close">
        test
        <div slot="footer">
            <el-button @click="cancel">{{ $t("common.cancelButton") }}</el-button>
            <el-button type="primary" @click="submit">{{ $t("common.submitButton") }}</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
    name: 'EtPhotoAdd',
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        open () {
            console.warn('open');
        },
        close () {
            this.closeDialog();
        },
        submit () {
            console.warn('submit');
            this.closeDialog();
        },
        cancel () {
            console.warn('canael');
            this.closeDialog();
        },
        closeDialog () {
            this.$emit('update:show', false);
        }
    }
};
</script>
