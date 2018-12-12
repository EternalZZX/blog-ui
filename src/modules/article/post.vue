<template>
    <div class="et-layout">
        <et-nav :title="$t('post.nav.title')"
            :index.sync="loadType"
            :options="navOptions"
            @select="init">
        </et-nav>

        <div class="et-content" ref="container">
            <div class="et-content__wrapper">
                <et-photo-select-box :data="cover"
                    @click="photoSelectShow = true">
                </et-photo-select-box>
                <et-editor ref="editor"
                    v-model="content"
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
            :title="$t('section.edit.selectCover')">
        </et-photo-select-dialog>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { AlbumApi } from '@/common/api/albums';
export default {
    name: 'EtPost',
    data () {
        return {
            loadType: 'title',
            content: '',
            contentLength: 0,
            contentMaxLength: 30000,
            cover: null,
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
