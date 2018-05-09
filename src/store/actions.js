import TYPES from './types';
import UserApi from '@/common/api/users';
import Utils from '@/common/utils';

export default {
    [TYPES.UPDATE_IDENTITY] ({commit}) {
        UserApi.self().then(response => {
            commit(TYPES.SET_IDENTITY, response.data);
        }).catch(err => {
            Utils.errorLog(err, 'USER-SELF');
        });
    }
};
