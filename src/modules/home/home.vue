<template>
    <div class="et-layout">
        <et-editor></et-editor>
        <!-- <el-upload
            ref="upload"
            action="upload"
            class="avatar-uploader"
            :http-request="upload"
            :show-file-list="false"
            :multiple="false"
            :auto-upload="false"
            :on-change="handleChange"
            :on-success="handleSuccess">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-button size="small" type="primary" @click="submit">点击上传</el-button> -->
    </div>
</template>

<script>
import Utils from '@/common/utils';
// import Section from '@/common/api/sections';
import Photo from '@/common/api/photos';
export default {
    name: 'EtHome',
    data () {
        return {
            header: {
                'Auth-Token': Utils.getToken()
            },
            imageUrl: ''
        };
    },
    mounted: () => {
        // Utils.setToken('RVRFNDIyYjg2MDA2MjI0N2EwZDc3OTJhNzEwMGVjNWY2YmNOek0xTjJR' +
        //                 'eU9HRXRZVFl4TVMwMVpXWmtMV0ZsTm1VdFlUVTFNR0UxWWprMU5EZzM');
        // Section.delete('', {
        //     id_list: 20,
        //     force: true
        // }).then(response => {
        //     console.warn(response.data);
        // }).catch(err => {
        //     if (err.response) {
        //         console.warn(err.response.data);
        //         console.warn(err.response.status);
        //     } else {
        //         console.error(err.message);
        //     }
        // });
    },
    methods: {
        handleChange (file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        handleSuccess (response) {
            console.warn(response);
        },
        submit () {
            this.$refs.upload.submit();
        },
        upload (content) {
            Photo.create(content.file, {
                description: 'a'
            }).then(response => {
                content.onSuccess(response.data);
            }).catch(err => {
                if (err.response) {
                    content.onError(err.response.data);
                } else {
                    content.onError(err.message);
                }
            });
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
