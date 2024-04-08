<template>
  <Space>
    <Button :disabled="current === 0" type="primary" @click="current--">上一步</Button>
    <Button :disabled="current >= items.length - 1" type="primary" @click="current++"
      >下一步</Button
    >
  </Space>
  <div class="generate">
    <Steps
      class="generate-steps"
      direction="vertical"
      v-model:current="current"
      :items="items"
    ></Steps>
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
        :disabled="!moduleName"
        type="primary"
        @click="() => openPromptModal(items[current].promptGenerator)"
        >查看完整prompt</Button
      >
      <Button
        class="generate-content-info"
        :disabled="!moduleName"
        type="primary"
        :loading="loading"
        @click="() => generate(items[current].promptGenerator)"
        >开始生成</Button
      >
      <Button
        :disabled="!returnResult[String(current)]"
        class="generate-content-info"
        type="primary"
        @click="() => downloadFile(current, items[current].fileName?.())"
        >下载文件</Button
      >
    </div>
    <div class="result" v-if="returnResult[String(current)]">
      <highlightjs language="typescript" :code="returnResult[String(current)]" />
    </div>
    <Modal
      wrapClassName="prompt-modal"
      v-model:open="modalVisible"
      title="查看完整prompt"
      @ok="modalVisible = false"
    >
      <p class="prompt-modal-info">{{ items[current].promptGenerator?.().join('\n\n') }}</p>
    </Modal>
  </div>
</template>
<script setup lang="ts">
import { apiPrompt } from '@/views/ai/prompts/apiPrompts';
import { entityPrompts } from '@/views/ai/prompts/entityPrompts';
import { enumPrompt } from '@/views/ai/prompts/enumPrompts';
import { servicePrompt } from '@/views/ai/prompts/servicePrompts';
import { transformPrompts } from '@/views/ai/prompts/transformPrompts';
import { typePrompt } from '@/views/ai/prompts/typePrompts';
import { Steps, Button, Space, Modal } from 'ant-design-vue';
import { isArray } from 'ant-design-vue/es/_util/util';
import { ref, computed } from 'vue';
const props = defineProps<{
  moduleName: string;
  tableValue: string;
  searchValue: string;
  detailValue: string;
}>();
const initial = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
const deInitial = (str: string) => {
  return str.charAt(0).toLowerCase() + str.slice(1);
};
const replaceStr = (str: string) => {
  return str.replace('\\n', '\n');
};
const current = ref<number>(0);
const modalVisible = ref(false);
const variablePrompt = computed(() => `name=${props.moduleName}`);
const returnResult = ref<Record<string, string>>({});
const loading = ref(false);
const getTablePrompt = (type: string) => {
  let resTable = '';
  if (type === 'table') {
    resTable = props.tableValue;
  }
  if (type === 'search') {
    resTable = props.searchValue;
  }
  if (type === 'detail') {
    resTable = props.detailValue;
  }
  return `\n\n${resTable}`;
};
const generatePrompt = (prompt: Array<{ prompt: string; tableType: string }> | string) => {
  if (isArray(prompt)) {
    return prompt.map(
      (ele) => `${ele.prompt}${variablePrompt.value}${getTablePrompt(ele.tableType)}`
    );
  } else {
    return [`${prompt}${variablePrompt.value}`];
  }
};
const items = ref([
  {
    key: 'step1',
    title: '生成类型定义',
    fileName: () => `${props.moduleName}Type.ts`,
    filePath: () => `/types/${props.moduleName}Type.ts`,
    basePrompt: typePrompt,
    promptGenerator: () => {
      if (!props.tableValue) {
        alert('请填写列表字段表格信息');
        return '';
      }
      if (!props.searchValue) {
        alert('请填写检索字段表格信息');
        return '';
      }
      return generatePrompt(typePrompt);
    }
  },
  {
    key: 'step2',
    title: '生成entity',
    fileName: () => `entity.ts`,
    filePath: () => `/domains/${deInitial(props.moduleName)}Domain/entity.ts`,
    basePrompt: entityPrompts,
    promptGenerator: () => {
      if (!props.tableValue) {
        alert('请填写列表字段表格信息');
        return '';
      }
      return generatePrompt(entityPrompts);
    }
  },
  {
    key: 'step3',
    title: '生成enum',
    fileName: () => `enum.ts`,
    filePath: () => `/domains/${deInitial(props.moduleName)}Domain/enum.ts`,
    basePrompt: enumPrompt,
    promptGenerator: () => {
      if (!props.tableValue) {
        alert('请填写列表字段表格信息');
        return '';
      }
      if (!props.searchValue) {
        alert('请填写检索字段表格信息');
        return '';
      }
      if (!props.detailValue) {
        alert('请填写详情字段表格信息');
        return '';
      }
      return generatePrompt(enumPrompt);
    }
  },
  {
    key: 'step4',
    title: '生成transform',
    fileName: () => `transform.ts`,
    filePath: () => `/domains/${deInitial(props.moduleName)}Domain/transform.ts`,
    basePrompt: transformPrompts,
    promptGenerator: () => {
      if (!props.searchValue) {
        alert('请填写检索字段表格信息');
        return '';
      }
      return generatePrompt(transformPrompts);
    }
  },
  {
    key: 'step5',
    title: '生成api',
    fileName: () => `${deInitial(props.moduleName)}.ts`,
    filePath: () => `/apis/${deInitial(props.moduleName)}.ts`,
    basePrompt: apiPrompt,
    promptGenerator: () => {
      return generatePrompt(apiPrompt);
    }
  },
  {
    key: 'step6',
    title: '生成service',
    fileName: () => `service.ts`,
    filePath: () => `/domains/${deInitial(props.moduleName)}Domain/service.ts`,
    basePrompt: servicePrompt,
    promptGenerator: () => {
      return generatePrompt(servicePrompt);
    }
  }
]);
const openPromptModal = (gebPrompt?: () => string[] | '') => {
  const prompt = gebPrompt?.();
  if (!prompt) {
    return false;
  }
  modalVisible.value = true;
};
const fetchGPTResult = async (prompt: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fetch('http://rd-gateway.patsnap.info/compute/openai_chatgpt_turbo', {
      method: 'POST',
      headers: {
        Authorization: 'Basic Y2hlbnlpbnlpbmc6eURWMlh1eXVCM1VjSlhEdXVhM3hFaA=='
      },
      body: JSON.stringify({ message: prompt, temperature: 0.1, model: 'gpt-3.5-turbo-16k' })
    })
      .then((response) => response.json())
      .then((data) => {
        resolve(data.data.message);
      });
  });
};
const generate = (gebPrompt?: () => string[] | '') => {
  const prompt = gebPrompt?.();
  if (!prompt) {
    return false;
  }
  loading.value = true;
  returnResult.value = {
    ...returnResult.value,
    [String(current.value)]: ''
  };
  if (isArray(prompt)) {
    const promiseArr = prompt.map((ele) => fetchGPTResult(ele));
    Promise.all(promiseArr).then((resArr) => {
      returnResult.value = {
        ...returnResult.value,
        [String(current.value)]: resArr.join('\n\n')
      };
      loading.value = false;
    });
  } else {
    fetchGPTResult(prompt).then((res: string) => {
      returnResult.value = {
        ...returnResult.value,
        [String(current.value)]: res
      };
      loading.value = false;
    });
  }
};

const downloadFile = (current: number, filename: string) => {
  const text = returnResult.value[String(current)];
  const blob = new Blob([text], { type: 'text/plain' });
  const href = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = href;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(href);
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
.result {
  width: 60%;
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
.prompt-modal .ant-modal .ant-modal-content {
}
.prompt-modal-info {
  white-space: break-spaces;
}
</style>
