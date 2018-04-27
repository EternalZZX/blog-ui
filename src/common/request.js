import axios from 'axios';
import Common from '@/common/common';
import SETTING from '@/setting';

class BaseRequest {
    constructor () {
        this.header = {};
        this.header[SETTING.TOKRN_HEADER_KEY] = Common.getToken();
        this.$http = axios.create({
            baseURL: SETTING.BASE_URL,
            transformResponse: [response => response.data],
            headers: this.header,
            maxContentLength: 30000,
            responseType: 'json'
        });
    }

    get (url, config = {}) {
        return this.$http.get(url, config);
    }

    post (url, data = null, config = {}) {
        return this.$http.post(url, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
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
