import BaseRequest from '@/common/request';

class SectionApi extends BaseRequest {
    getSection (id) {
        return this.get(`/content/sections/${id}/`);
    }
}

export default new SectionApi();
