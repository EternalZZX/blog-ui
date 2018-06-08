import Quill from 'quill';

const SnowTheme = Quill.import('themes/snow');
const Tooltip = Quill.import('ui/tooltip');

class EtTheme extends SnowTheme {
    extendToolbar (toolbar) {
        super.extendToolbar(toolbar);
        this.tooltip = new EtTooltip(this.quill, this.options.bounds);
        this.tooltip.root.appendChild(toolbar.container);
    }
}

class EtTooltip extends Tooltip {}

EtTooltip.TEMPLATE = [
    '<span class="ql-tooltip-arrow"></span>',
    '<div class="ql-tooltip-editor">',
    '<input type="text" data-formula="e=mc^2" data-link="https://myurl.com" data-video="Embed URL">',
    '<a class="ql-close"></a>',
    '</div>'
].join('');

export default EtTheme;
