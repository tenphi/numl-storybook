# Gradient playground

```html
<preview/>
<nu-flow gap="2x" size="lg">
  <nu-attrs
    for="slider" width="15" min="0" max="359"
    image="linear(to right, hsi(0, 90), hsi(90, 90), hsi(180, 90), hsi(270, 90), hsi(0, 90))"></nu-attrs>
  <nu-grid columns="auto 1fr" gap="1x" items="center start">
    <nu-el>From</nu-el>
    <nu-slider fill="--from" value="280" control="props[from=hsi(@)]"></nu-slider>
    <nu-el>To</nu-el>
    <nu-slider fill="--to" value="320" control="props[to=hsi(@)]"></nu-slider>
    <nu-el>Angle</nu-el>
    <nu-slider image value="345" control="props[angle=@deg]"></nu-slider>
  </nu-grid>
  <nu-props id="props" fill="special" from="hsi(280)" to="hsi(320)"></nu-props>
  <nu-card
    clear color="special-text" size="xl" text="h" radius="3x" width="15" height="15" shadow="special"
    transition="fill .15s, shadow"
    image="linear(--angle, --from, --to)">
    Heading
  </nu-card>
</nu-flow>
```
