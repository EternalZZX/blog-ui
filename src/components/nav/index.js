import Nav from './src/nav';

Nav.install = Vue => {
    Vue.component(Nav.name, Nav);
};

export default Nav;
