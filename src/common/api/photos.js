import FormData from 'form-data';
import SETTING from '@/setting';
import Utils from '@/common/utils';
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
                [SETTING.TOKEN_HEADER_KEY]: Utils.getToken(),
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

    listAlbumPhotos (albumUuid, params = {}, config = {}) {
        const args = {
            album_uuid: albumUuid,
            order_field: 'create_at',
            ...params
        };
        return super.get(this.url, {
            params: args,
            ...config
        });
    }

    listSelfPhotos (uuid, query = '', params = {}, config = {}) {
        const args = {
            author_uuid: uuid,
            query,
            order_field: 'create_at',
            ...params
        };
        return super.get(this.url, {
            params: args,
            ...config
        });
    }

    listSelfOtherPhotos (uuid, params = {}, config = {}) {
        const args = {
            author_uuid: uuid,
            album_uuid: '',
            order_field: 'create_at',
            ...params
        };
        return super.get(this.url, {
            params: args,
            ...config
        });
    }
}

PhotoApi.STATUS = {
    CANCEL: 0,
    ACTIVE: 1,
    AUDIT: 2,
    FAILED: 3,
    RECYCLED: 4
};

PhotoApi.PRIVACY = {
    PRIVATE: 0,
    PUBLIC: 1
};

PhotoApi.LIKE_TYPE = {
    NONE: 0,
    LIKE: 1,
    DISLIKE: 2
};

export { PhotoApi };

export default new PhotoApi();
