import '../public/numl/numl.dev';
import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import './services/numl';
import './elements/nu-preview';
import './elements/nu-repl';

Vue.config.productionTip = false;

const { Nude } = window;

Nude.elements.NuActiveElement.nuNavigate = (url, openNewTab) => {
  // skip outside links and links that open in new tabs
  if (url === '/' || openNewTab || url.startsWith('https://') || url.includes('//') || url.startsWith('mailto:') || url.includes('/api/')) {
    return true;
  }

  router.push(url);

  return false;
};

Vue.config.ignoredElements = [/^nu-/];

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
