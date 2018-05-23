import TYPES from './types';
import Bus, { EVENT } from '@/common/bus';

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
        Bus.$emit(EVENT.IDENTITY_REFRESH);
    },
    [TYPES.DELETE_IDENTITY] (state) {
        state.identity = null;
        Bus.$emit(EVENT.IDENTITY_REFRESH);
    },
    [TYPES.SET_PERMISSION] (state, permission) {
        state.permission = permission;
    },
    [TYPES.DELETE_PERMISSION] (state) {
        state.permission = null;
    }
};
