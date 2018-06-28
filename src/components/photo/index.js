import Photo from './src/photo';

Photo.install = function (Vue) {
    Vue.component(Photo.name, Photo);
};

export default Photo;
