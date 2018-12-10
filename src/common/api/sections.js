import BaseRequest from '@/common/request';

class SectionApi extends BaseRequest {
    constructor () {
        super();
        this.url = '/content/sections/';
    }

    get (name, config = {}) {
        return super.get(`${this.url}${name}/`, config);
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

    update (name, data, config = {}) {
        return super.put(`${this.url}${name}/`, data, config);
    }

    delete (name = '', data = {}, config = {}) {
        const deleteUrl = name === '' ? `${this.url}` : `${this.url}${name}/`;
        return super.delete(deleteUrl, {
            data,
            ...config
        });
    }

    listSections (params = {}, config = {}) {
        const args = {
            ...params,
            order_field: 'create_at'
        };
        return super.get(this.url, {
            params: args,
            ...config
        });
    }
}

SectionApi.STATUS = {
    CANCEL: 0,
    NORMAL: 1,
    HIDE: 2
};

SectionApi.PERMISSION = {
    OWNER: 0,
    CONTROLLER: 1,
    MANAGER: 2
};

export { SectionApi };

export default new SectionApi();
