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
                            @click="loadType = 'content'">
                        </i>
                    </div>
                </template>
                <et-editor v-else-if="loadType === 'content'"
                    ref="editor"
                    v-model="data.content"
                    :length.sync="contentLength"
                    :max-length="contentMaxLength"
                    :style="{ height: containerHeight }">
                </et-editor>
                <template v-else-if="loadType === 'advanced'">
                    <el-form ref="form"
                        class="et-form et-block"
                        :model="data">
                        <el-form-item prop="privacy"
                            :label="$t('post.privacy')">
                            <el-switch v-model="data.privacy"
                                :active-value="PRIVACY.PRIVATE"
                                :inactive-value="PRIVACY.PUBLIC"
                                :disabled="privateDisabled">
                            </el-switch>
                        </el-form-item>
                        <el-form-item prop="read_level"
                            :label="$t('post.readLevel')"
                            v-perm:article-read-set>
                            <el-slider v-model="data.read_level"
                                :max="1000"
                                :step="10">
                            </el-slider>
                        </el-form-item>
                        <el-form-item prop="status"
                            :label="$t('post.audit')"
                            v-perm:article-audit-set>
                            <el-select v-model="data.status">
                                <el-option v-for="item in status"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <div class="et-block-panel">
                        <el-button @click="back">{{ $t("common.cancelButton") }}</el-button>
                        <el-button type="primary" @click="submit">{{ $t("common.submitButton") }}</el-button>
                    </div>
                </template>
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
import Permission from '@/common/permission';
import Validate from '@/common/validate';
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
            containerHeight: null,
            status: [{
                label: this.$t('status.cancel'),
                value: ArticleApi.STATUS.CANCEL
            }, {
                label: this.$t('status.active'),
                value: ArticleApi.STATUS.ACTIVE
            }, {
                label: this.$t('status.draft'),
                value: ArticleApi.STATUS.DRAFT
            }, {
                label: this.$t('status.audit'),
                value: ArticleApi.STATUS.AUDIT
            }, {
                label: this.$t('status.failed'),
                value: ArticleApi.STATUS.FAILED
            }, {
                label: this.$t('status.recycled'),
                value: ArticleApi.STATUS.RECYCLED
            }]
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
        privateDisabled () {
            return !Permission.hasPermission('article-private-set');
        },
        PRIVACY () {
            return ArticleApi.PRIVACY;
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
        submit () {
            //
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
        },
        back () {
            this.$router.go(-1);
        }
    }
};
</script>
