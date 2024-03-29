import './assets/main.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

/*黑色主题*/
// import 'highlight.js/styles/atom-one-dark.css';
/*白色主题*/
import 'highlight.js/styles/stackoverflow-light.css';
import hljsCore from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import hljsVuePlugin from '@highlightjs/vue-plugin';
hljsCore.registerLanguage('javascript', javascript);

// highlightjs
import hljs from 'highlight.js';
VMdPreview.use(githubTheme, {
  Hljs: hljs
});

const app = createApp(App);

app.use(router);
// 引入v-md-editor预览组件
app.use(VMdPreview);
app.use(hljsVuePlugin);

app.mount('#app');
