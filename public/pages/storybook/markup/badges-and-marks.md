# Badges and marks

There are two elements to highlight some parts of the text or interface: [nu-badge](../../reference/elements/nu-badge.md) and [nu-mark](../../reference/elements/nu-mark.md).

## Marks

```html
<nu-card>
  You can mark some
  <nu-mark>parts</nu-mark>
  of the text
  or emphasize attention to
  <nu-mark special>the important part</nu-mark>
  of the text.
  Use themes to make marks more
  <nu-mark theme="tone">pretty</nu-mark>
  or
  <nu-mark theme="swap" fill>visually strong</nu-mark>
  .
</nu-block>
```

## Badges

```html
<nu-flow gap>
  <nu-heading level="4">Normal badges</nu-heading>
  <nu-block>
    <nu-badge>Simple badge</nu-badge>
    <nu-badge special>Special badge</nu-badge>
  </nu-block>

  <nu-heading level="4">Themed badges</nu-heading>
  <nu-block text="w5">
    <nu-badge theme="tint">Tint</nu-badge>
    <nu-badge theme="tone">Tone</nu-badge>
    <nu-badge theme="swap">Swap</nu-badge>
    <nu-badge theme="special">Special</nu-badge>
  </nu-block>
</nu-flow>
```
