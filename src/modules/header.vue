<template>
    <header class="et-header">
        <div class="et-header__inner">
            <div class="et-header__logo">
                <img src="images/et-logo-text.png">
            </div>
            <el-menu class="et-header__menu"
                default-active="1"
                mode="horizontal"
                :router="true">
                <el-menu-item index="1">
                    <i class="et-icon ei-home-fill"></i>{{ $t("header.home") }}
                </el-menu-item>
                <el-menu-item index="2">
                    <i class="et-icon ei-manage-fill"></i>{{ $t("header.section") }}
                </el-menu-item>
                <el-menu-item index="3">
                    <i class="et-icon ei-like-fill"></i>{{ $t("header.favorite") }}
                </el-menu-item>
            </el-menu>
            <el-input class="et-header__search"
                v-model="search_str"
                placeholder="搜索新发现...">
                <i slot="prefix" class="el-input__icon et-icon ei-search"></i>
            </el-input>
            <el-button class="et-header__post" type="primary">
                {{ $t("header.post") }}
            </el-button>
            <div class="et-header__account">
                <img class="et-header__avatar" :src="avatar_url">
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name: 'et-header',
    data () {
        return {
            search_str: '',
            avatar_url: 'images/et-avatar.png'
        };
    }
};
</script>
