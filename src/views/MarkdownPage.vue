<template>
  <nu-block>
    <nu-markdown ref="root" padding="4 bottom">
      <textarea v-html="content"></textarea>
    </nu-markdown>
  </nu-block>
</template>

<script>
import Window from '@/services/window';
import MarkdownLoader from '@/services/markdown-loader';

async function loader(to, from, next) {
  const content = await MarkdownLoader.get(to.path);

  if (typeof this !== 'undefined') {
    this.content = content;
    if (next) {
      next();
    }
  } else {
    next((vm) => {
      vm.content = content;
    });
  }
}

export default {
  name: 'markdown-page',
  data() {
    return {
      content: '',
    };
  },
  watch: {
    content() {
      this.updateTitle();
    },
  },
  mounted() {
    if (!this.content) {
      loader.call(this, this.$route);

      this.updateTitle();
    }
  },
  methods: {
    updateTitle() {
      setTimeout(() => {
        const header = this.$refs.root.querySelector('nu-h1');

        if (header) {
          Window.setTitle(header.innerText);
        }
      });
    },
  },
  beforeRouteEnter: loader,
  beforeRouteUpdate: loader,
};
</script>
