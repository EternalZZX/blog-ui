import axios from 'axios';
import qs from 'query-string';
import Utils from '@/common/utils';
import SETTING from '@/setting';

class BaseRequest {
    constructor () {
        const headers = {'Content-Type': 'application/x-www-form-urlencoded'};
        headers[SETTING.TOKEN_HEADER_KEY] = Utils.getToken();
        this.$http = axios.create({
            baseURL: SETTING.BASE_URL,
            headers,
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
        return this.$http.put(url, data, {
            transformRequest: [request => qs.stringify(request)],
            ...config
        });
    }

    delete (url, config = {}) {
        return this.$http.delete(url, {
            transformRequest: [request => qs.stringify(request)],
            ...config
        });
    }
}

export default BaseRequest;
