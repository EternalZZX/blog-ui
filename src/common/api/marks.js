import BaseRequest from '@/common/request';

class MarkApi extends BaseRequest {
    constructor () {
        super();
        this.url = '/content/marks/';
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

MarkApi.PRIVACY = {
    PRIVATE: 0,
    PUBLIC: 1
};

MarkApi.RESOURCE_TYPE = {
    ARTICLE: 0,
    ALBUM: 1,
    PHOTO: 2
};

export { MarkApi };

export default new MarkApi();
