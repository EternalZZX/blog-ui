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
                <template slot-scope="{ item }">
                    <div>{{ item }}</div>
                </template>
            </el-autocomplete>
            <el-button class="et-header__post" type="primary">
                {{ $t("header.post") }}
            </el-button>
            <et-account></et-account>
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
import EtAccount from './account';
export default {
    name: 'EtHeader',
    components: { EtAccount },
    directives: { Clickoutside },
    data () {
        return {
            searchStr: '',
            queryList: [{
                value: 'ABV',
                address: 'ABC'
            }]
        };
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
