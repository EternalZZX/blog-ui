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
            const instance = options.instance;
            instance.message && (instance.message = options.message);
            instance.type && (instance.type = options.type);
            return instance;
        }
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
        const instance = new AlertComponent();
        parent.appendChild(instance.$mount().$el);
        return instance;
    }
}

export default Common;
