<template>
  <div class="demo">
    <h2>DMP模块代码生成</h2>
    <div class="step-0">
      <Space direction="vertical" class="left">
        <Space>
          <label>请输入模块名称(CamelCase)</label>
          <Input v-model:value="moduleName" @change="changeModuleName" />
        </Space>
        <Space>
          <label>请输入列表字段表格信息</label>
          <Textarea
            placeholder="列表字段表格"
            v-model:value="tableValue"
            @change="changeTableValue"
          />
          <label>请输入检索字段表格信息</label>
          <Textarea
            placeholder="检索字段表格"
            v-model:value="searchValue"
            @change="changeSearchValue"
          />
          <label>请输入详情字段表格信息</label>
          <Textarea
            placeholder="详情字段表格"
            v-model:value="detailValue"
            @change="changeDetailValue"
          />
        </Space>
        <details>
          <summary>查看表格详情</summary>
          <Space>
            <div v-if="tableValue">
              <h3>列表字段表格</h3>
              <v-md-preview :text="tableValue" height="400px"></v-md-preview>
            </div>
            <div v-if="searchValue">
              <h3>检索字段表格</h3>
              <v-md-preview :text="searchValue" height="400px"></v-md-preview>
            </div>
            <div v-if="detailValue">
              <h3>详情字段表格</h3>
              <v-md-preview :text="detailValue" height="400px"></v-md-preview>
            </div>
          </Space>
        </details>
      </Space>
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
import { Textarea, Space, Select } from 'ant-design-vue';
const moduleName = ref('');
const tableValue = ref('');
const searchValue = ref('');
const detailValue = ref('');
const changeModuleName = (e: any) => {
  moduleName.value = e.target.value;
};
const changeTableValue = (e: any) => {
  tableValue.value = e.target.value;
};
const changeSearchValue = (e: any) => {
  searchValue.value = e.target.value;
};
const changeDetailValue = (e: any) => {
  detailValue.value = e.target.value;
};
const text = ref('');
const code = ref(
  'export interface TranslationalMedicineDto extends IBaseEntityInfoV2 {' + '\n' + '}'
);
</script>

<style>
@media (min-width: 1024px) {
  .demo {
    height: 100%;
    h1,
    h2,
    h3 {
      text-align: center;
    }
    .step-0 {
      display: flex;
      gap: 32px;
      padding-bottom: 16px;
      border-bottom: 1px solid #f0f0f0;
      .left {
        width: 100%;
      }
    }
    .steps {
      margin-top: 32px;
    }
  }
}
</style>
