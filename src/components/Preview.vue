<template>
  <nu-block :height="repl ? '100vh' : 'min(5)'">
    <nu-attrs
      for="nu-tooltip" text="nowrap" width="max(min-content)"
      :place="repl ? 'outside-bottom' : null"></nu-attrs>
    <nu-pane
      border="bottom" padding="2x left right|1x left right"
      height="min(2.5)" responsive="500px">
      <nu-tablist value="preview" v-if="!repl" gap="2x|1x">
        <nu-tab controls="preview" padding="1x 0|1x">
          <nu-el show="y|n">Preview</nu-el>
          <nu-icon name="eye" show="n|y" height="1.5"></nu-icon>
        </nu-tab>
        <nu-tab controls="source" padding="1x 0|1x">
          <nu-el show="y|n">Source</nu-el>
          <nu-icon name="code" show="n|y" height="1.5"></nu-icon>
        </nu-tab>
        <!--        <nu-tab controls="runtime" disabled>-->
        <!--          Runtime-->
        <!--        </nu-tab>-->
      </nu-tablist>
      <nu-block v-else></nu-block>
      <nu-flex gap items="center" size="xs" text="w7">
        <nu-el id="scale" show="y|n">{{parseInt(scale * 100)}}%</nu-el>
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
        <template v-if="!repl">
          <nu-btn padding=".75x 1x" width="2">
            {{ size }}
            <nu-popupmenu padding="0">
              <nu-flex>
                <nu-el padding="1x 1x" text="w7 center">ROOT SIZE</nu-el>
                <nu-line orient="y" height="3"></nu-line>
                <nu-menuitem
                  v-for="option in sizes"
                  :key="option"
                  :size="option"
                  @tap="setSize(option)"
                  :theme="size === option ? 'tone' : null">
                  {{ option }}
                </nu-menuitem>
              </nu-flex>
            </nu-popupmenu>
          </nu-btn>
          <nu-btn padding @tap="copySourceCode">
            <nu-tooltip>
              {{ copied ? 'Copied!' : 'Copy source code' }}
            </nu-tooltip>
            <nu-icon name="copy"></nu-icon>
          </nu-btn>
          <nu-btn padding :to="`!/repl#${encodedData}`">
            <nu-tooltip>Open in REPL</nu-tooltip>
            <nu-icon name="edit-2"></nu-icon>
          </nu-btn>
        </template>
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
import LZString from 'lz-string';
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
      size: 'md',
      sizes: ['xs', 'sm', 'md', 'lg', 'xl'],
    };
  },
  watch: {
    scale() {
      clearTimeout(this.timerId);

      this.timerId = setTimeout(() => this.resizeIframe(), 0);
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
      return LZString.compressToEncodedURIComponent(JSON.stringify({
        scale: this.scale,
        markup: this.markup,
        options: this.options,
        size: this.size,
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
    setSize(size) {
      this.size = size;

      this.resizeIframe();
    },
  },
};
</script>

<style scoped>
iframe {
  display: block;
  height: 58px;
  transition: height var(--nu-transition-time) linear;
  max-width: 100%;
}
</style>
