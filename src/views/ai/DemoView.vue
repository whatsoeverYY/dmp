<template>
  <div class="demo">
    <h1>DMP模块代码生成</h1>
    <div class="step-0">
      <Space direction="vertical" class="left">
        <Space>
          <label>请输入模块名称(CamelCase)</label>
          <Input v-model:value="moduleName" @change="changeModuleName" />
        </Space>
        <Space>
          <label>请输入表格信息</label>
          <Textarea v-model:value="tableValue" @change="changeTableValue" />
        </Space>
      </Space>
      <details>
        <summary>查看输入详情</summary>
        <h2>{{ moduleName }}</h2>
        <v-md-preview :text="tableValue" height="400px"></v-md-preview>
      </details>
    </div>
    <div class="steps">
      <GenerateSteps :module-name="moduleName" :table-value="tableValue" />
    </div>
    <!--    <Button>Add</Button>-->
    <!--    <Switch v-model:checked="checked" />-->
    <!--    <v-md-preview :text="text" height="400px"></v-md-preview>-->
    <!--    <highlightjs language="typescript" :code="code" />-->
  </div>
</template>
<script setup lang="ts">
import GenerateSteps from '@/views/ai/GenerateSteps.vue';
import { ref } from 'vue';
import { Textarea, Space } from 'ant-design-vue';
const moduleName = ref('');
const tableValue = ref('');
const changeModuleName = (e: any) => {
  moduleName.value = e.target.value;
};
const changeTableValue = (e: any) => {
  tableValue.value = e.target.value;
};
const text = ref('');
const code = ref('');
</script>

<style>
@media (min-width: 1024px) {
  .demo {
    height: 100%;
    h1,
    h2 {
      text-align: center;
    }
    .step-0 {
      display: flex;
      gap: 32px;
      padding-bottom: 16px;
      border-bottom: 1px solid #f0f0f0;
      .left {
        width: 30%;
      }
    }
    .steps {
      margin-top: 32px;
    }
  }
}
</style>
