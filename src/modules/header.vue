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
        </div>
    </header>
</template>
