import Vue from 'vue';
import VueCookie from 'vue-cookie';
import SETTING from '@/setting';

Vue.use(VueCookie);

class Common {
    static isLogin () {
        return this.getToken() !== null;
    }

    static getToken () {
        return Vue.cookie.get(SETTING.TOKEN_COOKIE_KEY);
    }

    static setToken (token) {
        Vue.cookie.set(SETTING.TOKEN_COOKIE_KEY, token, 7);
    }

    static deleteToken () {
        return Vue.cookie.delete(SETTING.TOKEN_COOKIE_KEY);
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
