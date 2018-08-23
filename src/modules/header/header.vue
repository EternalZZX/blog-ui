<template>
    <header class="et-header">
        <div class="et-header__inner">
            <a class="et-header__logo"></a>
            <el-menu class="et-header__menu"
                mode="horizontal"
                :default-active="$route.name">
                <el-menu-item index="home">
                    <router-link :to="{ name: 'home' }">
                        <i class="et-icon ei-home-fill"></i>{{ $t("header.home") }}
                    </router-link>
                </el-menu-item>
                <el-menu-item index="section">
                    <router-link :to="{ name: 'section' }">
                        <i class="et-icon ei-manage-fill"></i>{{ $t("header.section") }}
                    </router-link>
                </el-menu-item>
                <el-menu-item index="mark">
                    <router-link :to="{ name: 'mark' }">
                        <i class="et-icon ei-like-fill"></i>{{ $t("header.mark") }}
                    </router-link>
                </el-menu-item>
            </el-menu>
            <et-search></et-search>
            <el-button class="et-header__post" type="primary">
                {{ $t("header.post") }}
            </el-button>
            <el-dropdown trigger="click">
                <div class="et-header__menu_mobile">
                    <i class="et-icon ei-menu"></i>
                </div>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item class="et-dropdown__item_router">
                        <router-link :to="{ name: 'home' }">
                            <i class="et-icon ei-home-fill"></i>{{ $t("header.home") }}
                        </router-link>
                    </el-dropdown-item>
                    <el-dropdown-item class="et-dropdown__item_router">
                        <router-link :to="{ name: 'section' }">
                            <i class="et-icon ei-manage-fill"></i>{{ $t("header.section") }}
                        </router-link>
                    </el-dropdown-item>
                    <el-dropdown-item class="et-dropdown__item_router">
                        <router-link :to="{ name: 'mark' }">
                            <i class="et-icon ei-like-fill"></i>{{ $t("header.mark") }}
                        </router-link>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <et-account></et-account>
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
