import BaseRequest from '@/common/request';

class ArticleApi extends BaseRequest {
    constructor () {
        super();
        this.url = '/content/articles/';
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

ArticleApi.STATUS = {
    CANCEL: 0,
    ACTIVE: 1,
    DRAFT: 2,
    AUDIT: 3,
    FAILED: 4,
    RECYCLED: 5
};

ArticleApi.PRIVACY = {
    PRIVATE: 0,
    PUBLIC: 1
};

export { ArticleApi };

export default new ArticleApi();
