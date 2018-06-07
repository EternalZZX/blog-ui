<template>
    <el-dialog ref="dialog"
        class="et-dialog"
        :class="{'et-dialog_small': type === 'small'}"
        :visible.sync="visible"
        @open="open"
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
        },
        type: {
            type: String,
            default: 'normal',
            validator (val) {
                return [
                    'small',
                    'normal'
                ].indexOf(val) !== -1;
            }
        }
    },
    data () {
        return {
            visible: this.show,
            child: null
        };
    },
    watch: {
        show () {
            this.visible = this.show;
        }
    },
    mounted () {
        this.$nextTick(() => {
            this.child = this.$refs.dialog.$children.find(item => item.submit !== void 0);
        });
    },
    updated () {
        this.$nextTick(() => {
            this.child = this.$refs.dialog.$children.find(item => item.submit !== void 0);
        });
    },
    methods: {
        open () {
            this.$emit('open');
        },
        submit () {
            this.$emit('submit');
            this.$emit('update:show', false);
        },
        cancel () {
            this.$emit('cancel');
            this.$emit('update:show', false);
        },
        close () {
            this.$emit('close');
            this.$emit('update:show', false);
        }
    }
};
</script>

<style lang="scss" scoped>
@import '~static/styles/style-common';

.et-dialog {
    border-radius: $radiusSmall;

    @include max-screen($phoneMaxWidth) {
        & {
            width: 100%;
            height: 100%;
            margin: 0 !important;
            overflow: auto;
            border-radius: 0;
        }

        .el-dialog__footer {
            border-radius: 0;
        }
    }

    @include filter-screen($padMinWidth, $padMaxWidth) {
        & {
            width: 75%;
        }
    }

    @keyframes dialog-fade-in-bottom {
        0% {
            transform: translate3d(0, 20px, 0);
            opacity: 0;
        }

        100% {
            transform: translate3d(0, 0, 0);
            opacity: 1;
        }
    }

    @keyframes dialog-fade-out-bottom {
        0% {
            transform: translate3d(0, 0, 0);
            opacity: 1;
        }

        100% {
            transform: translate3d(0, 20px, 0);
            opacity: 0;
        }
    }

    &.et-dialog_small {
        width: 30%;
        max-width: 30rem;

        @include max-screen($phoneMaxWidth) {
            & {
                position: fixed;
                bottom: 0;
                width: 100%;
                height: auto;
            }

            &.dialog-fade-enter-active {
                animation: dialog-fade-in-bottom .3s;
            }

            &.dialog-fade-leave-active {
                animation: dialog-fade-out-bottom .3s;
            }

            .el-dialog__body {
                margin-bottom: 0;
            }

            .el-dialog__footer {
                position: static;
            }
        }

        @include filter-screen($padMinWidth, $padMaxWidth) {
            & {
                width: 45%;
            }
        }
    }

    .el-dialog__header {
        padding: $spaceLarge;

        .el-dialog__title {
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

    .el-dialog__body {
        padding: $spaceLarge;
        padding-top: 0;

        @include max-screen($phoneMaxWidth) {
            & {
                margin-bottom: 3.3rem;
            }
        }
    }

    .el-dialog__footer {
        background: $dialogFooterBackground;
        border-radius: 0 0 $radiusSmall $radiusSmall;
        padding: $spaceMiddle;
        border-top: $splitBorder;

        @include max-screen($phoneMaxWidth) {
            & {
                position: absolute;
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
            border-color: $submitHoverColor;
        }
    }
}
</style>
