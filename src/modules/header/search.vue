<template>
    <el-autocomplete class="et-header__search"
        v-model="searchStr"
        :placeholder="$t('header.search')"
        :fetch-suggestions="querySearch"
        :trigger-on-focus="false"
        @select="handleSelect">
        <i slot="prefix" class="el-input__icon et-icon ei-search"></i>
        <template slot-scope="{ item }">
            <div>{{ item }}</div>
        </template>
    </el-autocomplete>
</template>

<script>
export default {
    name: 'EtSearch',
    data () {
        return {
            searchStr: '',
            queryList: [{
                value: 'ABV',
                address: 'ABC'
            }]
        };
    },
    methods: {
        querySearch (queryString, callback) {
            callback(this.queryList);
        },
        handleSelect (item) {
            console.warn(item);
        }
    }
};
</script>
