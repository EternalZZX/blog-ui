<template>
    <div class="et-editor"
        :class="{'et-editor_simple': type === 'simple'}">
        <quill-editor ref="editor"
            v-model="content"
            :options="editorOption">
            <div :id="toolbarId" slot="toolbar" v-if="type === 'normal'">
                <transition enter-active-class="animated flipInX">
                    <div class="et-editor__toolbar" v-show="toolbarMainShow">
                        <div class="et-editor__button-group">
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
                                :class="{ 'active': format['list'] === 'ordered' }"
                                @click="updateFormat('list', 'ordered')">
                                <i class="et-icon ei-format-list-numbers"></i>
                            </button>
                            <button class="et-editor__button"
                                :class="{ 'active': format['list'] === 'bullet' }"
                                @click="updateFormat('list', 'bullet')">
                                <i class="et-icon ei-format-list-bulleted"></i>
                            </button>
                        </div>
                        <div class="et-editor__button-group">
                            <button class="et-editor__button"
                                @click="linkHandler">
                                <i class="et-icon ei-link"></i>
                            </button>
                            <button class="et-editor__button"
                                @click="imageHandler">
                                <i class="et-icon ei-picture"></i>
                            </button>
                            <button class="et-editor__button"
                                @click="triggerToolbar('addition')">
                                <i class="et-icon ei-more"></i>
                            </button>
                        </div>
                    </div>
                </transition>
                <transition enter-active-class="animated flipInX">
                    <div class="et-editor__toolbar" v-show="toolbarAdditionShow">
                        <div class="et-editor__button-group">
                            <button class="et-editor__button"
                                @click="updateFormat('indent', -1)">
                                <i class="et-icon ei-format-indent-decrease"></i>
                            </button>
                            <button class="et-editor__button"
                                @click="updateFormat('indent', 1)">
                                <i class="et-icon ei-format-indent-increase"></i>
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
                        </div>
                        <div class="et-editor__button-group">
                            <button class="et-editor__button"
                                @click="undoHandler">
                                <i class="et-icon ei-undo"></i>
                            </button>
                            <button class="et-editor__button"
                                @click="redoHandler">
                                <i class="et-icon ei-redo"></i>
                            </button>
                            <button class="et-editor__button"
                                @click="triggerToolbar('main')">
                                <i class="et-icon ei-close"></i>
                            </button>
                        </div>
                    </div>
                </transition>
            </div>
            <div :id="toolbarId" slot="toolbar" class="hide" v-else></div>
        </quill-editor>

        <et-editor-link
            :show.sync="insertLinkShow"
            :editor="editor"
            :link="link"
            @restore-focus="restoreFocus">
        </et-editor-link>

        <et-editor-image
            :show.sync="insertImageShow"
            :editor="editor"
            @restore-focus="restoreFocus">
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
import Utils from '@/common/utils';
Quill.register('themes/et-theme', EtTheme);
const LinkBlot = Quill.import('formats/link');
export default {
    name: 'EtEditor',
    components: {
        'quill-editor': quillEditor,
        EtEditorLink,
        EtEditorImage
    },
    model: {
        prop: 'value',
        event: 'update:value'
    },
    props: {
        value: {
            type: String,
            default: ''
        },
        length: {
            type: Number,
            default: 0
        },
        maxLength: {
            type: Number,
            default: -1
        },
        type: {
            type: String,
            default: 'normal',
            validator (val) {
                return [
                    'normal',
                    'simple'
                ].indexOf(val) !== -1;
            }
        },
        placeholder: {
            type: String
        }
    },
    data () {
        return {
            editor: null,
            toolbarId: '',
            content: '',
            format: {},
            editorOption: {},
            toolbarMainShow: true,
            toolbarAdditionShow: false,
            link: null,
            insertLinkShow: false,
            insertImageShow: false
        };
    },
    watch: {
        value: {
            handler (val) {
                this.content = val;
                this.editor && this.$emit(
                    'update:length',
                    this.editor.getLength() - 1
                );
            },
            immediate: true
        },
        content (val) {
            this.$emit('update:value', val);
            this.$emit('update:length', this.editor.getLength() - 1);
        }
    },
    beforeMount () {
        this.toolbarId = `toolbar-${Utils.randString()}`;
        this.editorOption = {
            formats: this.type === 'simple' ? [] : ['bold',
                'italic', 'header', 'list', 'indent', 'align',
                'blockquote', 'code-block', 'link', 'image'],
            modules: {
                toolbar: {
                    container: `#${this.toolbarId}`,
                    handlers: {
                        link: this.linkHandler,
                        image: this.imageHandler
                    }
                }
            },
            theme: 'et-theme',
            placeholder: this.placeholder || this.$t('editor.placeholder')
        };
    },
    mounted () {
        this.editor = this.$refs.editor.quill;
        this.$emit('update:length', this.editor.getLength() - 1);
        this.editor.on('editor-change', (eventName, ...args) => {
            this.editor.hasFocus() && this.getFormat();
            if (this.maxLength !== -1 && this.length + 1 > this.maxLength) {
                this.editor.deleteText(this.maxLength, this.length + 1);
            }
        });
    },
    methods: {
        getFormat () {
            this.format = this.editor.getFormat();
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
        linkHandler (value, linkBlot = null, linkRange = null) {
            let blot = linkBlot,
                range = linkRange;
            if (!blot) {
                let offset = null;
                const selection = this.editor.getSelection(true);
                [blot, offset] = this.editor.scroll.descendant(LinkBlot, selection.index);
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
        undoHandler () {
            this.editor.history.undo();
        },
        redoHandler () {
            this.editor.history.redo();
        },
        restoreFocus () {
            const scrollTop = this.editor.scrollingContainer.scrollTop;
            this.editor.focus();
            this.editor.scrollingContainer.scrollTop = scrollTop;
        },
        triggerToolbar (type) {
            const val = type === 'addition';
            if (val) {
                this.toolbarMainShow = !val;
                setTimeout(() => {
                    this.toolbarAdditionShow = val;
                }, 50);
            } else {
                this.toolbarAdditionShow = val;
                setTimeout(() => {
                    this.toolbarMainShow = !val;
                }, 50);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import '~static/styles/style-common';

.et-editor {
    width: 100%;

    /deep/ .quill-editor {
        height: calc(100% - 2.3rem);
    }

    /deep/ .ql-toolbar {
        height: 2.3rem;
        padding: 0 $spaceSmall;
        border: none;
        border-top: $splitBorder;

        .et-editor__toolbar {
            display: flex;
            height: 100%;
        }

        .et-editor__toolbar .et-editor__button-group:first-child {
            flex: auto;
        }

        .et-editor__button {
            width: 1.5rem;
            height: 100%;
            padding: 0;
            color: $editorColor;
            cursor: pointer;
        }

        .et-editor__button:hover {
            color: $themeHoverColor;
        }

        .et-editor__button .et-icon {
            font-size: $iconFontSizeSmall;
        }

        .et-editor__button.active {
            color: $themeColor !important;
        }
    }

    /deep/ .ql-container.ql-snow {
        border: none;
        border-top: $splitBorder;
        border-bottom: $splitBorder;
    }

    /deep/ .ql-tooltip {
        padding: $spaceSmall;
        font-size: $contentFontSize;
        color: $editorColor;
        border: none;
        border-radius: $radiusSmall;
        background-color: $blockBackground;
        box-shadow: $cardShadow;

        &:before {
            content: 'URL';
            margin: 0;
        }

        .et-editor__tooltip-preview {
            height: 100%;
            font-size: $iconFontSizeSmall;
            line-height: $iconFontSizeSmall;
            color: $themeColor;
            margin-right: $spaceSmall;
        }

        .et-editor__tooltip-preview:hover {
            color: $themeHoverColor;
        }

        .et-icon {
            display: inline-block;
            cursor: pointer;
        }

        .et-icon:hover {
            color: $themeHoverColor;
        }
    }

    /deep/ .ql-editor {
        padding: $spaceLarge;

        &.ql-blank:before {
            top: $spaceLarge;
            left: $spaceLarge + .1rem;
            color: $placeholderColor;
            font-size: $contentFontSize;
            font-style: normal;
        }
    }

    &.et-editor_simple {
        /deep/ .ql-editor {
            padding: $spaceSmall;
        }

        /deep/ .ql-editor.ql-blank:before {
            top: $spaceSmall;
            left: $spaceSmall + .1rem;
        }

        /deep/ .ql-container.ql-snow {
            border-right: $splitBorder;
            border-left: $splitBorder;
            border-radius: $radiusTiny;
            background-color: #fff;
        }
    }
}
</style>
