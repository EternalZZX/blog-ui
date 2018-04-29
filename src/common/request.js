import axios from 'axios';
import qs from 'query-string';
import Common from '@/common/common';
import SETTING from '@/setting';

class BaseRequest {
    constructor () {
        this.header = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        this.header[SETTING.TOKRN_HEADER_KEY] = Common.getToken();
        this.$http = axios.create({
            baseURL: SETTING.BASE_URL,
            headers: this.header,
            transformResponse: [response => response.data],
            maxContentLength: 300000,
            responseType: 'json'
        });
    }

    get (url, config = {}) {
        return this.$http.get(url, config);
    }

    post (url, data = null, config = {}) {
        return this.$http.post(url, data, {
            transformRequest: [request => qs.stringify(request)],
            ...config
        });
    }

    put (url, data = null, config = {}) {
        return this.$http.put(url, data, config);
    }

    delete (url, config = {}) {
        return this.$http.delete(url, config);
    }
}

export default BaseRequest;
