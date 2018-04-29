import FormData from 'form-data';
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

    create (image, data = {}, config = {}) {
        let formData = new FormData();
        formData.append('image', image);
        for (let key in data) {
            formData.append(key, data[key]);
        }
        return super.post(this.url, formData, {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
            },
            transformRequest: [],
            ...config
        });
    }
}

export default new PhotoApi();
