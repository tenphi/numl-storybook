// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/LICENSE

import CodeMirror from 'codemirror';

const s = { attrs: {} }; // Simple tag, reused for a whole lot of tags

const data = {
  'nu-el': { attrs: ['width', 'height', 'sizing', 'radius', 'items-radius', 'padding', 'items-padding', 'overflow', 'space', 'border', 'shadow', 'flow', 'gap', 'order', 'grow', 'shrink', 'basis', 'items-basis', 'items-grow', 'items-shrink', 'place-content', 'place-items', 'content', 'items', 'template-areas', 'areas', 'auto-flow', 'template-columns', 'template-rows', 'columns', 'rows', 'column', 'row', 'area', 'contain', 'place', 'z', 'interactive', 'color', 'fill', 'filter', 'image', 'transform', 'scale', 'rotate', 'move', 'text', 'cursor', 'size', 'hide', 'show', 'opacity', 'transition', 'scrollbar', 'before', 'after', 'toggle', 'focusable', 'hoverable', 'expand', 'fade', 'drop', 'direction', 'controls', 'label', 'level', 'labelledby', 'describedby', 'valuemin', 'valuemax', 'valuenow', 'setsize', 'posinset', 'expanded', 'owns', 'flowto', 'haspopup', 'activedescendant', 't'] },
  'nu-grid': { attrs: [] },
  'nu-block': { attrs: [] },
  'nu-heading': { attrs: ['level'] },
  'nu-activeelement': { attrs: ['disabled', 'pressed', 'checked', 'selected', 'href', 'target', 'controls', 'value', 'to'] },
  'nu-btn': { attrs: ['disabled', 'pressed', 'checked', 'selected', 'href', 'target', 'controls', 'value', 'to'] },
  'nu-tab': { attrs: ['disabled', 'controls', 'value'] },
  'nu-card': { attrs: [] },
  'nu-icon': { attrs: ['name'] },
  'nu-flow': { attrs: [] },
  'nu-line': { attrs: [] },
  'nu-pane': { attrs: [] },
  'nu-gridtable': { attrs: ['padding'] },
  'nu-badge': { attrs: ['border', 'radius', 'shadow'] },
  'nu-input': { attrs: ['autofocus', 'disabled', 'placeholder', 'value', 'maxlength', 'name', 'padding'] },
  'nu-switch': { attrs: ['disabled', 'checked'] },
  'nu-flex': { attrs: [] },
  'nu-btngroup': { attrs: ['padding', 'value', 'flow', 'border'] },
  'nu-tablist': { attrs: [] },
  'nu-menu': { attrs: [] },
  'nu-menuitem': { attrs: [] },
  'nu-link': { attrs: [] },
  'nu-blocklink': { attrs: [] },
  'nu-triangle': { attrs: [] },
  'nu-tooltip': { attrs: [] },
  'nu-cell': { attrs: [] },
  'nu-columnheader': { attrs: [] },
  'nu-rowheader': { attrs: [] },
  'nu-row': { attrs: [] },
  'nu-rowgroup': { attrs: [] },
  'nu-table': { attrs: ['gap', 'border', 'padding', 'radius'] },
  'nu-popup': { attrs: ['place'] },
  'nu-popupmenu': { attrs: [] },
  'nu-group': { attrs: ['flow'] },
  'nu-checkbox': { attrs: [] },
  'nu-radiogroup': { attrs: ['value'] },
  'nu-radio': { attrs: ['fill'] },
  'nu-label': { attrs: [] },
  'nu-numinput': { attrs: ['prefix', 'suffix', 'precision', 'type'] },
  'nu-special': { attrs: [] },
  'nu-mark': { attrs: [] },
  'nu-svg': { attrs: ['src'] },
  'nu-img': { attrs: ['src'] },
  'nu-code': { attrs: [] },
  'nu-clamp': { attrs: ['lines', 'display'] },
  'nu-progressbar': { attrs: ['value', 'min', 'max'] },
  'nu-rail': { attrs: [] },
  'nu-slider': { attrs: [] },
  'nu-markdown': { attrs: [] },
  'nu-md': { attrs: [] },
  'nu-list': { attrs: ['type', 'position'] },
  'nu-listitem': { attrs: [] },
  'nu-root': { attrs: [] },
  'nu-decorator': { attrs: ['theme', 'responsive', 'as'] },
  'nu-theme': { attrs: [] },
  'nu-vars': { attrs: [] },
  'nu-props': { attrs: [] },
  'nu-attrs': { attrs: [] },
};

const globalAttrs = {
  hidden: ['hidden'],
  id: null,
  lang: ['en', 'es'],
  style: null,
  tabindex: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
  title: null,
  translate: ['yes', 'no'],
  place: ['top', 'right', 'bottom', 'left', 'outside-top', 'outside-right', 'outside-bottom', 'outside-left'],
  width: ['min()', 'max()', 'minmax(,)', 'clamp(,,)'],
  height: ['min()', 'max()', 'minmax(,)', 'clamp(,,)'],
  sizing: ['border', 'content'],
  radius: ['1r', '1r 1r 0 0', '0 1r 1r 0', '0 0 1r 1r', '1r 0 0 1r'],
  padding: ['1x', 'top', 'right', 'bottom', 'left'],
  overflow: ['no', 'scroll-x', 'scroll-y'],
  space: ['1x'],
  border: ['1b', 'top', 'right', 'bottom', 'left', 'color(special)', 'outside', 'center'],
  shadow: ['1', '1b 1b 1x color(special)'],
  flow: ['row', 'row-reverse', 'column', 'column-reverse', 'row wrap', 'column wrap'],
  gap: ['1x'],
  order: null,
  grow: null,
  shrink: null,
  basis: null,
  content: ['center', 'stretch', 'center start', 'center space-between'],
  items: ['center', 'stretch', 'center stretch'],
  areas: null,
  columns: ['1fr 1fr', 'repeat(4, 1fr)'],
  rows: ['1fr 1fr', 'repeat(4, 1fr)'],
  column: ['auto / span 2', '1 / -1'],
  row: ['auto / span 2', '1 / -1'],
  area: null,
  contain: null,
  z: ['above', 'front', 'below', 'back'],
  interactive: ['y', 'n'],
  color: ['text', 'bg', 'border', 'hover', 'focus', 'special', 'special-text', 'special-bg', 'special-hover'],
  fill: ['text', 'bg', 'border', 'hover', 'focus', 'special', 'special-text', 'special-bg', 'special-hover'],
  filter: null,
  image: null,
  transform: null,
  scale: ['1 1', 'flip-x', 'flip-y'],
  rotate: null,
  move: null,
  text: ['w4', 'w7', 'i', 's', 'u', 'left', 'center', 'right', 'nowrap', 'ellipsis'],
  cursor: ['pointer', 'default'],
  size: ['xs', 'sm', 'md', 'lg', 'xl'],
  hide: ['y', 'n'],
  show: ['y', 'n'],
  opacity: null,
  transition: null,
  scrollbar: null,
  before: null,
  after: null,
  toggle: null,
  focusable: null,
  hoverable: null,
  expand: null,
  fade: null,
  drop: ['top', 'right', 'bottom', 'left'],
  direction: null,
  controls: null,
  label: null,
  level: null,
  labelledby: null,
  describedby: null,
  valuemin: null,
  valuemax: null,
  valuenow: null,
  setsize: null,
  posinset: null,
  expanded: null,
  owns: null,
  flowto: null,
  haspopup: null,
  activedescendant: null,
  t: null,
  display: ['block', 'flex', 'grid', 'inline-block', 'inline-flex', 'inline-grid'],
  responsive: null,
  as: null,
  special: null,
  theme: null,
  prop: null,
};

function populate(obj) {
  Object.keys(globalAttrs)
    .forEach((attr) => {
      obj.attrs[attr] = globalAttrs[attr];
    });
}

populate(s);

Object.keys(data)
  .forEach((tag) => {
    if (data[tag] !== s) populate(data[tag]);
  });

CodeMirror.htmlSchema = data;

function htmlHint(cm, options) {
  const local = { schemaInfo: data };
  if (options) {
    Object.keys(options)
      .forEach((opt) => {
        local[opt] = options[opt];
      });
  }
  return CodeMirror.hint.xml(cm, local);
}

CodeMirror.registerHelper('hint', 'html', htmlHint);
