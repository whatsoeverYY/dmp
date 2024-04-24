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
        <span class="generate-content-top-name">{{ items[current].filePath?.() }}</span>
      </div>
      <Button
        class="generate-content-button"
        :disabled="!moduleName"
        type="primary"
        @click="() => openPromptModal(items[current].promptGenerator)"
        >查看完整prompt</Button
      >
      <Button
        class="generate-content-button"
        :disabled="!moduleName"
        type="primary"
        :loading="loading"
        @click="() => generate(items[current].promptGenerator)"
        >开始生成</Button
      >
      <Button
        :disabled="!resultRecord[String(current)]"
        class="generate-content-button"
        type="primary"
        @click="() => downloadFile(current, items[current].fileName?.())"
        >下载文件</Button
      >
      <Button
        :disabled="!resultRecord[String(current)]"
        class="generate-content-button"
        type="primary"
        @click="() => writeFile(current, items[current].fileName?.(), items[current].filePath?.())"
        >写入系统</Button
      >
    </div>
    <div class="result" v-if="resultRecord[String(current)]">
      <div v-if="resultRecord[String(current)]?.errorMessage">
        {{ resultRecord[String(current)]?.errorMessage }}
      </div>
      <highlightjs
        v-if="resultRecord[String(current)]?.messages"
        language="typescript"
        :code="resultRecord[String(current)]?.messages"
      />
    </div>
    <Modal
      wrapClassName="prompt-modal"
      v-model:open="modalVisible"
      title="查看完整prompt"
      @ok="modalVisible = false"
    >
      <p class="prompt-modal-info">
        {{ (items[current].promptGenerator?.() || ['']).join('\n\n') }}
      </p>
    </Modal>
  </div>
</template>
<script setup lang="ts">
import { fetchGPTResult } from '@/utils/fetchLLM';
import { writeFileIO } from '@/utils/fs';
import { usePrompts } from '@/views/ai/usePrompts';
import { Steps, Button, Space, Modal, message } from 'ant-design-vue';
import { ref, computed } from 'vue';
const props = defineProps<{
  moduleName: string;
  moduleNameCn: string;
  tableValue: string;
  searchValue: string;
  detailValue: string;
  modelValue: string;
  authorization: string;
  engine: string;
  token: number;
  rootPath: string;
  resultRecord: Record<string, { messages: string; errorMessage?: string }>;
}>();
const emit = defineEmits(['update:resultRecord']);
const current = ref<number>(0);
const modalVisible = ref(false);
const loading = ref(false);
const { steps: items } = usePrompts(props);
const openPromptModal = (gebPrompt?: () => string[] | '') => {
  const prompt = gebPrompt?.();
  if (!prompt) {
    return false;
  }
  modalVisible.value = true;
};
const generate = (genPrompt?: () => string[] | '') => {
  const prompt = genPrompt?.();
  if (!prompt) {
    return false;
  }
  loading.value = true;
  emit('update:resultRecord', {
    ...props.resultRecord,
    [String(current.value)]: { messages: '' }
  });
  const promiseArr = prompt.map((ele) =>
    fetchGPTResult(props.authorization, props.engine, {
      message: ele,
      model: props.modelValue,
      max_tokens: props.token
    })
  );
  Promise.all(promiseArr).then(
    (resArr) => {
      const messages = `${resArr.map((ele) => ele.code).join('\n\n')}`;
      const checkResult = items[current.value]?.afterGenerateCheck?.(messages);
      emit('update:resultRecord', {
        ...props.resultRecord,
        [String(current.value)]: { messages, errorMessage: checkResult }
      });
      loading.value = false;
    },
    (err) => {
      alert(`请求失败: ${err}`);
      loading.value = false;
    }
  );
};

const downloadFile = (current: number, filename: string) => {
  const text = props.resultRecord[String(current)]?.messages;
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

const writeFile = (current: number, filename: string, filepath: string) => {
  const text = props.resultRecord[String(current)]?.messages;
  writeFileIO(text, `${props.rootPath}${filepath}`, filename).then(() => {
    message.success('写入成功');
  });
};
</script>

<style>
.generate {
  display: flex;
  margin-top: 20px;
  gap: 32px;
}
.generate-steps {
  height: 100%;
  width: 15%;
}
.generate-content {
  width: 20%;
}
.result {
  width: 65%;
  div {
    color: red;
  }
}

.generate-content-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 16px;
  overflow: hidden;
}
.generate-content-button {
  display: flex;
  margin-bottom: 16px;
}
.generate-content-info label {
  flex-shrink: 0;
}
.generate-content-top-name {
  font-weight: bold;
  width: 100%;
  word-wrap: break-word;
}
.prompt-modal .ant-modal .ant-modal-content {
}
.prompt-modal-info {
  white-space: break-spaces;
}
</style>
