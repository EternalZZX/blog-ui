<template>
    <div class="et-layout">
        <et-nav :title="$t('section.nav.title')"
            :index.sync="loadType"
            :options="navOptions"
            @select="init">
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
import Section from '@/common/api/sections';
import Utils from '@/common/utils';
import { EVENT } from '@/common/bus';
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
            navOptions: {
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
                }]
            },
            loadType: 'all',
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
                backgroundImage: `url(${data.cover})`
            } : null;
        }
    }
};
</script>
