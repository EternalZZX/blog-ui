<template>
    <div class="et-layout">
        <nav class="et-nav">
            <div class="et-nav__wrapper">
                <div class="et-nav__header">
                    <span class="et-nav__title">{{ $t("section.nav.title") }}</span>
                    <el-button class="et-nav__button" type="text"
                        v-perm:section-add
                        @click="sectionAddShow = true">
                        {{ $t("section.nav.create") }}
                    </el-button>
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
            <et-scroll class="et-content__wrapper"
                v-model="loadStatus"
                @more="loadMore">
                <div class="et-card" :class="{ disabled: !section.read_permission }"
                    v-for="section in dataList" :key="section.id">
                    <div class="et-card__cover" :style="getCover(section)"></div>
                    <div class="et-card__body">
                        <div class="et-card__body_left">
                            <a class="et-card__title">
                                {{ section.nick | none }}
                            </a>
                            <span class="et-card__description">
                                {{ section.description | none }}
                            </span>
                        </div>
                        <div class="et-card__body_right">
                            <span>
                                <i v-if="!section.read_permission"
                                    class="et-icon ei-lock"
                                    :title="$t('section.card.noPermission')">
                                </i>
                                <el-popover placement="left" trigger="click">
                                    <div class="et-card__popover">
                                        <el-form label-position="top">
                                            <el-form-item :label="$t('section.card.owner')">
                                                <et-user :user="section.owner"></et-user>
                                            </el-form-item>
                                            <el-form-item v-if="section.moderators.length"
                                                :label="$t('section.card.moderator')">
                                                <et-user v-for="moderator in section.moderators"
                                                    :key="moderator.uuid"
                                                    :user="moderator">
                                                </et-user>
                                            </el-form-item>
                                            <el-form-item v-if="section.assistants.length"
                                                :label="$t('section.card.assistant')">
                                                <et-user v-for="assistant in section.assistants"
                                                    :key="assistant.uuid"
                                                    :user="assistant">
                                                </et-user>
                                            </el-form-item>
                                        </el-form>
                                    </div>
                                    <i class="et-card__popover_button et-icon ei-group"
                                        slot="reference"
                                        :title="$t('section.card.detail')">
                                    </i>
                                </el-popover>
                            </span>
                            <span>{{ section.create_at | time }}</span>
                        </div>
                    </div>
                </div>
            </et-scroll>
            <div class="et-toolbar">
                <div class="et-toolbar__header">
                    <span class="et-toolbar__title">ToolBar</span>
                </div>
                <div class="et-toolbar__body">
                    Advertise
                </div>
            </div>
        </div>

        <et-dialog v-perm:section-add
            v-model="sectionAddShow"
            :title="$t('section.create.title')">
            <et-section-add></et-section-add>
        </et-dialog>
    </div>
</template>

<script>
import SectionApi from '@/common/api/sections';
import Utils from '@/common/utils';
import { EVENT } from '@/common/bus';
import EtSectionAdd from './section-add';
export default {
    name: 'EtSection',
    components: { EtSectionAdd },
    data () {
        return {
            dataList: [],
            loadStatus: 'active',
            params: {
                page: 1,
                page_size: 10
            },
            hashCode: Utils.randString(),
            sectionAddShow: false
        };
    },
    mounted () {
        this.$root.Bus.$on(EVENT.REFRESH, this.init);
    },
    methods: {
        init () {
            this.dataList = [];
            this.params.page = 1;
            this.hashCode = Utils.randString();
            this.loadMore();
        },
        loadMore () {
            SectionApi.list(this.params).then(response => {
                this.dataList = this.dataList.concat(response.data.sections);
                this.loadStatus = response.data.total === this.dataList.length ? 'end' : 'active';
                this.params.page ++;
            }).catch(err => {
                Utils.errorLog(err, 'SECTION-LIST');
            });
        },
        getCover (section) {
            return section.cover ? {
                backgroundImage: `url(${section.cover}?hash=${this.hashCode})`
            } : null;
        }
    }
};
</script>
