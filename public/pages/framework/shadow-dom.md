# Shadow DOM

Numl makes usage of Shadow DOM transparent as possible. It means you can use any Numl elements in the Shadow DOM as you usually do it.

```html
<preview/>
<script>
  Nude.define('my-dropdown', {
    parent: Nude.elements.NuBtn,
    connected() {
      const shadow = this.attachShadow({ mode: 'open' });
      shadow.innerHTML = `
<slot name="name">NAME</slot>
<nu-icon
	id="icon"
	name="chevron-down"
	scale="^:pressed[flip-y]"
	transition="scale"></nu-icon>
<nu-popup>
	<slot></slot>
</nu-popup>`;
    }
  });
</script>
<nu-block padding="3.5 bottom">
  <nu-attrs for="$icon" color="special"></nu-attrs>
  <my-dropdown>
      <nu-el slot="name">Title</nu-el>
    content!
  </my-dropdown>
</nu-block>
```
