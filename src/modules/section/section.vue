<template>
    <div class="et-layout">
        <nav class="et-nav">
            <div class="et-nav__wrapper">
                <div class="et-nav__header">
                    <span class="et-nav__title">{{ $t("section.nav.title") }}</span>
                    <el-button class="et-nav__button" type="text">{{ $t("section.nav.create") }}</el-button>
                </div>
                <div class="et-nav__body">
                    <el-menu>
                        <el-menu-item index="1">
                            <span slot="title">{{ $t("section.nav.all") }}</span>
                        </el-menu-item>
                        <el-menu-item index="2">
                            <span slot="title">{{ $t("section.nav.hot") }}</span>
                        </el-menu-item>
                        <el-menu-item index="3">
                            <span slot="title">{{ $t("section.nav.follow") }}</span>
                        </el-menu-item>
                        <el-menu-item index="4">
                            <span slot="title">{{ $t("section.nav.manage") }}</span>
                        </el-menu-item>
                    </el-menu>
                </div>
            </div>
        </nav>
        <div class="et-content">
            <div class="et-content__wrapper">
                <div class="et-card">
                    <div class="et-card__cover"></div>
                    <div class="et-card__body">
                        <div class="et-card__body_left">
                            <a class="et-card__title">Section Title</a>
                            <span class="et-card__description">section description section description</span>
                        </div>
                        <div class="et-card__body_right">
                            <span>content</span>
                        </div>
                    </div>
                </div>
                <div class="et-card">
                    <div class="et-card__cover"></div>
                    <div class="et-card__body">
                        <div class="et-card__body_left">
                            <a class="et-card__title">Section Title</a>
                            <span class="et-card__description">section description section description</span>
                        </div>
                        <div class="et-card__body_right">
                            <span>content</span>
                        </div>
                    </div>
                </div>
                <div class="et-card">
                    <div class="et-card__cover"></div>
                    <div class="et-card__body">
                        <div class="et-card__body_left">
                            <a class="et-card__title">Section Title</a>
                            <span class="et-card__description">section description section description</span>
                        </div>
                        <div class="et-card__body_right">
                            <span>content</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="et-toolbar">
                <div class="et-toolbar__header">
                    <span class="et-toolbar__title">ToolBar</span>
                </div>
                <div class="et-toolbar__body">
                    Content
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'EtSection',
    data () {
        return {
        };
    },
    methods: {
    }
};
</script>
