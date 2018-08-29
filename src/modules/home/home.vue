<template>
    <div class="et-layout">
        <et-nav :title="$t('section.nav.title')"
            :index.sync="loadType"
            :menu="nav">
        </et-nav>
        <div class="et-content">
            <div class="et-content__wrapper">
                <et-comment-scroll
                    :resource-type="2"
                    resource-uuid="e541cd39-3de9-5bef-ad9f-b80df3b82327">
                </et-comment-scroll>
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
            <et-toolbar></et-toolbar>
        </div>
    </div>
</template>

<script>
import Photo from '@/common/api/photos';
export default {
    name: 'EtHome',
    data () {
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
            loadType: 'all',
            imageUrl: ''
        };
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
