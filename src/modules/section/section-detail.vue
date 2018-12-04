<template>
    <div class="et-layout">
        <et-nav :title="$t('section.detail.nav.title')"
            :index.sync="loadType"
            :options="navOptions"
            @select="init">
            <el-button slot="button" type="text"
                class="et-nav__button"
                @click="back">
                {{ $t("common.back") }}
            </el-button>
        </et-nav>

        <div class="et-content">
            <et-scroll class="et-content__wrapper"
                ref="scroll"
                @more="loadMore">
                <et-section-card v-for="section in dataList"
                    :key="section.id"
                    :data="section">
                </et-section-card>
            </et-scroll>
            <et-toolbar></et-toolbar>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { EVENT } from '@/common/bus';
import Utils from '@/common/utils';
import Permission from '@/common/permission';
import Section from '@/common/api/sections';
export default {
    name: 'EtSectionDetail',
    data () {
        return {
            dataList: [],
            params: {
                page: 1,
                page_size: 10
            },
            loadType: 'all',
            manageType: 'none'
        };
    },
    computed: {
        ...mapGetters({
            userUuid: 'userUuid'
        }),
        navOptions () {
            return {
                nav: [{
                    value: 'all',
                    label: this.$t('section.detail.nav.all')
                }, {
                    value: 'hot',
                    label: this.$t('section.detail.nav.hot')
                }, {
                    value: 'upvoted',
                    label: this.$t('section.detail.nav.upvoted')
                }, {
                    value: 'mine',
                    label: this.$t('section.detail.nav.mine')
                }]
            };
        },
        sectionName () {
            return this.$route.params.name;
        }
    },
    mounted () {
        this.$root.Bus.$on(EVENT.TOKEN_REFRESH, () => {
            !this._inacitve && this.init();
        });
    },
    activated () {
        this.init();
    },
    methods: {
        init () {
            this.dataList = [];
            this.params.page = 1;
            this.loadType = 'all';
            this.$refs.scroll.reset();
        },
        loadMore (state) {
            if (!Permission.hasPermission('section-list')) {
                state.complete();
                return;
            }
            this.loadSections(state);
        },
        loadSections (state) {
            Section.list(this.params).then(response => {
                this.dataList = this.dataList.concat(response.data.sections);
                this.params.page ++;
                response.data.total === this.dataList.length ?
                    state.complete() :
                    state.loaded();
            }).catch(err => {
                state.complete();
                Utils.errorLog(err, 'SECTION-LIST');
            });
        },
        getManageType (data) {
            const roleObj = {
                isOwner: data.owner_uuid === this.userUuid,
                isModerator: data.moderator_uuids.indexOf(this.userUuid) !== -1,
                isAssistant: data.assistant_uuids.indexOf(this.userUuid) !== -1
            };
            return {
                ...roleObj,
                isController: roleObj.isOwner || roleObj.isModerator,
                isManager: roleObj.isOwner || roleObj.isModerator || roleObj.isAssistant
            };
        },
        back () {
            this.$router.go(-1);
        }
    }
};
</script>
