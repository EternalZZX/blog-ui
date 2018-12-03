<template>
    <div class="et-layout">
        <et-nav :title="$t('section.edit.nav.title')"
            :index.sync="loadType"
            :options="navOptions"
            @select="scroll">
            <el-button slot="button" type="text"
                class="et-nav__button"
                @click="back">
                {{ $t("common.back") }}
            </el-button>
        </et-nav>

        <div class="et-content">
            <div class="et-content__wrapper">
                <el-form ref="form"
                    class="et-form et-block"
                    :rules="rules"
                    :model="data">
                    <el-form-item prop="name"
                        :label="$t('section.create.name')">
                        <el-input v-model.trim="data.name"
                            :placeholder="$t('section.create.namePlaceholder')"
                            :maxlength="50"
                            :clearable="true">
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="nick"
                        :label="$t('section.create.nick')">
                        <el-input v-model.trim="data.nick"
                            :placeholder="$t('section.create.nickPlaceholder')"
                            :maxlength="50"
                            :clearable="true">
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="description"
                        :label="$t('section.create.description')">
                        <el-input type="textarea"
                            v-model.trim="data.description"
                            :placeholder="$t('section.create.descriptionPlaceholder')"
                            :rows="2"
                            :maxlength="300"
                            resize="none">
                        </el-input>
                    </el-form-item>
                    <el-form-item :label="$t('section.create.cover')">
                        <div class="et-photo-select" @click="photoSelectShow = true">
                            <img :src="cover.image_small" v-if="cover">
                            <i class="et-icon ei-plus" v-else></i>
                        </div>
                    </el-form-item>
                    <et-collapse ref="advanced"
                        :title="$t('common.advanced')"
                        :show.sync="advancedCollapseShow">
                        <el-form-item prop="owner_uuid"
                            :label="$t('section.create.owner')">
                            <el-select v-model="data.owner_uuid"
                                filterable
                                remote
                                default-first-option
                                :remote-method="getUsers"
                                :loading="userLoading"
                                :placeholder="$t('section.create.ownerPlaceholder')">
                                <el-option v-for="item in users"
                                    :key="item.uuid"
                                    :label="item.nick"
                                    :value="item.uuid">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="moderator_uuids"
                            :label="$t('section.create.moderator')">
                            <el-select v-model="data.moderator_uuids"
                                multiple
                                filterable
                                remote
                                default-first-option
                                :remote-method="getUsers"
                                :loading="userLoading"
                                :placeholder="$t('section.create.moderatorPlaceholder')">
                                <el-option v-for="item in users"
                                    :key="item.uuid"
                                    :label="item.nick"
                                    :value="item.uuid">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="assistant_uuids"
                            :label="$t('section.create.assistant')">
                            <el-select v-model="data.assistant_uuids"
                                multiple
                                filterable
                                remote
                                default-first-option
                                :remote-method="getUsers"
                                :loading="userLoading"
                                :placeholder="$t('section.create.assistantPlaceholder')">
                                <el-option v-for="item in users"
                                    :key="item.uuid"
                                    :label="item.nick"
                                    :value="item.uuid">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="status"
                            :label="$t('section.create.status')">
                            <el-select v-model="data.status">
                                <el-option v-for="item in status"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="read_level"
                            :label="$t('section.create.readLevel')">
                            <el-slider v-model="data.read_level"
                                :max="1000"
                                :step="10">
                            </el-slider>
                        </el-form-item>
                        <el-form-item prop="only_roles"
                            :label="$t('section.create.onlyRoles')">
                            <el-switch v-model="data.only_roles"></el-switch>
                        </el-form-item>
                        <el-form-item prop="role_ids"
                            :label="$t('section.create.roles')"
                            v-show="data.only_roles">
                            <el-select v-model="data.role_ids"
                                multiple
                                filterable
                                remote
                                default-first-option
                                :remote-method="getRoles"
                                :loading="roleLoading"
                                :placeholder="$t('section.create.rolesPlaceholder')">
                                <el-option v-for="item in roles"
                                    :key="item.id"
                                    :label="item.nick"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </et-collapse>
                    <et-collapse ref="policy"
                        :title="$t('section.edit.nav.policy')"
                        :show.sync="policyCollapseShow">
                        <el-form-item prop="policy.auto_audit"
                            :label="$t('section.edit.policy.autoAudit')">
                            <el-switch v-model="data.policy.auto_audit"></el-switch>
                        </el-form-item>
                        <el-form-item prop="policy.article_mute"
                            :label="$t('section.edit.policy.articleMute')">
                            <el-switch v-model="data.policy.article_mute"></el-switch>
                        </el-form-item>
                        <el-form-item prop="policy.reply_mute"
                            :label="$t('section.edit.policy.replyMute')">
                            <el-switch v-model="data.policy.reply_mute"></el-switch>
                        </el-form-item>
                        <el-form-item prop="policy.max_articles"
                            :label="$t('section.edit.policy.maxArticles')">
                            <el-input v-model.trim="data.policy.max_articles"
                                :placeholder="$t('section.edit.policy.maxArticlesPlaceholder')"
                                :maxlength="8"
                                :clearable="true">
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="policy.max_articles_one_day"
                            :label="$t('section.edit.policy.maxArticlesOneDay')">
                            <el-input v-model.trim="data.policy.max_articles_one_day"
                                :placeholder="$t('section.edit.policy.maxArticlesOneDayPlaceholder')"
                                :maxlength="8"
                                :clearable="true">
                            </el-input>
                        </el-form-item>
                    </et-collapse>
                    <et-collapse ref="permission"
                        :title="$t('section.edit.nav.permission')"
                        :show.sync="permissionCollapseShow">
                        <el-form-item v-for="(value, key) in data.permission"
                            :key="key"
                            :prop="`permission.${key}`"
                            :label="$t(`section.edit.permission.${key}`)">
                            <el-radio-group v-model="data.permission[key]">
                                <el-radio v-for="role in permissionRoles"
                                    :key="role.value"
                                    :label="role.value">
                                    {{ role.label }}
                                </el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </et-collapse>
                </el-form>
                <div class="et-block-panel">
                    <el-button @click="back">{{ $t("common.cancelButton") }}</el-button>
                    <el-button type="primary" @click="submit">{{ $t("common.submitButton") }}</el-button>
                </div>
            </div>
            <et-toolbar></et-toolbar>
        </div>

        <et-photo-select-dialog
            v-model="cover"
            :show.sync="photoSelectShow"
            :system-type="SYSTEM_TYPE.SECTION_COVER_ALBUM"
            :title="$t('section.edit.selectCover')">
        </et-photo-select-dialog>
    </div>
</template>

<script>
import Common from '@/common/common';
import Utils from '@/common/utils';
import Permission from '@/common/permission';
import Validate from '@/common/validate';
import User from '@/common/api/users';
import Role from '@/common/api/roles';
import { AlbumApi } from '@/common/api/albums';
import Section, { SectionApi } from '@/common/api/sections';
export default {
    name: 'EtSectionSetting',
    data () {
        return {
            loadType: 'all',
            data: {
                name: '',
                nick: '',
                description: '',
                owner_uuid: '',
                moderator_uuids: [],
                assistant_uuids: [],
                status: SectionApi.STATUS.NORMAL,
                read_level: 100,
                only_roles: false,
                role_ids: [],
                policy: {
                    auto_audit: true,
                    article_mute: false,
                    reply_mute: false,
                    max_articles: '',
                    max_articles_one_day: ''
                },
                permission: {
                    set_permission: 0,
                    delete_permission: 0,
                    set_owner: 0,
                    set_name: 0,
                    set_nick: 0,
                    set_description: 0,
                    set_cover: 0,
                    set_moderator: 0,
                    set_assistant: 0,
                    set_status: 0,
                    set_cancel: 0,
                    cancel_visible: 0,
                    set_read_level: 0,
                    set_read_user: 0,
                    set_policy: 0,
                    article_audit: 0,
                    article_edit: 0,
                    article_draft: 0,
                    article_recycled: 0,
                    article_cancel: 0,
                    article_delete: 0,
                    comment_audit: 0,
                    comment_edit: 0,
                    comment_recycled: 0,
                    comment_cancel: 0,
                    comment_delete: 0
                }
            },
            cover: null,
            photoSelectShow: false,
            advancedCollapseShow: false,
            policyCollapseShow: false,
            permissionCollapseShow: false,
            users: [],
            userLoading: false,
            roles: [],
            roleLoading: false,
            status: [{
                label: this.$t('section.status.normal'),
                value: SectionApi.STATUS.NORMAL
            }, {
                label: this.$t('section.status.hide'),
                value: SectionApi.STATUS.HIDE
            }, {
                label: this.$t('section.status.cancel'),
                value: SectionApi.STATUS.CANCEL
            }],
            permissionRoles: [{
                label: this.$t('section.edit.permissionRoles.owner'),
                value: SectionApi.PERMISSION.OWNER
            }, {
                label: this.$t('section.edit.permissionRoles.moderator'),
                value: SectionApi.PERMISSION.MODERATOR
            }, {
                label: this.$t('section.edit.permissionRoles.manager'),
                value: SectionApi.PERMISSION.MANAGER
            }],
            rules: {
                name: [{ required: true, validator: Validate.name, trigger: 'blur' }],
                nick: [{ required: true, validator: Validate.none, trigger: 'blur' }],
                owner_uuid: [{ required: true, validator: Validate.none, trigger: 'change' }]
            }
        };
    },
    computed: {
        navOptions () {
            return {
                nav: [{
                    value: 'form',
                    label: this.$t('section.edit.nav.basic')
                }, {
                    value: 'advanced',
                    label: this.$t('section.edit.nav.advanced')
                }, {
                    value: 'policy',
                    label: this.$t('section.edit.nav.policy')
                }, {
                    value: 'permission',
                    label: this.$t('section.edit.nav.permission')
                }],
                menu: [{
                    icon: 'ei-trash',
                    label: this.$t('section.edit.nav.delete'),
                    event: this.deleteSection,
                    disabled: !Permission.hasPermission('section-delete')
                }]
            };
        },
        sectionName () {
            return this.$route.params.name;
        },
        SYSTEM_TYPE () {
            return AlbumApi.SYSTEM;
        }
    },
    activated () {
        this.init();
    },
    methods: {
        init () {
            this.getSection();
        },
        submit () {
            this.$refs.form.validate(valid => {
                valid && this.updateSection();
            });
        },
        getSection () {
            Section.get(this.sectionName).then(response => {
                this.data = this.formatData(response.data);
            }).catch(err => {
                Utils.errorLog(err, 'SECTION-GET');
            });
        },
        updateSection () {
            Section.update(
                this.sectionName,
                this.formatParams(this.data)
            ).then(response => {
                Common.notify(this.$t('section.edit.success'), 'success');
            }).catch(err => {
                Utils.errorLog(err, 'SECTION-UPDATE');
                Common.notify(Utils.errorMessage(err,
                    this.$t('section.edit.error')
                ), 'error');
            });
        },
        deleteSection () {
            //
        },
        getUsers (query) {
            if (query !== '') {
                this.userLoading = true;
                User.queryUsers(query).then(response => {
                    this.userLoading = false;
                    this.users = response.data.users;
                }).catch(err => {
                    this.userLoading = false;
                    Utils.errorLog(err, 'USER-QUERY');
                });
            } else {
                this.users = [];
            }
        },
        getRoles (query) {
            if (query !== '') {
                this.roleLoading = true;
                Role.queryRoles(query).then(response => {
                    this.roleLoading = false;
                    this.roles = response.data.roles;
                }).catch(err => {
                    this.roleLoading = false;
                    Utils.errorLog(err, 'ROLE-QUERY');
                });
            } else {
                this.roles = [];
            }
        },
        formatData (data) {
            const section = {
                name: data.name,
                nick: data.nick,
                description: data.description,
                owner_uuid: data.owner.uuid,
                moderator_uuids: data.moderators.map(item => item.uuid),
                assistant_uuids: data.assistants.map(item => item.uuid),
                status: data.status,
                read_level: data.read_level,
                only_roles: data.only_roles,
                role_ids: data.roles.map(item => item.id),
                policy: {},
                permission: {}
            };
            for (const key of Object.keys(this.data.policy)) {
                section.policy[key] = data.policy[key];
            }
            for (const key of Object.keys(this.data.permission)) {
                section.permission[key] = data.permission[key];
            }
            this.cover = data.cover ? {
                uuid: data.cover.split('/').pop().split('.')[0],
                image_small: data.cover
            } : null;
            const users = [data.owner].concat(data.moderators).concat(data.assistants);
            const obj = {};
            this.users = users.reduce((arr, item) => {
                if (!obj[item.uuid]) {
                    obj[item.uuid] = true;
                    arr.push(item);
                }
                return arr;
            }, []);
            this.roles = data.roles;
            return section;
        },
        formatParams (data) {
            const params = {
                name: data.name,
                nick: data.nick,
                description: data.description,
                cover_uuid: this.cover ? this.cover.uuid : '',
                owner_uuid: data.owner_uuid,
                moderator_uuids: data.moderator_uuids.join(','),
                assistant_uuids: data.assistant_uuids.join(','),
                status: data.status,
                read_level: data.read_level,
                only_roles: data.only_roles,
                role_ids: data.role_ids.join(',')
            };
            for (const key of Object.keys(data.policy)) {
                params[key] = data.policy[key];
            }
            for (const key of Object.keys(data.permission)) {
                params[key] = data.permission[key];
            }
            return params;
        },
        scroll (type) {
            const dict = {
                advanced: 'advancedCollapseShow',
                policy: 'policyCollapseShow',
                permission: 'permissionCollapseShow'
            };
            dict[type] && (this[dict[type]] = true);
            setTimeout(() => {
                Common.scrollAnimation(
                    document.documentElement,
                    this.$refs[type].$el.offsetTop - 60
                );
            }, 300);
        },
        back () {
            this.$router.go(-1);
        }
    }
};
</script>
