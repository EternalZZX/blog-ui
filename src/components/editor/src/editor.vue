<template>
    <quill-editor ref="editor"
        v-model="content"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)">
        <div id="toolbar" slot="toolbar">
            <span class="ql-formats">
                <button type="button" class="ql-bold"></button>
                <button type="button" class="ql-italic"></button>
                <button type="button" class="ql-blockquote"></button>
                <button type="button" class="ql-code-block"></button>
                <button type="button" class="ql-header" value="2"></button>
                <button @click="boldTrigger"><i class="et-icon ei-home"></i></button>
            </span>
        </div>
    </quill-editor>
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
            }
        };
    },
    // computed: {
    //     editor () {
    //         return this.$refs.editor.quill;
    //     }
    // },
    mounted () {
        this.editor = this.$refs.editor.quill;
        this.editor.getModule('toolbar').addHandler('image', this.imgHandler);
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
        boldTrigger () {
            this.editor.format('bold', true);
        }
    }
};
</script>
