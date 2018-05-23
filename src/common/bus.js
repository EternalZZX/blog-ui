import Vue from 'vue';

const Bus = new Vue();

export const EVENT = {
    TOKEN_REFRESH: 'token-refresh',
    IDENTITY_REFRESH: 'identity-refresh'
};

export default Bus;
