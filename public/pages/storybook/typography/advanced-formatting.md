# Advanced formatting

## Text align

Modifiers: `"left"`, `"right"`, `"center"`, `"justify"`.

```html
<split/>
<nu-flow gap>
  <nu-attrs for="region" fill="subtle" padding></nu-attrs>
  <nu-block as="region" text="left">Left</nu-block>
  <nu-block as="region" text="right">Right</nu-block>
  <nu-block as="region" text="center">Center</nu-block>
  <nu-block as="region" text="justify">Justify</nu-block>
</nu-flow>
```

## Transform

Modifiers: `"up"` (`"uppercase"`), `"low"` (`"lowercase"`), `"cap"` (`"capitalize"`).

```html
<split/>
<nu-block text="n">Normla</nu-block>
<nu-block text="up">Upper-cased</nu-block>
<nu-block text="low">Lower-cased</nu-block>
<nu-block text="cap">capitalized</nu-block>
```

## Vertical align

Modifiers: `"baseline"`, `"middle"`, `"sup"`, `"sub"`, `"top"`, `"bottom"`, `"text-top"`, `"text-bottom"`, `"v-middle"`.

```html
<split/>
<nu-block text="lowercase" size="xl">
  Baseline |
  <nu-el text="baseline" size="xs">baseline</nu-el>
  <nu-el text="middle" size="xs">middle</nu-el>
  <nu-el text="sup" size="xs">super</nu-el>
  <nu-el text="top" size="xs">top</nu-el>
  <nu-el text="text-top" size="xs">text-top</nu-el>
  <nu-el text="sub" size="xs">sub</nu-el>
  <nu-el text="bottom" size="xs">bottom</nu-el>
  <nu-el text="text-bottom" size="xs">text-bottom</nu-el>
  <nu-el text="v-middle" size="xs">v-bottom (custom vertical align modifier for inline-blocks)</nu-el>
</nu-block>
```

## Bolder or ligher

Modifiers: `"normal"`, `"semi-bold"`, `"bold"`, `"light"`, `"heading"`:

```html
<split/>
<nu-block text="n">
  Normal
</nu-block>
<nu-block text="semi-bold">
  Semi bold
</nu-block>
<nu-block text="h" size="h1">
  Heading
</nu-block>
<nu-block text="bold">
  Bold
  <nu-el text="bolder">
    and bolder
  </nu-el>
  <nu-el text="lighter">
    and lighter
  </nu-el>
</nu-block>
<nu-block text="light" size="hero">
  Light
</nu-block>
```

### Customize font-weight presets

Props: `"normal-font-weight"`, `"semi-bold-font-weight"`, `"bold-font-weight"`, `"light-font-weight"`, `"heading-font-weight"`:

```html
<split/>
<nu-props semi-bold-font-weight="600"></nu-props>
<nu-props semi-bold-font-weight="700"></nu-props>
<nu-props light-font-weight="200"></nu-props>
<nu-props normal-font-weight="500"></nu-props>
<nu-props heading-font-weight="900"></nu-props>
<nu-block text="n">
  <nu-block text="n">
    Normal
  </nu-block>
  <nu-block text="semi-bold">
    Semi bold
  </nu-block>
  <nu-block text="h" size="h1">
    Heading
  </nu-block>
  <nu-block text="bold">
    Bold
    <nu-el text="bolder">
      and bolder
    </nu-el>
    <nu-el text="lighter">
      and lighter
    </nu-el>
  </nu-block>
  <nu-block text="light" size="hero">
  Light
  </nu-block>
</nu-block>
```
