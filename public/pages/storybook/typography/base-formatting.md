# Text formatting

## Plain

No formatting. `"inline-block"` display.

```html
<split/>
<nu-el>No styles</nu-el>
```

No formatting. `"inline"` display.

```html
<split/>
<nu-in>No styles</nu-in>
```

## Bold

`"b"` or `"bold"` modifier.

```html
<split/>
<nu-b>Bold</nu-b> |
<nu-el text="b">
  Styled as bold
</nu-el>
```

## Italic

`"i"` or `"italic"` modifier.

```html
<split/>
<nu-i>Italic</nu-i> |
<nu-el text="i">
  Styled as italic
</nu-el>
```

## Underlined

`"u"` or `"underline"` modifier.

```html
<split/>
<nu-u>Underlined</nu-u> |
<nu-el text="u">
  Styled as underlined
</nu-el>
```

## Сrossed out
`"s"` or `"line-through"` modifier.

```html
<split/>
<nu-s>Сrossed out</nu-s> |
<nu-el text="s">
  Styled as crossed out
</nu-el>
```

## Superscript

`"sup"` modifier.

```html
<split/>
<nu-sup>Superscript</nu-sup> |
<nu-el text="sup b" size=".75em 1em">
  Styled as superscript
</nu-el>
```

## Subscript

`"sub"` modifier.

```html
<split/>
<nu-sub>Subscript</nu-sub> |
<nu-el text="sub b" size=".75em 1em">
  Styled as subscript
</nu-el>
```

## Reset styles

`"n"` or `"normal"` modifier.

```html
<split/>
<nu-el text="b i s">
  Text <nu-el text="n">reset</nu-el> text
</nu-el>
```
