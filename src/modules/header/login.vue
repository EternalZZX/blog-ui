<template>
    <div class="et-header__account"
        v-clickoutside="dropdownClose">
        <div class="et-header__avatar" @click="open = !open">
            <img :src="avatarUrl">
        </div>
        <div :class="['et-header__dropdown', {'open': open, 'close': open === false}]">
            <el-form class="et-header__sign-in" :model="data">
                <el-form-item class="et-form-item_alert">
                    <el-alert v-if="alert.show" :title="alert.message"
                        :type="alert.type">
                    </el-alert>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="data.username"
                        :placeholder="$t('header.username')"
                        :clearable="true">
                        <i slot="prefix" class="el-input__icon et-icon ei-user"></i>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-input type="password"
                        v-model="data.password"
                        :placeholder="$t('header.password')"
                        :clearable="true">
                        <i slot="prefix" class="el-input__icon et-icon ei-lock"></i>
                    </el-input>
                </el-form-item>
                <el-form-item class="et-form-item_right">
                    <el-button type="primary" @click="signIn">{{ $t("header.signIn") }}</el-button>
                    <el-button @click="signUp">{{ $t("header.signUp") }}</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
import STORE_TYPES from '@/store/types';
import Clickoutside from 'element-ui/src/utils/clickoutside';
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
            alert: {
                message: '',
                type: 'error',
                show: false
            },
            avatarUrl: '/static/images/et-avatar.png',
            open: null
        };
    },
    methods: {
        ...mapMutations({
            setIdentity: STORE_TYPES.SET_IDENTITY
        }),
        signIn () {
            AccountApi.signIn(this.data).then(response => {
                this.setIdentity(response.data);
                this.dropdownClose();
            }).catch(err => {
                // if (err.response.code === 403) {
                // } else {
                // }
                this.alert = {
                    message: this.$t('header.errorPassword'),
                    type: 'error',
                    show: true
                };
            });
        },
        signUp () {
            AccountApi.signUp(this.data).then(response => {
                this.setIdentity(response.data);
                this.dropdownClose();
            }).catch(err => {
                this.alert = {
                    message: this.$t('header.errorPassword'),
                    type: 'error',
                    show: true
                };
            });
        },
        dropdownClose () {
            this.open === true && (this.open = false);
        }
    }
};
</script>
