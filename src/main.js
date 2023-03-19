
import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

import VueResource from 'vue-resource';
Vue.use(VueResource);

import VueTouchEvents from 'vue2-touch-events';
Vue.use(VueTouchEvents);

import GetTextPlugin from 'vue-gettext'
import translations from './locale'
Vue.use(GetTextPlugin, {
  translations,
  availableLanguages: {
    hu_HU: 'Magyar',
    en_US: 'English (United States)',
  },
  defaultLanguage: 'hu_HU',
});

import MixinEnvironmentUrl from './mixins/environmentUrl';
Vue.mixin(MixinEnvironmentUrl);
import MixinNiceDate from './mixins/niceDate';
Vue.mixin(MixinNiceDate);
import MixinSpaceThousands from './mixins/spaceThousands';
Vue.mixin(MixinSpaceThousands);

Vue.config.productionTip = false;

//import { createPinia, PiniaVuePlugin } from 'pinia'

//Vue.use(PiniaVuePlugin)

new Vue({
  router,
  store,
//  pinia: createPinia(),
  render: (h) => h(App)
}).$mount('#app')
