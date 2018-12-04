<template>
    <div class="et-layout">
        <et-nav :title="$t('section.edit.nav.title')"
            :index.sync="loadType"
            :options="navOptions"
            @select="init">
            <el-button slot="button" type="text"
                class="et-nav__button"
                @click="back">
                {{ $t("common.back") }}
            </el-button>
        </et-nav>

        <div class="et-content">
            <div class="et-content__wrapper">
            </div>
            <et-toolbar></et-toolbar>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'EtSectionDetail',
    data () {
        return {
            loadType: 'form',
            manageType: 'none'
        };
    },
    computed: {
        ...mapGetters({
            userUuid: 'userUuid'
        }),
        navOptions () {
            return {
                nav: [{
                    value: 'form',
                    label: this.$t('section.edit.nav.basic')
                }, {
                    value: 'advanced',
                    label: this.$t('section.edit.nav.advanced')
                }, {
                    value: 'policy',
                    label: this.$t('section.edit.nav.policy')
                }]
            };
        },
        sectionName () {
            return this.$route.params.name;
        }
    },
    activated () {
        this.init();
    },
    methods: {
        init () {
            //
        },
        getManageType (data) {
            const roleObj = {
                isOwner: data.owner_uuid === this.userUuid,
                isModerator: data.moderator_uuids.indexOf(this.userUuid) !== -1,
                isAssistant: data.assistant_uuids.indexOf(this.userUuid) !== -1
            };
            return {
                ...roleObj,
                isController: roleObj.isOwner || roleObj.isModerator,
                isManager: roleObj.isOwner || roleObj.isModerator || roleObj.isAssistant
            };
        },
        back () {
            this.$router.go(-1);
        }
    }
};
</script>
