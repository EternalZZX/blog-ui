<template>
    <header class="et-header">
        <div class="et-header__inner">
            <div class="et-header__logo">
                <img src="/static/images/et-logo-text.png">
            </div>
            <el-menu class="et-header__menu"
                default-active="home"
                mode="horizontal"
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
            <div class="et-header__account"
                v-clickoutside="dropdownClose"
                @click="open = !open">
                <img class="et-header__avatar" :src="avatarUrl">
                <div :class="['et-header__dropdown', {'open': open, 'close': open === false}]">
                    <el-form class="et-header__sign-in">
                        <el-form-item class="et-form-item_alert">
                            <el-alert
                                :title="$t('header.errorPassword')"
                                type="error">
                            </el-alert>
                        </el-form-item>
                        <el-form-item>
                            <el-input :placeholder="$t('header.username')"
                                :clearable="true">
                                <i slot="prefix" class="el-input__icon et-icon ei-user"></i>
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input type="password"
                                :placeholder="$t('header.password')"
                                :clearable="true">
                                <i slot="prefix" class="el-input__icon et-icon ei-lock"></i>
                            </el-input>
                        </el-form-item>
                        <el-form-item class="et-form-item_right">
                            <el-button type="primary">{{ $t("header.signIn") }}</el-button>
                            <el-button>{{ $t("header.signUp") }}</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
import Clickoutside from 'element-ui/src/utils/clickoutside';
export default {
    name: 'et-header',
    directives: { Clickoutside },
    data () {
        return {
            searchStr: '',
            avatarUrl: '/static/images/et-avatar.png',
            open: null,

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
        },
        dropdownClose () {
            this.open === true && (this.open = false);
        }
    }
};
</script>
