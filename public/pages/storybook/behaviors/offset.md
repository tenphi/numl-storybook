# Offset behavior

## Fancy navigation links

```html
<split/>
<nu-nav
  label="Social links" flow="row" size="xl" gap="2x" padding="8x">
  <nu-attrs for="btn" padding radius="2x" clear
            nx-offset transition="move :offset[no]"
            move="(--offset-x * 1x) (--offset-y * 1x)"></nu-attrs>
  <nu-btn to="!https://github.com/tenphi" label="Github">
    <nu-icon name="github"></nu-icon>
  </nu-btn>
  <nu-btn to="!https://twitter.com/tenphi" label="Twitter">
    <nu-icon name="twitter"></nu-icon>
  </nu-btn>
  <nu-btn to="!https://facebook.com/tenphi" label="Facebook">
    <nu-icon name="facebook"></nu-icon>
  </nu-btn>
  <nu-btn to="mailto:tenphi@gmail.com" label="Email">
    <nu-icon name="mail"></nu-icon>
  </nu-btn>
</nu-nav>
```
