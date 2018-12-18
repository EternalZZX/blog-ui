<template>
    <div class="et-layout">
        <et-nav :title="$t('article.create.nav.title')"
            :index.sync="loadType"
            :options="navOptions">
            <el-button slot="button" type="text"
                class="et-nav__button"
                @click="back">
                {{ $t("common.back") }}
            </el-button>
        </et-nav>

        <div class="et-content" ref="container">
            <div class="et-content__wrapper et-post">
                <template v-if="loadType === 'title'">
                    <et-photo-select-box
                        :data="cover"
                        icon="ei-camera"
                        size="large"
                        @click="photoSelectShow = true">
                        <span>{{ $t("article.create.coverPlaceholder") }}</span>
                    </et-photo-select-box>
                    <el-input class="et-post__input"
                        v-model.trim="data.title"
                        :placeholder="$t('article.create.titlePlaceholder')"
                        :maxlength="50"
                        :clearable="true">
                    </el-input>
                    <el-input class="et-post__input"
                        type="textarea"
                        v-model="data.overview"
                        :placeholder="$t('article.create.overviewPlaceholder')"
                        :rows="6"
                        :maxlength="300"
                        resize="none">
                    </el-input>
                    <div class="et-post__item">
                        <et-keywords v-model="data.keywords"></et-keywords>
                        <div class="et-post__section">
                            <i class="et-icon ei-manage"
                                :title="$t('article.create.section')">
                            </i>
                            <el-select v-model="data.section_name"
                                clearable
                                filterable
                                remote
                                default-first-option
                                :remote-method="getSections"
                                :loading="sectionLoading"
                                :placeholder="$t('article.create.sectionPlaceholder')">
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
                            :label="$t('article.create.privacy')">
                            <el-switch v-model="data.privacy"
                                :active-value="PRIVACY.PRIVATE"
                                :inactive-value="PRIVACY.PUBLIC"
                                :disabled="privateDisabled">
                            </el-switch>
                        </el-form-item>
                        <el-form-item prop="read_level"
                            :label="$t('article.create.readLevel')"
                            v-perm:article-read-set>
                            <el-slider v-model="data.read_level"
                                :max="1000"
                                :step="10">
                            </el-slider>
                        </el-form-item>
                        <el-form-item prop="status"
                            :label="$t('article.create.audit')"
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
import Common from '@/common/common';
import Utils from '@/common/utils';
import Permission from '@/common/permission';
import Validate from '@/common/validate';
import Section from '@/common/api/sections';
import Article, { ArticleApi } from '@/common/api/articles';
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
                    label: this.$t('article.create.nav.basic')
                }, {
                    value: 'content',
                    label: this.$t('article.create.nav.content')
                }, {
                    value: 'advanced',
                    label: this.$t('article.create.nav.advanced')
                }],
                menu: [{
                    icon: 'ei-pull-up',
                    label: this.$t('article.create.nav.create'),
                    event: this.submit
                }]
            };
        },
        isCreate () {
            return !this.$route.params.uuid;
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
            if (!this.isCreate) {
                this.getArticle(this.$route.params.uuid);
            }
        },
        submit () {
            const validateResult = Validate.test(this.data, {
                title: [{ required: true, message: this.$t('article.validate.title'), callback: this.goTitle }],
                content: [{ required: true, message: this.$t('article.validate.content'), callback: this.goConetnt }]
            });
            if (!validateResult.result) {
                Common.notify(validateResult.message);
                validateResult.callback();
                return;
            }
            this.isCreate ? this.createArticle() : this.updateArticle();
        },
        createArticle () {
            Article.create(
                this.formatParams(this.data)
            ).then(response => {
                this.back();
                Common.notify(this.$t('article.create.success'), 'success');
            }).catch(err => {
                Utils.errorLog(err, 'ARTICLE-CREATE');
                Common.notify(Utils.errorMessage(err,
                    this.$t('article.create.error')
                ), 'error');
            });
        },
        updateArticle () {
            Article.update(
                this.data.uuid,
                this.formatParams(this.data)
            ).then(response => {
                this.back();
                Common.notify(this.$t('article.create.success'), 'success');
            }).catch(err => {
                Utils.errorLog(err, 'ARTICLE-UPDATE');
                Common.notify(Utils.errorMessage(err,
                    this.$t('article.create.error')
                ), 'error');
            });
        },
        getArticle (uuid) {
            Article.get(uuid).then(response => {
                this.data = this.formatData(response.data);
            }).catch(err => {
                Utils.errorLog(err, 'ARTICLE-GET');
            });
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
        formatData (data) {
            const article = {
                uuid: data.uuid,
                title: data.title,
                overview: data.overview,
                section_name: data.section.name,
                keywords: data.keywords.split(','),
                content: data.content,
                status: data.status,
                privacy: data.privacy,
                read_level: data.read_level
            };
            this.sections = data.section ? [data.section] : [];
            this.cover = data.cover ? {
                uuid: data.cover.split('/').pop().split('.')[0],
                image_middle: data.cover
            } : null;
            return article;
        },
        formatParams (data) {
            const params = { ...data };
            params.keywords = data.keywords.join(',');
            params.cover_uuid = this.cover ? this.cover.uuid : '';
            params.file_storage = true;
            return params;
        },
        getContainerHeight () {
            const contentStyle = getComputedStyle(document.getElementsByClassName('et-content')[0]),
                headerHeight = document.getElementsByClassName('et-header')[0].offsetHeight,
                footerHeight = document.getElementsByClassName('et-footer')[0].offsetHeight,
                paddingTop = parseInt(contentStyle.getPropertyValue('padding-top')),
                paddingBottom = parseInt(contentStyle.getPropertyValue('padding-bottom'));
            return `${document.body.clientHeight - headerHeight - footerHeight - paddingTop - paddingBottom}px`;
        },
        goTitle () {
            this.loadType = 'title';
        },
        goConetnt () {
            this.loadType = 'content';
        },
        back () {
            this.$router.go(-1);
        }
    }
};
</script>
