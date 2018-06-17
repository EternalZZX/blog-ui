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
                {{ $t("common.cancel") }}
            </el-button>
            <el-button type="primary" @click="submit" :disabled="submitDisabled">
                {{ $t("common.submit") }}
            </el-button>
        </div>
    </el-dialog>
</template>

<script>
import validate from '@/common/validate';
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
            this.submitDisabled = !validate(this.data, {
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
                this.selection = this.editor.getSelection();
                !this.selection && (this.selection = {
                    index: this.editor.getLength() - 1,
                    length: 0
                });
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
            this.restoreFocus();
            this.closeDialog();
        },
        submit () {
            if (this.submitDisabled) return;
            if (this.linkRange) {
                this.editor.deleteText(this.linkRange);
                this.insertLink(this.linkRange.index, this.data.text, this.data.url);
            } else {
                this.selection.length ?
                    this.editor.format('link', this.data.url) :
                    this.insertLink(this.selection.index, this.data.text, this.data.url);
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
        restoreFocus () {
            const scrollTop = this.editor.scrollingContainer.scrollTop;
            this.editor.focus();
            this.editor.scrollingContainer.scrollTop = scrollTop;
        },
        insertLink (index, text, url) {
            this.editor.insertText(
                index,
                text || url,
                'link',
                url
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