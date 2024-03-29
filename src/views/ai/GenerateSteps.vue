<template>
  <Space>
    <Button :disabled="current === 0" type="primary" @click="current--">上一步</Button>
    <Button :disabled="current >= items.length - 1" type="primary" @click="current++"
      >下一步</Button
    >
  </Space>
  <div class="generate">
    <Steps class="generate-steps" direction="vertical" :current="current" :items="items"></Steps>
    <div class="generate-content">
      <div class="generate-content-info">
        <label>文件名称:</label>
        <div class="generate-content-top-name">{{ items[current].fileName?.() }}</div>
      </div>
      <div class="generate-content-info">
        <label>文件路径:</label>
        <div class="generate-content-top-name">{{ items[current].filePath?.() }}</div>
      </div>
      <Button
        class="generate-content-info"
        :disabled="!moduleName || !tableValue"
        type="primary"
        @click="() => generate(items[current].prompt)"
        >开始生成</Button
      >
    </div>
  </div>
</template>
<script setup lang="ts">
import { typePrompt } from '@/views/ai/constants';
import { Steps, Button, Space } from 'ant-design-vue';
import { ref, computed } from 'vue';
const props = defineProps<{
  moduleName: string;
  tableValue: string;
}>();
const initial = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
const deInitial = (str: string) => {
  return str.charAt(0).toLowerCase() + str.slice(1);
};
const current = ref<number>(0);
const variablePrompt = computed(() => `name=${props.moduleName}`);
const returnResult = ref({});
const items = ref([
  {
    key: 'step1',
    title: '生成类型定义',
    fileName: () => `${props.moduleName}Type.ts`,
    filePath: () => `/types/${props.moduleName}Type.ts`,
    prompt: () => `${typePrompt}${variablePrompt.value}\n${props.tableValue}`
  },
  {
    key: 'step2',
    title: '生成entity',
    fileName: () => `entity.ts`,
    filePath: () => `/domains/${deInitial(props.moduleName)}Domain/entity.ts`
  },
  {
    key: 'step3',
    title: '生成enum',
    fileName: () => `enum.ts`,
    filePath: () => `/domains/${deInitial(props.moduleName)}Domain/enum.ts`
  }
]);
const generate = (prompt: () => string) => {
  console.log('Type', prompt());
  // fetch('http://rd-gateway.patsnap.info/compute/openai_chatgpt_turbo', {
  //   method: 'POST',
  //   headers: {
  //     Authorization: 'Basic Y2hlbnlpbnlpbmc6eURWMlh1eXVCM1VjSlhEdXVhM3hFaA=='
  //   },
  //   body: JSON.stringify({ message: prompt })
  // })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log('Success:', data);
  //     returnResult.value = {
  //       ...returnResult.value,
  //       [current.value]: data
  //     };
  //   });
};
</script>

<style>
.generate {
  display: flex;
  margin-top: 32px;
  gap: 32px;
}
.generate-steps {
  width: 20%;
}

.generate-content-info {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}
.generate-content-top-name {
  font-weight: bold;
}
</style>
