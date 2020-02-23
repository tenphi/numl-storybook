const html = document.querySelector('html');

const LIGHT_SCHEME = 'nu-scheme-light';
const DARK_SCHEME = 'nu-scheme-dark';
const HIGH_CONTRAST = 'nu-contrast-high';
const LOW_CONTRAST = 'nu-contrast-low';
const REDUCE_MOTION = 'nu-reduce-motion';

export function clearSchemeSwitch() {
  [LIGHT_SCHEME, DARK_SCHEME]
    .forEach((cls) => html.classList.remove(cls));
}

export function clearContrastSwitch() {
  [HIGH_CONTRAST, LOW_CONTRAST]
    .forEach((cls) => html.classList.remove(cls));
}

export function clearReducedMotionSwitch() {
  [REDUCE_MOTION]
    .forEach((cls) => html.classList.remove(cls));
}

export function setScheme(type) {
  clearSchemeSwitch();

  switch (type) {
    case 'light':
      html.classList.add(LIGHT_SCHEME);
      break;
    case 'dark':
      html.classList.add(DARK_SCHEME);
      break;
    default:
  }
}

export function setContrast(type) {
  clearContrastSwitch();

  switch (type) {
    case 'high':
      html.classList.add(HIGH_CONTRAST);
      break;
    case 'normal':
      html.classList.add(LOW_CONTRAST);
      break;
    default:
  }
}

export function setReducedMotion(type) {
  clearReducedMotionSwitch();

  switch (type) {
    case 'yes':
      html.classList.add(REDUCE_MOTION);
      break;
    default:
  }
}
