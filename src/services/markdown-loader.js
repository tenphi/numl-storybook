export default {
  get(name) {
    let exist = false;

    return fetch(`/pages/${name}.md`)
      .then((response) => response.text())
      .then((content) => {
        if (content.startsWith('<')) {
          throw new Error('incorrect content');
        }

        exist = true;

        return content
          .replace(/```html\n<Preview\/>\n/ig, '```nu-preview\n')
          .replace(/```html\n<Split\/>\n/ig, '```nu-splitpreview\n')
          .replace(/```html\n<Repl\/>\n/ig, '```nu-repl\n')
          .replace(/\.md\)/g, ')');
      })
      .catch(() => `## ${name}.md\n\nYet to be documented\n\n`)
      .then((content) => `${content}\n\n## Improve this page\n\n> Help us to improve this page by [sending a pull request](!https://github.com/tenphi/numl-storybook/${exist ? 'edit' : 'new'}/master/public/pages/${name}.md${exist ? '' : `?filename=${name}.md`}) for this file.`);
  },
};
