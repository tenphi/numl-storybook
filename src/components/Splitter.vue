<template>
  <nu-block
    ref="root"
    show="y|n"
    :place="`left (${value}% - 1x)`"
    z="front" width="1" height="100%"
    cursor="col-resize">
    <nu-block
      place="cover"
      :fill="dragging ? 'hover' : ':hover[hover] clear'"
      transition="fill">
      <nu-block
        radius="round" fill="special-bg" border shadow=".5"
        width="1.25 + 2b" height="1.75" place="inside" move=".5b 0">
        <nu-attrs for="nu-icon" place="inside" color="special-text" scale="1 1.5"></nu-attrs>
        <nu-icon name="chevron-left" move="-.5x 0"></nu-icon>
        <nu-icon name="chevron-right" move=".5x 0"></nu-icon>
      </nu-block>
    </nu-block>
    <nu-block v-if="dragging" place="fixed cover" width="100vw" height="100vh"></nu-block>
  </nu-block>
</template>

<script>
const EVENT_MAP = {
  mousemove: 'onDragging',
  touchmove: 'onDragging',
  mouseup: 'onDragEnd',
  touchend: 'onDragEnd',
  contextmenu: 'onDragEnd',
};

export default {
  name: 'splitter',
  props: {
    value: Number,
  },
  data() {
    return {
      dragging: false,
    };
  },
  mounted() {
    const el = this.$refs.root;

    el.addEventListener('touchmove', (evt) => evt.preventDefault(), { passive: true });

    ['mousedown', 'touchstart']
      .forEach((eventName) => {
        el.addEventListener(eventName, this.onDragStart, { passive: false });
      });

    window.addEventListener('resize', this.onWindowResize);

    this.onWindowResize();
  },
  destroyed() {
    window.removeEventListener('resize', this.onWindowResize);
  },
  methods: {
    reset() {
      this.$emit('input', 50);
    },
    getLimit() {
      const rect = this.$refs.root.parentNode.getBoundingClientRect();

      return Math.min(0.5, 320 / rect.width) * 100;
    },
    onWindowResize() {
      const limit = this.getLimit();

      let { value } = this;

      if (value < limit) {
        value = limit;
      } else if (value > 100 - limit) {
        value = 100 - limit;
      }

      if (value !== this.value) {
        this.$emit('input', value);
      }
    },
    setValueByEvent(evt) {
      const limit = this.getLimit();
      const pageX = (evt.pageX || (evt.touches && evt.touches.length && evt.touches[0].pageX))
        - window.scrollX;
      const rect = this.$refs.root.parentNode.getBoundingClientRect();
      const xValue = pageX - rect.x;
      let value = Math.max(limit, Math.min(100 - limit, (xValue * 100) / rect.width));

      if (Math.abs(50 - value) < 2) {
        value = 50;
      }

      this.$emit('input', value);
    },
    onDragStart(evt) {
      evt.preventDefault();

      this.setValueByEvent(evt);
      this.dragging = true;

      Object.entries(EVENT_MAP)
        .forEach(([event, handler]) => {
          window.addEventListener(event, this[handler], { passive: true });
        });
    },
    onDragEnd(evt) {
      if (this.dragging) {
        this.setValueByEvent(evt);
        this.dragging = false;

        Object.entries(EVENT_MAP)
          .forEach(([event, handler]) => {
            window.removeEventListener(event, this[handler]);
          });
      }
    },
    onDragging(evt) {
      if (this.dragging) {
        this.setValueByEvent(evt);
      }
    },
  },
};
</script>
