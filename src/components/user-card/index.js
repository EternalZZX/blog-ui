import UserCard from './src/user-card';

UserCard.install = function (Vue) {
    Vue.component(UserCard.name, UserCard);
};

export default UserCard;
