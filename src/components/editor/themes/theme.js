import Quill from 'quill';
import Emitter from 'quill/core/emitter';
import BaseTooltip from './tooltip';

const SnowTheme = Quill.import('themes/snow'),
    LinkBlot = Quill.import('formats/link');

class EtTheme extends SnowTheme {
    extendToolbar (toolbar) {
        toolbar.container.classList.add('ql-snow');
        this.tooltip = new EtTooltip(this.quill, this.options.bounds);
        if (toolbar.container.querySelector('.ei-link')) {
            this.quill.keyboard.addBinding({ key: 'K', shortKey: true }, (range, context) => {
                toolbar.handlers.link.call(toolbar, !context.format.link);
            });
        }
    }
}

class EtTooltip extends BaseTooltip {
    constructor (quill, bounds) {
        super(quill, bounds);
        this.preview = this.root.querySelector('a.et-editor__tooltip-preview');
    }

    listen () {
        this.root.querySelector('i.ei-brush-fill').addEventListener('click', event => {
            this.edit();
            event.preventDefault();
        });
        this.root.querySelector('i.ei-trash-fill').addEventListener('click', event => {
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
                    this.linkBlot = link;
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

EtTooltip.TEMPLATE = `
<a class="et-editor__tooltip-preview" target="_blank" href="about:blank"></a>
<i class="et-icon ei-brush-fill"></i>
<i class="et-icon ei-trash-fill"></i>`;

export class Range {
    constructor (index, length = 0) {
        this.index = index;
        this.length = length;
    }
}

export default EtTheme;
