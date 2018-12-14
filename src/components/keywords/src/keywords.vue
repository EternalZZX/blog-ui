<template>
    <div class="et-keywords">
        <el-tag class="et-keywords__item"
            v-for="keyword in keywords"
            :key="keyword"
            closable
            @close="handleDelete(keyword)">
            {{ keyword }}
        </el-tag>
        <el-input ref="input"
            class="et-keywords__new"
            v-model="keyword"
            v-if="isAdd"
            @keyup.enter.native="handleAdd"
            @blur="handleAdd">
        </el-input>
        <el-button v-else
            class="et-keywords__button"
            @click="showAdd">
            <i class="et-icon ei-plus"></i>
            {{ $t("article.addKeyword") }}
        </el-button>
    </div>
</template>

<script>
export default {
    name: 'EtKeywords',
    data () {
        return {
            keywords: ['标签一', '标签二', '标签三'],
            keyword: '',
            isAdd: false
        };
    },
    methods: {
        showAdd () {
            this.isAdd = true;
            this.$nextTick(() => {
                this.$refs.input.focus();
            });
        },
        handleAdd () {
            const keyword = this.keyword;
            if (keyword) {
                this.keywords.push(keyword);
            }
            this.isAdd = false;
            this.keyword = '';
        },
        handleDelete (keyword) {
            this.keywords.splice(this.keywords.indexOf(keyword), 1);
        }
    }
};
</script>

<style lang="scss" scoped>
@import "~static/styles/style-common";

.et-keywords {
    display: flex;

    .et-keywords__item {
        margin-right: $spaceSmall;
    }

    .et-keywords__new {
        width: 90px;
        vertical-align: bottom;
    }

    .et-keywords__button {
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }
}
</style>
