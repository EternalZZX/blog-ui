<template>
    <el-dialog class="et-dialog"
        :title="isCreate ?
            $t('album.create.title') :
            $t('album.edit.title')"
        :visible="show"
        top="5%"
        @open="open"
        @close="close">
        <el-form class="et-form" ref="form" :model="data"
            v-show="!photoSelectShow">
            <el-form-item :label="$t('album.create.name')">
                <el-input v-model="data.name"
                    :placeholder="$t('album.create.namePlaceholder')"
                    :maxlength="50">
                </el-input>
            </el-form-item>
            <el-form-item :label="$t('album.create.description')">
                <el-input type="textarea"
                    v-model="data.description"
                    :placeholder="$t('album.create.descriptionPlaceholder')"
                    :rows="2"
                    :maxlength="300"
                    resize="none">
                </el-input>
            </el-form-item>
            <et-collapse :title="$t('common.advanced')"
                :show.sync="collapseShow">
                <el-form-item :label="$t('album.create.privacy')">
                    <el-switch v-model="data.privacy"
                        :active-value="PRIVACY.PRIVATE"
                        :inactive-value="PRIVACY.PUBLIC"
                        :disabled="privateDisabled">
                    </el-switch>
                </el-form-item>
            </et-collapse>
        </el-form>
        <et-photo-select v-model="cover"
            :show.sync="photoSelectShow"
            :systemType="SYSTEM_TYPE">
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
import Album, { AlbumApi } from '@/common/api/albums';
import Photo from '@/common/api/photos';
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
                cover_uuid: '',
                privacy: AlbumApi.PRIVACY.PUBLIC,
                system: null
            },
            cover: null,
            photoSelectShow: true,
            collapseShow: false
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
            return AlbumApi.SYSTEM.ALBUM_COVER_ALBUM;
        }
    },
    methods: {
        open () {
            if (!this.isCreate) {
                this.data = {
                    name: this.editData.album.name,
                    description: this.editData.album.description,
                    cover_uuid: this.editData.album.cover,
                    privacy: this.editData.album.privacy,
                    system: this.editData.album.system
                };
            }
        },
        close () {
            this.data = {
                name: '',
                description: '',
                cover_uuid: '',
                privacy: AlbumApi.PRIVACY.PUBLIC,
                system: null
            };
            this.collapseShow = false;
            this.$refs.form.resetFields();
            this.closeDialog();
        },
        submit () {
            this.isCreate ? createAlbum() : this.updateAlbum();
        },
        createAlbum () {
            Photo.create(content.file, this.data).then(response => {
                content.onSuccess(response);
                this.closeDialog();
                this.$emit('create', response.data);
                Common.notify(this.$t('photo.create.success'), 'success');
            }).catch(err => {
                content.onError(err);
                this.imageUrl = null;
                Utils.errorLog(err, 'PHOTO-CREATE');
                Common.notify(Utils.errorMessage(err,
                    this.$t('photo.create.error')
                ), 'error', 'dialog');
            });
        },
        updateAlbum () {
            Photo.update(this.editData.photo.uuid, this.data).then(response => {
                this.closeDialog();
                this.$emit('edit', {
                    photo: response.data,
                    index: this.editData.index
                });
                Common.notify(this.$t('photo.edit.success'), 'success');
            }).catch(err => {
                Utils.errorLog(err, 'PHOTO-UPDATE');
                Common.notify(Utils.errorMessage(err,
                    this.$t('photo.edit.error')
                ), 'error', 'dialog');
            });
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
