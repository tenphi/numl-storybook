<template>
  <nu-markdown>
    <textarea v-html="content"></textarea>
  </nu-markdown>
</template>

<script>
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
  mounted() {
    if (!this.content) {
      loader.call(this, this.$route);
    }
  },
  beforeRouteEnter: loader,
  beforeRouteUpdate: loader,
};
</script>
