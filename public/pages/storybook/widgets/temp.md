## Variable directions

```html
<preview/>
<nu-flow gap>
  <nu-card gap>
    <nu-tablist border="bottom" value="third">
      <nu-tab controls="first">First</nu-tab>
      <nu-tab controls="second">Second</nu-tab>
      <nu-tab controls="third">Third</nu-tab>
    </nu-tablist>
    <nu-block>
      <nu-block id="first">Content of the first tab</nu-block>
      <nu-block id="second">Content of the second tab</nu-block>
      <nu-block id="third">Content of the third tab</nu-block>
    </nu-block>
  </nu-card>

  <nu-card display="grid" columns="auto 1fr" gap>
    <nu-tablist border="right" value="third" direction="right">
      <nu-tab controls="first">First</nu-tab>
      <nu-tab controls="second">Second</nu-tab>
      <nu-tab controls="third">Third</nu-tab>
    </nu-tablist>
    <nu-block id="first">Content of the first tab</nu-block>
    <nu-block id="second">Content of the second tab</nu-block>
    <nu-block id="third">Content of the third tab</nu-block>
  </nu-card>

  <nu-card gap>
    <nu-block id="first">Content of the first tab</nu-block>
    <nu-block id="second">Content of the second tab</nu-block>
    <nu-block id="third">Content of the third tab</nu-block>
    <nu-tablist border="top" value="third" direction="top">
      <nu-tab controls="first">First</nu-tab>
      <nu-tab controls="second">Second</nu-tab>
      <nu-tab controls="third">Third</nu-tab>
    </nu-tablist>
  </nu-card>

  <nu-card display="grid" columns="1fr auto" gap>
    <nu-block id="first">Content of the first tab</nu-block>
    <nu-block id="second">Content of the second tab</nu-block>
    <nu-block id="third">Content of the third tab</nu-block>
    <nu-tablist border="left" value="third" direction="left">
      <nu-tab controls="first">First</nu-tab>
      <nu-tab controls="second">Second</nu-tab>
      <nu-tab controls="third">Third</nu-tab>
    </nu-tablist>
  </nu-card>
</nu-flow>
```
