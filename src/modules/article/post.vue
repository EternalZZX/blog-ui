<template>
    <div class="et-layout">
        <et-nav :title="$t('post.nav.title')"
            :index.sync="loadType"
            :options="navOptions">
        </et-nav>

        <div class="et-content" ref="container">
            <div class="et-content__wrapper et-post">
                <template v-if="loadType === 'title'">
                    <et-photo-select-box
                        :data="cover"
                        icon="ei-camera"
                        size="large"
                        @click="photoSelectShow = true">
                        <span>{{ $t("post.coverPlaceholder") }}</span>
                    </et-photo-select-box>
                    <el-input class="et-post__input"
                        v-model.trim="data.title"
                        :placeholder="$t('post.titlePlaceholder')"
                        :maxlength="50"
                        :clearable="true">
                    </el-input>
                    <el-input class="et-post__input"
                        type="textarea"
                        v-model="data.overview"
                        :placeholder="$t('post.overviewPlaceholder')"
                        :rows="6"
                        :maxlength="300"
                        resize="none">
                    </el-input>
                    <div class="et-post__item">
                        <et-keywords v-model="data.keywords"></et-keywords>
                        <div class="et-post__section">
                            <i class="et-icon ei-manage"
                                :title="$t('post.section')">
                            </i>
                            <el-select v-model="data.section_name"
                                clearable
                                filterable
                                remote
                                default-first-option
                                :remote-method="getSections"
                                :loading="sectionLoading"
                                :placeholder="$t('post.sectionPlaceholder')">
                                <el-option v-for="item in sections"
                                    :key="item.name"
                                    :label="item.nick"
                                    :value="item.name">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="et-post__panel">
                        <i class="et-icon ei-pull-down"
                            @click="loadType = 'content'"></i>
                    </div>
                </template>
                <et-editor v-else-if="loadType === 'content'"
                    ref="editor"
                    v-model="data.content"
                    :length.sync="contentLength"
                    :max-length="contentMaxLength"
                    :style="{ height: containerHeight }">
                </et-editor>
            </div>
            <et-toolbar></et-toolbar>
        </div>

        <et-photo-select-dialog
            v-model="cover"
            :show.sync="photoSelectShow"
            :system-type="SYSTEM_TYPE.ARTICLE_COVER_ALBUM"
            :show-upload="true"
            :title="$t('section.edit.selectCover')">
        </et-photo-select-dialog>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Utils from '@/common/utils';
import Section from '@/common/api/sections';
import { ArticleApi } from '@/common/api/articles';
import { AlbumApi } from '@/common/api/albums';
export default {
    name: 'EtPost',
    data () {
        return {
            loadType: 'title',
            data: {
                title: '',
                overview: '',
                section_name: '',
                keywords: [],
                content: '',
                status: ArticleApi.STATUS.AUDIT,
                privacy: ArticleApi.PRIVACY.PUBLIC,
                read_level: 100
            },
            cover: null,
            contentLength: 0,
            contentMaxLength: 30000,
            sections: [],
            sectionLoading: false,
            photoSelectShow: false,
            containerHeight: null
        };
    },
    computed: {
        ...mapGetters({
            userUuid: 'userUuid'
        }),
        navOptions () {
            return {
                nav: [{
                    value: 'title',
                    label: this.$t('post.nav.basic')
                }, {
                    value: 'content',
                    label: this.$t('post.nav.content')
                }, {
                    value: 'advanced',
                    label: this.$t('post.nav.advanced')
                }]
            };
        },
        SYSTEM_TYPE () {
            return AlbumApi.SYSTEM;
        }
    },
    mounted () {
        this.containerHeight = this.getContainerHeight();
        window.onresize = () => {
            this.containerHeight = this.getContainerHeight();
        };
    },
    activated () {
        this.init();
    },
    methods: {
        init () {
            this.loadType = 'title';
        },
        getSections (query) {
            if (query !== '') {
                this.sectionLoading = true;
                Section.querySections(query).then(response => {
                    this.sectionLoading = false;
                    this.sections = response.data.sections;
                }).catch(err => {
                    this.sectionLoading = false;
                    Utils.errorLog(err, 'SECTION-QUERY');
                });
            } else {
                this.sections = [];
            }
        },
        getContainerHeight () {
            const contentStyle = getComputedStyle(document.getElementsByClassName('et-content')[0]),
                headerHeight = document.getElementsByClassName('et-header')[0].offsetHeight,
                footerHeight = document.getElementsByClassName('et-footer')[0].offsetHeight,
                paddingTop = parseInt(contentStyle.getPropertyValue('padding-top')),
                paddingBottom = parseInt(contentStyle.getPropertyValue('padding-bottom'));
            return `${document.body.clientHeight - headerHeight - footerHeight - paddingTop - paddingBottom}px`;
        }
    }
};
</script>
