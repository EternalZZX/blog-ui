<template>
    <div class="et-header__account">
        <el-dropdown v-if="hasIdentity" trigger="click">
            <div class="et-header__avatar">
                <img :src="identity.avatar">
            </div>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                    <i class="et-icon ei-user"></i>{{ $t("header.profile") }}
                </el-dropdown-item>
                <el-dropdown-item>
                    <i class="et-icon ei-setup"></i>{{ $t("header.setting") }}
                </el-dropdown-item>
                <el-dropdown-item>
                    <i class="et-icon ei-exit"></i>{{ $t("header.signOut") }}
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <div v-else v-clickoutside="dropdownClose">
            <div class="et-header__avatar" @click="dropdownTrigger">
                <img :src="avatarUrl">
            </div>
            <transition name="dropdown"
                enter-active-class="animated flipInX"
                leave-active-class="animated flipOutX">
                <div v-show="open" class="et-header__dropdown">
                    <el-form class="et-header__sign-in" :model="data">
                        <el-form-item class="et-form-item_hide">
                            <div ref="alert"></div>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model.trim="data.username"
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
            </transition>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapState, mapMutations } from 'vuex';
import STORE_TYPES from '@/store/types';
import Clickoutside from 'element-ui/src/utils/clickoutside';
import Common from '@/common/common';
import Utils from '@/common/utils';
import AccountApi from '@/common/api/account';
export default {
    name: 'EtAccount',
    directives: { Clickoutside },
    data () {
        return {
            data: {
                username: '',
                password: ''
            },
            avatarUrl: '/static/images/et-avatar.png',
            open: false,
            alert: null
        };
    },
    computed: {
        ...mapState({
            identity: 'identity'
        }),
        ...mapGetters({
            hasIdentity: 'hasIdentity'
        })
    },
    methods: {
        ...mapMutations({
            setIdentity: STORE_TYPES.SET_IDENTITY
        }),
        signIn () {
            if (this.validateForm(this.data)) {
                AccountApi.signIn(this.data).then(response => {
                    Utils.setToken(response.data.token);
                    this.setIdentity(response.data);
                    this.dropdownClose();
                }).catch(err => {
                    const options = {
                        type: 'error',
                        instance: this.alert
                    };
                    if (err.response.status === 403) {
                        options.message = this.$t('header.errorPassword');
                    } else {
                        options.message = this.$t('header.errorConnection');
                    }
                    this.alert = Common.alert(this.$refs.alert, options);
                });
            }
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
        validateForm (data) {
            const options = {
                type: 'info',
                instance: this.alert
            };
            if (data.username === '') {
                options.message = this.$t('header.noUsername');
            } else if (data.password === '') {
                options.message = this.$t('header.noPassword');
            } else {
                return true;
            }
            this.alert = Common.alert(this.$refs.alert, options);
            return false;
        },
        dropdownTrigger () {
            this.open = !this.open;
        },
        dropdownClose () {
            this.open = false;
        }
    }
};
</script>
