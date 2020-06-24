<template>
  <nu-flex
    ref="root" box="y"
    height="22 100% 100%" responsive="760px|600px" place="relative"
    :radius="markup ? '1r' : null" :border="markup ? '1bw' : null">
    <nu-flex
      :show="mode === 'editor' ? 'y' : 'y|n'"
      fill="bg" height="22 100% 100%" flow="column" :width="`${split}%|100%`">
      <nu-props header-color="hue(266 70)"></nu-props>
      <nu-props quote-color="hue(128 70)"></nu-props>
      <nu-props negative-color="hue(12 70)"></nu-props>
      <nu-props positive-color="hue(128 70)"></nu-props>
      <nu-props keyword-color="hue(298 70)"></nu-props>
      <nu-props atom-color="hue(267 70)"></nu-props>
      <nu-props number-color="hue(148 70)"></nu-props>
      <nu-props def-color="hue(266 70)"></nu-props>
      <nu-props variable-color="hue(255 70)"></nu-props>
      <nu-props type-color="hue(145 70)"></nu-props>
      <nu-props comment-color="hue(31 70)"></nu-props>
      <nu-props string-color="hue(12 70)"></nu-props>
      <nu-props string-2-color="hue(19 70)"></nu-props>
      <nu-props meta-color="hue(0 70)"></nu-props>
      <nu-props builtin-color="hue(269 70)"></nu-props>
      <nu-props bracket-color="hue(86 70)"></nu-props>
      <nu-props tag-color="hue(127 70)"></nu-props>
      <nu-props attribute-color="hue(266 70)"></nu-props>
      <nu-props hr-color="hue(0 70 low)"></nu-props>
      <nu-props link-color="hue(266 70)"></nu-props>
      <nu-props error-color="hue(12 70)"></nu-props>

      <nu-pane
        border="bottom" fill="subtle" padding="right" text="nowrap"
        height="min 3" content="space-between">
        <nu-attrs
          for="nu-tooltip" text="nowrap"
          place="outside-bottom"></nu-attrs>
        <nu-flex>
          <nu-blocklink
            v-if="!currentEmbed" to="/storybook" display="flex" theme="special">
            <nu-svg
              fill="bg" src="/img/icon.svg"
              place="stretch" height="3 - 1bw" width="3 - 1bw"></nu-svg>
          </nu-blocklink>
          <nu-svg
            v-else fill theme="special"
            overflow="no" radius="1r 0 0 0"
            src="/img/icon.svg" place="stretch" height="3 - 1bw" width="3 - 1bw"></nu-svg>
          <nu-el text="w6 monospace" padding>REPL</nu-el>
        </nu-flex>
        <nu-flex size="xs" gap items="center">
          <nu-el v-if="!valid" theme="error" text="w6">INVALID MARKUP</nu-el>
          <nu-el v-if="saved" theme="positive" text="w5">
            <nu-icon name="check"></nu-icon>
            Saved
          </nu-el>
          <nu-btn v-if="!currentEmbed" padding @tap="save" special>
            SAVE
          </nu-btn>
          <nu-btn padding @tap="copyReplLink">
            <nu-tooltip>
              {{ copied ? 'Copied!' : 'Copy REPL Link' }}
            </nu-tooltip>
            <nu-icon name="share-2"></nu-icon>
          </nu-btn>
        </nu-flex>
      </nu-pane>

      <nu-flex grow="1" overflow="no" flow="column">
        <codemirror
          ref="editor"
          v-model="currentMarkup"
          :options="editorOptions"></codemirror>
      </nu-flex>

      <nu-block
        v-if="!currentEmbed"
        show="y|n" padding theme="tint" fill="subtle" border="top" size="xs">
        Press
        <nu-el v-if="isMac" text="w6">Cmd+E</nu-el>
        <nu-el v-else text="w6">Ctrl+E</nu-el>
        to see suggestions.
      </nu-block>
    </nu-flex>
    <Preview
      :show="mode === 'preview' ? 'y' : 'y|n'"
      :width="`${100 - split}% 100%|100% 100%`"
      ref="preview" repl overflow="no"
      :markup="previewMarkup" fill="subtle" border="left #special|0"
      place="right"></Preview>

    <nu-btn
      show="n|y"
      @tap="toggleMode"
      special size="xl" place="left bottom 2x" z="front" padding shadow=".5">
      <nu-icon :name="mode === 'editor' ? 'eye' : 'edit-2'"></nu-icon>
    </nu-btn>

    <Splitter v-model="split"></Splitter>
  </nu-flex>
</template>

<script>
import LZString from 'lz-string';
import copy from 'clipboard-copy';
import Vue from 'vue';
import codemirror from 'vue-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/cobalt.css';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/xml-hint';
import 'codemirror/mode/htmlmixed/htmlmixed';
// import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/hint/show-hint';
import '@/other/numl-hint';
import Preview from '../components/Preview.vue';
import GlobalEvents from '../services/global-events';
import Options from '../services/options';
import Splitter from '../components/Splitter.vue';

Vue.use(codemirror);

window.Repl = {
  convertToEmbedded() {
    const hash = window.location.hash.slice(1);
    const obj = JSON.parse(LZString.decompressFromEncodedURIComponent(hash));

    obj.embed = true;

    const data = LZString.compressToEncodedURIComponent(JSON.stringify(obj));

    return `https://numl.design/repl#${data}`;
  },
};

export default {
  name: 'repl',
  props: {
    markup: {
      type: String,
      required: false,
    },
    embed: Boolean,
  },
  data() {
    return {
      mode: 'editor',
      currentMarkup: '',
      editorOptions: {
        mode: 'text/html',
        tabSize: 2,
        indentUnit: 2,
        lineNumbers: true,
        autoCloseTags: true,
        styleActiveLine: true,
        extraKeys: {
          'Ctrl-E': 'autocomplete',
          'Cmd-E': 'autocomplete',
        },
      },
      valid: true,
      timerId: null,
      previewMarkup: null,
      version: window.Nude.version,
      copied: false,
      saved: false,
      currentEmbed: false,
      isMac: navigator.appVersion.includes('Mac'),
      split: 50,
    };
  },
  watch: {
    currentMarkup() {
      clearTimeout(this.timerId);

      this.timerId = setTimeout(() => {
        if (!this.checkMarkup()) return;

        this.previewMarkup = this.currentMarkup;
        GlobalEvents.$emit('options:change', Options.get());
      }, 1000);
    },
  },
  computed: {
    encodedData() {
      const ref = this.$refs.preview;

      if (!ref) return {};

      return ref.encodedData;
    },
  },
  methods: {
    toggleMode() {
      this.mode = (this.mode === 'editor' ? 'preview' : 'editor');
    },
    checkMarkup() {
      // @TODO: replace with working code
      return true;
      // const html = this.markup.trim();
      // const doc = document.createElement('div');
      // doc.innerHTML = html;
      // const newHtml = doc.innerHTML.trim().replace(/=""/g, '');
      // const check = newHtml === html;
      //
      // this.valid = check;
      //
      // return check;
    },
    copyReplLink() {
      copy(`https://numl.design/repl#${this.encodedData}`);

      this.copied = true;

      setTimeout(() => {
        this.copied = false;
      }, 2000);
    },
    save() {
      window.location.hash = this.encodedData;

      this.saved = true;

      setTimeout(() => {
        this.saved = false;
      }, 2000);
    },
  },
  mounted() {
    if (!this.$refs.root.parentNode) return;

    if (this.markup) {
      this.currentMarkup = this.markup;
      this.currentEmbed = !!this.embed;
    } else {
      const hash = window.location.hash.slice(1);

      let data;

      if (hash) {
        try {
          data = JSON.parse(decodeURIComponent(hash));
        } catch (e) {
          try {
            data = JSON.parse(LZString.decompressFromEncodedURIComponent(hash));
          } catch (e2) {
            // do nothing
          }
          // do nothing
        }

        this.currentMarkup = data.markup;
        this.currentEmbed = data.embed || false;
      }

      if (!this.checkMarkup()) return;

      this.previewMarkup = this.markup;
    }

    setTimeout(() => {
      if (this.$refs.editor) {
        this.$refs.editor.codemirror.refresh();
      }
    }, 500);
  },
  components: {
    Preview,
    Splitter,
  },
};
</script>

<style>
.vue-codemirror {
  display: flex;
  flex-flow: column;
  width: 100%;
  flex-grow: 1;
}

.CodeMirror {
  background: var(--nu-main-bg-color);
  color: var(--nu-main-text-color);
  flex-grow: 1;
}

.CodeMirror-scroll {
  box-sizing: content-box;
  height: calc(100 * var(--nu-window-height) - 12.5 * var(--nu-gap) + var(--nu-border-width));
}

.cm-s-default .cm-header {
  color: var(--nu-header-text-color);
}

.cm-s-default .cm-quote {
  color: var(--nu-quote-text-color);
}

.cm-negative {
  color: var(--nu-negative-text-color);
}

.cm-positive {
  color: var(--nu-positive-text-color);
}

.cm-header, .cm-strong {
  font-weight: bold;
}

.cm-em {
  font-style: italic;
}

.cm-link {
  text-decoration: underline;
}

.cm-strikethrough {
  text-decoration: line-through;
}

.cm-s-default .cm-keyword {
  color: var(--nu-keyword-color);
}

.cm-s-default .cm-atom {
  color: var(--nu-atom-color);
}

.cm-s-default .cm-number {
  color: var(--nu-number-color);
}

.cm-s-default .cm-def {
  color: var(--nu-def-color);
}

.cm-s-default .cm-variable,
.cm-s-default .cm-punctuation,
.cm-s-default .cm-property,
.cm-s-default .cm-operator {
}

.cm-s-default .cm-variable-2 {
  color: var(--nu-variable-color);
}

.cm-s-default .cm-variable-3, .cm-s-default .cm-type {
  color: var(--nu-type-color);
}

.cm-s-default .cm-comment {
  color: var(--nu-comment-color);
}

.cm-s-default .cm-string {
  color: var(--nu-string-color);
}

.cm-s-default .cm-string-2 {
  color: var(--nu-string-2-color);
}

.cm-s-default .cm-meta {
  color: var(--nu-meta-color);
}

.cm-s-default .cm-qualifier {
  color: var(--nu-meta-color);
}

.cm-s-default .cm-builtin {
  color: var(--nu-builtin-color);
}

.cm-s-default .cm-bracket {
  color: var(--nu-bracket-color);
}

.cm-s-default .cm-tag {
  color: var(--nu-tag-color);
}

.cm-s-default .cm-attribute {
  color: var(--nu-attribute-color);
}

.cm-s-default .cm-hr {
  color: var(--nu-hr-color);
}

.cm-s-default .cm-link {
  color: var(--nu-link-color);
}

.cm-s-default .cm-error {
  color: var(--nu-cm-error-color);
}

.cm-invalidchar {
  color: var(--nu-cm-error-color);
}

.CodeMirror-composing {
  border-bottom: 2px solid;
}

.CodeMirror-gutters {
  border-right: 1px solid var(--nu-main-border-color);
  background-color: var(--nu-main-subtle-color);
  white-space: nowrap;
}

.CodeMirror-linenumbers {
}

.CodeMirror-linenumber {
  padding: 0 3px 0 5px;
  min-width: 20px;
  text-align: right;
  color: #999;
  white-space: nowrap;
}

.CodeMirror-guttermarker {
  color: var(--nu-main-text-color);
}

.CodeMirror-guttermarker-subtle {
  color: #999;
}

.CodeMirror-selected {
  background: var(--nu-main-focus-color);
}

.CodeMirror-focused .CodeMirror-selected {
  background: var(--nu-main-focus-color);
}

.CodeMirror-crosshair {
  cursor: crosshair;
}

.CodeMirror-line::selection
, .CodeMirror-line > span::selection
, .CodeMirror-line > span > span::selection {
  background: var(--nu-main-focus-color);
}

.CodeMirror-line::-moz-selection
, .CodeMirror-line > span::-moz-selection
, .CodeMirror-line > span > span::-moz-selection {
  background: var(--nu-main-focus-color);
}

.CodeMirror-cursor {
  background: var(--nu-main-hover-color);
  border-left: 1px solid var(--nu-main-text-color);
}
.CodeMirror-hscrollbar::-webkit-scrollbar, .CodeMirror-vscrollbar::-webkit-scrollbar {
  width: var(--nu-gap);
  height: var(--nu-gap);
}
.CodeMirror-hscrollbar::-webkit-scrollbar-track, .CodeMirror-vscrollbar::-webkit-scrollbar-track {
  background-color: var(--nu-local-bg-color, var(--nu-subtle-color));
}
.CodeMirror-hscrollbar::-webkit-scrollbar-thumb, .CodeMirror-vscrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(var(--nu-text-color-rgb), .5);
  border-radius: var(--nu-radius);
  border: var(--nu-border-width) solid var(--nu-subtle-color);
}
.CodeMirror-hscrollbar::-webkit-scrollbar-corner, .CodeMirror-vscrollbar::-webkit-scrollbar-corner {
  background-color: transparent;
}
.CodeMirror-hscrollbar, .CodeMirror-vscrollbar {
  scrollbar-width: thin;
  scrollbar-color: var(--nu-subtle-color) rgba(var(--nu-text-color-rgb), .5);
}
.CodeMirror-scrollbar-filler {
  background-color: transparent;
}

</style>
