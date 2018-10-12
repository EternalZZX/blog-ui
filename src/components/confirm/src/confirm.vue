<template>
    <el-dialog class="et-dialog et-dialog_small"
        :title="$t('common.notice')"
        :append-to-body="true"
        :visible="show"
        top="3%"
        @close="close">
        <span class="et-dialog__message">
            {{ message || $t('common.confirmMessage') }}
        </span>
        <div slot="footer">
            <template v-if="type === 'confirm'">
                <el-button @click="cancel">
                    {{ $t("common.cancelButton") }}
                </el-button>
                <el-button type="primary"
                    @click="confirm">
                    {{ $t("common.confirmButton") }}
                </el-button>
            </template>
            <el-button v-else @click="cancel">
                {{ $t("common.confirmButton") }}
            </el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
    name: 'EtConfirm',
    props: {
        show: {
            type: Boolean,
            default: false
        },
        message: {
            type: String,
            default: ''
        },
        data: {
            default () {
                return {};
            }
        },
        type: {
            type: String,
            default: 'confirm',
            validator (val) {
                return [
                    'confirm',
                    'alert'
                ].indexOf(val) !== -1;
            }
        }
    },
    methods: {
        close () {
            this.closeDialog();
        },
        confirm () {
            this.$emit('confirm', this.data);
            this.closeDialog();
        },
        cancel () {
            this.closeDialog();
        },
        closeDialog () {
            this.$emit('update:show', false);
        }
    }
};
</script>

<style lang="scss" scoped>
@import "~static/styles/style-common";

.et-dialog__message {
    font-size: $contentFontSize;
    color: $descriptionColor;
}
</style>
