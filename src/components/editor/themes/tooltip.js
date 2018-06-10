import Quill from 'quill';

const Tooltip = Quill.import('ui/tooltip');

class BaseTooltip extends Tooltip {
    constructor (quill, boundsContainer) {
        super(quill, boundsContainer);
        this.listen();
    }

    cancel () {
        this.hide();
    }

    edit () {
        const toolbar = this.quill.options.modules.toolbar;
        toolbar.handlers.link.call(toolbar, false, this.linkBlot, this.linkRange);
        this.hide();
    }

    restoreFocus () {
        const scrollTop = this.quill.scrollingContainer.scrollTop;
        this.quill.focus();
        this.quill.scrollingContainer.scrollTop = scrollTop;
    }
}

export default BaseTooltip;
