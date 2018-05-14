<template>
    <div class="et-header__account">
        <el-dropdown v-if="hasIdentity"
            trigger="click"
            @command="handleCommand">
            <div class="et-header__avatar">
                <img :src="identity.avatar">
            </div>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="profile">
                    <i class="et-icon ei-user"></i>{{ $t("header.profile") }}
                </el-dropdown-item>
                <el-dropdown-item command="setting">
                    <i class="et-icon ei-setup"></i>{{ $t("header.setting") }}
                </el-dropdown-item>
                <el-dropdown-item command="exit">
                    <i class="et-icon ei-exit"></i>{{ $t("header.signOut") }}
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <et-login v-else></et-login>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import STORE_TYPES from '@/store/types';
import Common from '@/common/common';
import Utils from '@/common/utils';
import EtLogin from './login';
export default {
    name: 'EtAccount',
    components: { EtLogin },
    data () {
        return {
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
            deleteIdentity: STORE_TYPES.DELETE_IDENTITY
        }),
        signOut () {
            this.deleteIdentity();
            Utils.deleteToken();
            Common.guestLogin();
        },
        handleCommand (command) {
            const operate = {
                'profile': null,
                'setting': null,
                'exit': this.signOut
            };
            operate[command].call();
        }
    }
};
</script>
