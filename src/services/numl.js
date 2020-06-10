import { Nude } from '../numl';
import BASE_ATTRIBUTES from '../other/base-attributes';
import ATTR_VALUES from '../other/attr-values';

const LIST = Object.values(Nude.elements);
const { NuDecorator, NuElement } = Nude.elements;

const DATA = {
  elements: [],
  attributes: [],
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

LIST.forEach((el) => {
  const tag = el.nuTag;
  const type = el.nuParent === NuDecorator || el === NuDecorator
    ? 'decorator' : 'element';
  const data = {};
  const ownStyles = hasOwnProperty(el, 'nuStyles')
    ? el.nuStyles
    : {};
  const ownGenerators = hasOwnProperty(el, 'nuGenerators')
    ? Object.keys(el.nuAttrs)
    : [];
  const allAttrs = el.nuAllAttrs;
  const allBehaviors = el.nuAllBehaviors;
  const defaults = Object.keys(el.nuAllStyles)
    .reduce((map, attr) => {
      if (!hasOwnProperty(ownStyles, attr)) {
        map[attr] = el.nuAllStyles[attr];
      }

      return map;
    }, {});
  const attrs = Object.keys(el.nuAllGenerators)
    .reduce((map, attr) => {
      if (NuElement.nuAllGenerators[attr] == null) {
        map.push({
          name: attr,
          defaultValue: el.nuAllStyles[attr],
        });
      }

      return map;
    }, []);

  let flag = false;

  data.tag = tag;
  data.parent = el.nuParentClass && el.nuParentClass.nuTag;
  data.type = type;
  data.role = el.nuRole;
  data.id = el.nuId;
  data.defaults = defaults;
  data.ownDefaults = ownStyles;
  data.allAttrs = allAttrs;
  data.allBehaviors = allBehaviors;
  data.attrs = attrs;
  data.ownGenerators = ownGenerators;
  data.css = el.nuGenerateDefaultStyle(false, true)
    .replace(/[{;}](?!$)/g, (s) => `${s}\n`)
    .split(/\n/g)
    .map((s) => s.trim())
    .filter((s) => s)
    .map((s) => {
      if (!s.includes('{') && !s.includes('}') && flag) {
        if (s.includes(':')) {
          s = s.replace(/:(?!\s)(?!not\()(?!:)/, ': ');
          return `  ${s}`;
        }

        return `    ${s}`;
      }

      if (s.includes('{')) {
        flag = true;
      } else if (s.includes('}')) {
        flag = false;
      }

      return s;
    })
    .join('\n');

  ownGenerators.forEach((attr) => {
    if (tag !== 'nu-el' && tag !== 'nu-base') return;

    if (!DATA.attributes.includes(attr)) {
      DATA.attributes.push(attr);
    }
  });

  DATA.elements.push(data);
});

export const BASE_ELEMENTS = [
  'nu-el',
  'nu-heading',
  'nu-h1',
  'nu-h2',
  'nu-h3',
  'nu-h4',
  'nu-h5',
  'nu-h6',
  'nu-mark',
  'nu-badge',
  'nu-link',
  'nu-blocklink',
  'nu-blockquote',
  'nu-icon',
  'nu-svg',
  'nu-img',
  'nu-progressbar',
  'nu-list',
  'nu-listitem',
  'nu-line',
  'nu-triangle',
  'nu-tooltip',
  'nu-label',
  'nu-circle',
  'nu-spacer',
].sort();

export const INLINE_ELEMENTS = [
  'nu-in',
  'nu-strong',
  'nu-em',
  'nu-sup',
  'nu-sub',
  'nu-special',
].sort();

export const SEMANTIC_ELEMENTS = [
  'nu-article',
  'nu-main',
  'nu-header',
  'nu-footer',
  'nu-aside',
  // 'nu-region',
  'nu-section',
  'nu-nav',
].sort();

export const FORMATTER_ELEMENTS = [
  'nu-num',
  'nu-datetime',
];

export const LAYOUT_ELEMENTS = [
  'nu-block',
  'nu-root',
  'nu-flex',
  'nu-grid',
  'nu-flow',
  'nu-card',
  'nu-pane',
  'nu-group',
].sort();

export const TABLE_ELEMENTS = [
  'nu-table',
  'nu-gridtable',
  'nu-cell',
  'nu-row',
  'nu-rowgroup',
  'nu-rowheader',
  'nu-columnheader',
].sort();

export const WIDGET_ELEMENTS = [
  'nu-link',
  'nu-btn',
  'nu-cardbtn',
  'nu-check',
  'nu-form',
  'nu-field',
  'nu-switch',
  'nu-slider',
  'nu-btngroup',
  'nu-listbox',
  'nu-option',
  'nu-popup',
  'nu-tablist',
  'nu-tab',
  'nu-checkbox',
  'nu-radio',
  'nu-input',
  'nu-inputgroup',
  'nu-textarea',
  'nu-value',
  'nu-numinput',
  'nu-popuplistbox',
].sort();

export const DEFINITIONS = [
  'nu-theme',
  'nu-attrs',
  'nu-props',
  'nu-vars',
].sort();

export const CONVERTERS = [
  'nu-markdown',
  'nu-md',
  'nu-code',
].sort();

export const COMPONENTS = [
  'nu-dateinput',
  'nu-datepicker',
  'nu-debug',
];

export const STYLE_ATTRIBUTES = [
  'width',
  'height',
  'sizing',
  'radius',
  'padding',
  'overflow',
  'space',
  'border',
  'shadow',
  'flow',
  'gap',
  'order',
  'grow',
  'shrink',
  'basis',
  'place-content',
  'place-items',
  'content',
  'items',
  'template-areas',
  'areas',
  'auto-flow',
  'template-columns',
  'template-rows',
  'columns',
  'rows',
  'column',
  'row',
  'area',
  'contain',
  'place',
  'z',
  'interactive',
  'color',
  'fill',
  'filter',
  'image',
  'transform',
  'scale',
  'rotate',
  'move',
  'text',
  'cursor',
  'size',
  'hide',
  'show',
  'opacity',
  'transition',
  'scrollbar',
  'before',
  'after',
  'toggle',
  'outline',
  'mark',
  'expand',
  'fade',
  'display',
  'theme',
].sort();

export const ARIA_ATTRIBUTES = [
  'controls',
  'label',
  'level',
  'labelledby',
  'describedby',
  'valuemin',
  'valuemax',
  'valuenow',
  'setsize',
  'posinset',
  'expanded',
  'owns',
  'flowto',
  'haspopup',
  'activedescendant',
].sort();

export const UTILITY_ATTRIBUTES = [
  'drop',
  'direction',
  'orient',
  'theme',
  'as',
  'id',
  'responsive',
  't',
].sort();

export const MODIFIER_ATTRIBUTES = [
  'disabled',
  'special',
].sort();

export default {
  BASE_ELEMENTS,
  data: DATA,
  getElement(tag) {
    return DATA.elements.find((el) => el.tag === tag);
  },
  getElements(arr) {
    return arr.map((tag) => this.getElement(tag)).filter((el) => el);
  },
  get baseElements() {
    return this.getElements(BASE_ELEMENTS);
  },
  get inlineElements() {
    return this.getElements(INLINE_ELEMENTS);
  },
  get semanticElements() {
    return this.getElements(SEMANTIC_ELEMENTS);
  },
  get formatterElements() {
    return this.getElements(FORMATTER_ELEMENTS);
  },
  get layoutElements() {
    return this.getElements(LAYOUT_ELEMENTS);
  },
  get tableElements() {
    return this.getElements(TABLE_ELEMENTS);
  },
  get widgetElements() {
    return this.getElements(WIDGET_ELEMENTS);
  },
  get converters() {
    return this.getElements(CONVERTERS);
  },
  get definitions() {
    return this.getElements(DEFINITIONS);
  },
  get components() {
    return this.getElements(COMPONENTS);
  },
  get styleAttributes() {
    return STYLE_ATTRIBUTES;
  },
  get utilityAttributes() {
    return UTILITY_ATTRIBUTES;
  },
  get ariaAttributes() {
    return ARIA_ATTRIBUTES;
  },
  get modifierAttributes() {
    return MODIFIER_ATTRIBUTES;
  },
};

const customData = {
  version: 1.1,
  tags: DATA.elements.reduce((list, element) => {
    list.push({
      name: element.tag,
      description: '',
      attributes: element.attrs
        .filter((attr) => !(attr.name in BASE_ATTRIBUTES))
        .map((attr) => ({
          name: attr.name,
          description: '',
          values: ((ATTR_VALUES[element.tag] && ATTR_VALUES[element.tag][attr.name]) || [])
            .reduce((values, value) => {
              values.push({
                name: value,
              });

              return values;
            }, []),
        })),
    });

    return list;
  }, []),
  globalAttributes: Object.keys(BASE_ATTRIBUTES)
    .reduce((list, attr) => {
      list.push({
        name: attr,
        description: '',
        values: (BASE_ATTRIBUTES[attr] || []).reduce((values, value) => {
          values.push({
            name: value,
          });

          return values;
        }, []),
      });

      return list;
    }, []),
};

Nude.customData = customData;
Nude.rawData = DATA;
