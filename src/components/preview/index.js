import Preview from './src/preview';

Preview.install = function (Vue) {
    Vue.component(Preview.name, Preview);
};

export default Preview;
