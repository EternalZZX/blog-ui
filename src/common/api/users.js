import BaseRequest from '@/common/request';

class UserApi extends BaseRequest {
    constructor () {
        super();
        this.url = '/account/users/';
    }

    get (uuid, config = {}) {
        return super.get(`${this.url}${uuid}/`, config);
    }

    self (config = {}) {
        return super.get(`${this.url}self/`, config);
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

    queryUsers (query, params = {}, config = {}) {
        const args = {
            ...params,
            query
        };
        return super.get(this.url, {
            params: args,
            ...config
        });
    }
}

UserApi.GENDER = {
    FEMALE: 0,
    MALE: 1
};

UserApi.STATUS = {
    CANCEL: 0,
    ACTIVE: 1
};

export { UserApi };

export default new UserApi();
