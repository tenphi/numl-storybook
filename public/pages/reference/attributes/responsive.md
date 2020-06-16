The **responsive** property declares style responsive breakpoints in the context of the element.

### Usage

```html
<preview/>
<nu-root #[[responsive="1280px|680px"]]#>
  <nu-grid columns=#[["repeat(4, 1fr)|1fr 1fr|1fr"]]# gap>
    <nu-card></nu-card>
    <nu-card></nu-card>
    <nu-card></nu-card>
    <nu-card></nu-card>
  </nu-grid>
</nu-root>
```
