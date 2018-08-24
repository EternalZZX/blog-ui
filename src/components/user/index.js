import User from './src/user';

User.install = Vue => {
    Vue.component(User.name, User);
};

export default User;
