import BaseRequest from '@/common/request';

class AlbumApi extends BaseRequest {
    constructor () {
        super();
        this.url = '/content/albums/';
    }

    get (uuid, config = {}) {
        return super.get(`${this.url}${uuid}/`, config);
    }

    list (params = {}, config = {}) {
        return super.get(this.url, {
            params,
            ...config
        });
    }

    create (data, config = {}) {
        return super.post(this.url, data, config);
    }

    update (uuid, data, config = {}) {
        return super.put(`${this.url}${uuid}/`, data, config);
    }

    delete (uuid = '', data = {}, config = {}) {
        const deleteUrl = uuid === '' ? `${this.url}` : `${this.url}${uuid}/`;
        return super.delete(deleteUrl, {
            data,
            ...config
        });
    }

    listSelfAlbums (uuid, privacy = null, params = {}, config = {}) {
        const args = {
            ...params,
            author_uuid: uuid,
            order_field: 'create_at'
        };
        privacy !== null && (args.privacy = privacy);
        return super.get(this.url, {
            params: args,
            ...config
        });
    }

    QuerySelfAlbums (uuid, query, params = {}, config = {}) {
        const args = {
            ...params,
            author_uuid: uuid,
            query_field: 'name',
            query,
            order_field: 'create_at'
        };
        return super.get(this.url, {
            params: args,
            ...config
        });
    }
}

AlbumApi.PRIVACY = {
    PRIVATE: 0,
    PUBLIC: 1
};

AlbumApi.SYSTEM = {
    AVATAR_ALBUM: 0,
    ALBUM_COVER_ALBUM: 1,
    SECTION_COVER_ALBUM: 2,
    ARTICLE_COVER_ALBUM: 3
};

AlbumApi.LIKE_TYPE = {
    NONE: 0,
    LIKE: 1,
    DISLIKE: 2
};

AlbumApi.LIKE_OPERATE = {
    LIKE: 1,
    DISLIKE: 0
};

export { AlbumApi };

export default new AlbumApi();
