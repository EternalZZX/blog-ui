<template>
    <div class="et-layout">
        <et-nav :title="$t('section.nav.title')"
            :index.sync="loadType"
            :options="navOptions"
            @select="init">
            <el-button slot="button" type="text"
                class="et-nav__button"
                @click="back">
                {{ $t("photo.nav.back") }}
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
                    <et-collapse :title="$t('common.advanced')"
                        :show.sync="collapseShow">
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
                </el-form>
            </div>
            <et-toolbar></et-toolbar>
        </div>
    </div>
</template>

<script>
import Utils from '@/common/utils';
import Permission from '@/common/permission';
import Validate from '@/common/validate';
import User from '@/common/api/users';
import Role from '@/common/api/roles';
import { SectionApi } from '@/common/api/sections';
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
                role_ids: []
            },
            cover: null,
            photoSelectShow: false,
            collapseShow: false,
            users: [],
            userLoading: false,
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
            roles: [],
            roleLoading: false,
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
    methods: {
        init () {
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
        back () {
            this.$router.go(-1);
        }
    }
};
</script>
