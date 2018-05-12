import TYPES from './types';

export default {
    [TYPES.SET_IDENTITY] (state, identity) {
        state.identity = {
            uuid: identity.uuid,
            nick: identity.nick,
            avatar: identity.avatar,
            remark: identity.remark,
            role: identity.role,
            groups: identity.groups
        };
    },
    [TYPES.DELETE_IDENTITY] (state) {
        state.identity = null;
    }
};
