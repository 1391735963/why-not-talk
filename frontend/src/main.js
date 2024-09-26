import { createApp } from "vue";
import App from "./App.vue";
import "./assets/global.less";
import components from "./components/global";
import Router from "./router/index";
import { createPinia } from "pinia";
import "ant-design-vue/dist/reset.css";

const pinia = createPinia();
const app = createApp(App);
app.config.productionTip = false;

// components
for (const i in components) {
  app.component(i, components[i]);
}

app.use(Router).use(pinia).mount("#app");
