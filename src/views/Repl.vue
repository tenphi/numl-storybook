<template>
  <nu-flex height="100%" overflow="hidden" responsive="760px|600px">
    <nu-flex
      :show="mode === 'editor' ? 'y' : 'y|n'"
      fill="bg" height="100vh" flow="column" :width="`${split}%|100%`">
      <nu-theme name="header" hue="#00f" mod="tint"></nu-theme>
      <nu-theme name="quote" hue="#090" mod="tint"></nu-theme>
      <nu-theme name="negative" hue="#d44" mod="tint"></nu-theme>
      <nu-theme name="positive" hue="#292" mod="tint"></nu-theme>
      <nu-theme name="keyword" hue="#708" mod="tint"></nu-theme>
      <nu-theme name="atom" hue="#219" mod="tint"></nu-theme>
      <nu-theme name="number" hue="#164" mod="tint"></nu-theme>
      <nu-theme name="def" hue="#00f" mod="tint"></nu-theme>
      <nu-theme name="variable" hue="#05a" mod="tint"></nu-theme>
      <nu-theme name="type" hue="#085" mod="tint"></nu-theme>
      <nu-theme name="comment" hue="#a50" mod="tint"></nu-theme>
      <nu-theme name="string" hue="#a11" mod="tint"></nu-theme>
      <nu-theme name="string-2" hue="#f50" mod="tint"></nu-theme>
      <nu-theme name="meta" hue="#555" mod="tint"></nu-theme>
      <nu-theme name="builtin" hue="#30a" mod="tint"></nu-theme>
      <nu-theme name="bracket" hue="#997" mod="tint"></nu-theme>
      <nu-theme name="tag" hue="#170" mod="tint"></nu-theme>
      <nu-theme name="attribute" hue="#00c" mod="tint"></nu-theme>
      <nu-theme name="hr" hue="#999" mod="tint soft"></nu-theme>
      <nu-theme name="link" hue="#00c" mod="tint"></nu-theme>
      <nu-theme name="error" hue="#f00" mod="tint"></nu-theme>

      <nu-pane border="bottom" fill="subtle" padding="right" text="nowrap" height="min(2.5)">
        <nu-attrs
          for="nu-tooltip" text="nowrap"
          place="outside-bottom"></nu-attrs>
        <nu-flex>
          <nu-blocklink v-if="!embed" to="/" display="flex" theme="special">
            <nu-svg
              fill="bg" src="/img/icon.svg" place="stretch" height="2.5" width="2.5"></nu-svg>
          </nu-blocklink>
          <nu-svg
            v-else fill theme="special"
            src="/img/icon.svg" place="stretch" height="2.5" width="2.5"></nu-svg>
          <nu-el text="w6 monospace" padding>REPL</nu-el>
        </nu-flex>
        <nu-flex size="xs" gap items="center">
          <nu-el v-if="!valid" theme="error" text="w6">INVALID MARKUP</nu-el>
          <nu-el v-if="saved" theme="positive" text="w5">
            <nu-icon name="check"></nu-icon>
            Saved
          </nu-el>
          <nu-btn v-if="!embed" padding @tap="save" special>
            Save
          </nu-btn>
          <nu-btn padding @tap="copyReplLink">
            <nu-tooltip>
              {{ copied ? 'Copied!' : 'Copy REPL Link' }}
            </nu-tooltip>
            <nu-icon name="share-2"></nu-icon>
          </nu-btn>
        </nu-flex>
      </nu-pane>

      <nu-flex grow="1" overflow="no" scrollbar flow="column">
        <codemirror
          v-model="markup"
          :options="editorOptions"></codemirror>
      </nu-flex>

      <nu-block
        v-if="!embed"
        show="y|n" padding theme="tint" fill="subtle" border="top" size="xs">
        Press
        <nu-el v-if="isMac" text="w6">Cmd+E</nu-el>
        <nu-el v-else text="w6">Ctrl+E</nu-el>
        to see suggestions.
      </nu-block>
    </nu-flex>
    <Preview
      :show="mode === 'preview' ? 'y' : 'y|n'"
      :width="`${100 - split}%|100%`"
      ref="preview" repl
      :markup="previewMarkup" height="100vh" fill="subtle" border="left color(special)|0"></Preview>

    <nu-btn
      show="n|y"
      @tap="toggleMode"
      special size="xl" place="fixed left bottom 1" z="front" padding shadow=".5">
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
  data() {
    return {
      mode: 'editor',
      markup: '',
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
      previewMarkup: '',
      version: window.Nude.version,
      copied: false,
      saved: false,
      embed: false,
      isMac: navigator.appVersion.includes('Mac'),
      split: 50,
    };
  },
  watch: {
    markup() {
      clearTimeout(this.timerId);

      this.timerId = setTimeout(() => {
        if (!this.checkMarkup()) return;

        this.previewMarkup = this.markup;
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

      this.markup = data.markup;
      this.embed = data.embed || false;
    }

    if (!this.checkMarkup()) return;

    this.previewMarkup = this.markup;
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
  color: var(--nu-keyword-text-color);
}

.cm-s-default .cm-atom {
  color: var(--nu-atom-text-color);
}

.cm-s-default .cm-number {
  color: var(--nu-number-text-color);
}

.cm-s-default .cm-def {
  color: var(--nu-def-text-color);
}

.cm-s-default .cm-variable,
.cm-s-default .cm-punctuation,
.cm-s-default .cm-property,
.cm-s-default .cm-operator {
}

.cm-s-default .cm-variable-2 {
  color: var(--nu-variable-text-color);
}

.cm-s-default .cm-variable-3, .cm-s-default .cm-type {
  color: var(--nu-type-text-color);
}

.cm-s-default .cm-comment {
  color: var(--nu-comment-text-color);
}

.cm-s-default .cm-string {
  color: var(--nu-string-text-color);
}

.cm-s-default .cm-string-2 {
  color: var(--nu-string-2-text-color);
}

.cm-s-default .cm-meta {
  color: var(--nu-meta-text-color);
}

.cm-s-default .cm-qualifier {
  color: var(-meta-nu--text-color);
}

.cm-s-default .cm-builtin {
  color: var(--nu-builtin-text-color);
}

.cm-s-default .cm-bracket {
  color: var(--nu-bracket-text-color);
}

.cm-s-default .cm-tag {
  color: var(--nu-tag-text-color);
}

.cm-s-default .cm-attribute {
  color: var(--nu-attribute-text-color);
}

.cm-s-default .cm-hr {
  color: var(--nu-hr-text-color);
}

.cm-s-default .cm-link {
  color: var(--nu-link-text-color);
}

.cm-s-default .cm-error {
  color: var(--nu-cm-error-text-color);
}

.cm-invalidchar {
  color: var(--nu-cm-error-text-color);
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
</style>
