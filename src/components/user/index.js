import User from './src/user';

User.install = function (Vue) {
    Vue.component(User.name, User);
};

export default User;
