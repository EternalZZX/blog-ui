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

    // static alert (option) {
    //     const el = document.createElement('div');
    //     if (option.parentEl != null) {
    //         option.parentel.appendChild(el);
    //     } else {
    //         document.getElementsByTagName('body')[0].appendChild(el);
    //     }
    //     var _d = common.clone(option.data == null ? {} : option.data);
    //     var v = '';
    //     var component = option.component;
    //     let template = '';
    //     if (typeof component == 'string') {
    //       template = `<div class="w680" v-if="show">`;
    //     }
    //       v = new Vue({
    //           el: el,
    //           data: function () {
    //               return {
    //                   title: option.title,
    //                   style:option.style,
    //                   size: option._size_ == null ? 'small' : option._size_,
    //                   modal: true,
    //                   custom_class: 'dialg-class',
    //                   close_on_press_escape: false,
    //                   show_close: true,
    //                   show: true,
    //                   data: _d,
    //                 };
    //             },
    //           template: template,
    //           mounted: function () {},
    //           methods: {
    //               handleClose(done){
    //                 if (option.close) {
    //                   option.close();
    //                 }
    //                 done();
    //               },
    //               close() {
    //                 if (option.close) {
    //                   option.close();
    //                 }
    //               },
    //               callback(result) {
    //                 //dxq
    //                 if (option._source != null) {
    //                   option.callback.call(option._source, result);
    //                   this.show = false;
    //                   return;
    //                 }
    //                 //如果不传type或者type等于close或cancel直接关闭弹框
    //                 if (!result.type || result.type == 'close' || result.type == 'cancel') {
    //                   this.show = false;
    //                 } else if (result.type == 'sure') {
    //                   //如果type等于sure则调用parent传递过来的回调函
    //                   this.show = false;
    //                   if (option.callback) {
    //                     option.callback(result.data);
    //                   }
    //                 }
    //               },
    //             },
    //           components: {
    //               child: option.component,
    //             },
    //         });
    //     return v;
    //   };
}

export default Common;
