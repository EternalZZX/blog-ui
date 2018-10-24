<template>
    <el-dialog class="et-dialog"
        :title="isCreate ?
            $t('section.create.title') :
            $t('section.edit.title')"
        :visible="show"
        top="5%"
        @open="open"
        @close="close">
        <el-form ref="form"
            class="et-form"
            :rules="rules"
            :model="data"
            v-show="!photoSelectShow">
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
                <el-form-item prop="only_roles"
                    :label="$t('section.create.onlyRoles')">
                    <el-switch v-model="data.only_roles"></el-switch>
                </el-form-item>
                <el-form-item prop="role_ids"
                    :label="$t('section.create.roles')">
                    <el-select v-model="data.role_ids"
                        multiple
                        filterable
                        remote
                        default-first-option
                        :remote-method="getRoles"
                        :loading="roleLoading"
                        :placeholder="$t('photo.create.albumPlaceholder')">
                        <el-option v-for="item in roles"
                            :key="item.id"
                            :label="item.nick"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="status"
                    :label="$t('photo.create.audit')"
                    v-perm:photo-audit-set>
                    <el-select v-model="data.status">
                        <el-option v-for="item in status"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </et-collapse>
        </el-form>
        <et-photo-select v-model="cover"
            :show.sync="photoSelectShow"
            :system-type="SYSTEM_TYPE.SECTION_COVER_ALBUM">
        </et-photo-select>
        <div slot="footer">
            <el-button @click="cancel">{{ $t("common.cancelButton") }}</el-button>
            <el-button type="primary" @click="submit">{{ $t("common.submitButton") }}</el-button>
        </div>
    </el-dialog>
</template>

<script>
import Common from '@/common/common';
import Utils from '@/common/utils';
import Permission from '@/common/permission';
import { AlbumApi } from '@/common/api/albums';
import Role from '@/common/api/roles';
import Section, { SectionApi } from '@/common/api/sections';
export default {
    name: 'EtSectionAdd',
    props: {
        show: {
            type: Boolean,
            default: false
        },
        editData: {
            type: Object,
            default () {
                return null;
            }
        }
    },
    data () {
        return {
            data: {
                name: '',
                nick: '',
                description: '',
                owner_uuid: '',
                moderator_uuids: [],
                assistant_uuids: [],
                read_level: 100,
                status: SectionApi.STATUS.NORMAL,
                only_roles: false,
                role_ids: []
            },
            cover: null,
            photoSelectShow: false,
            collapseShow: false,
            roles: [],
            roleLoading: false,
            systemTypes: [{
                label: this.$t('album.system.none'),
                value: null
            }, {
                label: this.$t('album.system.avatar'),
                value: AlbumApi.SYSTEM.AVATAR_ALBUM
            }, {
                label: this.$t('album.system.album'),
                value: AlbumApi.SYSTEM.ALBUM_COVER_ALBUM
            }, {
                label: this.$t('album.system.section'),
                value: AlbumApi.SYSTEM.SECTION_COVER_ALBUM
            }, {
                label: this.$t('album.system.article'),
                value: AlbumApi.SYSTEM.ARTICLE_COVER_ALBUM
            }],
            rules: {
                name: [{ required: true, message: this.$t('validate.none'), trigger: 'blur' }]
            }
        };
    },
    computed: {
        privateDisabled () {
            return !Permission.hasPermission('album-private-set');
        },
        isCreate () {
            return !this.editData;
        },
        PRIVACY () {
            return AlbumApi.PRIVACY;
        },
        SYSTEM_TYPE () {
            return AlbumApi.SYSTEM;
        }
    },
    methods: {
        open () {
            if (!this.isCreate) {
                this.data = {
                    name: this.editData.album.name,
                    description: this.editData.album.description,
                    privacy: this.editData.album.privacy,
                    system: this.editData.album.system
                };
                if (this.editData.album.cover) {
                    this.cover = {
                        uuid: this.editData.album.cover.split('/').pop().split('.')[0],
                        image_small: this.editData.album.cover
                    };
                }
            }
        },
        close () {
            this.cover = null;
            this.photoSelectShow = false;
            this.collapseShow = false;
            this.$refs.form.resetFields();
            this.closeDialog();
        },
        submit () {
            this.isCreate ? this.createSection() : this.updateSection();
        },
        createSection () {
            Section.create(
                this.formatParams(this.data)
            ).then(response => {
                this.closeDialog();
                this.$emit('create', response.data);
                Common.notify(this.$t('album.create.success'), 'success');
            }).catch(err => {
                Utils.errorLog(err, 'ALBUM-CREATE');
                Common.notify(Utils.errorMessage(err,
                    this.$t('album.create.error')
                ), 'error', 'dialog');
            });
        },
        updateSection () {
            Section.update(
                this.editData.album.uuid,
                this.formatParams(this.data)
            ).then(response => {
                this.closeDialog();
                this.$emit('edit', {
                    album: response.data,
                    index: this.editData.index
                });
                Common.notify(this.$t('album.edit.success'), 'success');
            }).catch(err => {
                Utils.errorLog(err, 'ALBUM-UPDATE');
                Common.notify(Utils.errorMessage(err,
                    this.$t('album.edit.error')
                ), 'error', 'dialog');
            });
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
        formatParams (data) {
            const params = {
                name: data.name,
                description: data.description,
                privacy: data.privacy
            };
            params.cover_uuid = this.cover ? this.cover.uuid : '';
            data.system !== null && (params.system = data.system);
            return params;
        },
        cancel () {
            this.closeDialog();
        },
        closeDialog () {
            this.$emit('update:show', false);
        }
    }
};
</script>
