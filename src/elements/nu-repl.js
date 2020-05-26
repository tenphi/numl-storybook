import Vue from 'vue';
import Repl from '@/views/Repl.vue';
import NuPreview from './nu-preview';

export default class NuRepl extends NuPreview {
  static get nuTag() {
    return 'nu-repl';
  }

  nuRender() {
    this.nuComponent = new Vue({
      render: (h) => h(Repl, { props: { markup: this.nuContent, embed: true } }),
    }).$mount(this.nuContainer);
  }
}

customElements.define(NuRepl.nuTag, NuRepl);
