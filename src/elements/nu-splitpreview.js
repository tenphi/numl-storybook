import LZString from 'lz-string';
import { Nude } from '../numl';

const { NuElement } = Nude.elements;

export default class NuSplitPreview extends NuElement {
  static get nuTag() {
    return 'nu-splitpreview';
  }

  static get nuStyles() {
    return {
      display: 'block',
    };
  }

  static nuCSS({ tag, css }) {
    return `
      ${css}
      ${tag} > pre, ${tag} > textarea {
        display: none;
      }`;
  }

  nuConnected() {
    super.nuConnected();

    setTimeout(() => {
      if (this.nuRef) return;

      const nuRef = this.querySelector('textarea, pre');

      if (!nuRef) {
        return;
      }

      this.nuRef = nuRef;

      nuRef.setAttribute('role', 'none');
      nuRef.setAttribute('aria-hidden', 'true');

      const container = document.createElement('nu-block');

      this.appendChild(container);

      this.nuContainer = container;

      this.nuContent = (nuRef.tagName === 'TEXTAREA' ? nuRef.textContent : nuRef.innerHTML);

      this.nuPreview = this.nuContent.replace(/#\[\[|!\[\[|]]#|]]!/g, '');

      container.innerHTML = `<nu-grid columns="1pr 1pr|1pr|1pr 1pr|1pr" gap="2x" items="stretch" box="y">
  <nu-flow place="relative" gap>
  ${this.nuContent.split('\n').length > 2 ? `<nu-btn
    place="top outside-left .5x 0|start|top outside-left .5x 0|start" special size="xs" padding="1x .5x|1x|1x .5x|1x" radius="1r 0 0 1r|1r|1r 0 0 1r|1r"
    to="!/repl#${this.nuEncodedData}" opacity="1" z="above">
      <nu-icon name="external-link"></nu-icon>
      <nu-tooltip text="nowrap" place="outside-top left" show="y|||n">Open snippet in REPL</nu-tooltip>
      <nu-el text="nowrap" color="special" show="n|y|n|y">Open in REPL</nu-el>
    </nu-btn>` : ''}
    <nu-code radius shadow padding="1x 2x" overflow="auto" scrollbar grow="1"><textarea>${this.nuContent}</textarea></nu-code>
  </nu-flow>
  <nu-block padding="2x left" border="1sw left inside color(special-bg 50%)">${this.nuPreview}</nu-block>
</nu-grid>`;
    });
  }

  get nuEncodedData() {
    return LZString.compressToEncodedURIComponent(JSON.stringify({ markup: this.nuPreview }));
  }
}

customElements.define(NuSplitPreview.nuTag, NuSplitPreview);
