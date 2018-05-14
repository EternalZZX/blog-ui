<template>
    <div v-clickoutside="dropdownClose">
        <div class="et-header__avatar" @click="dropdownTrigger">
            <img :src="guestAvatar">
        </div>
        <transition name="dropdown"
            enter-active-class="animated flipInX"
            leave-active-class="animated flipOutX">
            <div v-show="open" class="et-header__dropdown">
                <el-form class="et-header__sign-in" ref="form"
                    :model="data"
                    @keyup.enter.native="signIn">
                    <el-form-item class="et-form-item_hide">
                        <div ref="alert"></div>
                    </el-form-item>
                    <el-form-item prop="username">
                        <el-input v-model.trim="data.username"
                            :placeholder="$t('account.username')"
                            :maxlength="50"
                            :clearable="true">
                            <i slot="prefix" class="el-input__icon et-icon ei-user"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password"
                            v-model="data.password"
                            :placeholder="$t('account.password')"
                            :maxlength="50"
                            :clearable="true">
                            <i slot="prefix" class="el-input__icon et-icon ei-lock"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item class="et-form-item_right">
                        <el-button type="primary" @click="signIn">{{ $t("account.signIn") }}</el-button>
                        <el-button @click="signUp">{{ $t("account.signUp") }}</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </transition>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
import STORE_TYPES from '@/store/types';
import Clickoutside from 'element-ui/src/utils/clickoutside';
import Common from '@/common/common';
import Utils from '@/common/utils';
import validate from '@/common/validate';
import AccountApi from '@/common/api/account';
export default {
    name: 'EtLogin',
    directives: { Clickoutside },
    data () {
        return {
            data: {
                username: '',
                password: ''
            },
            guestAvatar: '/static/images/et-avatar.png',
            open: false,
            alert: null
        };
    },
    methods: {
        ...mapMutations({
            setIdentity: STORE_TYPES.SET_IDENTITY
        }),
        signIn () {
            const validateResult = validate(this.data, {
                username: [{ required: true, message: this.$t('account.noUsername') }],
                password: [{ required: true, message: this.$t('account.noPassword') }]
            });
            if (!validateResult.result) {
                this.alertMessage(validateResult.message);
                return;
            }
            AccountApi.signIn(this.data).then(response => {
                this.signInInit(response.data);
            }).catch(err => {
                this.alertError(err, {
                    400: this.$t('request.errorRequest'),
                    403: this.$t('account.errorPassword')
                });
            });
        },
        signUp () {
            const validateResult = validate(this.data, {
                username: [{ required: true, message: this.$t('account.noUsername') }, { validator: 'name' }],
                password: [{ required: true, message: this.$t('account.noPassword') }, { validator: 'password' }]
            });
            if (!validateResult.result) {
                this.alertMessage(validateResult.message);
                return;
            }
            AccountApi.signUp(this.data).then(response => {
                this.signInInit(response.data);
            }).catch(err => {
                this.alertError(err, {
                    400: this.$t('request.errorRequest'),
                    403: this.$t('account.signUpForbidden'),
                    409: this.$t('account.UsernameConflict')
                });
            });
        },
        signInInit (data) {
            Utils.setToken(data.token);
            this.setIdentity(data);
            this.dropdownClose();
        },
        alertError (err, messages) {
            const options = {
                message: err.response && messages[err.response.status] ?
                    messages[err.response.status] :
                    this.$t('request.errorConnection'),
                type: 'error',
                instance: this.alert
            };
            this.alert = Common.alert(this.$refs.alert, options);
        },
        alertMessage (message, type = 'info') {
            this.alert = Common.alert(this.$refs.alert, {
                message,
                type,
                instance: this.alert
            });
        },
        dropdownTrigger () {
            this.open = !this.open;
        },
        dropdownClose () {
            this.alert && this.alert.close();
            this.$refs.form.resetFields();
            this.open = false;
        }
    }
};
</script>
