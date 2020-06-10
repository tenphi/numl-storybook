# Icons

By default Numl uses [Feather Icons](https://github.com/feathericons/feather) for icons.

## Static icons

```html
<split/>
<nu-block>
  <nu-icon name="user"></nu-icon>
  <nu-icon name="dollar-sign"></nu-icon>
  <nu-icon name="message-square"></nu-icon>
  <nu-icon name="package"></nu-icon>
  Text to align
</nu-block>
```

## Dynamic icons

You can change icon (with transition) depending on the element state like:

```html
<split/>
<nu-props transition-time=".2s"></nu-props>
<nu-flex gap="2x" flow="row wrap">
  <nu-btn padding>
    <nu-icon name="box ^:hover[package]"></nu-icon>
    Package
  </nu-btn>

  <nu-btn padding toggle>
    Dropdown
    <nu-icon name="chevron-down ^:pressed[chevron-up]"></nu-icon>
  </nu-btn>
</nu-flex>
```

Hover on the first button and click on the second to see effect.

As you see all icons are perfectly aligned with text in any context.

## Dropdown icon

There is the built-in element [nu-dropdownicon](../../reference/elements/nu-dropdownicon.md).

```html
<split/>
<nu-btn toggle>
  Dropdown
  <nu-dropdownicon></nu-dropdownicon>
  <nu-popup>Content</nu-popup>
</nu-btn>
```
