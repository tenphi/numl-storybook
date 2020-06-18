# Integration with Vue.js

Vue.js requires just a little step to use **Numl**. You should add all custom elements to the **Ignore List**.

For short, we can use Regexp:

```javascript
Vue.config.ignoredElements = [/^nu-/];
```

If you are using any other Web Components, just add them to the list.

## Event binding

There is no difference between Custom Elements
