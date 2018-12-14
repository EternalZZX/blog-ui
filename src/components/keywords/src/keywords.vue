<template>
    <div class="et-keywords">
        <el-tag class="et-keywords__item"
            v-for="(keyword, index) in value"
            :key="keyword"
            closable
            @close="handleDelete(index)">
            {{ keyword }}
        </el-tag>
        <el-input ref="input"
            class="et-keywords__new"
            v-model="keyword"
            v-if="isAdd"
            @keyup.enter.native="handleAdd"
            @blur="handleAdd">
        </el-input>
        <i v-else
            class="et-keywords__button et-icon ei-brush-fill"
            :title="$t('article.addKeyword')"
            @click="showAdd">
        </i>
    </div>
</template>

<script>
import Utils from '@/common/utils';
export default {
    name: 'EtKeywords',
    model: {
        prop: 'value',
        event: 'update:value'
    },
    props: {
        value: {
            type: Array,
            default () {
                return [];
            }
        }
    },
    data () {
        return {
            keywords: [],
            keyword: '',
            isAdd: false
        };
    },
    watch: {
        value (val) {
            this.keywords = Utils.deepClone(val);
        }
    },
    methods: {
        showAdd () {
            this.isAdd = true;
            this.$nextTick(() => {
                this.$refs.input.focus();
            });
        },
        handleAdd () {
            if (this.keyword && this.keywords.indexOf(this.keyword) === -1) {
                this.keywords.push(this.keyword);
                this.updateValue();
            }
            this.isAdd = false;
            this.keyword = '';
        },
        handleDelete (index) {
            this.keywords.splice(index, 1);
            this.updateValue();
        },
        updateValue () {
            this.$emit('update:value', this.keywords);
        }
    }
};
</script>

<style lang="scss" scoped>
@import "~static/styles/style-common";

.et-keywords {
    display: flex;
    flex-wrap: wrap;

    .et-keywords__item {
        margin-right: $spaceSmall;
        margin-bottom: $spaceSmall;
    }

    .et-keywords__new {
        width: 6rem;

        /deep/ .el-input__inner {
            height: $elementHeight;
            font-size: $descriptionFontSize;
            line-height: $elementHeight;
            color: $quoteColor;
            background-color: $commentBackground;
            border: none;
            border-radius: $radiusSmall;
        }
    }

    .et-keywords__button {
        display: block;
        height: $elementHeight;
        font-size: $iconFontSizeSmall;
        line-height: $elementHeight;
        color: $placeholderColor;
        cursor: pointer;

        &:hover {
            color: $submitHoverColor;
        }
    }
}
</style>
