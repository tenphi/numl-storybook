import Numl from '@/services/numl';

function handleElement(el) {
  return {
    type: 'link',
    label: `<${el.tag}/>`,
    to: `/reference/elements/${el.tag}`,
  };
}

function handleAttribute(attr) {
  return {
    type: 'link',
    label: `[${attr}]`,
    to: `/reference/attributes/${attr}`,
  };
}

export const REFERENCE_MENU = [
  {
    type: 'heading',
    label: 'Base Elements',
  },
  ...Numl.baseElements.map(handleElement),
  {
    type: 'heading',
    label: 'Formatter Elements',
  },
  ...Numl.formatterElements.map(handleElement),
  {
    type: 'heading',
    label: 'Layout Elements',
  },
  ...Numl.layoutElements.map(handleElement),
  {
    type: 'heading',
    label: 'Widget Elements',
  },
  ...Numl.widgetElements.map(handleElement),
  {
    type: 'heading',
    label: 'Converters',
  },
  ...Numl.converters.map(handleElement),
  {
    type: 'heading',
    label: 'Components',
  },
  ...Numl.components.map(handleElement),
  {
    type: 'heading',
    label: 'Definition Elements',
  },
  ...Numl.definitions.map(handleElement),
  {
    type: 'heading',
    label: 'Style Attributes',
  },
  ...Numl.styleAttributes.map(handleAttribute),
  {
    type: 'heading',
    label: 'Utility Attributes',
  },
  ...Numl.utilityAttributes.map(handleAttribute),
  {
    type: 'heading',
    label: 'Aria Attributes',
  },
  // ...Numl.ariaAttributes.map(handleAttribute),
  {
    type: 'text',
    label: 'Coming soon',
  },
  {
    type: 'heading',
    label: 'Modifier Attributes',
  },
  ...Numl.modifierAttributes.map(handleAttribute),
];
