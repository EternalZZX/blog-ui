import Comments from './src/comment';

Comments.install = Vue => {
    Vue.component(Comments.name, Comments);
};

export default Comments;
