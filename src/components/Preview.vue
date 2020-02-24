<template>
  <nu-block>
    <nu-pane border="bottom" padding="2x left right">
      <nu-tablist value="preview">
        <nu-tab controls="preview">
          Preview
        </nu-tab>
        <nu-tab controls="source">
          Source
        </nu-tab>
        <nu-tab controls="runtime" disabled>
          Runtime
        </nu-tab>
      </nu-tablist>
      <nu-flex gap items="center" size="xs" text="w7">
        <nu-el id="scale">{{parseInt(scale * 100)}}%</nu-el>
        <nu-group radius>
          <nu-btn
            id="zoom-out" padding move="1b 0" :disabled="!zoomInEnabled"
            @tap="zoomOut">
            <nu-icon name="zoom-out"></nu-icon>
          </nu-btn>
          <nu-btn
            id="zoom-in" padding :disabled="!zoomOutEnabled"
            @tap="zoomIn">
            <nu-icon name="zoom-in"></nu-icon>
          </nu-btn>
        </nu-group>
        <nu-btn padding :to="`!/preview.html#${encodedData}`">
          <nu-icon name="external-link"></nu-icon>
        </nu-btn>
      </nu-flex>
    </nu-pane>

    <nu-block v-if="frame" id="preview" v-html="markup" padding="2x"></nu-block>
    <nu-block v-else id="preview">
      <iframe
        ref="frame" :src="`/preview.html#${encodedData}`" frameborder="0"
        scrolling="no" width="100%" @load="resizeIframe(this)"></iframe>
    </nu-block>

    <nu-block id="source" padding hidden overflow="auto" fill="main-subtle">
      <nu-code enumerate fill="main-subtle">
        <textarea v-html="markup"></textarea>
      </nu-code>
    </nu-block>
    <nu-block id="runtime">
      <nu-code enumerate>
        <textarea></textarea>
      </nu-code>
    </nu-block>
  </nu-block>
</template>

<script>
import Lockr from 'lockr';
import Options from '@/services/options';
import GlobalEvents from '../services/global-events';

export default {
  name: 'preview',
  props: {
    markup: String,
    frame: Boolean,
  },
  data() {
    return {
      scale: Lockr.get('numl:scale') || 1,
      zoomLevels: [0.5, 0.67, 0.75, 0.8, 0.9, 1, 1.1, 1.25, 1.50, 1.75, 2],
      timerId: null,
      options: Options.get(),
    };
  },
  watch: {
    scale() {
      clearTimeout(this.timerId);

      this.timerId = setTimeout(() => this.resizeIframe(), 500);
    },
  },
  computed: {
    zoomInEnabled() {
      return this.zoomLevels.indexOf(this.scale) < this.zoomLevels.length - 1;
    },
    zoomOutEnabled() {
      return this.scale > 0;
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
    });
  },
  methods: {
    resizeIframe() {
      const { frame } = this.$refs;

      if (!frame) return;

      frame.style.height = '58px';

      setTimeout(() => {
        frame.style.height = `${frame.contentWindow.document.documentElement.scrollHeight}px`;
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
  },
};
</script>
