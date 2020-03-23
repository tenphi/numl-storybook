# Shadow DOM

NuML makes usage of Shadow DOM transparent as possible. It means you can use any NuML elements in the Shadow DOM as you usually do it.

```html
<script>
  class MyShadowIcon extends Nude.elements.NuElement {
    static get nuTag() {
      return 'my-shadowicon';
    }

    nuConnected() {
      const shadow = this.attachShadow({ mode: 'open' });

      shadow.innerHTML = `
        Shadow icon

        <nu-icon
          size="3"
          color=":hover[special]"
		  name="user"></nu-icon>
	  `;
    }
  }

  Nude.init(MyShadowIcon);
</script>

<my-shadowicon></my-shadowicon>
```
