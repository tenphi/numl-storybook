# Integration with Svelte

Svelte requires no additional steps to use **Numl**. It works pretty well with Web Components.

## Attribute binding

Bind `string` attribute:

```html
<nu-btn padding={padding}></nu-btn>
```

Bind `boolean` attribute:

```html
<nu-btn special={isSpecial}></nu-btn>
```

## Bind event handlers

Bind event handlers as you do it with other Svelte Components.

**tap** event binding:

```html
<nu-btn
  on:tap={onTap}>
  Button
</nu-btn>
```

**input** event binding:

```html
<nu-switch on:input={(event) => onInput(event.detail)}></nu-switch>
```

## Real-world examples (repositories)

* [Numl Playground](!https://github.com/tenphi/numl/blob/master/components/playground.svelte).
