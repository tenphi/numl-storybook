# Creating your own element

Let's make dropdown-icon ;)

```html
<preview/>
<script>
  Nude.define('my-dropdownicon', {
    parent: Nude.elements.NuIcon,
    styles: {
      scale: '^:pressed[flip-y]',
      size: '2.5x',
    },
    attrs: {
      name: 'chevron-down',
    },
  });
</script>

<nu-btn toggle>
  Dropdown
	<my-dropdownicon></my-dropdownicon>
  <nu-popup>
		~~Content~~
  </nu-popup>
</nu-btn>
```
