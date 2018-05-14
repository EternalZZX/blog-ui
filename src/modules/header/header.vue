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
                    <i class="et-icon ei-like-fill"></i>{{ $t("header.mark") }}
                </el-menu-item>
            </el-menu>
            <et-search></et-search>
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
                        <router-link :to="{ path:'home' }">
                            <i class="et-icon ei-home-fill"></i>{{ $t("header.home") }}
                        </router-link>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <router-link :to="{ path:'section' }">
                            <i class="et-icon ei-manage-fill"></i>{{ $t("header.section") }}
                        </router-link>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <router-link :to="{ path:'mark' }">
                            <i class="et-icon ei-like-fill"></i>{{ $t("header.mark") }}
                        </router-link>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </header>
</template>

<script>
import EtSearch from './search';
import EtAccount from './account';
export default {
    name: 'EtHeader',
    components: { EtSearch, EtAccount },
    data () {
        return {
        };
    },
    methods: {
    }
};
</script>
