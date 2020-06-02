export default {
  get(name) {
    return fetch(`/pages/${name}.md`)
      .then((response) => response.text())
      .then((content) => {
        if (content.startsWith('<')) {
          throw new Error('incorrect content');
        }

        return content
          .replace(/```html\n<Preview\/>\n/ig, '```nu-preview\n')
          .replace(/```html\n<Split\/>\n/ig, '```nu-splitpreview\n')
          .replace(/```html\n<Repl\/>\n/ig, '```nu-repl\n')
          .replace(/\.md\)/g, ')');
      })
      .catch(() => `## ${name}.md\n\nYet to be documented`);
  },
};
