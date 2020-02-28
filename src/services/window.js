function setTitle(title) {
  document.title = `${title ? `${title} – ` : ''} NuML`;
}

export default {
  setTitle,
};
