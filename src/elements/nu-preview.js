import Vue from 'vue';
import Preview from '@/components/Preview.vue';

const { Nude } = window;
const { NuElement } = Nude.elements;

export default class NuPreview extends NuElement {
  static get nuTag() {
    return 'nu-preview';
  }

  static get nuDefaults() {
    return {
      display: 'block',
      gap: '1x',
      fill: 'subtle',
      radius: '1r',
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

      this.nuContent = nuRef.tagName === 'TEXTAREA' ? nuRef.textContent : nuRef.innerHTML;

      this.nuRender();
    });
  }

  nuRender() {
    this.nuComponent = new Vue({
      render: (h) => h(Preview, { props: { markup: this.nuContent } }),
    }).$mount(this.nuContainer);
  }

  get nuEncodedData() {
    return encodeURIComponent(JSON.stringify(this.nuData));
  }

  nuChanged(name, oldValue, value) {
    super.nuChanged(name, oldValue, value);
  }
}

Nude.init(NuPreview);
