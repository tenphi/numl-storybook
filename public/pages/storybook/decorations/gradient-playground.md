# Gradient playground

```html
<preview/>
<nu-flow color="special-text" size="xl" text="h" gap="4x">
  <nu-attrs
    for="slider" width="20" min="0" max="359"
    image="linear(to right, hsi(0, 90), hsi(90, 90), hsi(180, 90), hsi(270, 90), hsi(0, 90))"></nu-attrs>
  <nu-slider fill="--from" value="280" control="props[from=hsi(@)]"></nu-slider>
  <nu-slider fill="--to" value="320" control="props[to=hsi(@)]"></nu-slider>
  <nu-props id="props" from="hsi(280)" to="hsi(320)"></nu-props>
  <nu-card
    clear radius="3x" width="15" height="15" shadow="special"
    fill="hsi(280) :hover[hsi(320)]" transition="fill .15s, shadow"
    image="linear(-15deg, --from, --to)">
    Heading
  </nu-card>
</nu-flow>
```
