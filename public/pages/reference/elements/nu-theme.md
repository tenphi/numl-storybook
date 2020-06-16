The definition element that declares a theme in the context of its parent.

|Attribute|Description|
|-----|-----|
|`"hue"`|Hue (integer 0-255) or CSS color to make a theme from|
|`"type"`|Type of the theme: `"tint"`, `"tone"`, `"swap"`, `"special"`. Don't set it if you need a theme with `"main"` type|
|`"saturation"`|Saturation level (integer 0-100)|
|`"pastel"`|If presented then use pastel color space [HPLuv](!https://www.hsluv.org/comparison/)|
|`"mod"`|A list of modifiers|

|Modifier|Description|
|-----|-----|
|`"soft"`|Opposite to `"strong"`. Decreases contrast between background color and text color|
|`"strong"`|Opposite to `"soft"`. Increases contrast between background color and text color|
|`"dim"`|Opposite to `"bold"`. Decreases contrast between main background color and theme background color|
|`"bold"`|Opposite to `"dim"`. Increases contrast between main background color and theme background color|

### Examples

* [Colors - Basics themes](../../storybook/colors/basic-themes.md)

### See also

* [theme](./theme.md)
* [color](./color.md)
* [fill](./fill.md)

### CSS Reference

* [MDN: color](!https://developer.mozilla.org/en-US/docs/Web/CSS/color)
* [MDN: background-color](!https://developer.mozilla.org/en-US/docs/Web/CSS/background-color)
