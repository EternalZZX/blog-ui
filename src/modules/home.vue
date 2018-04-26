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
        Common.setToken('RVRFNzc3YzJjOTllZDg3NzEzZmFhOTE1NmE4YTMyNDhjYmJOek0xTjJR' +
                        'eU9HRXRZVFl4TVMwMVpXWmtMV0ZsTm1VdFlUVTFNR0UxWWprMU5EZzM');
        sectionApi.getSection(18).then(response => {
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
