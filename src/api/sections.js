import BaseRequest from '@/common/request';

class SectionApi extends BaseRequest {
    constructor () {
        super();
        this.url = '/content/sections/';
    }

    get (id, config = {}) {
        return super.get(`${this.url}${id}/`, config);
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
}

export default new SectionApi();
