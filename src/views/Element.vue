<template>
  <nu-flow gap="2x">
    <nu-attrs for="code" padding radius overflow="auto"></nu-attrs>
    <nu-attrs for="rowheader" text="monospace h"></nu-attrs>
    <nu-attrs for="columnheader" size="xs" text="up spacing"></nu-attrs>

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
        <nu-el v-if="element.parent === 'nu-base'" text="w7 monospace">
          &lt;nu-base/&gt;
        </nu-el>
        <nu-link v-else :to="`/reference/element/${element.parent}`" text="monospace">
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

    <template v-if="hasBehaviors">
      <nu-heading level="2">
        Behaviors
      </nu-heading>

      <nu-gridtable
        columns="auto auto" display="inline-grid" border radius>
        <nu-columnheader fill="subtle">Behavior</nu-columnheader>
        <nu-columnheader fill="subtle">Options</nu-columnheader>
        <template v-for="behavior in behaviors">
          <nu-rowheader :key="`${behavior.name}:name`">
            {{ behavior.name }}
          </nu-rowheader>
          <nu-cell :key="`${behavior.name}:value`" text="monospace">
            {{ typeof behavior.value === 'string' ? `"${behavior.value}"` : '-' }}
          </nu-cell>
        </template>
      </nu-gridtable>
    </template>

    <template v-if="hasAttrs">
      <nu-heading level="2">
        Attributes
      </nu-heading>

      <nu-gridtable
        columns="auto auto" display="inline-grid" border radius>
        <nu-columnheader fill="subtle">Attribute</nu-columnheader>
        <nu-columnheader fill="subtle">Value</nu-columnheader>
        <template v-for="attr in attrs">
          <nu-rowheader :key="`${attr.name}:name`">
            {{ attr.name }}
          </nu-rowheader>
          <nu-cell :key="`${attr.name}:value`" text="monospace">
            "{{ attr.value }}"
          </nu-cell>
        </template>
      </nu-gridtable>
    </template>

    <nu-heading level="2">
      Styles
    </nu-heading>

    <nu-gridtable columns="auto auto" display="inline-grid" border radius>
      <nu-columnheader fill="subtle">Attribute</nu-columnheader>
      <nu-columnheader fill="subtle">Value</nu-columnheader>
<!--      <nu-columnheader fill="subtle">Type</nu-columnheader>-->
      <template v-for="style in styles">
        <nu-rowheader :key="`${style.name}:name`">
          <nu-link :to="`../attributes/${style.name}`">{{ style.name }}</nu-link>
        </nu-rowheader>
        <nu-cell :key="`${style.name}:value`" text="monospace">
          "{{ style.value }}"
        </nu-cell>
<!--        <nu-cell :key="`${style.name}:type`">-->
<!--          <nu-el :theme="`type-${style.type}`">-->
<!--            {{style.type}}-->
<!--          </nu-el>-->
<!--        </nu-cell>-->
      </template>
    </nu-gridtable>

    <nu-block show="^root:dev[y]">
      <nu-heading level="2">
        Generated CSS
      </nu-heading>

      <nu-block>
        This block is for debugging purposes.
      </nu-block>

      <nu-code v-if="showCSS" padding="1x 2x" shadow overflow="auto">
        <textarea v-html="element.css"></textarea>
      </nu-code>

      <nu-btn v-else special @tap="showCSS = true">Show CSS</nu-btn>
    </nu-block>
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
    hasAttrs() {
      return Object.keys(this.attrs).length;
    },
    hasBehaviors() {
      return Object.keys(this.behaviors).length;
    },
    behaviors() {
      return Object.keys(this.element.allBehaviors || {})
        .reduce((list, attr) => {
          list.push({
            name: attr,
            value: this.element.allBehaviors[attr],
          });

          return list;
        }, []);
    },
    attrs() {
      return Object.keys(this.element.allAttrs || {})
        .reduce((list, attr) => {
          list.push({
            name: attr,
            value: this.element.allAttrs[attr],
          });

          return list;
        }, []);
    },
    styles() {
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
