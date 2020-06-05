# Changelog

## v0.12 UPCOMING

### New features

* RTL support

## v0.11 STABLE RELEASE

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
* Improved support for Shadow DOM
* Listbox ARIA compliance
* Rich components
* Real ==flex gap== detection
* Style selections
* Sticky detection
* Link state detection (for active navigation)
* Outline mode
* Strict-size columns for Grid with `pr` unit.

### Attributes
* ==focus==: inside & outside modifiers

### New elements

* ==nu-listbox==
* ==nu-popuplistbox==
* ==nu-option==
* ==nu-field==
* ==nu-check==
* ==nu-form==
* ==nu-debug==
* ==nu-topbar==
* ==nu-dropdownicon==
* format elements:
    * ==nu-strong==
    * ==nu-em==
    * ==nu-sup==
    * ==nu-sub==
* semantic elements:
    * ==nu-header==
    * ==nu-footer==
    * ==nu-article==
    * ==nu-aside==
    * ==nu-section==
    * ==nu-main==
    * ==nu-h1==
    * ==nu-h2==
    * ==nu-h3==
    * ==nu-h4==
    * ==nu-h5==
    * ==nu-h6==

### New components

* ==nu-dateinput==
* ==nu-datepicker==

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
* Add $suffix and $prefix splitting via `,` symbol
* Optimize theme generation
* Set polite focus via CP
* Disable CSS transition
* Optimized event binding
* Allow to prevent Nude.init()

### Bug fixes

* ==nu-popup== linking is not working in Shadow DOM
* Focus is not working in Shadow DOM
* Fix scroll corner for Dark Scheme
* ==nu-tooltip== fix margins in layouts
* Incorrect styling of `font-weight` in ==text== attribute.

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
* Built-in custom units changes: **br** -> **r**, **bw** -> **b**, **x** is equal **var(--nu-gap) now
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
