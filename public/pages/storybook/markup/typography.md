# Typography

Currently there is only two attributes to handle typography in NuML: [size](../../reference/attributes/size.md) and [text](../../reference/attributes/text.md). It's because NuML is more focused on interface creation, not typography (as classic HTML). But don't worry, there are many options to style your text.

## Heading

```html
<nu-heading level="1">Level 1 heading</nu-heading>
<nu-heading level="2">Level 2 heading</nu-heading>
<nu-heading level="3">Level 3 heading</nu-heading>
<nu-heading level="4">Level 4 heading</nu-heading>
<nu-heading level="5">Level 5 heading</nu-heading>
<nu-heading level="6">Level 6 heading</nu-heading>
```

## Text sizing

```html
<nu-flow gap>
  <nu-block size="h1">Text with heading level 1 size</nu-block>
  <nu-block size="h2">Text with heading level 1 size</nu-block>
  <nu-block size="h3">Text with heading level 1 size</nu-block>
  <nu-block size="h4">Text with heading level 1 size</nu-block>
  <nu-block size="h5">Text with heading level 1 size</nu-block>
  <nu-block size="h6">Text with heading level 1 size</nu-block>
  <nu-block size="xl">XL text size</nu-block>
  <nu-block size="lg">Large text size</nu-block>
  <nu-block size="md">Medium text size</nu-block>
  <nu-block size="sm">Small text size</nu-block>
  <nu-block size="xs">XS text size</nu-block>
  <nu-block size="2 3">Custom text size and line height</nu-block>
</nu-flow>
```

## Text modifiers

```html
<nu-flow gap>
  <nu-block>Typical paragraph text</nu-block>
  <nu-block text="w1">Font weight 100</nu-block>
  <nu-block text="w2">Font weight 200</nu-block>
  <nu-block text="w3">Font weight 300</nu-block>
  <nu-block text="w4">Font weight 400</nu-block>
  <nu-block text="w5">Font weight 500</nu-block>
  <nu-block text="w6">Font weight 600</nu-block>
  <nu-block text="w7">Font weight 700</nu-block>
  <nu-block text="w8">Font weight 800</nu-block>
  <nu-block text="w9">Font weight 900</nu-block>
  <nu-block text="i">Italic</nu-block>
  <nu-block text="u">Underline</nu-block>
  <nu-block text="s">Strikethrough</nu-block>
  <nu-block text="uppercase">Upper-cased</nu-block>
  <nu-block text="lowercase" size="xl">
    Vertical align:
    <nu-el text="baseline" size="xs">baseline</nu-el>
    <nu-el text="middle" size="xs">middle</nu-el>
    <nu-el text="super" size="xs">super</nu-el>
    <nu-el text="top" size="xs">top</nu-el>
    <nu-el text="text-top" size="xs">text-top</nu-el>
    <nu-el text="sub" size="xs">sub</nu-el>
    <nu-el text="bottom" size="xs">bottom</nu-el>
    <nu-el text="text-bottom" size="xs">text-bottom</nu-el>
    <nu-el text="v-middle" size="xs">v-bottom (custom vertical align modifier for inline-blocks)</nu-el>
  </nu-block>
  <nu-block text="left">Align text left</nu-block>
  <nu-block text="right">Align text right</nu-block>
  <nu-block text="center">Align text center</nu-block>
  <nu-block text="justify">Justify text</nu-block>
  <nu-block text="monospace">Monospaced font</nu-block>
  <nu-block text="spacing">Letter spacing with base border width</nu-block>
</nu-flow>
```

