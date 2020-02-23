export default {
  get(name) {
    return fetch(`/pages/${name}.md`)
      .then((response) => response.text())
      .then((content) => {
        if (content.startsWith('<')) {
          throw new Error('incorrect content');
        }

        return content;
      })
      .catch(() => `## ${name}.md\n\nYet to be documented`);
  },
};
