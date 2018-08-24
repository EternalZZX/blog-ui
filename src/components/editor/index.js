import Editor from './src/editor';

Editor.install = Vue => {
    Vue.component(Editor.name, Editor);
};

export default Editor;
