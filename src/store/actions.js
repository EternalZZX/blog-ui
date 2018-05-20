import TYPES from './types';
import UserApi from '@/common/api/users';
import RoleApi from '@/common/api/roles';
import Utils from '@/common/utils';
import SETTING from '@/setting';

export default {
    [TYPES.UPDATE_IDENTITY] ({commit}) {
        return new Promise((resolve, reject) => {
            UserApi.self().then(response => {
                commit(TYPES.SET_IDENTITY, response.data);
                resolve(response.data);
            }).catch(err => {
                Utils.errorLog(err, 'USER-SELF');
                reject(err);
            });
        });
    },
    [TYPES.UPDATE_PERMISSION] ({commit, state}) {
        return new Promise((resolve, reject) => {
            const role = state.identity ? state.identity.role : SETTING.GUEST_ROLE;
            RoleApi.get(role).then(response => {
                commit(TYPES.SET_PERMISSION, response.data);
                resolve(response.data);
            }).catch(err => {
                Utils.errorLog(err, 'ROLE-GET');
                reject(err);
            });
        });
    }
};
