import axios from 'axios';
import qs from 'query-string';
import Utils from '@/common/utils';
import Bus, { EVENT } from '@/common/bus';
import SETTING from '@/setting';

class BaseRequest {
    constructor () {
        this.$http = axios.create({
            baseURL: SETTING.BASE_URL,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            transformResponse: [response => response.data],
            validateStatus (status) {
                [401, 418, 419].indexOf(status) !== -1 && Bus.$emit(EVENT.TOKEN_TIMEOUT);
                return status >= 200 && status < 300;
            },
            maxContentLength: 300000,
            responseType: 'json'
        });
    }

    static _getHeadersToken () {
        return {
            [SETTING.TOKEN_HEADER_KEY]: Utils.getToken()
        };
    }

    get (url, config = {}) {
        return this.$http.get(url, {
            headers: BaseRequest._getHeadersToken(),
            ...config
        });
    }

    post (url, data = null, config = {}) {
        return this.$http.post(url, data, {
            headers: BaseRequest._getHeadersToken(),
            transformRequest: [request => qs.stringify(request)],
            ...config
        });
    }

    put (url, data = null, config = {}) {
        return this.$http.put(url, data, {
            headers: BaseRequest._getHeadersToken(),
            transformRequest: [request => qs.stringify(request)],
            ...config
        });
    }

    delete (url, config = {}) {
        return this.$http.delete(url, {
            headers: BaseRequest._getHeadersToken(),
            transformRequest: [request => qs.stringify(request)],
            ...config
        });
    }
}

export default BaseRequest;
