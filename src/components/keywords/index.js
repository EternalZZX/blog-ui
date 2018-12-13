import Keywords from './src/keywords';

Keywords.install = Vue => {
    Vue.component(Keywords.name, Keywords);
};

export default Keywords;
