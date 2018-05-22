import BaseDialog from './base-dialog';
import LoadScroll from './load-scroll';
import SideNav from './side-nav';
import UserCard from './user-card';

const components = [
    BaseDialog,
    LoadScroll,
    SideNav,
    UserCard
];

const install = (Vue, opts = {}) => {
    components.map(component => Vue.component(component.name, component));
};

export default {
    version: '0.1.0',
    install
};
