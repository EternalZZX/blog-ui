import SideNav from './src/side-nav';

SideNav.install = function (Vue) {
    Vue.component(SideNav.name, SideNav);
};

export default SideNav;
