import ArticleBlock from './src/article-block';

ArticleBlock.install = Vue => {
    Vue.component(ArticleBlock.name, ArticleBlock);
};

export default ArticleBlock;
