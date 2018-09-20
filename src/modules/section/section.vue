<template>
    <div class="et-layout">
        <et-nav :title="$t('section.nav.title')"
            :index.sync="loadType"
            :menu="nav">
            <el-button slot="button" type="text"
                class="et-nav__button"
                v-perm:section-add
                @click="sectionAddShow = true">
                {{ $t("section.nav.create") }}
            </el-button>
        </et-nav>
        <div class="et-content">
            <et-scroll class="et-content__wrapper"
                ref="scroll"
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
                            <span @click="sectionAddShow = true">{{ section.create_at | date }}</span>
                        </div>
                    </div>
                </div>
            </et-scroll>
            <et-toolbar></et-toolbar>
        </div>

        <et-section-add v-perm:section-add
            :show.sync="sectionAddShow">
        </et-section-add>
    </div>
</template>

<script>
import Section from '@/common/api/sections';
import Utils from '@/common/utils';
import { EVENT } from '@/common/bus';
import EtSectionAdd from './section-add';
export default {
    name: 'EtSection',
    components: { EtSectionAdd },
    data () {
        return {
            dataList: [],
            params: {
                page: 1,
                page_size: 10
            },
            nav: [{
                value: 'all',
                label: this.$t('section.nav.all')
            }, {
                value: 'hot',
                label: this.$t('section.nav.hot')
            }, {
                value: 'follow',
                label: this.$t('section.nav.follow')
            }, {
                value: 'manage',
                label: this.$t('section.nav.manage')
            }],
            loadType: 'all',
            hashCode: Utils.randString(),
            sectionAddShow: false
        };
    },
    mounted () {
        this.$root.Bus.$on(EVENT.TOKEN_REFRESH, () => {
            !this._inacitve && this.init();
        });
    },
    methods: {
        init () {
            this.dataList = [];
            this.params.page = 1;
            this.loadType = 'all';
            this.hashCode = Utils.randString();
            this.sectionAddShow = false;
            this.$refs.scroll.reset();
        },
        loadMore (state) {
            Section.list(this.params).then(response => {
                this.dataList = this.dataList.concat(response.data.sections);
                this.params.page ++;
                response.data.total === this.dataList.length ?
                    state.complete() :
                    state.loaded();
            }).catch(err => {
                Utils.errorLog(err, 'SECTION-LIST');
            });
        },
        getCover (data) {
            return data.cover ? {
                backgroundImage: `url(${data.cover}?hash=${this.hashCode})`
            } : null;
        }
    }
};
</script>
