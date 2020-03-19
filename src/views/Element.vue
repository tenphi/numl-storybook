<template>
  <nu-flow gap="2x">
    <nu-attrs for="nu-code" padding radius fill="main-subtle" overflow="auto"></nu-attrs>

    <nu-theme name="type-own" hue="type-own" mod="tint"></nu-theme>
    <nu-theme name="type-inherited" hue="type-inherited" mod="tint"></nu-theme>

    <nu-heading level="1">
      Element
      <nu-el text="monospace">&lt;{{ element.tag }}/&gt;</nu-el>
    </nu-heading>

    <nu-gridtable columns="auto auto" display="inline-grid" border radius>
      <nu-attrs for="nu-rowheader" text="right"></nu-attrs>

      <nu-rowheader>Parent</nu-rowheader>
      <nu-cell>
        <nu-el v-if="element.parent === 'nu-base'" text="w7">
          &lt;nu-base/&gt;
        </nu-el>
        <nu-link v-else :to="`/reference/element/${element.parent}`">
          &lt;{{ element.parent }}/&gt;
        </nu-link>
      </nu-cell>

      <template v-if="element.role">
        <nu-rowheader>Role</nu-rowheader>
        <nu-cell>
          {{ element.role }}
        </nu-cell>
      </template>

      <template v-if="element.id">
        <nu-rowheader>Id</nu-rowheader>
        <nu-cell>
          {{ element.id}}
        </nu-cell>
      </template>
    </nu-gridtable>

    <nu-heading level="2">
      Description
    </nu-heading>

    <nu-markdown gap="2x">
      <textarea v-html="description"></textarea>
    </nu-markdown>

    <nu-heading level="2">
      Default attributes
    </nu-heading>

    <nu-gridtable columns="auto auto auto" display="inline-grid" border radius>
      <nu-columnheader fill="subtle">Attribute</nu-columnheader>
      <nu-columnheader fill="subtle">Value</nu-columnheader>
      <nu-columnheader fill="subtle">Type</nu-columnheader>
      <template v-for="attr in defaults">
        <nu-rowheader :key="`${attr.name}:name`">
          {{ attr.name }}
        </nu-rowheader>
        <nu-cell :key="`${attr.name}:value`" text="monospace">
          "{{ attr.value }}"
        </nu-cell>
        <nu-cell :key="`${attr.name}:type`">
          <nu-el :theme="`type-${attr.type}`">
            {{attr.type}}
          </nu-el>
        </nu-cell>
      </template>
    </nu-gridtable>

    <nu-heading level="2">
      Default CSS (generated)
    </nu-heading>

    <nu-code v-if="showCSS">
      <textarea v-html="element.css"></textarea>
    </nu-code>

    <nu-btn v-else special @tap="showCSS = true">Show CSS</nu-btn>
  </nu-flow>
</template>

<script>
import MarkdownLoader from '@/services/markdown-loader';
import Numl from '@/services/numl';

async function beforeLoad(to, from, next) {
  let description = '';

  try {
    description = await MarkdownLoader.get(`reference/elements/${to.params.tag}`);
  } catch (e) {
    description = 'Yet to be documented';
  }

  if (typeof this !== 'undefined') {
    this.description = description;
    this.element = Numl.getElement(to.params.tag);
    this.showCSS = false;
    if (next) {
      next();
    }
  } else {
    next((vm) => {
      vm.description = description;
      vm.element = Numl.getElement(to.params.tag);
    });
  }
}

export default {
  name: 'element-view',
  data() {
    return {
      description: '',
      element: {},
      showCSS: false,
    };
  },
  mounted() {
    if (!this.content) {
      beforeLoad.call(this, this.$route);
    }
  },
  beforeRouteEnter: beforeLoad,
  beforeRouteUpdate: beforeLoad,
  computed: {
    ownDefaults() {
      return Object.keys(this.element.ownDefaults || {})
        .reduce((list, attr) => {
          list.push({
            name: attr,
            value: this.element.ownDefaults[attr],
            type: 'own',
          });

          return list;
        }, []);
    },
    defaults() {
      return [
        ...Object.keys(this.element.ownDefaults || {})
          .reduce((list, attr) => {
            list.push({
              name: attr,
              value: this.element.ownDefaults[attr],
              type: 'own',
            });

            return list;
          }, []),
        ...Object.keys(this.element.defaults || {})
          .reduce((list, attr) => {
            if (!this.element.ownDefaults[attr]) {
              list.push({
                name: attr,
                value: this.element.defaults[attr],
                type: 'inherited',
              });
            }

            return list;
          }, []),
      ];
    },
  },
};
</script>
