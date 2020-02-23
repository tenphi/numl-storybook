Abstraction over `z-index` style. Accepts modifier or integer value.

## Modifiers

* **above** – place element above. (`z-index: 1`)
* **below** – place element below.  (`z-index: 10`)
* **front** – place element to the front of other elements including those with **above** modifier.  (`z-index: -1`)
* **back** – place element to the back of other elements including those with **below** modifier. (`z-index: -10`)

## Example

```preview
<nu-flex items="center">
    <nu-card theme="red swap" z="above" move="50% 0" height="3">
        [z="above"]
    </nu-card>

    <nu-card theme="blue swap">
        No [z] attribute
    </nu-card>
</nu-flex>
```
