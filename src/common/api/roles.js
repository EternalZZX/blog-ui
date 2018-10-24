import BaseRequest from '@/common/request';

class RoleApi extends BaseRequest {
    constructor () {
        super();
        this.url = '/account/roles/';
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

    update (id, data, config = {}) {
        return super.put(`${this.url}${id}/`, data, config);
    }

    delete (id = '', data = {}, config = {}) {
        const deleteUrl = id === '' ? `${this.url}` : `${this.url}${id}/`;
        return super.delete(deleteUrl, {
            data,
            ...config
        });
    }

    queryRoles (query, params = {}, config = {}) {
        const args = {
            ...params,
            query,
            order_field: 'create_at'
        };
        return super.get(this.url, {
            params: args,
            ...config
        });
    }
}

export default new RoleApi();
