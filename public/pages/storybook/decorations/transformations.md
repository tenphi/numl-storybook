# Transformations

## Move

Use [move](../../reference/attributes/move.md) property.

```html
<split/>
<nu-block fill="subtle" size="xl">
  <nu-icon #[[move="1x 1x"]]# name="chrome"></nu-icon>
</nu-block>
```

## Scale

Use [scale](../../reference/attributes/scale.md) property.

```html
<split/>
<nu-block fill="subtle" size="xl">
  <nu-icon #[[scale=".5"]]# name="chrome"></nu-icon>
  <nu-icon #[[scale="1.5"]]# name="chrome"></nu-icon>
</nu-block>
```

## Rotate

Use [rotate](../../reference/attributes/rotate.md) property.

```html
<split/>
<nu-block fill="subtle" size="xl">
  <nu-icon #[[rotate="-45deg"]]# name="chrome"></nu-icon>
  <nu-icon #[[rotate="45deg"]]# name="chrome"></nu-icon>
</nu-block>
```

## Combined

Use all properties together!

```html
<split/>
<nu-block fill="subtle" size="xl">
  <nu-icon
    name="chrome"
    #[[move="5x 5x"]]#
    #[[scale="1.5"]]#
    #[[rotate="-45deg"]]#></nu-icon>
</nu-block>
```

## Complex

Use [transform](../../reference/attributes/transform.md) property.

```html
<split/>
<nu-block fill="subtle" size="xl">
  <nu-icon #[[transform="skew(15deg, 15deg)"]]# name="chrome"></nu-icon>
</nu-block>
```
