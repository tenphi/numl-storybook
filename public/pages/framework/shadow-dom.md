# Shadow DOM

NuML makes usage of Shadow DOM transparent as possible. It means you can use any NuML elements in the Shadow DOM as you usually do it.

```html
<preview/>
<script>
  class MyDropdown extends Nude.elements.NuBtn {
    static get nuTag() {
      return 'my-dropdown';
    }
    nuConnected() {
      super.nuConnected();
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
  }
  customElements.define('my-dropdown', MyDropdown);
</script>
<nu-block padding="3.5 bottom">
  <nu-attrs for="$icon" color="special"></nu-attrs>
  <my-dropdown>
      <nu-el slot="name">Title</nu-el>
    content!
  </my-dropdown>
</nu-block>
```
