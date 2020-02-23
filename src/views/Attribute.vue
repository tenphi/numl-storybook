<template>
  <nu-flow gap>
    <nu-heading>
      Attribute [{{ attribute }}]
    </nu-heading>

    <nu-markdown>
      <textarea v-html="description"></textarea>
    </nu-markdown>
  </nu-flow>
</template>

<script>
import MarkdownLoader from '@/services/markdown-loader';

async function beforeLoad(to, from, next) {
  let description;

  try {
    description = await MarkdownLoader.get(`reference/attributes/${to.params.attr}`);
  } catch (e) {
    description = 'Yet to be documented';
  }

  if (typeof this !== 'undefined') {
    this.description = description;
    this.attribute = to.params.attr;
    if (next) {
      next();
    }
  } else {
    next((vm) => {
      vm.description = description;
      vm.attribute = to.params.attr;
    });
  }
}

export default {
  name: 'element-view',
  data() {
    return {
      description: '',
      attribute: '',
    };
  },
  mounted() {
    if (!this.content) {
      beforeLoad.call(this, this.$route);
    }
  },
  beforeRouteEnter: beforeLoad,
  beforeRouteUpdate: beforeLoad,
};
</script>
