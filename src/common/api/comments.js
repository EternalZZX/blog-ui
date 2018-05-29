import BaseRequest from '@/common/request';

class CommentApi extends BaseRequest {
    constructor () {
        super();
        this.url = '/content/comments/';
    }

    get (uuid, config = {}) {
        return super.get(`${this.url}${uuid}/`, config);
    }

    list (params = {}, config = {}) {
        return super.get(this.url, {
            params,
            ...config
        });
    }

    create (data, config = {}) {
        return super.post(this.url, data, config);
    }

    update (uuid, data, config = {}) {
        return super.put(`${this.url}${uuid}/`, data, config);
    }

    delete (uuid = '', data = {}, config = {}) {
        const deleteUrl = uuid === '' ? `${this.url}` : `${this.url}${uuid}/`;
        return super.delete(deleteUrl, {
            data,
            ...config
        });
    }
}

CommentApi.STATUS = {
    CANCEL: 0,
    ACTIVE: 1,
    AUDIT: 2,
    FAILED: 3,
    RECYCLED: 4
};

CommentApi.RESOURCE_TYPE = {
    ARTICLE: 0,
    ALBUM: 1,
    PHOTO: 2
};

export { CommentApi };

export default new CommentApi();
