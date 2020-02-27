<template>
  <nu-flex height="100%" overflow="hidden">
    <nu-flex fill="bg" height="max(100vh)" flow="column" width="50%">
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

      <nu-pane border="bottom" fill="subtle" padding="right">
        <nu-attrs
          for="nu-tooltip" text="nowrap" width="max(min-content)"
          place="outside-bottom"></nu-attrs>
        <nu-flex>
          <nu-blocklink to="/" display="flex">
            <nu-svg
              theme="tint" fill="text"
              src="/img/icon.svg" place="stretch" height="2.5" width="2.5"></nu-svg>
          </nu-blocklink>
          <nu-el text="w6 monospace" padding>REPL for numl@{{ version }}</nu-el>
        </nu-flex>
        <nu-flex size="xs" gap items="center">
          <nu-el v-if="!valid" theme="error" text="w6">INVALID MARKUP</nu-el>
          <nu-el v-if="saved" theme="positive" text="w5">
            <nu-icon name="check"></nu-icon>
            Saved
          </nu-el>
          <nu-btn padding @tap="save" special>
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

      <nu-block grow="1" overflow="auto" scrollbar>
        <codemirror
          v-model="markup"
          :options="editorOptions"></codemirror>
      </nu-block>
    </nu-flex>
    <Preview
      width="50%"
      ref="preview" repl
      :markup="previewMarkup" height="100vh" fill="subtle" border="left"></Preview>
  </nu-flex>
</template>

<script>
import copy from 'clipboard-copy';
import Vue from 'vue';
import codemirror from 'vue-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/cobalt.css';
import 'codemirror/mode/htmlmixed/htmlmixed';
import Preview from '../components/Preview.vue';
import GlobalEvents from '../services/global-events';
import Options from '../services/options';

Vue.use(codemirror);

export default {
  name: 'repl',
  data() {
    return {
      markup: '<nu-btn>Something</nu-btn>',
      editorOptions: {
        mode: 'text/html',
        tabSize: 2,
        lineNumbers: true,
        autoCloseTags: true,
        styleActiveLine: true,
      },
      valid: true,
      timerId: null,
      previewMarkup: '',
      version: window.Nude.version,
      copied: false,
      saved: false,
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
      copy(`https:/numl.design/repl#${this.encodedData}`);

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

    if (hash) {
      try {
        this.markup = JSON.parse(decodeURIComponent(hash)).markup;
      } catch (e) {
        // do nothing
      }
    }

    // window.location.hash = '';

    if (!this.checkMarkup()) return;

    this.previewMarkup = this.markup;
  },
  components: {
    Preview,
  },
};
</script>

<style>
.vue-codemirror {
  height: 100%;
}

.CodeMirror {
  height: 100%;
  background: var(--nu-main-bg-color);
  color: var(--nu-main-text-color);
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
</style>
