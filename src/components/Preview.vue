<template>
  <nu-flex :height="repl ? '20 100% 100%' : 'min(5)'" width="max" flow="column">
    <nu-attrs
      for="nu-tooltip" text="nowrap"
      :place="repl ? 'outside-bottom' : null"></nu-attrs>
    <nu-pane
      border="bottom" padding="2x left right|1x left right"
      content="space-between" items="center" responsive="500px" height="min 3">
      <nu-attrs for="icon" size="1em"></nu-attrs>
      <nu-attrs for="btn" padding="1x 1.5x"></nu-attrs>

      <nu-tablist
        value="preview" v-if="!repl"
        gap="2x|1x" @input="tab = $event.detail" height="min 3 - 1bw">
        <nu-tab control="preview" value="preview" padding="1x 0|1x" trigger>
          <nu-el show="y|n">Preview</nu-el>
          <nu-icon name="eye" show="n|y" height="1.5"></nu-icon>
        </nu-tab>
        <nu-tab control="source" value="source" padding="1x 0|1x" trigger>
          <nu-el show="y|n">Source</nu-el>
          <nu-icon name="code" show="n|y" height="1.5"></nu-icon>
        </nu-tab>
        <!--        <nu-tab control="runtime" disabled trigger>-->
        <!--          Runtime-->
        <!--        </nu-tab>-->
      </nu-tablist>
      <nu-block v-else></nu-block>
      <nu-flex gap items="center" size="xs" text="w7">
        <template v-if="tab === 'preview'">
          <nu-el id="scale" show="y|n">{{parseInt(scale * 100)}}%</nu-el>
          <nu-group radius border="0">
            <nu-btn
              id="zoom-out" move="1bw 0" :disabled="!zoomInEnabled"
              @tap="zoomOut">
              <nu-tooltip>Zoom out</nu-tooltip>
              <nu-icon name="zoom-out"></nu-icon>
            </nu-btn>
            <nu-btn
              id="zoom-in" :disabled="!zoomOutEnabled"
              @tap="zoomIn">
              <nu-tooltip>Zoom in</nu-tooltip>
              <nu-icon name="zoom-in"></nu-icon>
            </nu-btn>
          </nu-group>
          <nu-btn width="5x" text="center" content="center">
            {{ size }}
            <nu-popuplistbox
              padding="0"
              @input="(e) => setSize(e.detail)" :value="size">
              <nu-flex>
                <nu-el padding="1x 1x" text="w7 center">ROOT SIZE</nu-el>
                <nu-line orient="y" height="3"></nu-line>
                <nu-option
                  v-for="option in sizes"
                  :key="option"
                  :size="option"
                  :value="option"
                  border=":current[1sw bottom inside color(special)] 0">
                  {{ option }}
                </nu-option>
              </nu-flex>
            </nu-popuplistbox>
          </nu-btn>
        </template>

        <template v-if="!repl">
          <nu-btn @tap="copySourceCode">
            <nu-tooltip>
              {{ copied ? 'Copied!' : 'Copy source code' }}
            </nu-tooltip>
            <nu-icon name="copy"></nu-icon>
          </nu-btn>
          <nu-btn :to="`!/repl#${encodedData}`">
            <nu-tooltip>Open in REPL</nu-tooltip>
            <nu-icon name="edit-2"></nu-icon>
          </nu-btn>
        </template>
        <nu-btn :to="`!/preview.html#${encodedData}`">
          <nu-tooltip>
            {{ repl ? 'Open preview in separate tab' : 'Open in the new tab' }}
          </nu-tooltip>
          <nu-icon name="external-link"></nu-icon>
        </nu-btn>
      </nu-flex>
    </nu-pane>

    <nu-block v-if="frame" id="preview" v-html="markup" padding="2x" hidden grow="1"></nu-block>
    <nu-block
      v-else id="preview" :hidden="tab !== 'preview'"
      grow="1" fill="main-subtle">
      <nu-props
        gap="--preview-gap"
        radius="--preview-radius"
        border-width="--preview-border-width"
        transition-time="--preview-transition-time"></nu-props>
      <iframe
        ref="frame" :src="`/preview.html#${encodedData}`" frameborder="0"
        :scrolling="repl ? 'yes' : 'no'" width="100%" @load="resizeIframe(this)"
        :style="iframeStyles"></iframe>
    </nu-block>

    <nu-block id="source" padding hidden overflow="auto" fill="main-subtle" grow="1">
      <nu-code enumerate fill="main-subtle" shadow="0">
        <textarea v-html="repl ? '' : markup"></textarea>
      </nu-code>
    </nu-block>
  </nu-flex>
</template>

<script>
import LZString from 'lz-string';
import copy from 'clipboard-copy';
import Lockr from 'lockr';
import Options, { DEFAULT_OPTIONS } from '@/services/options';
import GlobalEvents from '../services/global-events';

export default {
  name: 'preview',
  props: {
    markup: String,
    frame: Boolean,
    repl: Boolean,
  },
  data() {
    return {
      scale: Lockr.get('numl:scale') || 1,
      zoomLevels: [0.5, 0.67, 0.75, 0.8, 0.9, 1, 1.1, 1.25, 1.50, 1.75, 2],
      timerId: null,
      options: Options.get(),
      copied: false,
      size: 'md',
      sizes: ['xs', 'sm', 'md', 'lg', 'xl'],
      tab: 'preview',
      contentWindow: null,
    };
  },
  watch: {
    scale() {
      this.onViewportChange();
    },
    markup(val) {
      if (!val) return;

      const { frame } = this.$refs;

      if (frame && val.includes('<script')) {
        setTimeout(() => {
          frame.contentWindow.location.reload();
        }, 100);
      }
    },
  },
  computed: {
    zoomOutEnabled() {
      return this.zoomLevels.indexOf(this.scale) < this.zoomLevels.length - 1;
    },
    zoomInEnabled() {
      return this.zoomLevels.indexOf(this.scale) > 0;
    },
    encodedData() {
      return LZString.compressToEncodedURIComponent(JSON.stringify({
        scale: this.scale !== 1 ? this.scale : undefined,
        markup: this.markup && this.markup.trim() ? this.markup : undefined,
        options: this.preparedOptions,
        size: this.size !== 'md' ? this.size : undefined,
      }));
    },
    iframeStyles() {
      return {
        display: 'block',
        transition: 'height var(--nu-transition-time) linear',
        'max-width': '100%',
        height: this.repl ? '100%' : '58px',
      };
    },
    preparedOptions() {
      const { options } = this;

      const prepared = Object.entries(options).reduce((opts, [key, value]) => {
        if (value !== DEFAULT_OPTIONS[key]) {
          opts[key] = value;
        }

        return opts;
      }, {});

      if (!Object.keys(prepared).length) return undefined;

      return prepared;
    },
  },
  mounted() {
    GlobalEvents.$on('options:change', (options) => {
      this.options = options;

      setTimeout(this.resizeIframe, 100);
    });

    if (!window.resizeIframe2) {
      window.resizeIframe2 = this.resizeIframe.bind(this);
      window.resizeEl2 = this;
    }

    window.addEventListener('resize', this.onViewportChange, { passive: true });
  },
  destroyed() {
    window.removeEventListener('resize', this.onViewportChange);
  },
  methods: {
    onViewportChange() {
      clearTimeout(this.timerId);

      this.timerId = setTimeout(() => this.resizeIframe(), 0);
    },
    resizeIframe() {
      if (this.repl) return;

      const { frame } = this.$refs;

      if (!frame) return;

      const applyHeight = () => {
        if (!frame.contentWindow) {
          setTimeout(() => {
            applyHeight(true);
          }, 200);

          return;
        }

        const newHeight = Math.round((frame.contentWindow || this.contentWindow).document.querySelector('nu-block').scrollHeight * this.scale);

        frame.style.height = `${newHeight}px`;
      };

      setTimeout(applyHeight, 0);
    },
    zoomIn() {
      const { scale, zoomLevels } = this;
      const index = zoomLevels.indexOf(scale);

      if (index < zoomLevels.length - 1) {
        this.scale = zoomLevels[index + 1];
      }
    },
    zoomOut() {
      const { scale, zoomLevels } = this;
      const index = zoomLevels.indexOf(scale);

      if (index > 0) {
        this.scale = zoomLevels[index - 1];
      }
    },
    copySourceCode() {
      copy(this.markup);

      this.copied = true;

      setTimeout(() => {
        this.copied = false;
      }, 2000);
    },
    setSize(size) {
      this.size = size;

      this.resizeIframe();
    },
  },
};
</script>
