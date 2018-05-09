<template>
    <div class="et-header__account"
        v-clickoutside="dropdownClose">
        <div class="et-header__avatar" @click="open = !open">
            <img :src="avatarUrl">
        </div>
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
</template>

<script>
import Clickoutside from 'element-ui/src/utils/clickoutside';
export default {
    name: 'EtLogin',
    directives: { Clickoutside },
    data () {
        return {
            avatarUrl: '/static/images/et-avatar.png',
            open: null
        };
    },
    methods: {
        dropdownClose () {
            this.open === true && (this.open = false);
        }
    }
};
</script>
