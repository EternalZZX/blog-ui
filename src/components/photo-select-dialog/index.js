import PhotoSelectDialog from './src/photo-select-dialog';

PhotoSelectDialog.install = Vue => {
    Vue.component(PhotoSelectDialog.name, PhotoSelectDialog);
};

export default PhotoSelectDialog;
