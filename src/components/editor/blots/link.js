import Quill from 'quill';

const Inline = Quill.import('blots/inline');

class Link extends Inline {
    static create (value) {
        const node = super.create(value);
        value = this.sanitize(value);
        node.setAttribute('href', value);
        node.setAttribute('target', '_blank');
        return node;
    }

    static formats (domNode) {
        return domNode.getAttribute('href');
    }

    static sanitize (url) {
        return sanitize(url, this.PROTOCOL_WHITELIST) ? url : this.SANITIZED_URL;
    }

    format (name, value) {
        if (name !== this.statics.blotName || !value) {
            return super.format(name, value);
        }
        value = this.constructor.sanitize(value);
        this.domNode.setAttribute('href', value);
        return void 0;
    }
}

Link.blotName = 'link';
Link.tagName = 'A';
Link.SANITIZED_URL = 'about:blank';
Link.PROTOCOL_WHITELIST = ['http', 'https', 'ftp'];

function sanitize (url, protocols) {
    const anchor = document.createElement('a');
    anchor.href = url;
    const protocol = anchor.href.slice(0, anchor.href.indexOf(':'));
    return protocols.indexOf(protocol) > -1;
}

export { Link as default, sanitize };
