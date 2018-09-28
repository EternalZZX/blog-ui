<template>
    <el-dialog class="et-dialog"
        :title="$t('photo.create.title')"
        :visible="show"
        top="5%"
        @open="open"
        @close="close">
        <el-form class="et-form" ref="form" :model="data">
            <el-form-item label="上传图片">
                <el-upload ref="upload"
                    class="avatar-uploader"
                    action="upload"
                    :http-request="upload"
                    :show-file-list="false"
                    :multiple="false"
                    :auto-upload="false"
                    :on-change="handleChange"
                    :on-success="handleSuccess">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="图片描述">
                <el-input type="textarea"
                    v-model="data.description">
                </el-input>
            </el-form-item>
            <el-form-item label="所属相册">
                <el-select v-model="data.album_uuid">
                    <el-option
                        label="无所属"
                        :value="null">
                    </el-option>
                </el-select>
            </el-form-item>

            <div @click="collapse = !collapse">show</div>
            <el-collapse-transition>
                <div class="et-collapse" v-show="collapse">
                    <el-form-item label="审核状态">
                        <el-select v-model="data.status">
                            <el-option
                                label="无所属"
                                :value="null">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="私有图片">
                        <el-switch v-model="data.privacy"></el-switch>
                    </el-form-item>
                    <el-form-item label="保留原图尺寸">
                        <el-switch v-model="data.origin"></el-switch>
                    </el-form-item>
                    <el-form-item label="禁用压缩">
                        <el-switch v-model="data.untreated"></el-switch>
                    </el-form-item>
                </div>
            </el-collapse-transition>
        </el-form>
        <div slot="footer">
            <el-button @click="cancel">{{ $t("common.cancelButton") }}</el-button>
            <el-button type="primary" @click="submit">{{ $t("common.submitButton") }}</el-button>
        </div>
    </el-dialog>
</template>

<script>
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
                status: '',
                origin: false,
                untreated: false
            },
            imageUrl: '',
            collapse: false
        };
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

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
