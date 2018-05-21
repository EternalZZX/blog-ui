import BaseDialog from './src/base-dialog';

BaseDialog.install = function (Vue) {
    Vue.component(BaseDialog.name, BaseDialog);
};

export default BaseDialog;
