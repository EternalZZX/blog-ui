import Vue from 'vue';
import Utils from '@/common/utils';
import store from '@/store';
import STORE_TYPES from '@/store/types';
import AccountApi from '@/common/api/account';

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

    static guestLogin () {
        AccountApi.signInGuest().then(response => {
            Utils.setToken(response.data.token);
        }).catch(err => {
            Utils.errorLog(err, 'GUEST-SIGN-IN');
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
}

const updateIdentity = () => store.dispatch(STORE_TYPES.UPDATE_IDENTITY);

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
