<template>
    <div class="et-layout">
        <et-nav :title="$t('post.nav.title')"
            :index.sync="loadType"
            :options="navOptions"
            @select="init">
        </et-nav>

        <div class="et-content" ref="container">
            <div class="et-content__wrapper et-post">
                <el-form v-if="loadType === 'title'">
                    <et-photo-select-box
                        :data="cover"
                        icon="ei-camera"
                        size="large"
                        @click="photoSelectShow = true">
                        <span>{{ $t("post.coverPlaceholder") }}</span>
                    </et-photo-select-box>
                    <el-input class="et-post__input"
                        v-model.trim="data.title"
                        :placeholder="$t('post.titlePlaceholder')"
                        :maxlength="50"
                        :clearable="true">
                    </el-input>
                    <el-input class="et-post__input"
                        type="textarea"
                        v-model="data.overview"
                        :placeholder="$t('post.overviewPlaceholder')"
                        :rows="6"
                        :maxlength="300"
                        resize="none">
                    </el-input>
                    <et-keywords></et-keywords>
                    <!-- <el-select></el-select> -->
                </el-form>
                <et-editor v-else-if="loadType === 'content'"
                    ref="editor"
                    v-model="data.content"
                    :length.sync="contentLength"
                    :max-length="contentMaxLength">
                </et-editor>
            </div>
            <et-toolbar></et-toolbar>
        </div>

        <et-photo-select-dialog
            v-model="cover"
            :show.sync="photoSelectShow"
            :system-type="SYSTEM_TYPE.ARTICLE_COVER_ALBUM"
            :show-upload="true"
            :title="$t('section.edit.selectCover')">
        </et-photo-select-dialog>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { ArticleApi } from '@/common/api/articles';
import { AlbumApi } from '@/common/api/albums';
export default {
    name: 'EtPost',
    data () {
        return {
            loadType: 'title',
            data: {
                title: '',
                overview: '',
                section_name: '',
                keywords: [],
                content: '',
                status: ArticleApi.STATUS.AUDIT,
                privacy: ArticleApi.PRIVACY.PUBLIC,
                read_level: 100
            },
            cover: null,
            contentLength: 0,
            contentMaxLength: 30000,
            photoSelectShow: false
        };
    },
    computed: {
        ...mapGetters({
            userUuid: 'userUuid'
        }),
        navOptions () {
            return {
                nav: [{
                    value: 'title',
                    label: this.$t('post.nav.basic')
                }, {
                    value: 'content',
                    label: this.$t('post.nav.content')
                }, {
                    value: 'advanced',
                    label: this.$t('post.nav.advanced')
                }]
            };
        },
        SYSTEM_TYPE () {
            return AlbumApi.SYSTEM;
        }
    },
    activated () {
        this.init();
    },
    methods: {
        init () {
            // console.warn(document.body.clientHeight );
        }
    }
};
</script>
