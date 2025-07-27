import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from '@/router';
import '@/style.css';
import App from '@/App.vue';
import clickOutside from '@/directives/clickOutside';

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.directive('click-outside', clickOutside);
app.mount('#app')