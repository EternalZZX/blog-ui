import Dialog from './dialog';
import Scroll from './scroll';
import Nav from './nav';
import User from './user';

const components = [
    Dialog,
    Nav,
    Scroll,
    User
];

const install = (Vue, opts = {}) => {
    components.map(component => Vue.component(component.name, component));
};

export default {
    version: '0.1.0',
    install
};
