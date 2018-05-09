import TYPES from './types';

export default {
    [TYPES.SET_IDENTITY] (state, identity) {
        state.identity = identity;
    },
    [TYPES.DELETE_IDENTITY] (state) {
        state.identity = {};
    }
};
