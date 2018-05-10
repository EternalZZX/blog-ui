import BaseRequest from '@/common/request';

class AccountApi extends BaseRequest {
    constructor () {
        super();
        this.url = '/account/';
    }

    signIn (data, config = {}) {
        return super.post(`${this.url}sign_in/`, data, config);
    }

    signInGuest (data, config = {}) {
        return super.post(`${this.url}sign_in_guest/`, data, config);
    }

    signUp (data, config = {}) {
        return super.post(`${this.url}sign_up/`, data, config);
    }
}

export default new AccountApi();
