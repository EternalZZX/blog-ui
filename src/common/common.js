import Vue from 'vue';
import Utils from '@/common/utils';
import store from '@/store';
import STORE_TYPES from '@/store/types';
import { Message } from 'element-ui';
import Account from '@/common/api/accounts';

class Common {
    static async isLogin () {
        try {
            if (!Utils.hasUserToken()) {
                return false;
            }
            if (store.getters.hasIdentity) {
                return true;
            }
            await updateIdentity();
            return true;
        } catch (err) {
            return false;
        }
    }

    static async getPermission () {
        try {
            if (store.getters.hasPermission) {
                return store.state.permission;
            }
            return await updatePermission();
        } catch (err) {
            return err;
        }
    }

    static auth () {
        return new Promise((resolve, reject) => {
            Common.isLogin().then(res => {
                if (!res && !Utils.hasGuestToken()) {
                    resolve(Common.guestLogin());
                } else {
                    resolve();
                }
            });
        });
    }

    static guestLogin () {
        return new Promise((resolve, reject) => {
            Account.signInGuest().then(response => {
                Utils.setToken(response.data.token);
                updatePermission();
                resolve(response.data);
            }).catch(err => {
                Utils.errorLog(err, 'GUEST-SIGN-IN');
                reject(err);
            });
        });
    }

    static alert (parent, options = {}) {
        if (options.instance && !options.instance._isDestroyed) {
            options.instance.remove();
        }
        const instance = alertFactory(options);
        parent.appendChild(instance.$mount().$el);
        return instance;
    }

    static notify (message, type = 'info', duration = 3000) {
        Message({
            message,
            type,
            duration,
            customClass: 'et-notify',
            showClose: true
        });
    }
}

const updateIdentity = () => store.dispatch(STORE_TYPES.UPDATE_IDENTITY);

const updatePermission = () => store.dispatch(STORE_TYPES.UPDATE_PERMISSION);

const alertFactory = (options = {}) => {
    const AlertComponent = Vue.extend({
        data () {
            return {
                show: false,
                message: options.message,
                type: options.type
            };
        },
        template: `<transition name="alert"
            enter-active-class="animated shake"
            leave-active-class="animated flipOutX"
            v-on:after-leave="remove">
            <el-alert v-if="show"
                :title="message"
                :type="type"
                style="display: flex"
                @close="close">
            </el-alert>
        </transition>`,
        mounted () {
            this.show = true;
        },
        methods: {
            close () {
                this.show = false;
            },
            remove (el) {
                this.$el.parentNode.removeChild(this.$el);
                this.$destroy();
            }
        }
    });
    return new AlertComponent();
};

export default Common;
