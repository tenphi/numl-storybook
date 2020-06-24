import Numl from '@/services/numl';

function heading(label) {
  return {
    type: 'heading',
    label,
  };
}

function elementItem(el) {
  return {
    type: 'link',
    label: `<${el.tag}/>`,
    to: `/reference/elements/${el.tag}`,
  };
}

function attrItem(attr) {
  return {
    type: 'link',
    label: `[${attr}]`,
    to: `/reference/attributes/${attr}`,
  };
}

function funcItem(attr) {
  return {
    type: 'link',
    label: `${attr}()`,
    to: `/reference/functions/${attr}`,
  };
}

export const REFERENCE_MENU = [
  heading('Base Elements'),
  ...Numl.baseElements.map(elementItem),
  heading('Inline Elements'),
  ...Numl.inlineElements.map(elementItem),
  heading('Semantic Elements'),
  ...Numl.semanticElements.map(elementItem),
  heading('Formatter Elements'),
  ...Numl.formatterElements.map(elementItem),
  heading('Layout Elements'),
  ...Numl.layoutElements.map(elementItem),
  heading('Widget Elements'),
  ...Numl.widgetElements.map(elementItem),
  heading('Converters'),
  ...Numl.converters.map(elementItem),
  heading('Components'),
  ...Numl.components.map(elementItem),
  heading('Definitions'),
  ...Numl.definitions.map(elementItem),
  heading('Style Attributes'),
  ...Numl.styleAttributes.map(attrItem),
  heading('Utility Attributes'),
  ...Numl.utilityAttributes.map(attrItem),
  heading('Aria Attributes'),
  // ...Numl.ariaAttributes.map(handleAttribute),
  {
    type: 'text',
    label: 'Coming soon',
  },
  heading('Modifier Attributes'),
  ...Numl.modifierAttributes.map(attrItem),
  heading('Color functions'),
  funcItem('hue'),
];
