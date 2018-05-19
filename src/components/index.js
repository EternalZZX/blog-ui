import LoadScroll from './load-scroll';
import UserCard from './user-card';

const components = [
    LoadScroll,
    UserCard
];

const install = (Vue, opts = {}) => {
    components.map(component => Vue.component(component.name, component));
};

export default {
    version: '0.1.0',
    install
};
