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
                        @click="linkHandler">
                        <i class="et-icon ei-link"></i>
                    </button>
                    <button class="et-editor__button"
                        @click="imageHandler">
                        <i class="et-icon ei-picture"></i>
                    </button>
                </span>
            </div>
        </quill-editor>

        <et-editor-link
            :show.sync="insertLinkShow"
            :editor="editor"
            :link="link">
        </et-editor-link>

        <et-editor-image
            :show.sync="insertImageShow"
            :editor="editor">
        </et-editor-image>
    </div>
</template>

<script>
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import Quill from 'quill';
import EtTheme, { Range } from '../themes/theme';
import { quillEditor } from 'vue-quill-editor';
import EtEditorLink from './link';
import EtEditorImage from './image';
Quill.register('themes/et-theme', EtTheme);
const LinkBlot = Quill.import('formats/link');
export default {
    name: 'EtEditor',
    components: {
        quillEditor,
        EtEditorLink,
        EtEditorImage
    },
    data () {
        return {
            editor: null,
            content: '',
            format: {},
            editorOption: {
                formats: ['bold', 'italic', 'header', 'list', 'indent',
                    'align', 'blockquote', 'code-block', 'link', 'image'],
                modules: {
                    toolbar: {
                        container: '#toolbar',
                        handlers: {
                            link: this.linkHandler,
                            image: this.imageHandler
                        }
                    }
                },
                theme: 'et-theme',
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
            link: null,
            insertLinkShow: false,
            insertImageShow: false
        };
    },
    mounted () {
        this.editor = this.$refs.editor.quill;
        this.editor.on('editor-change', (eventName, ...args) => {
            this.editor.hasFocus() && this.getFormat();
        });
    },
    methods: {
        onEditorBlur (editor) {
            // console.warn('editor blur!', editor);
        },
        onEditorFocus (editor) {
            // console.warn('editor focus!', editor);
        },
        onEditorReady (editor) {
            // console.warn('editor ready!', editor);
        },
        linkHandler (value, linkBlot = null, linkRange = null) {
            let blot = linkBlot,
                range = linkRange;
            if (!blot) {
                let offset = null;
                const selection = this.editor.getSelection();
                [blot, offset] = selection ?
                    this.editor.scroll.descendant(LinkBlot, selection.index) :
                    [null, null];
                blot && (range = new Range(selection.index - offset, blot.length()));
            }
            this.link = blot ? {
                range,
                text: blot.children.head.text,
                url: LinkBlot.formats(blot.domNode)
            } : null;
            this.insertLinkShow = true;
        },
        imageHandler (value) {
            this.insertImageShow = true;
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
