import Lockr from 'lockr';
import { setContrast, setReducedMotion, setScheme } from './global';

export const DEFAULT_OPTIONS = {
  themeType: 'main',
  hue: 272,
  pastel: false,
  saturation: 80,
  saturationType: 'auto',
  gap: 0.5,
  borderWidth: 1,
  radius: 0.5,
  animationTime: 0.08,
  scheme: 'auto',
  contrast: 'auto',
  reducedMotion: 'auto',
};

export default {
  get() {
    return Object.keys(DEFAULT_OPTIONS)
      .reduce((params, key) => {
        params[key] = Lockr.get(`numl:${key}`) || DEFAULT_OPTIONS[key];

        return params;
      }, {});
  },
};

export function setGlobalSettings({
  scheme, contrast, reducedMotion,
} = {}) {
  setScheme(scheme || Lockr.get('numl:scheme') || 'auto');
  setContrast(contrast || Lockr.get('numl:contrast') || 'auto');
  setReducedMotion(reducedMotion || Lockr.get('numl:reducedMotion') || 'auto');
}
