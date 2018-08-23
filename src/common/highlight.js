import Vue from 'vue';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-gist.css';

Vue.directive('highlight', el => {
    const blocks = el.querySelectorAll('pre.ql-syntax');
    for (const block of blocks) {
        hljs.highlightBlock(block);
    }
});
