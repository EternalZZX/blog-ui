export default {
    identity: state => state.identity,
    userUuid: state => state.identity ? state.identity.uuid : null,
    hasIdentity: state => state.identity !== null,
    hasPermission: state => state.permission !== null,
    permission: state => (name, condition = 'status', level = 0) => {
        if (!state.permission) {
            return false;
        }
        const permission = state.permission.permissions[name];
        if (!permission || !permission.status) {
            return false;
        }
        const result = {
            status: permission.status,
            major: permission.major_level >= level,
            minor: permission.minor_level >= level
        };
        return result[condition];
    },
    roleLevel: state => () => {
        if (!state.permission) {
            return 0;
        }
        return state.permission.role_level;
    },
    readLevel: state => () => {
        if (!state.permission) {
            return 0;
        }
        return state.permission.permissions.read_level.value;
    }
};
