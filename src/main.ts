import './assets/main.css';

import Vue from 'vue';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

// highlightjs
import hljs from 'highlight.js';
VMdPreview.use(githubTheme, {
  Hljs: hljs
});

const app = createApp(App);

app.use(router);
// 引入v-md-editor预览组件
app.use(VMdPreview);

app.mount('#app');
