<template>
    <div class="et-layout">
        <et-nav :title="$t('post.nav.title')"
            :index.sync="loadType"
            :options="navOptions"
            @select="init">
        </et-nav>

        <div class="et-content">
            <div class="et-content__wrapper">
                <et-editor ref="editor"
                    v-model="content"
                    :length.sync="contentLength"
                    :max-length="contentMaxLength">
                </et-editor>
            </div>
            <et-toolbar></et-toolbar>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'EtPost',
    data () {
        return {
            content: '',
            contentLength: 0,
            contentMaxLength: 30000,
            loadType: 'all'
        };
    },
    computed: {
        ...mapGetters({
            userUuid: 'userUuid'
        }),
        navOptions () {
            return {
                nav: []
            };
        }
    },
    methods: {
        init () {
            //
        }
    }
};
</script>
