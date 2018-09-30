<template>
    <el-dialog class="et-dialog"
        :title="$t('photo.create.title')"
        :visible="show"
        top="5%"
        @open="open"
        @close="close">
        <el-form class="et-form" ref="form" :model="data">
            <el-form-item :label="$t('photo.create.file')">
                <el-upload class="et-upload"
                    ref="upload"
                    action="upload"
                    :http-request="uploadPhoto"
                    :show-file-list="false"
                    :multiple="false"
                    :auto-upload="false"
                    :on-change="handleChange">
                    <img class="et-upload__image"
                        :src="imageUrl"
                        v-if="imageUrl">
                    <i class="et-icon ei-plus" v-else></i>
                </el-upload>
            </el-form-item>
            <el-form-item :label="$t('photo.create.description')">
                <el-input type="textarea"
                    v-model="data.description"
                    :placeholder="$t('photo.create.descriptionPlaceholder')"
                    :rows="2"
                    resize="none">
                </el-input>
            </el-form-item>
            <el-form-item :label="$t('photo.create.album')">
                <el-select v-model="data.album_uuid"
                    clearable
                    filterable
                    remote
                    :remote-method="getSelfAlbums"
                    :loading="albumLoading"
                    :default-first-option="true"
                    :placeholder="$t('photo.create.albumPlaceholder')">
                    <el-option v-for="item in albums"
                        :key="item.uuid"
                        :label="item.name"
                        :value="item.uuid">
                    </el-option>
                </el-select>
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
                <el-form-item :label="$t('photo.create.readLevel')"
                    v-perm:photo-read-set>
                    <el-slider v-model="data.read_level"
                        :max="maxReadLevel"
                        :step="10">
                    </el-slider>
                </el-form-item>
                <el-form-item :label="$t('photo.create.audit')"
                    v-perm:photo-audit-set>
                    <el-select v-model="data.status">
                        <el-option v-for="item in status"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('photo.create.origin')"
                    v-perm:photo-origin>
                    <el-switch v-model="data.origin"></el-switch>
                </el-form-item>
                <el-form-item :label="$t('photo.create.untreated')"
                    v-perm:photo-untreated>
                    <el-switch v-model="data.untreated"></el-switch>
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
import Album from '@/common/api/albums';
import Photo, { PhotoApi } from '@/common/api/photos';
export default {
    name: 'EtPhotoAdd',
    props: {
        show: {
            type: Boolean,
            default: false
        },
        album: {
            type: Object,
            default () {
                return null;
            }
        }
    },
    data () {
        return {
            data: {
                description: '',
                album_uuid: null,
                privacy: PhotoApi.PRIVACY.PUBLIC,
                read_level: 100,
                status: PhotoApi.STATUS.AUDIT,
                origin: false,
                untreated: false
            },
            imageUrl: null,
            albums: [],
            albumLoading: false,
            collapseShow: false,
            status: [{
                label: this.$t('status.audit'),
                value: PhotoApi.STATUS.AUDIT
            }, {
                label: this.$t('status.active'),
                value: PhotoApi.STATUS.ACTIVE
            }, {
                label: this.$t('status.failed'),
                value: PhotoApi.STATUS.FAILED
            }]
        };
    },
    computed: {
        privateDisabled () {
            return !Permission.hasPermission('photo-private-set');
        },
        maxReadLevel () {
            return Permission.hasPermission('photo-read-set-unlimit') ?
                1000 : Permission.getReadLevel();
        },
        PRIVACY () {
            return PhotoApi.PRIVACY;
        }
    },
    methods: {
        open () {
            this.albums = [this.album];
            this.data.album_uuid = this.album.uuid;
        },
        close () {
            this.data = {
                description: '',
                album_uuid: null,
                privacy: PhotoApi.PRIVACY.PUBLIC,
                read_level: 100,
                status: PhotoApi.STATUS.AUDIT,
                origin: false,
                untreated: false
            };
            this.imageUrl = null;
            this.collapseShow = false;
            this.$refs.form.resetFields();
            this.closeDialog();
        },
        submit () {
            this.$refs.upload.submit();
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
                this.closeDialog();
                this.$emit('create', response.data);
                Common.notify(this.$t('photo.create.success'), 'success');
                content.onSuccess(response);
            }).catch(err => {
                Utils.errorLog(err, 'PHOTO-CREATE');
                Common.notify(Utils.errorMessage(err,
                    this.$t('photo.create.error')
                ), 'error', 'dialog');
                content.onError(err);
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
