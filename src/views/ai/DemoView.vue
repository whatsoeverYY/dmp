<template>
  <div class="demo">
    <h1>DMP代码生成</h1>
    <v-md-preview :text="text" height="400px"></v-md-preview>
    <v-md-preview :text="text2" height="400px"></v-md-preview>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const text = ref(
  '| 字段field                   | 字段名称         | 列表展示 | 检索展示 |\n' +
    '|---------------------------|--------------|------|------|\n' +
    '| translational_medicine_id | 转化医学ID       | Yes  | Yes  |\n' +
    '| ct_result_id              | 临床结果ID       | Yes  | Yes  |\n' +
    '| title                     | 标题           | Yes  | Yes  |\n' +
    '| title_translation         | 标题翻译         | No   | No   |\n' +
    '| source_code               | 来源code       | No   | Yes  |\n'
);

const text2 = ref('const a = 6');
</script>

<style>
@media (min-width: 1024px) {
  .demo {
    min-height: 100vh;
    text-align: center;
  }
}
</style>
