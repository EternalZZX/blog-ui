
import ArticleCard from './article-card';
import Card from './card';
import Collapse from './collapse';
import Comments from './comment';
import CommentScroll from './comment-scroll';
import Confirm from './confirm';
import Editor from './editor';
import Nav from './nav';
import Photo from './photo';
import PhotoSelect from './photo-select';
import PhotoSelectBox from './photo-select-box';
import PhotoSelectDialog from './photo-select-dialog';
import Preview from './preview';
import Scroll from './scroll';
import SectionCard from './section-card';
import Toolbar from './toolbar';
import User from './user';

const components = [
    ArticleCard,
    Card,
    Collapse,
    Comments,
    CommentScroll,
    Confirm,
    Editor,
    Nav,
    Photo,
    PhotoSelect,
    PhotoSelectBox,
    PhotoSelectDialog,
    Preview,
    Scroll,
    SectionCard,
    Toolbar,
    User
];

const install = (Vue, opts = {}) => {
    components.map(component => Vue.component(component.name, component));
};

export default {
    version: '0.1.0',
    install
};
