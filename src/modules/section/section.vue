<template>
    <div class="et-layout">
        <et-nav :title="$t('section.nav.title')"
            :index.sync="loadType"
            :options="navOptions"
            @select="init">
            <el-button slot="button" type="text"
                class="et-nav__button"
                v-perm:section-add
                @click="addSection">
                {{ $t("section.nav.add") }}
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

        <et-section-add v-perm:section-add
            :show.sync="sectionAddShow">
        </et-section-add>
    </div>
</template>

<script>
import { EVENT } from '@/common/bus';
import Utils from '@/common/utils';
import Permission from '@/common/permission';
import Section from '@/common/api/sections';
import EtSectionAdd from './section-add';
export default {
    name: 'EtSection',
    components: {
        EtSectionAdd
    },
    data () {
        return {
            dataList: [],
            params: {
                page: 1,
                page_size: 10
            },
            loadType: 'all',
            sectionAddShow: false
        };
    },
    computed: {
        navOptions () {
            return {
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
                menu: [{
                    icon: 'ei-round-plus',
                    label: this.$t('section.nav.create'),
                    event: this.addSection,
                    show: Permission.hasPermission('section-add')
                }]
            };
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
        addSection () {
            this.sectionAddShow = true;
        }
    }
};
</script>
