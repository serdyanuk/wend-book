import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import store from "@/store";
import { Howler } from "howler";

Howler.volume(0.3);

const app = createApp(App);
app.use(router);
app.use(store);

app.mount("#app");
