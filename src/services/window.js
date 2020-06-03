function setTitle(title) {
  document.title = `${title ? `${title} – ` : ''} Numl`;
}

export default {
  setTitle,
};
