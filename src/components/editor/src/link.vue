<template>
    <el-dialog class="et-dialog et-dialog_small"
        :title="$t('editor.insertLink')"
        :visible="show"
        @open="open"
        @close="close"
        @keyup.enter.native="submit">
        <el-form ref="form" :model="data">
            <el-form-item prop="text">
                <el-input ref="text" v-model="data.text"
                    :placeholder="$t('editor.linkText')"
                    :maxlength="1000"
                    :clearable="true">
                    <i slot="prefix" class="el-input__icon et-icon ei-brush"></i>
                </el-input>
            </el-form-item>
            <el-form-item prop="url">
                <el-input ref="url" v-model.trim="data.url"
                    :placeholder="$t('editor.linkUrl')"
                    :maxlength="2000"
                    :clearable="true">
                    <i slot="prefix" class="el-input__icon et-icon ei-link"></i>
                </el-input>
            </el-form-item>
        </el-form>
        <div slot="footer">
            <el-button @click="cancel">
                {{ $t("common.cancelButton") }}
            </el-button>
            <el-button type="primary"
                :disabled="submitDisabled"
                @click="submit">
                {{ $t("common.submitButton") }}
            </el-button>
        </div>
    </el-dialog>
</template>

<script>
import Quill from 'quill';
import Validate from '@/common/validate';
export default {
    name: 'EtEditorLink',
    props: {
        show: {
            type: Boolean,
            default: false
        },
        editor: {
            type: Object
        },
        link: {
            type: Object,
            default () {
                return null;
            }
        }
    },
    data () {
        return {
            selection: null,
            linkRange: null,
            data: {
                text: '',
                url: ''
            },
            submitDisabled: true
        };
    },
    watch: {
        'data.url' () {
            this.submitDisabled = !Validate.test(this.data, {
                url: [{ required: true, validator: 'url' }]
            }).result;
        }
    },
    methods: {
        open () {
            if (this.link) {
                this.linkRange = this.link.range;
                this.$set(this.data, 'text', this.link.text);
                this.$set(this.data, 'url', this.link.url);
            } else {
                this.selection = this.editor.getSelection(true);
                this.selection.length && this.$set(
                    this.data,
                    'text',
                    this.editor.getText(this.selection.index, this.selection.length)
                );
            }
            this.initFocus();
        },
        close () {
            delete this.linkRange;
            this.data = {
                text: '',
                url: ''
            };
            this.$emit('restore-focus');
            this.closeDialog();
        },
        submit () {
            if (this.submitDisabled) return;
            if (this.linkRange) {
                this.editor.deleteText(this.linkRange);
                this.insertLink(this.linkRange.index, this.data.text, this.data.url);
                this.editor.setSelection(
                    this.linkRange.index + this.data.text.length,
                    Quill.sources.SILENT
                );
            } else {
                this.selection.length ?
                    this.editor.format('link', this.data.url) :
                    this.insertLink(this.selection.index, this.data.text, this.data.url);
                this.editor.setSelection(
                    this.selection.index + this.data.text.length,
                    Quill.sources.SILENT
                );
            }
            this.closeDialog();
        },
        initFocus () {
            this.$nextTick(() => {
                this.data.text && !this.data.url ?
                    this.$refs.url.focus() :
                    this.$refs.text.focus();
            });
        },
        insertLink (index, text, url) {
            this.editor.insertText(
                index,
                text || url,
                'link',
                url,
                Quill.sources.USER
            );
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
