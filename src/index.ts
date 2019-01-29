import Vue from 'vue';
import Main from './components/Main.vue';

var main = new Main();

window.addEventListener("load", _ => {
  main.$mount("#app");
});
