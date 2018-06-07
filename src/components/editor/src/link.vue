<template>
    <el-dialog class="et-dialog et-dialog_small"
        :title="$t('editor.insertLink')"
        :visible="show"
        @open="open"
        @close="close">
        <el-form ref="form" :model="data">
            <el-form-item prop="text">
                <el-input v-model="data.text"
                    :placeholder="$t('editor.linkText')"
                    :maxlength="1000"
                    :clearable="true">
                    <i slot="prefix" class="el-input__icon et-icon ei-brush"></i>
                </el-input>
            </el-form-item>
            <el-form-item prop="url">
                <el-input v-model.trim="data.url"
                    :placeholder="$t('editor.linkUrl')"
                    :maxlength="2000"
                    :clearable="true">
                    <i slot="prefix" class="el-input__icon et-icon ei-link"></i>
                </el-input>
            </el-form-item>
        </el-form>
        <div slot="footer">
            <el-button @click="cancel">{{ $t("common.cancel") }}</el-button>
            <el-button type="primary" @click="submit">{{ $t("common.submit") }}</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
    name: 'EtEditorLink',
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            data: {
                text: '',
                url: ''
            }
        };
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
