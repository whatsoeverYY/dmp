<script setup lang="ts">
import { Button } from 'ant-design-vue';
import { ref } from 'vue';

const tableStr = ref('');
const excelStr =
  '数据库 Field 名称\t字段名称\t数据类型\n' +
  'translational_medicine_id\t转化医学ID\tString\n' +
  'ct_result_id\t临床结果ID\tString\n' +
  'title\t标题\tString\n' +
  'title_translation\t标题翻译\tString\n' +
  'source_info\t来源信息\tBaseCodeItemV2[]\n' +
  'summary_en\t英文亮点\tString[]\n' +
  'summary_cn\t中文亮点\tString[]\n' +
  'subject\t主题/标签\tBaseNormalizedNameInfo[]\n' +
  'translation_stage\t转化阶段\tBaseNormalizedNameInfo[]\n' +
  'pub_dt\t发表日期\tString\n' +
  'drug\t药物\tBaseNormalizedNameInfo[]\n' +
  'target\t靶点\tBaseNormalizedNameInfo[]\n' +
  'biomarker\t生物标志物\tBaseNormalizedNameInfo[]\n' +
  'disease\t适应症\tBaseNormalizedNameInfo[]\n' +
  'technology\t技术\tBaseNormalizedNameInfo[]\n' +
  'research_sponsor\t研发机构\tBaseNormalizedNameInfo[]';
const convert = () => {
  console.log('convert');
  const formData = new FormData();
  formData.append('data', excelStr);
  fetch('https://api.tableconvert.com/convert/excel-to-markdown', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer 1CL3Ir2l5GlNUGLDIhGtOTPilBzj7qWR'
    },
    body: formData
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('data', data);
      tableStr.value = data.data;
    });
};
</script>
<template>
  <main>
    <nav>
      <RouterLink to="/demo">AI demo</RouterLink>
    </nav>
    <Button @click="convert">convert</Button>
    <v-md-preview v-if="tableStr" :text="tableStr" height="400px"></v-md-preview>
  </main>
</template>
