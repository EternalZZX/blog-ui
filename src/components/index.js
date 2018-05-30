import Dialog from './dialog';
import Editor from './editor';
import Nav from './nav';
import Preview from './preview';
import Scroll from './scroll';
import Toolbar from './toolbar';
import User from './user';

const components = [
    Dialog,
    Editor,
    Nav,
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
