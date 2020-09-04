# Changelog

## v1.0.0 BETA

Update is focused on improved theme color calculation.

- Themes
	- new formula for colored shadows.
	- Add **shadow** and **special-shadow** colors.
	- Remove **intensity** and **special-intensity** CP.
	- **focus** -> **outline** color.
	- Fix **text** and **text-soft** colors for **main** type.
	- Fix saturation for dark scheme. (prevent hue shift)
	- Optimize binding. Now it doesn't use media queries.
	- Fix **subtle** color for **tint** themes.
- **theme** style: Fix `color` declaration. Fix **special** styles.
- **nu-listbox**: Add **multiple** option. Change styles and behavior.
- **markdown** behavior: Migrate to **remarkable** processing with **remarkable-numl** plugin.
- Syntax to inject behaviors is changed: `nx-` -> `use-`.
- New **hover** behavior to normalize **hover** state across browsers and platforms.
- Add a new `nuContext` property for **Base** element that allows to set default context variables and inject **nu-attrs** definition into an element. Elements now can control how children should be styled.
- **props**: color definitions now support opacity and transparent assignment of **rgb** version of the color. Example:
```
<nu-props my-color="hue(1)"></nu-props>
<nu-block color="my 50%">...
```
- **nu-btn**: Make inset style more subtle on **active** state. Fix **special** styles.
- **nu-input**: Add **special** modifier. Fix **focus** behavior. Fix **disabled** state styles. Remove **mask** attribute. (replaced with **nu-password** element)
- **border**, **radius**, **shadow** styles: add **<yes>/<no>**  modifier.
- **shadow** style: Fix color definition.
- **outline** style: Support for color and size. New **focus** syntax. Example:
```
outline="focus visible"
```
* Add **font** style property. Use Google Fonts or other solution to add fonts to your website. Use **font** style to apply font to the element. Example:
```
<nu-block font="Cera Pro"></nu-block>
```
- Add **dark**, **light**, **high-contrast**, **low-contrast** and **focus** `:root` modifiers. Style your markup depending on scheme, contrast mode or both! Example:
```
<nu-props
   some-color="^root :dark[hsl(1, 80%, 50%)] :light[hsl(180, 80%, 50%)]"></nu-props>
```
- Add new global events to control over **Nude** initialization and **Numl** state: `nudeReady` and `numlReady` . The first one is fired when framework is ready, and the second one is fired when all custom elements are defined. Example:
```
window.addEventListener('nudeReady', (event) => {
	// do something before custom elements are initialized
});
```
- Custom units: `sw` ->  `ow` . (outline width)
- API to create Custom Units: `Nude.units.define(unitName, converter)`. The converter can be either a string or a function.
- Redefine `focus()` method of elements to support `nuRef`. (<NuInput>.focus() triggers focus on inner `input` element).
- Fix *`parseAttr()`*case sensivity.
- *`computeStyles`*bug fix for immutable style sources.
- States: support for an empty value for the state. Example: `val1 :hover[]` - the default value will be applied to the **hover** state.
- States: support for **OR** syntax. `val1 :hover.focus[val2]` instead of `val1 :hover[val2] :focus[val2] :hover:focus[val2]`.
- `init()` refactoring.
- Add `--nu-disabled-opacity` custom property.
- New elements added: **nu-password**, **nu-search**, **nu-telinput**, **nu-emailinput**, **nu-fileinput**, **nu-onetimecode**.
- Settings: add **data-nu-scrollbar** to activate global scrollbar styling. (preferable if you allow dark scheme).
- Convert `100vh` value in **height** property to `-webkit-fill-available` on iOS devices.
- **nu-code**: Add classic dark mode via **special** modifier.
- **scrollbar** style: Allow external styling, support for **special** modifier.
- Add style property **clip**.
- **nu-inline** -> **nu-in**.
- **space**: Add modifiers: **left** & **right**
- **place**: Remove **space-around** modifier.
- **height** & **width** styles: fix parsing.
- **text** style: Support for text decoration color via `text="u #any-color"`.
- **nu-option**: Don't trigger **close** action.
- **nu-input**: Fix placeholder color (remove opacity).
- Fix input selection bug in Firefox.
- **nu-search**: Remove native **cancel** button.
- **nu-svg** & **nu-img**: Fix limit width by default.
- **color** & **fill** styles support for **hash** color syntax `fill="#special-bg"`.
- **shadow** support for named shadow via properties. Example: `shadow="custom"` will use `--custom-shadow` to apply shadow.
- **nu-menuitem**: fix nested behavior when combined with **nu-popup**.
- **validator**: support for custom validators. Example `<nu-check for="name" assert={customValidator}>Name should pass custom validator<nu-check>`.

## v0.11

A major update focused on brand new Behavior System that allows simplifying development of complex compositions and rich components. It adds dynamic imports that reduces base bundle size.

Also, update introduces more semantic elements and combinations of elements with ARIA compliance.

### New features

* Behaviors
* Control system
* Actions
* Settings
* Global context
* Global locale inheritance
* Forms
* Form validation
* Adaptive colors
* Improved support for Shadow DOM
* Improved ARIA support
* Rich components
* Real ==flex gap== detection
* Style selections
* Sticky detection
* Link state detection (for active navigation)
* Outline mode
* Strict-size columns for Grid with `pr` unit.

### New standalone behaviors
* ==offset==
* ==appear==

### New Attributes
* [outline](../reference/attributes/outline.md)
* [mark](../reference/attributes/mark.md)

### New elements

* [nu-listbox](../reference/elements/nu-listbox.md)
* [nu-popuplistbox](../reference/elements/nu-popuplistbox.md)
* [nu-option](../reference/elements/nu-option.md)
* [nu-field](../reference/elements/nu-field.md)
* [nu-check](../reference/elements/nu-check.md)
* [nu-form](../reference/elements/nu-form.md)
* [nu-debug](../reference/elements/nu-debug.md)
* [nu-cd](../reference/elements/nu-cd.md)
* [nu-dropdownicon](../reference/elements/nu-dropdownicon.md)
* format elements:
    * [nu-strong](../reference/elements/nu-strong.md)
    * [nu-em](../reference/elements/nu-em.md)
    * [nu-sup](../reference/elements/nu-sup.md)
    * [nu-sub](../reference/elements/nu-sub.md)
* semantic elements:
    * [nu-header](../reference/elements/nu-header.md)
    * [nu-footer](../reference/elements/nu-footer.md)
    * [nu-article](../reference/elements/nu-article.md)
    * [nu-aside](../reference/elements/nu-aside.md)
    * [nu-section](../reference/elements/nu-section.md)
    * [nu-main](../reference/elements/nu-main.md)
    * [nu-h1](../reference/elements/nu-h1.md)
    * [nu-h2](../reference/elements/nu-h2.md)
    * [nu-h3](../reference/elements/nu-h3.md)
    * [nu-h4](../reference/elements/nu-h4.md)
    * [nu-h5](../reference/elements/nu-h5.md)
    * [nu-h6](../reference/elements/nu-h6.md)

### New components (experimental)

* [nu-dateinput](../reference/elements/nu-dateinput.md)
* [nu-datepicker](../reference/elements/nu-datepicker.md)

### Breaking change

* Custom units
    * Default border width: ==bw==
    * Default selection width: ==sw==
* Attributes:
    * ==focusable== -> ==focus==
    * ==width== & ==height==: new syntax
* Elements:
    * ==nu-label==: is no longer inline
* Decorators -> Definitions
* New routing API
* New icons API
* New define API
* ==is-== prefix for modifiers instead of ==nu-==
* New settings API for scheme, contrast and reduce-motion

### Minor or internal features

* [nu-popup](/reference/elements/nu-popup) - linking rework
* ==focus==: inside & outside modifiers
* Add $suffix and $prefix splitting via `,` symbol
* Optimize theme generation
* Set polite focus via CP
* Disable CSS transition
* Optimized event binding
* Allow to prevent Nude.init()

### Bug fixes

* [nu-popup](../reference/elements/nu-popup.md) linking is not working in Shadow DOM
* Focus is not working in Shadow DOM
* Fix scroll corner for Dark Scheme
* [nu-tooltip](../reference/elements/nu-tooltip.md)== fix margins in layouts
* Incorrect styling of `font-weight` in [text](../reference/attributes/text.md) attribute.

## v0.10

### New features
* Full rework of attribute parsing. More features, more stable and much faster.
* Automatic **calc** insertion.
* New **color()** function for some style attributes.
* Custom states for **nu-** modifiers and **role** attribute.
* New parent selectors: `root`, `any`, `host`. Usage: `opacity="^host :hover[1] 0"`.
* Add **Mixin System**.
* **nu-tablist** now supports direction change.
* Add **Active** mixin for active elements.
* Add **Direction** mixin for elements that have direction.
* Add **Orient** mixin for elements that have orientation.
* Add **Fixate** mixin for elements that can be fixed via [drop] attribute.
* Rework of RadioGroup mechanics (migration to Context system). Elements involved: [nu-radiogroup](/reference/elements/nu-radiogroup) [nu-activeelement](/reference/elements/nu-activeelement) [nu-radio](/reference/elements/nu-radio) [nu-tablist](/reference/elements/nu-tablist) [nu-tab](/reference/elements/nu-tab) [nu-btngroup](/reference/elements/nu-btngroup)

### Breaking changes
* New simplified syntax for state declaration: `0 #btn:pressed[1] #btn:hover[1]` -> `^#btn :pressed[1] :hover[1] 0`.
* Built-in custom units changes: **br** -> **r**, **bw** -> **b**, **x** is equal `var(--nu-gap)` now
* Remove custom properties declarations from [nu-theme](/reference/elements/nu-theme) decorator! Use brand new [nu-props](/reference/elements/nu-props) decorator.
* Theme type **toned** renamed to **tone**.
* **nu-triangle**: remove direction attribute, use **rotate** instead.

### New elements
* [nu-props](/reference/elements/nu-props) - new decorator to declare custom properties.
* [nu-radiogroup](/reference/elements/nu-radiogroup) - radio group.
* [nu-radio](/reference/elements/nu-radio) - radio button.
* [nu-progressbar](/reference/elements/nu-progressbar) - To show progress of a process.
* [nu-slider](/reference/elements/nu-slider) and [nu-rail](/reference/elements/nu-rail) – To create sliders.
* [nu-markdown](/reference/elements/nu-markdown) and [nu-md](/reference/elements/nu-md) - To convert markdown markup. EXPERIMENTAL.

### New attributes & modifiers
* [scale](/reference/attributes/scale) with **flip**, **flip-x** and **flip-y** modifiers.
* [rotate](/reference/attributes/rotate) - to rotate element.
* [move](/reference/attributes/move) - to move element (via `transform:translate(...)`).
* [show](/reference/attributes/show) - to conditionally show elements. Hide them by default.
* [hoverable](/reference/attributes/hoverable) - to activate hover effect on background for active elements.
* [focusable](/reference/attributes/focusable) - to activate focus effect on active elements.
* **toggle** - to activate toggle effect on active elements.
* [expand](/reference/attributes/expand) - to increase active region.
* [drop](/reference/attributes/drop) - to statically fix element position based on parent element (using `position: fixed`).
* [place](/reference/attributes/place) now support sticky positioning with distance: `[place="sticky top 3"]`.
* [t](/reference/attributes/t) - for responsive labels.
* [shadow](/reference/attributes/shadow) - support for native CSS shadows with NUDE shortcuts.

### Minor and internal changes
* Refactoring for table elements.
* [nu-img](/reference/elements/nu-img) new simplified API with **fit** attribute.
* [hide](/reference/attributes/hide) attribute is no longer hide element if no value provided.
* [nu-checkbox](/reference/elements/nu-checkbox) - style fixes.
* [nu-mark](/reference/elements/nu-mark) – minor style fixes and [theme] support.
* [nu-line](/reference/elements/nu-line) - refactoring. Migrate to **Orient Mixin** and NUDE attribute declarations.
* [nu-tab](/reference/elements/nu-tab) - add active region.
* [nu-tooltip](/reference/elements/nu-tooltip) - fix styling to better fill space while allowing wrapping.
* **inline** attribute is no longer required for accurate positioning of inline elements like [nu-icon](/reference/elements/nu-icon).
* Tables style rework.
* Active elements style rework.
* Migrate element styles to NUDE attribute definitions.
* Migrate attribute implementations to parseAttr() method.
* New color parsing implementation.
* Add ability to set context values before element is connected.
* New styling for hoverable effect based on `box-shadow`.

### Bug fixes
* Fix conflict between transform attributes.
* Fix **special-text-color** for swap theme variant in high contrast mode.

[Full issues list](https://github.com/tenphi/nude/milestone/3?closed=1)

## v0.9

### New features

* New **Variable system**.
* Rework of **Responsive system** to fix all known issues and add support for **Variable system**. Performance is improved.

### Bug fixes

* **Responsive system**: nested responsive contexts works incorrect.

## v0.8

### New features

* Full rework of **Theme System**. Full theme calculation from single hue param. WCAG contrast ratio compliance. Much better **Dark scheme** and **High contrast** support. Ability to tweak every theme with modifiers.
* Improved support for Svelte.
* Links native behavior.
* Magic **diff** color.

### Breaking changes

* **theme**, **color**, **fill** attributes now works completely different.
* [nu-theme](/reference/elements/nu-theme) has new awesome API.
* [nu-triangle](/reference/elements/nu-triangle): **dir** -> **set**.
* [nu-style](/reference/elements/nu-style) renamed to **nu-attrs** for a more accurate understanding.
* **nu-scroll** removed. (legacy element)

### New elements
* **nu-numinput** - Input for numeric values.
* **nu-mark** - Highlight part of the text.
* **nu-code** - Code snippets!

### New attributes
* [scrollbar](/reference/attributes/scrollbar) - To control over scroll bar styling.

### Bug fixes
* Unable to change border width of **nu-switch**.
* Flex doubles gap in Firefox.
* Fix [nu-switch](/reference/elements/nu-switch) styles.
* Fix flash of non-styled content for responsive elements.

## v0.7

### Breaking changes
* **mod** attribute is replaced with **text** attribute and move all non-text-related modifiers to other attributes. Now it’s not possible to specify text size with **text** attribute. Use **size** attribute instead.
* **hidden** attribute is renamed to **hide**.
* **events** attribute is renamed to **interactive** and change its API.
* **cell** attribute replaced with **fill** value for **place** attribute.
*  **background** attribute is renamed to **fill**.

### New elements
* New base inline element **nu-el**.
* New **nu-rowheader** element for tables.
* New **nu-checkbox** element.
* New **nu-label** element.
* New **nu-style** element to declare attributes with their values in context to cast them into elements within that context. It’s a handy alternative to CSS classes. You can dynamically change attributes to affect related elements.
* New **nu-popup** and **nu-popupmenu** elements with accessibility features and intuitive mechanics.

### New attributes & modifiers
* Dynamic **display** attribute. How you can change it depending on responsive points or state.
* Added wrapped **flex** support with two-dimension gap. Just use **flow** attribute with **wrap** modifier. (Polyfill has restrictions)
* New attribute **overflow**.
* New **image** attribute for background image declaration.
* New modifiers for **radius** attribute: **round** and **ellipse**.
* Direction modifiers for **padding** and **space** attributes.
* New **color** attribute modifiers: **fill**, **minor fill**, **special fill**, **swap**, **minor swap**, **special swap**. They currently don’t affect shadow intensity; New color shotcuts presented;
* Added new **:prev** and **:next** shortcuts for accessibility link attributes.

### Minor and internal changes
* Added context system to access element's context provided by parent elements and register hooks for context change. It’s very important feature that drastically simplifies implementation of widgets and internal systems.
* Full rework of **gap** and **flow** attributes to better support dynamic **display** attribute.
* Attribute **gap** support for all block elements. It add needed margins to all children except the last one.
* Simplified event mechanics for widgets.
* **CSS Mixins** to share styles between attributes and optimize style applying. It's under-the-hood improvement that speeds up elements’ rendering and fixes several bugs. It almost completely fulfills NUDE’s promise to apply styles only when they are needed.
* Static css inheritance reworked. API was simplified.
* Added cleaning system to remove CSS that can’t be used again.
* Add auto id static getter **nuId**. If specified element will automatically receive **id**. So you can link the most of the elements without explicitly defining **id** in some cases.
* Multiple fixes to various element styles.
