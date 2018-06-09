import Quill from 'quill';
import Emitter from 'quill/core/emitter';
import BaseTooltip from './tooltip';

const SnowTheme = Quill.import('themes/snow'),
    LinkBlot = Quill.import('formats/link'),
    Icons = Quill.import('ui/icons');

class EtTheme extends SnowTheme {
    extendToolbar (toolbar) {
        toolbar.container.classList.add('ql-snow');
        this.buildButtons([].slice.call(toolbar.container.querySelectorAll('button')), Icons);
        this.buildPickers([].slice.call(toolbar.container.querySelectorAll('select')), Icons);
        this.tooltip = new EtTooltip(this.quill, this.options.bounds);
        if (toolbar.container.querySelector('.ql-link')) {
            this.quill.keyboard.addBinding({ key: 'K', shortKey: true }, (range, context) => {
                toolbar.handlers.link.call(toolbar, !context.format.link);
            });
        }
    }
}
class EtTooltip extends BaseTooltip {
    constructor (quill, bounds) {
        super(quill, bounds);
        this.preview = this.root.querySelector('a.ql-preview');
    }

    listen () {
        super.listen();
        this.root.querySelector('a.ql-action').addEventListener('click', event => {
            if (this.root.classList.contains('ql-editing')) {
                this.save();
            } else {
                this.edit('link', this.preview.textContent);
            }
            event.preventDefault();
        });
        this.root.querySelector('a.ql-remove').addEventListener('click', event => {
            if (this.linkRange != null) {
                const range = this.linkRange;
                this.restoreFocus();
                this.quill.formatText(range, 'link', false, Emitter.sources.USER);
                delete this.linkRange;
            }
            event.preventDefault();
            this.hide();
        });
        this.quill.on(Emitter.events.SELECTION_CHANGE, (range, oldRange, source) => {
            if (range == null) return;
            if (range.length === 0 && source === Emitter.sources.USER) {
                const [link, offset] = this.quill.scroll.descendant(LinkBlot, range.index);
                if (link != null) {
                    this.linkRange = new Range(range.index - offset, link.length());
                    const preview = LinkBlot.formats(link.domNode);
                    this.preview.textContent = preview;
                    this.preview.setAttribute('href', preview);
                    this.show();
                    this.position(this.quill.getBounds(this.linkRange));
                    return;
                }
            } else {
                delete this.linkRange;
            }
            this.hide();
        });
    }

    show () {
        super.show();
        this.root.removeAttribute('data-mode');
    }
}

EtTooltip.TEMPLATE = [
    '<a class="ql-preview" target="_blank" href="about:blank"></a>',
    '<input type="text" data-formula="e=mc^2" data-link="https://eternalzzx.com" data-video="Embed URL">',
    '<a class="ql-action"></a>',
    '<a class="ql-remove"></a>'
].join('');

class Range {
    constructor (index, length = 0) {
        this.index = index;
        this.length = length;
    }
}

export default EtTheme;
