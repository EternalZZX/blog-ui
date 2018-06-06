<template>
    <div>
        <quill-editor ref="editor"
            v-model="content"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @ready="onEditorReady($event)">
            <div id="toolbar" slot="toolbar">
                <span class="ql-formats">
                    <button class="et-editor__button"
                        :class="{ 'active': format.bold }"
                        @click="updateFormat('bold')">
                        <i class="et-icon ei-format-bold"></i>
                    </button>
                    <button class="et-editor__button"
                        :class="{ 'active': format.italic }"
                        @click="updateFormat('italic')">
                        <i class="et-icon ei-format-italic"></i>
                    </button>
                    <button class="et-editor__button"
                        :class="{ 'active': format.header }"
                        @click="updateFormat('header', 2)">
                        <i class="et-icon ei-format-title"></i>
                    </button>
                    <button class="et-editor__button"
                        :class="{ 'active': format.blockquote }"
                        @click="updateFormat('blockquote')">
                        <i class="et-icon ei-format-quote"></i>
                    </button>
                    <button class="et-editor__button"
                        :class="{ 'active': format['code-block'] }"
                        @click="updateFormat('code-block')">
                        <i class="et-icon ei-format-code"></i>
                    </button>
                    <button class="et-editor__button"
                        :class="{ 'active': format['list'] === 'ordered' }"
                        @click="updateFormat('list', 'ordered')">
                        <i class="et-icon ei-format-list-numbers"></i>
                    </button>
                    <button class="et-editor__button"
                        :class="{ 'active': format['list'] === 'bullet' }"
                        @click="updateFormat('list', 'bullet')">
                        <i class="et-icon ei-format-list-bulleted"></i>
                    </button>
                    <button class="et-editor__button"
                        @click="updateFormat('indent', -1)">
                        <i class="et-icon ei-format-indent-decrease"></i>
                    </button>
                    <button class="et-editor__button"
                        @click="updateFormat('indent', 1)">
                        <i class="et-icon ei-format-indent-increase"></i>
                    </button>
                    <button class="et-editor__button"
                        @click="insertLinkShow = true">
                        <i class="et-icon ei-link"></i>
                    </button>
                </span>
            </div>
        </quill-editor>

        <et-dialog
            :show.sync="insertLinkShow"
            :title="$t('editor.insertLink')"
            type="small">
        </et-dialog>
    </div>
</template>

<script>
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import { quillEditor } from 'vue-quill-editor';
export default {
    name: 'EtEditor',
    components: { quillEditor },
    data () {
        return {
            editor: null,
            format: {},
            content: '',
            editorOption: {
                formats: ['bold', 'italic', 'header', 'list', 'indent',
                    'align', 'blockquote', 'code-block', 'link', 'image'],
                modules: {
                    toolbar: '#toolbar'
                },
                placeholder: '...'
                // modules: {
                //     toolbar: [
                //         ['bold', 'italic'],
                //         ['blockquote', 'code-block'],
                //         [{ 'header': 2 }],
                //         [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                //         [{ 'indent': '-1' }, { 'indent': '+1' }],
                //         [{ 'align': [] }],
                //         ['clean'],
                //         ['link', 'image']
                //     ]
                // }
            },
            insertLinkShow: false
        };
    },
    mounted () {
        this.editor = this.$refs.editor.quill;
        this.editor.getModule('toolbar').addHandler('image', this.imgHandler);
        this.editor.on('editor-change', (range, oldRange, source) => {
            this.getFormat();
            console.warn(this.format);
        });
    },
    methods: {
        imgHandler (event) {
            console.warn('imgHandler!', event);
        },
        onEditorBlur (editor) {
            // console.warn('editor blur!', editor);
        },
        onEditorFocus (editor) {
            // console.warn('editor focus!', editor);
        },
        onEditorReady (editor) {
            // console.warn('editor ready!', editor);
        },
        insertLink () {

        },
        updateFormat (type, value = true) {
            let formatValue;
            if (type === 'indent') {
                formatValue = this.format[type] ? this.format[type] : 0;
                formatValue += value;
            } else {
                formatValue = !(this.format[type] === value);
                formatValue && (formatValue = value);
            }
            this.editor.format(type, formatValue);
            this.getFormat();
        },
        getFormat () {
            this.format = this.editor.getFormat();
        }
    }
};
</script>
