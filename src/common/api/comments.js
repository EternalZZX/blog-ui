import BaseRequest from '@/common/request';

class CommentApi extends BaseRequest {
    constructor () {
        super();
        this.url = '/content/comments/';
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

    listResourceComments (resourceType, resourceUuid, params = {}, config = {}) {
        const args = {
            resource_type: resourceType,
            resource_uuid: resourceUuid,
            status: `${CommentApi.STATUS.ACTIVE}${CommentApi.STATUS.AUDIT}`,
            ...params
        };
        return super.get(this.url, {
            params: args,
            ...config
        });
    }

    listReplyComments (resourceType, resourceUuid, replyUuid, params = {}, config = {}) {
        const args = {
            resource_type: resourceType,
            resource_uuid: resourceUuid,
            reply_uuid: replyUuid,
            status: `${CommentApi.STATUS.ACTIVE}${CommentApi.STATUS.AUDIT}`,
            ...params
        };
        return super.get(this.url, {
            params: args,
            ...config
        });
    }

    listDialogComments (resourceType, resourceUuid, dialogUuid, params = {}, config = {}) {
        const args = {
            resource_type: resourceType,
            resource_uuid: resourceUuid,
            dialog_uuid: dialogUuid,
            status: `${CommentApi.STATUS.ACTIVE}${CommentApi.STATUS.AUDIT}`,
            ...params
        };
        return super.get(this.url, {
            params: args,
            ...config
        });
    }

    reply (content, resourceUuid, resourceType, replyUuid = null, data = {}, config = {}) {
        const err = CommentApi.validateParams({ content }, {
            content: [{ required: true }]
        });
        if (err) { return err; }
        const args = {
            content,
            resource_uuid: resourceUuid,
            resource_type: resourceType,
            ...data
        };
        replyUuid && (args.reply_uuid = replyUuid);
        return super.post(this.url, args, config);
    }

    edit (uuid, content, config = {}) {
        const err = CommentApi.validateParams({ content }, {
            content: [{ required: true }]
        });
        if (err) { return err; }
        return super.put(`${this.url}${uuid}/`, {
            content
        }, config);
    }

    upvote (uuid, data = {}, config = {}) {
        return super.put(`${this.url}${uuid}/`, {
            like_operate: CommentApi.LIKE_OPERATE.LIKE,
            ...data
        }, config);
    }

    downvote (uuid, data = {}, config = {}) {
        return super.put(`${this.url}${uuid}/`, {
            like_operate: CommentApi.LIKE_OPERATE.DISLIKE,
            ...data
        }, config);
    }
}

CommentApi.STATUS = {
    CANCEL: 0,
    ACTIVE: 1,
    AUDIT: 2,
    FAILED: 3,
    RECYCLED: 4
};

CommentApi.RESOURCE_TYPE = {
    ARTICLE: 0,
    ALBUM: 1,
    PHOTO: 2
};

CommentApi.LIKE_TYPE = {
    NONE: 0,
    LIKE: 1,
    DISLIKE: 2
};

CommentApi.LIKE_OPERATE = {
    LIKE: 1,
    DISLIKE: 0
};

export { CommentApi };

export default new CommentApi();
