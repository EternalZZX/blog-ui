<template>
    <el-dialog class="et-dialog"
        :title="isCreate ?
            $t('album.create.title') :
            $t('album.edit.title')"
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
                :label="$t('album.create.name')">
                <el-input v-model.trim="data.name"
                    :placeholder="$t('album.create.namePlaceholder')"
                    :maxlength="50"
                    :clearable="true">
                </el-input>
            </el-form-item>
            <el-form-item prop="description"
                :label="$t('album.create.description')">
                <el-input type="textarea"
                    v-model.trim="data.description"
                    :placeholder="$t('album.create.descriptionPlaceholder')"
                    :rows="10"
                    :maxlength="300"
                    resize="none">
                </el-input>
            </el-form-item>
            <el-form-item :label="$t('album.create.cover')">
                <et-photo-select-box :data="cover"
                    @click="photoSelectShow = true">
                </et-photo-select-box>
            </el-form-item>
            <et-collapse :title="$t('common.advanced')"
                :show.sync="collapseShow">
                <el-form-item prop="privacy"
                    :label="$t('album.create.privacy')">
                    <el-switch v-model="data.privacy"
                        :active-value="PRIVACY.PRIVATE"
                        :inactive-value="PRIVACY.PUBLIC"
                        :disabled="privateDisabled">
                    </el-switch>
                </el-form-item>
                <el-form-item prop="system"
                    :label="$t('album.create.system')"
                    v-perm:album-system-set>
                    <el-select v-model="data.system">
                        <el-option v-for="item in systemTypes"
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
            :system-type="SYSTEM_TYPE.ALBUM_COVER_ALBUM">
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
import Validate from '@/common/validate';
import Album, { AlbumApi } from '@/common/api/albums';
export default {
    name: 'EtAlbumAdd',
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
                description: '',
                privacy: AlbumApi.PRIVACY.PUBLIC,
                system: null
            },
            cover: null,
            photoSelectShow: false,
            collapseShow: false,
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
                name: [{ required: true, validator: Validate.none, trigger: 'blur' }]
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
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.isCreate ? this.createAlbum() : this.updateAlbum();
                }
            });
        },
        createAlbum () {
            Album.create(
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
        updateAlbum () {
            Album.update(
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
