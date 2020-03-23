# Button groups and tabs

## Button group

```html
<nu-flow gap>
  <nu-block>
    <nu-btngroup value="second">
      <nu-btn value="first">First</nu-btn>
      <nu-btn value="second">Second</nu-btn>
      <nu-btn value="third">Third</nu-btn>
    </nu-btngroup>
  </nu-block>
  <nu-block>
    <nu-btngroup value="second" flow="column" width="15">
      <nu-btn value="first">First</nu-btn>
      <nu-btn value="second">Second</nu-btn>
      <nu-btn value="third">Third</nu-btn>
    </nu-btngroup>
  </nu-block>
</nu-flow>

```

## Tabs

```html
<nu-flow gap>
  <nu-card gap>
    <nu-tablist border="bottom" value="third">
      <nu-tab controls="first">First</nu-tab>
      <nu-tab controls="second">Second</nu-tab>
      <nu-tab controls="third">Third</nu-tab>
    </nu-tablist>
    <nu-block id="first">Content of the first tab</nu-block>
    <nu-block id="second">Content of the second tab</nu-block>
    <nu-block id="third">Content of the third tab</nu-block>
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
