import { createApp } from 'vue';

import App from '@/App.vue';
import router from '@/router';
import pinia from '@/stores';
import '@/shared/styles/main.css';

export function bootstrap() {
  return createApp(App).use(pinia).use(router);
}
