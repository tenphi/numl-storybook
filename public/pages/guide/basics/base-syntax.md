# Base syntax

**NuML** is based on the so-called ==Atomic approach==. But instead of atomic classes (like in popular framework **Tailwind**) it uses attributes and allows ==any== value you provide. You can even use custom units like ==x== (default gap) for short.

## Formulate a task

Let's create a simple button from scratch. Of course, we can just use predefined element ==nu-btn==, but in **NuML** almost everything can be created using a single tag: [nu-el](../../reference/elements/nu-el.md). It's the base element that the other elements are inherited from with different defaults. So it's a good start to learn the basics:

```html
<split/>
<nu-el>Button</nu-el>
```

We see just text, 'cause by default, the element doesn't have any styling. It's time to add some.

## Add base styles

A simple button should have a border, rounded corners, and sufficient padding inside to make sure it's easy to be clicked.

```html
<split/>
<nu-el
  radius
  border
  padding>
  Button
</nu-el>
```

We add some required attributes without values. It means a default value should be used for each attribute.

Here are these defaults:

* ==border== – Border with ==1bw== width (One default border width `1px`) and default color ==#border==.
* ==radius== – ==1r== (One default radius `.5rem`).
* ==padding== – ==1x== (One default gap `.5rem`).

Values from the right are ==Custom Units==. We will learn about them later. It's built-in units that are used in **NuML**.

## Customize styles

It seems that our button is not enough internal space. We can add it by increasing a horizonal padding.

Also, it would be nice to have a ==pointer== cursor on the button:

```html
<split/>
<nu-el
  radius
  border
  padding#[[="1x 2x"]]#
  #[[cursor="pointer"]]#>
  Button
</nu-el>
```

Well, now it looks great, but it isn't interactive. :(

## Make it active

To be able to click on it we must inject ==active== behavior:

```html
<split/>
<nu-el
  radius
  border
  padding="1x 2x"
  cursor="pointer"
  #[[nx-active]]#>
  Button
</nu-el>
```

Still no interaction, huh?

## Add styles for states

We can't interact with the element, because ==active== behavior just added a new state to the button, and we didn't style it yet.

To do so, we must use attribute ==inset== (which suitable for styling the ==pressed== state) and bind it to the state:

```html
<split/>
<nu-el
  radius
  border
  padding="1x 2x"
  cursor="pointer"
  nx-active
  #[[inset="n :active[y]"]]#>
  Button
</nu-el>
```

Great! Now we can actually press the button! Try to click on the button to see the effect.

We used a definition `inset="n :active[y]"` that means:

* If element is active use value `y`.
* Otherwise, (if element is not active) use value `n`.

For the attribute ==inset==: ==y== and ==n== are shorthands that indicate whether or not to use the pressing effect.

Also we forgot to add styles for ==hover== effect. Let's fill this gap:

```html
<split/>
<nu-el
  radius
  border
  padding="1x 2x"
  cursor="pointer"
  nx-active
  inset="n :active[y]"
  #[[mark="hover"]]#>
  Button
</nu-el>
```

Now we can hover over the button to see a background change.

## Make it focusable

We made an interactive button, but still missing something very important: our button can't be focused. Let's fix it by injecting a behavior called ==focusable==. Also we should add the ==outline== attribute to style the ==focus== state:

```html
<split/>
<nu-el
  radius
  border
  padding="1x 2x"
  cursor="pointer"
  nx-active
  #[[nx-focusable]]#
  #[[outline="focus"]]#
  inset="n :active[y]"
  mark="hover">
  Button
</nu-el>
```

Well done! Now we can select our button using keyboard! Try to click on button and then press ==Space== to click the button again with keyboard.

By default, if we use `outline="focus"` style it means we need _polite focus_ for outline. The ==focus== effect will be visible while using keyboard **only**.

## Add some motion

Our button looks great but state change happens instantly. It would be nice to animate `inset` and `mark` styles, isn't it?

```html
<split/>
<nu-el
  radius
  border
  padding="1x 2x"
  cursor="pointer"
  nx-active
  nx-focusable
  outline="focus"
  inset="n :active[y]"
  mark="hover"
  #[[transition="inset, mark"]]#>
  Button
</nu-el>
```

## Make it better

Great job! We have a great button now but there is still a room for improvements. The modern web requires a little more work to make a button usable. We have to add correct role, other ARIA attributes and make sure our button emits correct events. That's why we should add ==button== behavior to our element.

```html
<split/>
<nu-el
  radius
  border
  padding="1x 2x"
  cursor="pointer"
  #[[nx-button]]#
  outline="focus"
  inset="n :active[y]"
  mark="hover"
  transition="inset, mark">
  Button
</nu-el>
```

We removed ==active== and ==focusable== behaviors 'cause ==button== will inject them automatically as they required.

## Propagate

Our button is ready, but what if we need to add more buttons to our application. It would be a mess to write so many attributes for each button. In **NuML** there is a definition element [nu-attrs](../../reference/elements/nu-attrs.md) that allows to propagate a set of attributes inside specific context. As definition is set we can use `as` attribute to use it:

```html
<split/>
<#[[nu-attrs]]#
  for="btn"
  radius
  border
  padding="1x 2x"
  cursor="pointer"
  nx-button
  outline="focus"
  inset="n :active[y]"
  mark="hover"
  transition="inset, mark">
</nu-attrs>
<nu-el #[[as="btn"]]#>
  Button
</nu-el>
```

In real application we suggest you use a [nu-btn](../../reference/elements/nu-btn.md) element as it has all needed attributes by default and includes few more perks for accessibility.

## Conclusion

Our introduction is almost over. We hope you enjoyed it. It was a simple example of how **NuML** syntax looks like.

You can learn more about specific styling attribute by looking at the **Reference Section**. In the previous example we used the following attributes:

* [radius](../../reference/attributes/radius.md)
* [size](../../reference/attributes/size.md)
* [text](../../reference/attributes/text.md)
* [outline](../../reference/attributes/outline.md)
* [transition](../../reference/attributes/transition.md)
* [cursor](../../reference/attributes/cursor.md)

You can also open pages of elements like [nu-btn](../../reference/elements/nu-btn.md) and [nu-attrs](../../reference/elements/nu-attrs.md) to learn more about their default values, behaviors, and check out examples of their usage.

Each page will give you detailed description of attribute, syntax overview, examples and links, where you can find more examples.
