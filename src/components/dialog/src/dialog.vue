<template>
    <el-dialog ref="dialog"
        class="et-dialog"
        :visible.sync="visible"
        @close="close">
        <span slot="title" class="et-dialog__title">
            {{ title }}
        </span>
        <slot></slot>
        <div slot="footer">
            <el-button @click="cancel">{{ $t("common.cancel") }}</el-button>
            <el-button type="primary" @click="submit">{{ $t("common.submit") }}</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
    name: 'EtDialog',
    model: {
        prop: 'show',
        event: 'update:show'
    },
    props: {
        show: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            visible: this.show
        };
    },
    computed: {
        child () {
            return this.$refs.dialog.$children.find(item => item.submit !== void 0);
        }
    },
    watch: {
        show () {
            this.visible = this.show;
        }
    },
    methods: {
        submit () {
            if (this.child && this.child.submit) {
                this.child.submit();
            }
            this.$emit('update:show', false);
        },
        cancel () {
            if (this.child && this.child.cancel) {
                this.child.cancel();
            }
            this.$emit('update:show', false);
        },
        close () {
            if (this.child && this.child.close) {
                this.child.close();
            }
            this.$emit('update:show', false);
        }
    }
};
</script>

<style lang="scss" scoped>
@import '~static/styles/style-common';

.et-dialog {
    /deep/ .el-dialog {
        border-radius: $radiusSmall;

        @include max-screen($phoneMaxWidth) {
            & {
                width: 100%;
                height: 100%;
                margin: 0 !important;
                overflow: auto;
            }
        }

        @include max-screen($padMaxWidth) {
            & {
                width: 75%;
            }
        }
    }

    /deep/ .el-dialog__header {
        padding: $spaceLarge;

        .et-dialog__title {
            font-size: $dialogTitleFontSize;
            font-weight: $navFontWeight;
        }

        .el-dialog__headerbtn {
            top: $spaceLarge;
            right: $spaceLarge;
        }

        .el-dialog__headerbtn .el-dialog__close {
            font-size: $iconFontSizeLarge;
        }
    }

    /deep/ .el-dialog__footer {
        background: $dialogFooterBackground;
        border-radius: 0 0 $radiusSmall $radiusSmall;
        padding: $spaceMiddle;
        border-top: $splitBorder;

        @include max-screen($phoneMaxWidth) {
            & {
                position: fixed;
                bottom: 0;
                width: 100%;
            }
        }

        .el-button {
            padding: $spaceMiddle;
        }

        .el-button--primary {
            border-color: $submitColor;
            background: $submitColor;
        }

        .el-button--primary:hover {
            border-color: #234462;
        }
    }
}
</style>
