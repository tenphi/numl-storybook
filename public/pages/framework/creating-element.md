# Creating your own element

Let's make dropdown-icon ;)

```html
<preview/>
<script>
  class MyDropdownIcon extends Nude.elements.NuIcon {
    static get nuTag() {
      return 'my-dropdownicon';
    }

    static get nuDefaults() {
      return {
        scale: '^:pressed[flip-y]',
        size: '2.5x',
      };
    }

    nuConnected() {
      this.setAttribute('name', 'chevron-down');
    }
  }

  Nude.init(MyDropdownIcon);
</script>

<nu-btn role="checkbox">
  Dropdown
	<my-dropdownicon></my-dropdownicon>
  <nu-popup>
		~~Content~~
  </nu-popup>
</nu-btn>
```
