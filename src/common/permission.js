import Vue from 'vue';
import store from '@/store';

const NAME = {
    LOGIN: 'login',
    READ_LEVEL: 'read_level',

    USER_CREATE: 'user_create',
    USER_DELETE: 'user_delete',
    USER_UPDATE: 'user_update',
    USER_SELECT: 'user_select',
    USER_PRIVACY: 'user_privacy',
    USER_ROLE: 'user_role',
    USER_STATUS: 'user_status',
    USER_CANCEL: 'user_cancel',

    ROLE_CREATE: 'role_create',
    ROLE_DELETE: 'role_delete',
    ROLE_UPDATE: 'role_update',
    ROLE_SELECT: 'role_select',

    SECTION_CREATE: 'section_create',
    SECTION_DELETE: 'section_delete',
    SECTION_UPDATE: 'section_update',
    SECTION_SELECT: 'section_select',
    SECTION_PERMISSION: 'section_permission',

    ARTICLE_CREATE: 'article_create',
    ARTICLE_DELETE: 'article_delete',
    ARTICLE_UPDATE: 'article_update',
    ARTICLE_SELECT: 'article_select',
    ARTICLE_PERMISSION: 'article_permission',
    ARTICLE_AUDIT: 'article_audit',
    ARTICLE_CANCEL: 'article_cancel',
    ARTICLE_PRIVACY: 'article_privacy',
    ARTICLE_READ: 'article_read',
    ARTICLE_LIKE: 'article_like',

    ALBUM_CREATE: 'album_create',
    ALBUM_DELETE: 'album_delete',
    ALBUM_UPDATE: 'album_update',
    ALBUM_SELECT: 'album_select',
    ALBUM_PRIVACY: 'album_privacy',
    ALBUM_SYSTEM: 'album_system',
    ALBUM_LIKE: 'album_like',

    PHOTO_CREATE: 'photo_create',
    PHOTO_DELETE: 'photo_delete',
    PHOTO_UPDATE: 'photo_update',
    PHOTO_SELECT: 'photo_select',
    PHOTO_PERMISSION: 'photo_permission',
    PHOTO_AUDIT: 'photo_audit',
    PHOTO_CANCEL: 'photo_cancel',
    PHOTO_PRIVACY: 'photo_privacy',
    PHOTO_READ: 'photo_read',
    PHOTO_LIMIT: 'photo_limit',
    PHOTO_LIKE: 'photo_like',

    COMMENT_CREATE: 'comment_create',
    COMMENT_DELETE: 'comment_delete',
    COMMENT_UPDATE: 'comment_update',
    COMMENT_SELECT: 'comment_select',
    COMMENT_PERMISSION: 'comment_permission',
    COMMENT_AUDIT: 'comment_audit',
    COMMENT_CANCEL: 'comment_cancel',
    COMMENT_LIKE: 'comment_like',

    MARK_CREATE: 'mark_create',
    MARK_DELETE: 'mark_delete',
    MARK_UPDATE: 'mark_update',
    MARK_SELECT: 'mark_select',
    MARK_PRIVACY: 'mark_privacy'
};

const TYPE = {
    STATUS: 'status',
    MAJOR: 'major',
    MINOR: 'minor'
};

const PERMISSION_DICT = {
    'section-add': {
        name: NAME.SECTION_CREATE,
        type: TYPE.STATUS
    }
};

Vue.directive('perm', (el, binding, vnode) => {
    const relate = PERMISSION_DICT[binding.arg];
    if (relate && !store.getters.permission(relate.name, relate.type, relate.level)) {
        const comment = document.createComment('');
        Object.defineProperty(comment, 'setAttribute', {
            value: () => undefined
        });
        vnode.elm = comment;
        vnode.isComment = true;
        vnode.text = undefined;
        vnode.context = undefined;
        vnode.tag = undefined;
        vnode.data.directives = undefined;
        if (vnode.componentInstance) {
            vnode.componentInstance.$el = comment;
        }
        if (el.parentNode) {
            el.parentNode.replaceChild(comment, el);
        }
    }
});
