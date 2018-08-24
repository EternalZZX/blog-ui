import Photo from './src/photo';

Photo.install = Vue => {
    Vue.component(Photo.name, Photo);
};

export default Photo;
