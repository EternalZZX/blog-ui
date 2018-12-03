<template>
    <el-dialog class="et-dialog"
        :title="title"
        :visible="show"
        top="5%"
        @close="close">
        <et-photo-select v-model="data"
            :show.sync="selectShow"
            :system-type="systemType"
            @update:show="closeDialog">
        </et-photo-select>
        <div slot="footer">
            <el-button @click="close">{{ $t("common.cancelButton") }}</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
    name: 'EtPhotoSelectDialog',
    model: {
        prop: 'photo',
        event: 'update:photo'
    },
    props: {
        show: {
            type: Boolean,
            default: false
        },
        photo: {
            type: Object,
            default () {
                return null;
            }
        },
        systemType: {
            default: null
        },
        title: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            data: null,
            selectShow: false
        };
    },
    watch: {
        show (val) {
            this.selectShow = val;
        },
        photo (val) {
            this.data = val;
        },
        data (val) {
            this.$emit('update:photo', val);
        }
    },
    methods: {
        close () {
            this.closeDialog();
        },
        closeDialog () {
            this.$emit('update:show', false);
        }
    }
};
</script>
