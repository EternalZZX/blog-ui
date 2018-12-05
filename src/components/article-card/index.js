import ArticleCard from './src/article-card';

ArticleCard.install = Vue => {
    Vue.component(ArticleCard.name, ArticleCard);
};

export default ArticleCard;
