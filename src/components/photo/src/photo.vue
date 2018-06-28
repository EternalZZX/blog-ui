<template>
    <div class="et-photo__wrapper" :class="{'et-photo__wrapper_albums': type === 'album'}">
        <div class="et-photo" ref="photo" :style="getCover(data)">
            <ul class="et-photo__body" v-if="type === 'album'">
                <li class="et-photo__info">
                    <span :title="data.name">{{ data.name }}</span>
                    <span class="et-photo__info_count" :title="data.metadata.like_count">
                        <i class="et-icon ei-like"></i>{{ data.metadata.like_count | count }}
                    </span>
                </li>
                <li class="et-photo__info">
                    <span>{{ data.create_at | date }}</span>
                    <span class="et-photo__info_count" :title="data.metadata.comment_count">
                        <i class="et-icon ei-message"></i>{{ data.metadata.comment_count | count }}
                    </span>
                </li>
            </ul>
            <ul class="et-photo__body" v-else>
                <li class="et-photo__info">
                    <span :title="data.description">{{ data.description }}</span>
                    <span class="et-photo__info_count" :title="data.metadata.like_count">
                        <i class="et-icon ei-like"></i>{{ data.metadata.like_count | count }}
                    </span>
                </li>
                <li class="et-photo__info">
                    <span>{{ data.create_at | date }}</span>
                    <span class="et-photo__info_count" :title="data.metadata.comment_count">
                        <i class="et-icon ei-message"></i>{{ data.metadata.comment_count | count }}
                    </span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'EtPhoto',
    props: {
        data: {
            type: Object,
            required: true
        },
        type: {
            type: String,
            default: 'photo',
            validator (val) {
                return [
                    'photo',
                    'album'
                ].indexOf(val) !== -1;
            }
        },
        hash: {
            type: String,
            default: ''
        }
    },
    methods: {
        getCover (data) {
            const url = this.type === 'album' ? data.cover : data.image_small,
                backgroundImage = this.hash ? `url(${url}?hash=${this.hash})` : `url(${url})`;
            return url ? { backgroundImage } : null;
        }
    }
};
</script>
