import TYPES from './types';
import UserApi from '@/common/api/users';
import Utils from '@/common/utils';

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
    }
};
