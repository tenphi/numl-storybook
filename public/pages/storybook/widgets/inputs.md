# Inputs

## Text input

Simple input:

```html
<nu-flex flow="row wrap" gap>
  <nu-input width="15" label="Simple input">
  </nu-input>

  <nu-input width="15" label="Simple disabled input" disabled>
  </nu-input>
</nu-flex>
```

Input with icon and button:

```html
<nu-group border radius width="15em" fill="input">
  <nu-icon name="user" width="2.5em"></nu-icon>
  <nu-input border="0" grow="1" label="Input with icon">

  </nu-input>
  <nu-btn border="left">
    <nu-icon name="x" label="Circle"></nu-icon>
  </nu-btn>
</nu-group>
```

## Number input

Currency input:

```html
<nu-numinput
  prefix="$" value="12032" width="8" precision="2"
  label="Number input"></nu-numinput>
```

Percent input:

```html
<nu-numinput
  suffix="%" value="0" min="0" max="100" precision="0" width="8"
  label="Percents input"></nu-numinput>
```

## Checkboxes

```html
<nu-grid
  display="inline-grid" columns="auto auto" rows="auto auto" flow="column" gap="1x 2x">
  <nu-flex gap="1x" items="center">
    <nu-checkbox labelledby="label"></nu-checkbox>
    <nu-label>Checkbox</nu-label>
  </nu-flex>

  <nu-flex gap="1x" items="center">
    <nu-checkbox labelledby="label" checked></nu-checkbox>
    <nu-label>Checked checkbox</nu-label>
  </nu-flex>

  <nu-flex gap="1x" items="center">
    <nu-checkbox labelledby="label" disabled></nu-checkbox>
    <nu-label>Disabled checkbox</nu-label>
  </nu-flex>

  <nu-flex gap="1x" items="center">
    <nu-checkbox labelledby="label" disabled checked></nu-checkbox>
    <nu-label>Disabled and checked checkbox</nu-label>
  </nu-flex>
</nu-grid>
```

## Radio groups

```html
<nu-grid
  display="inline-grid" columns="auto auto" gap="1x 2x">
  <nu-radiogroup flow="column" gap value="second">
    <nu-flex gap="1x" items="center">
      <nu-radio labelledby=":next" value="first"></nu-radio>
      <nu-label>First value</nu-label>
    </nu-flex>

    <nu-flex gap="1x" items="center">
      <nu-radio labelledby=":next" value="second"></nu-radio>
      <nu-label>Second value</nu-label>
    </nu-flex>

    <nu-flex gap="1x" items="center">
      <nu-radio labelledby=":next" value="third"></nu-radio>
      <nu-label>Third value</nu-label>
    </nu-flex>
  </nu-radiogroup>

  <nu-radiogroup flow="column" gap value="second">
    <nu-flex gap="1x" items="center">
      <nu-radio labelledby=":next" value="first" disabled></nu-radio>
      <nu-label>First value</nu-label>
    </nu-flex>

    <nu-flex gap="1x" items="center">
      <nu-radio labelledby=":next" value="second" disabled></nu-radio>
      <nu-label>Second value</nu-label>
    </nu-flex>

    <nu-flex gap="1x" items="center">
      <nu-radio labelledby=":next" value="third" disabled></nu-radio>
      <nu-label>Third value</nu-label>
    </nu-flex>
  </nu-radiogroup>
</nu-grid>
```

## Switch

```html
<nu-switch></nu-switch>
<nu-switch checked></nu-switch>
<nu-switch disabled></nu-switch>
<nu-switch checked disabled></nu-switch>
```

## Sliders

Horizontal & vertical and disabled sliders:

```html
<nu-flow gap>
  <nu-block>
    <nu-rail width="clamp(initial, 20, 100%)">
      <nu-slider value="20"></nu-slider>
    </nu-rail>
  </nu-block>
  <nu-block>
    <nu-rail height="6" orient="v">
      <nu-slider value="40"></nu-slider>
    </nu-rail>
  </nu-block>
  <nu-block>
    <nu-rail width="clamp(initial, 20, 100%)" disabled>
      <nu-slider value="20"></nu-slider>
    </nu-rail>
  </nu-block>
</nu-flow>
```

Sliders with min, max and step attributes:

```html
<nu-flow gap>
  <nu-block>
    <nu-rail width="clamp(initial, 20, 100%)">
      <nu-slider value="15" min="10" max="20"></nu-slider>
    </nu-rail>
    <nu-label>Slider</nu-label>
  </nu-block>

  <nu-block>
    <nu-rail width="clamp(initial, 20, 100%)">
      <nu-slider value="15" step="10"></nu-slider>
    </nu-rail>
  </nu-block>
</nu-flow>
```

## Menus

```html
<nu-menu width="20" radius border padding="1x 0" fill="bg">
  <nu-menuitem>Menu item 1</nu-menuitem>
  <nu-menuitem>Menu item 2</nu-menuitem>
  <nu-menuitem>...</nu-menuitem>
</nu-menu>
```
