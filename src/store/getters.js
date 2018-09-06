export default {
    userUuid: state => state.identity ? state.identity.uuid : null,
    hasIdentity: state => state.identity !== null,
    hasPermission: state => state.permission !== null,
    permission: state => (name, condition = 'status', level = 0) => {
        if (!state.permission) {
            return false;
        }
        const permission = state.permission.permissions.find(item => item.name === name);
        if (!permission || !permission.status) {
            return false;
        }
        const result = {
            status: permission.status,
            major: permission.major_level >= level,
            minor: permission.minor_level >= level
        };
        return result[condition];
    }
};
