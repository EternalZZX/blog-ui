import BaseRequest from '@/common/request';

class PhotoApi extends BaseRequest {
    constructor () {
        super();
        this.url = '/content/photos/';
    }

    get (uuid) {
        return super.get(`${this.url}${uuid}/`);
    }

    list (params = {}) {
        return super.get(this.url, { params });
    }

    create (data, config = {}) {
        return super.post(this.url, data, config);
    }
}

export default new PhotoApi();
