import FormData from 'form-data';
import BaseRequest from '@/common/request';

class PhotoApi extends BaseRequest {
    constructor () {
        super();
        this.url = '/content/photos/';
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

    create (image, data = {}, config = {}) {
        const formData = new FormData();
        formData.append('image', image);
        for (const key in data) {
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

export default new PhotoApi();
