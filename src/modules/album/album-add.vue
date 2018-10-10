<template>
    <el-dialog class="et-dialog"
        :title="isCreate ?
            $t('album.create.title') :
            $t('album.edit.title')"
        :visible="show"
        @open="open"
        @close="close">
        <el-form class="et-form" ref="form" :model="data">
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
                <el-form-item :label="$t('photo.create.privacy')">
                    <el-switch v-model="data.privacy"
                        :active-value="PRIVACY.PRIVATE"
                        :inactive-value="PRIVACY.PUBLIC"
                        :disabled="privateDisabled">
                    </el-switch>
                </el-form-item>
            </et-collapse>
        </el-form>
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
                system: ''
            },
            collapseShow: false
        };
    },
    computed: {
        privateDisabled () {
            return !Permission.hasPermission('photo-private-set');
        },
        isCreate () {
            return !this.editData;
        },
        PRIVACY () {
            return AlbumApi.PRIVACY;
        }
    },
    methods: {
        open () {
            if (!this.isCreate) {
                this.data = {
                    description: this.editData.photo.description,
                    privacy: this.editData.photo.privacy,
                    read_level: this.editData.photo.read_level,
                    status: this.editData.photo.status
                };
            }
            if (this.album) {
                this.albums = [this.album];
                this.data.album_uuid = this.album.uuid;
            }
        },
        close () {
            this.data = {
                name: '',
                description: '',
                cover_uuid: '',
                privacy: AlbumApi.PRIVACY.PUBLIC,
                system: ''
            };
            this.collapseShow = false;
            this.$refs.form.resetFields();
            this.closeDialog();
        },
        submit () {
            this.isCreate ? this.$refs.upload.submit() : this.updatePhoto();
        },
        getSelfAlbums (query) {
            if (query !== '') {
                this.albumLoading = true;
                Album.QuerySelfAlbums(this.identityUuid, query).then(response => {
                    this.albumLoading = false;
                    this.albums = response.data.albums;
                }).catch(err => {
                    this.albumLoading = false;
                    Utils.errorLog(err, 'ALBUM-QUERY');
                });
            } else {
                this.albums = [];
            }
        },
        uploadPhoto (content) {
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
        updatePhoto () {
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
        handleChange (file) {
            this.imageUrl = URL.createObjectURL(file.raw);
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
