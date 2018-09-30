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
                    :http-request="upload"
                    :show-file-list="false"
                    :multiple="false"
                    :auto-upload="false"
                    :on-change="handleChange"
                    :on-success="handleSuccess">
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
                    filterable>
                    <el-option
                        label="test1"
                        :value="1">
                    </el-option>
                    <el-option
                        label="test2"
                        :value="2">
                    </el-option>
                </el-select>
            </el-form-item>
            <et-collapse :title="$t('common.advanced')"
                :show.sync="collapseShow">
                <el-form-item :label="$t('photo.create.privacy')">
                    <el-switch v-model="data.privacy"
                        :active-value="0"
                        :inactive-value="1"
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
                        <el-option
                            label="无所属"
                            :value="null">
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
import Permission from '@/common/permission';
import Photo from '@/common/api/photos';
export default {
    name: 'EtPhotoAdd',
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            data: {
                description: '',
                album_uuid: null,
                privacy: 1,
                read_level: 100,
                status: '',
                origin: false,
                untreated: false
            },
            imageUrl: '',
            collapseShow: false
        };
    },
    computed: {
        privateDisabled () {
            return !Permission.hasPermission('photo-private-set');
        },
        maxReadLevel () {
            return Permission.hasPermission('photo-read-set-unlimit') ?
                1000 : Permission.getReadLevel();
        }
    },
    methods: {
        open () {
            // console.warn('open');
        },
        close () {
            this.closeDialog();
        },
        submit () {
            this.$refs.upload.submit();
            this.closeDialog();
        },
        upload (content) {
            Photo.create(
                content.file,
                this.data
            ).then(response => {
                content.onSuccess(response.data);
            }).catch(err => {
                if (err.response) {
                    content.onError(err.response.data);
                } else {
                    content.onError(err.message);
                }
            });
        },
        handleChange (file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        handleSuccess (response) {
            console.warn(response);
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
