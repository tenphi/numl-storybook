# Links

In Numl every active element can be a link.

## Simple links

```html
<preview/>
<nu-flex gap flow="row wrap">
  <nu-link>Simple link</nu-link>
  <nu-link to="mailto:tenphi@gmail.com?subject=NUDE%20Elements%20feedback">Email link</nu-link>
  <nu-link to="https://github.com/tenphi/nude">Open link in the current tab</nu-link>
  <nu-link to="!https://github.com/tenphi/nude">Open link in a new tab</nu-link>
</nu-flex>
```

## Button as link

```html
<preview/>
<nu-flex gap flow="row wrap">
  <nu-btn>Simple link</nu-btn>
  <nu-btn to="mailto:tenphi@gmail.com?subject=NUDE%20Elements%20feedback">Email link</nu-btn>
  <nu-btn to="https://github.com/tenphi/nude">Open link in the current tab</nu-btn>
  <nu-btn to="!https://github.com/tenphi/nude">Open link in a new tab</nu-btn>
</nu-flex>
```

## Accessibility

Numl creates real link inside element so right mouse click works as expected. Use [prerender](https://github.com/prerender/prerender) (or alternatives) to make sure your site will be parsed correctly by Search Bots.
