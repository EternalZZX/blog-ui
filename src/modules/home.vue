<template>
    <div class="et-content"></div>
</template>

<script>
import Common from '@/common/common';
import sectionApi from '@/api/sections';
export default {
    name: 'home',
    data () {
        return {
            msg: 'Welcome to Your Vue.js App'
        };
    },
    mounted: () => {
        Common.setToken('RVRFNDIyYjg2MDA2MjI0N2EwZDc3OTJhNzEwMGVjNWY2YmNOek0xTjJR' +
                        'eU9HRXRZVFl4TVMwMVpXWmtMV0ZsTm1VdFlUVTFNR0UxWWprMU5EZzM');
        sectionApi.create({
            name: 'guitar',
            nick: '吉他',
            moderator_uuids: '7357d28a-a611-5efd-ae6e-a550a5b95487'
        }).then(response => {
            console.warn(response.data);
        }).catch(err => {
            if (err.response) {
                console.warn(err.response.data);
                console.warn(err.response.status);
            } else {
                console.error(err.message);
            }
        });
    }
};
</script>
