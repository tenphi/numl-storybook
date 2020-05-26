# Popups & Dropdowns

## Simple dropdown

You can create awesome `Dropdowns` using primitives: `nu-btn` , `nu-icon` and `nu-popup`.

```nu-preview
<nu-attrs
  for="dropdown-icon"
  name="chevron-down"
  scale="^:pressed[flip-y]"
  size="1.25em"></nu-attrs>
<nu-block padding="3 bottom">
  <nu-btn>
    Button label
    <nu-icon as="dropdown-icon"></nu-icon>
    <nu-popup>
      Popup content
    </nu-popup>
  </nu-btn>
</nu-block>
```

## Drop directions

It's possible to position popup as you like.

```nu-preview
<nu-attrs
  for="dropdown-icon"
  name="chevron-down"
  scale="^:pressed[flip-y]"
  size="1.25em"></nu-attrs>
<nu-flex gap flow="column" items="center">
  <nu-btn special>
    <nu-el text="monospace">[drop="down"]</nu-el>
    <nu-icon as="dropdown-icon"></nu-icon>
    <nu-popup>Popup content</nu-popup>
  </nu-btn>
  <nu-btn special>
    <nu-el text="monospace">[drop="right"]</nu-el>
    <nu-icon as="dropdown-icon" rotate="270deg"></nu-icon>
    <nu-popup drop="right">Popup content</nu-popup>
  </nu-btn>
  <nu-btn special>
    <nu-el text="monospace">[drop="up"]</nu-el>
    <nu-icon as="dropdown-icon" rotate="180deg"></nu-icon>
    <nu-popup drop="up">Popup content</nu-popup>
  </nu-btn>
  <nu-btn special>
    <nu-icon as="dropdown-icon" rotate="90deg"></nu-icon>
    <nu-el text="monospace">[drop="left"]</nu-el>
    <nu-popup drop="left">Popup content</nu-popup>
  </nu-btn>
</nu-flex>
```

## Parent overflow

You can use [drop](/reference/attributes/drop.md) attribute (which activates **Fixate Mixin**) instead of [place](/reference/attributes/place) attribute for Popups so they can ignore `overflow: hidden` on parent elements.

```nu-preview
<nu-attrs
  for="dropdown-icon"
  name="chevron-down"
  scale="^:pressed[flip-y]"
  size="1.25em"></nu-attrs>
<nu-block padding="2 bottom">
  <nu-card overflow="no" gap>
    <nu-block>
      Card with <nu-mark>overflow: hidden</nu-mark>.
    </nu-block>
    <nu-flex gap>
      <nu-btn special>
        <nu-el text="monospace">[drop="down"]</nu-el>
        <nu-icon as="dropdown-icon"></nu-icon>
        <nu-popup theme="tone" drop="down">
          Popup content
        </nu-popup>
      </nu-btn>

      <nu-btn special>
        <nu-el text="monospace">[place="outside-bottom"]</nu-el>
        <nu-icon as="dropdown-icon"></nu-icon>
        <nu-popup place="outside-bottom" theme="tone">
          Popup content
        </nu-popup>
      </nu-btn>
    </nu-flex>
  </nu-card>
</nu-block>
```

## Window overflow

Popups uses horizontal corrections to make sure they fit into the window. It works the same for [drop](/reference/mixin/fixate) and [place](/reference/attributes/place.md) positioning.

```nu-preview
<nu-attrs
  for="dropdown-icon"
  name="chevron-down"
  scale="^:pressed[flip-y]"
  size="1.25em"></nu-attrs>
<nu-block padding="3 bottom">
  <nu-pane>
    <nu-btn>
      <nu-icon as="dropdown-icon"></nu-icon>
      <nu-popup width="16">
      Popup content
      </nu-popup>
    </nu-btn>
    <nu-btn>
      <nu-icon as="dropdown-icon"></nu-icon>
      <nu-popup width="16">
      Popup content
      </nu-popup>
    </nu-btn>
  </nu-pane>
</nu-block>
```

## Dropdown menu

You can even create dropdown menu that works exactly like you expected: The dropdown will be closed after you choose an item.

Note that Submenu's popup can't have [drop](/reference/mixin/fixate) attribute. Use [place](/reference/attributes/place.md) attribute instead.

```nu-preview
<nu-attrs
  for="dropdown-icon"
  name="chevron-down"
  scale="^:pressed[flip-y]"
  size="1.25em"></nu-attrs>
<nu-block padding="10 bottom">
  <nu-btn special>
    <nu-icon id="command-icon" name="command"></nu-icon>
    <nu-el>Menu</nu-el>
    <nu-icon as="dropdown-icon"></nu-icon>
    <nu-popupmenu fixate="bottom" width="11">
    <nu-menuitem value="first-item">Item level 1</nu-menuitem>
    <nu-menuitem>
      Submenu level 1
      <nu-popupmenu place="outside-right top">
      <nu-menuitem>Item level 2</nu-menuitem>
      <nu-menuitem>
        Submenu level 2
        <nu-popupmenu place="outside-right top">
          <nu-menuitem>Item level 3</nu-menuitem>
          <nu-menuitem>etc...</nu-menuitem>
        </nu-popupmenu>
      </nu-menuitem>
      </nu-popupmenu>
    </nu-menuitem>
    </nu-popupmenu>
  </nu-btn>
</nu-block>
```

## Popup closing

Use button with `action="close"` to close parent popup. Any other button won't have the same effect unless it's a menu.

```nu-preview
<nu-attrs
  for="dropdown-icon"
  name="chevron-down"
  scale="^:pressed[flip-y]"
  size="1.25em"></nu-attrs>
<nu-block padding="11 bottom">
  <nu-btn special>
    <nu-el text="w6">Open popup</nu-el>
    <nu-icon as="dropdown-icon"></nu-icon>
    <nu-popup gap="1x" fixate="bottom" width="initial 24 100vw">
      <nu-block>
        Button that don't close popup.
      </nu-block>
      <nu-btn>
        Simple button
      </nu-btn>
      <nu-block>
        Button that closes popup.
      </nu-block>
      <nu-btn action="close">
        Submit button
      </nu-btn>
    </nu-popup>
  </nu-btn>
</nu-block>
```
