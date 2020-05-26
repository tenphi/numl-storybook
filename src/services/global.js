const html = document.querySelector('html');
const { dataset } = html;

export function setScheme(type) {
  switch (type) {
    case 'light':
      dataset.nuScheme = 'light';
      break;
    case 'dark':
      dataset.nuScheme = 'dark';
      break;
    default:
      delete dataset.nuScheme;
  }
}

export function setContrast(type) {
  switch (type) {
    case 'high':
      dataset.nuContrast = 'high';
      break;
    case 'normal':
      dataset.nuContrast = 'normal';
      break;
    default:
      delete dataset.nuContrast;
  }
}

export function setReducedMotion(type) {
  delete dataset.nuReduceMotion;

  switch (type) {
    case 'yes':
      dataset.nuReduceMotion = '';
      break;
    default:
      delete dataset.nuReduceMotion;
  }
}
