import BaseRequest from '@/common/request';

class SectionApi extends BaseRequest {
    constructor () {
        super();
        this.url = '/content/sections/';
    }

    get (id) {
        return super.get(`${this.url}${id}/`);
    }

    list (params = {}) {
        return super.get(this.url, { params });
    }

    create (data, config = {}) {
        return super.post(this.url, data, config);
    }
}

export default new SectionApi();
