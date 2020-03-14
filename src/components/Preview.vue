<template>
  <nu-block :height="repl ? '100vh' : 'min(5)'">
    <nu-attrs
      for="nu-tooltip" text="nowrap" width="max(min-content)"
      :place="repl ? 'outside-bottom' : null"></nu-attrs>
    <nu-pane border="bottom" padding="2x left right" height="min(2.5)">
      <nu-tablist value="preview" v-if="!repl">
        <nu-tab controls="preview">
          Preview
        </nu-tab>
        <nu-tab controls="source">
          Source
        </nu-tab>
<!--        <nu-tab controls="runtime" disabled>-->
<!--          Runtime-->
<!--        </nu-tab>-->
      </nu-tablist>
      <nu-block v-else></nu-block>
      <nu-flex gap items="center" size="xs" text="w7">
        <nu-el id="scale">{{parseInt(scale * 100)}}%</nu-el>
        <nu-group radius>
          <nu-btn
            id="zoom-out" padding move="1b 0" :disabled="!zoomInEnabled"
            @tap="zoomOut">
            <nu-tooltip>Zoom out</nu-tooltip>
            <nu-icon name="zoom-out"></nu-icon>
          </nu-btn>
          <nu-btn
            id="zoom-in" padding :disabled="!zoomOutEnabled"
            @tap="zoomIn">
            <nu-tooltip>Zoom in</nu-tooltip>
            <nu-icon name="zoom-in"></nu-icon>
          </nu-btn>
        </nu-group>
        <nu-btn padding @tap="copySourceCode" v-if="!repl">
          <nu-tooltip>
            {{ copied ? 'Copied!' : 'Copy source code' }}
          </nu-tooltip>
          <nu-icon name="copy"></nu-icon>
        </nu-btn>
        <nu-btn padding :to="`!/repl#${encodedData}`" v-if="!repl">
          <nu-tooltip>Open in REPL</nu-tooltip>
          <nu-icon name="edit-2"></nu-icon>
        </nu-btn>
        <nu-btn padding :to="`!/preview.html#${encodedData}`">
          <nu-tooltip>
            {{ repl ? 'Open preview in separate tab' : 'Open in the new tab' }}
          </nu-tooltip>
          <nu-icon name="external-link"></nu-icon>
        </nu-btn>
      </nu-flex>
    </nu-pane>

    <nu-block v-if="frame" id="preview" v-html="markup" padding="2x"></nu-block>
    <nu-block
      v-else id="preview"
      :height="repl ? '100vh - 5x - 1b' : null" fill="main-subtle">
      <iframe
        ref="frame" :src="`/preview.html#${encodedData}`" frameborder="0"
        :scrolling="repl ? 'yes' : 'no'" width="100%" @load="resizeIframe(this)"
        :style="repl ? 'height: 100%;' : null"></iframe>
    </nu-block>

    <nu-block id="source" padding hidden overflow="auto" fill="main-subtle">
      <nu-code enumerate fill="main-subtle">
        <textarea v-html="repl ? '' : markup"></textarea>
      </nu-code>
    </nu-block>
  </nu-block>
</template>

<script>
import copy from 'clipboard-copy';
import Lockr from 'lockr';
import Options from '@/services/options';
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
    };
  },
  watch: {
    scale() {
      clearTimeout(this.timerId);

      this.timerId = setTimeout(() => this.resizeIframe(), 50);
    },
    markup(val) {
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
      return encodeURIComponent(JSON.stringify({
        scale: this.scale,
        markup: this.markup,
        options: this.options,
      }));
    },
  },
  mounted() {
    GlobalEvents.$on('options:change', (options) => {
      this.options = options;

      setTimeout(this.resizeIframe, 100);
    });
  },
  methods: {
    resizeIframe() {
      if (this.repl) return;

      const { frame } = this.$refs;

      if (!frame) return;

      setTimeout(() => {
        const newHeight = Math.round(frame.contentWindow.document.querySelector('nu-block').scrollHeight * this.scale);

        frame.style.height = `${newHeight}px`;
      });
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
  },
};
</script>

<style scoped>
iframe {
  display: block;
  height: 58px;
  transition: height var(--nu-animation-time) linear;
}
</style>
