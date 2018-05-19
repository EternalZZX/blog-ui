<template>
    <div class="et-load-scroll"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loadBusy"
        infinite-scroll-distance="100">
        <slot></slot>
        <div class="et-content__load" v-show="loadShow">
            <div v-loading="true"></div>
        </div>
        <p class="et-content__line" v-show="loadBusy && !loadShow">{{ $t("common.noMore") }}</p>
    </div>
</template>

<script>
export default {
    name: 'EtScroll',
    model: {
        prop: 'loadStatus',
        event: 'more'
    },
    props: {
        loadStatus: {
            type: String,
            required: true,
            validator (val) {
                return [
                    'active',
                    'pending',
                    'end'
                ].indexOf(val) !== -1;
            }
        }
    },
    data () {
        return {
            loadShow: false
        };
    },
    computed: {
        loadBusy () {
            return this.loadStatus !== 'active';
        }
    },
    watch: {
        loadStatus (val) {
            val === 'end' && (this.loadShow = false);
        }
    },
    methods: {
        loadMore () {
            this.loadShow = true;
            this.$emit('more', 'pending');
        }
    }
};
</script>
