<template>
    <header class="et-header">
        <div class="et-header__inner">
            <a class="et-header__logo"></a>
            <el-menu class="et-header__menu"
                mode="horizontal"
                :default-active="$route.name"
                :router="true">
                <el-menu-item index="home">
                    <i class="et-icon ei-home-fill"></i>{{ $t("header.home") }}
                </el-menu-item>
                <el-menu-item index="section">
                    <i class="et-icon ei-manage-fill"></i>{{ $t("header.section") }}
                </el-menu-item>
                <el-menu-item index="mark">
                    <i class="et-icon ei-like-fill"></i>{{ $t("header.favorite") }}
                </el-menu-item>
            </el-menu>
            <el-autocomplete class="et-header__search"
                v-model="searchStr"
                :placeholder="$t('header.search')"
                :fetch-suggestions="querySearch"
                :trigger-on-focus="false"
                @select="handleSelect">
                <i slot="prefix" class="el-input__icon et-icon ei-search"></i>
                <template slot-scope="scope">
                    <div>{{ scope.item }}</div>
                </template>
            </el-autocomplete>
            <el-button class="et-header__post" type="primary">
                {{ $t("header.post") }}
            </el-button>
            <el-dropdown v-if="isLogin" trigger="click">
                <div class="et-header__account">
                    <div class="et-header__avatar">
                        <img :src="avatarUrl">
                    </div>
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
            <et-login v-else></et-login>
            <el-dropdown trigger="click">
                <div class="et-header__menu_mobile">
                    <i class="et-icon ei-menu"></i>
                </div>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                        <i class="et-icon ei-home-fill"></i>{{ $t("header.home") }}
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <i class="et-icon ei-manage-fill"></i>{{ $t("header.section") }}
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <i class="et-icon ei-like-fill"></i>{{ $t("header.favorite") }}
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </header>
</template>

<script>
import Clickoutside from 'element-ui/src/utils/clickoutside';
import Common from '@/common/common';
import EtLogin from './login';
export default {
    name: 'EtHeader',
    components: { EtLogin },
    directives: { Clickoutside },
    data () {
        return {
            searchStr: '',
            avatarUrl: '/static/images/et-avatar.png',

            queryList: [{
                value: 'ABV',
                address: 'ABC'
            }]
        };
    },
    computed: {
        isLogin () {
            return Common.isLogin();
        }
    },
    methods: {
        querySearch (queryString, callback) {
            callback(this.queryList);
        },
        handleSelect (item) {
            console.warn(item);
        }
    }
};
</script>
