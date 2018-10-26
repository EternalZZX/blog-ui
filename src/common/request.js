import axios from 'axios';
import qs from 'query-string';
import Utils from '@/common/utils';
import Loading from '@/common/loading';
import Validate from '@/common/validate';
import Bus, { EVENT } from '@/common/bus';
import { RequestError, ValidationError } from '@/common/error';
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

    static validateParams (data, rules) {
        const validateResult = Validate.test(data, rules);
        if (!validateResult.result) {
            return new Promise((resolve, reject) => {
                reject(new ValidationError(validateResult.message));
            });
        }
        return null;
    }

    get (url, config = {}) {
        return new Promise((resolve, reject) => {
            this.$http.get(url, {
                headers: BaseRequest._getHeadersToken(),
                ...config
            }).then(response => {
                resolve(response);
            }).catch(err => {
                reject(err);
            });
        });
    }

    post (url, data = null, config = {}) {
        return new Promise((resolve, reject) => {
            if (Loading.isActive()) {
                reject(new RequestError());
                return;
            }
            Loading.open();
            this.$http.post(url, data, {
                headers: BaseRequest._getHeadersToken(),
                transformRequest: [request => qs.stringify(request)],
                ...config
            }).then(response => {
                resolve(response);
                Loading.close();
            }).catch(err => {
                reject(err);
                Loading.close();
            });
        });
    }

    put (url, data = null, config = {}) {
        return new Promise((resolve, reject) => {
            if (Loading.isActive()) {
                reject(new RequestError());
                return;
            }
            Loading.open();
            this.$http.put(url, data, {
                headers: BaseRequest._getHeadersToken(),
                transformRequest: [request => qs.stringify(request)],
                ...config
            }).then(response => {
                resolve(response);
                Loading.close();
            }).catch(err => {
                reject(err);
                Loading.close();
            });
        });
    }

    delete (url, config = {}) {
        return new Promise((resolve, reject) => {
            if (Loading.isActive()) {
                reject(new RequestError());
                return;
            }
            Loading.open();
            this.$http.delete(url, {
                headers: BaseRequest._getHeadersToken(),
                transformRequest: [request => qs.stringify(request)],
                ...config
            }).then(response => {
                resolve(response);
                Loading.close();
            }).catch(err => {
                reject(err);
                Loading.close();
            });
        });
    }
}

export default BaseRequest;
