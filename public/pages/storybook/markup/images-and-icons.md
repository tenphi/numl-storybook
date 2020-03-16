# Images and icons

There are several elements in NuML that you can use to insert images and icons: [nu-img](/reference/element/nu-img), [nu-svg](/reference/element/nu-svg) and [nu-icon](/reference/element/nu-icon).

## Images

### Usage

Use `src` attribute to specify URL to the image.

```html
<nu-img src="https://d13k13wj6adfdf.cloudfront.net/urban_areas/san-francisco-bay-area_web-f17b1f60e6.jpg"></nu-img>
```

### Image fit

Using `fit` attribute you can specify fit strategy of the image. This attribute has the same specification as `object-fit` CSS style. If `fit="none"` which is default value then the image is trying to take as much space as needed for full size but no more than container width.

```html
<nu-flow gap text="monospace">
  <nu-attrs
    for="nu-card"
    display="grid" rows="auto 1fr"
    width="300px" height="200px"></nu-attrs>
  <nu-heading level="5">
    300x200 containers
  </nu-heading>
  <nu-card>
    <nu-block>fit="fill"</nu-block>
    <nu-img
      src="https://d13k13wj6adfdf.cloudfront.net/urban_areas/san-francisco-bay-area_web-f17b1f60e6.jpg"
      fit="fill"></nu-img>
  </nu-card>
  <nu-card>
    <nu-block>fit="none"</nu-block>
    <nu-img
      src="https://d13k13wj6adfdf.cloudfront.net/urban_areas/san-francisco-bay-area_web-f17b1f60e6.jpg"
      fit="none"></nu-img>
  </nu-card>
</nu-flow>
```

### Accessibility

[nu-img](/reference/element/nu-img) uses native `img` element under-the-hood. So you can be sure that all images will be accessible. Don't forget to specify `label` attribute to describe image.

Be aware that in Dark Scheme every image is slightly dimmed.

## Inline SVG

You can inline any SVG using [nu-svg](/reference/element/nu-svg) element.

It's useful if you want to use some colors from your application to color an SVG.

```html
<nu-attrs for="nu-svg" width="4" height="4"></nu-attrs>
<nu-flex flow="row wrap" gap="2x">
  <nu-svg theme="tint" src="/img/icon.svg"></nu-svg>
  <nu-svg theme="swap" src="/img/icon.svg"></nu-svg>
  <nu-svg theme="special" src="/img/icon.svg"></nu-svg>
</nu-flex>
```

## Icons

By default NuML uses [Feather Icons](https://github.com/feathericons/feather) for icons.

```html
<nu-block size="xl" nu=""> <nu-icon name="user" role="img" nu="" aria-hidden="false"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user" name="user" style="display: none;"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></nu-icon> <nu-icon name="dollar-sign" role="img" nu="" aria-hidden="false"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-dollar-sign" name="dollar-sign" style="display: none;"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg></nu-icon> <nu-icon name="message-square" role="img" nu="" aria-hidden="false"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-square" name="message-square" style="display: none;"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg></nu-icon> <nu-icon name="package" role="img" nu="" aria-hidden="false"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-package" name="package" style="display: none;"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg></nu-icon> Text to align </nu-block>
```

You can change icon (with transition) depending on the element state like:

```html
<nu-props transition-time=".2s"></nu-props>
<nu-flex gap="2x" flow="row wrap">
  <nu-btn padding size="xl">
    <nu-icon name="box ^:hover[package]"></nu-icon>
    Package
  </nu-btn>

  <nu-btn padding size="xl" role="checkbox">
    Dropdown
    <nu-icon name="chevron-down ^:pressed[chevron-up]"></nu-icon>
  </nu-btn>
</nu-flex>
```

As you see all icons are perfectly aligned with text in any context.
