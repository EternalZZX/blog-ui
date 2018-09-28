import Collapse from './collapse';
import Comments from './comment';
import CommentScroll from './comment-scroll';
import Confirm from './confirm';
import Editor from './editor';
import Nav from './nav';
import Photo from './photo';
import Preview from './preview';
import Scroll from './scroll';
import Toolbar from './toolbar';
import User from './user';

const components = [
    Collapse,
    Comments,
    CommentScroll,
    Confirm,
    Editor,
    Nav,
    Photo,
    Preview,
    Scroll,
    Toolbar,
    User
];

const install = (Vue, opts = {}) => {
    components.map(component => Vue.component(component.name, component));
};

export default {
    version: '0.1.0',
    install
};
