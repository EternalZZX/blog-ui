import axios from 'axios';
import qs from 'query-string';
import Utils from '@/common/utils';
import SETTING from '@/setting';

class BaseRequest {
    constructor () {
        this.token = Utils.getToken();
        this.$http = axios.create({
            baseURL: SETTING.BASE_URL,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            transformResponse: [response => response.data],
            maxContentLength: 300000,
            responseType: 'json'
        });
    }

    _getHeadersToken () {
        return {
            [SETTING.TOKEN_HEADER_KEY]: this.token
        };
    }

    get (url, config = {}) {
        return this.$http.get(url, {
            headers: this._getHeadersToken(),
            ...config
        });
    }

    post (url, data = null, config = {}) {
        return this.$http.post(url, data, {
            headers: this._getHeadersToken(),
            transformRequest: [request => qs.stringify(request)],
            ...config
        });
    }

    put (url, data = null, config = {}) {
        return this.$http.put(url, data, {
            headers: this._getHeadersToken(),
            transformRequest: [request => qs.stringify(request)],
            ...config
        });
    }

    delete (url, config = {}) {
        return this.$http.delete(url, {
            headers: this._getHeadersToken(),
            transformRequest: [request => qs.stringify(request)],
            ...config
        });
    }
}

export default BaseRequest;
