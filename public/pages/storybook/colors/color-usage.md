# Color usage

## Change text color

Use `"color"` property to set text (base) color.

```html
<split/>
<nu-el color="special">Special text</nu-el>
```

Set transparency for the color using the following syntax:

```html
<split/>
<nu-el color="special 60%">Special text</nu-el>
```

## Fill element with color

Use `"fill"` property to fill element with color.

```html
<split/>
<nu-el fill="special-bg">Special element</nu-el>
```

**Numl** tries to adapt text color if you changes background. So there is no need to specify `color="special-text"` property.

## Set color of the property

If you want to change, for example, color of the border, then you should use `#` syntax to specify color.

```html
<split/>
<nu-card border="1x #special" radius="2x">
  Special card
</nu-card>
```

Set transparency for the border color using the following syntax:

```html
<split/>
<nu-card border="1x #special.60" radius="2x">
  Special card
</nu-card>
```
