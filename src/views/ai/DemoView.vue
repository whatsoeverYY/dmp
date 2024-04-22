<template>
  <div class="demo">
    <!--    <h2>DMP模块代码生成</h2>-->
    <div class="step-0">
      <Space direction="vertical" class="left">
        <Space class="basic-info">
          <label>请输入模块名称(CamelCase)</label>
          <Input v-model:value="moduleName" @change="changeModuleName" />
          <label>请输入模块中文名称</label>
          <Input v-model:value="moduleNameCn" @change="changeModuleNameCn" />
          <label>请输入根目录</label>
          <Input v-model:value="rootPath" @change="changeRoutePath" />
        </Space>
        <Space>
          <label>根目录:</label>
          <span>{{ rootPath }}</span>
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
          <Button type="primary" @click="tableModalVisible = true">查看表格详情</Button>
        </Space>
        <Space size="large">
          <Select
            v-model:value="modelValue"
            style="width: 250px"
            placeholder="请选择模型"
            :options="options"
            @change="handleChangeModel as any"
          />
          <div>Engine: {{ engine }}</div>
          <Input
            placeholder="请输入token"
            v-model:value="authorization"
            @change="changeAuthorization"
          />
          <Button type="primary" @click="writeBasic">写入基本信息</Button>
          <Tooltip placement="bottomRight" color="red">
            <template #title>
              <span>{{ `生成所有文件至目录: ${rootPath}` }}</span>
            </template>
            <Button :loading="loading" type="primary" @click="generateAll">一键生成</Button>
          </Tooltip>
          <Progress v-if="progress" :percent="progress" status="active" />
        </Space>
        <Space v-if="totalUsage.total_tokens">
          <div>prompt token总计：{{ totalUsage.completion_tokens }}</div>
          <div>completion token总计：{{ totalUsage.prompt_tokens }}</div>
          <div>token总计：{{ totalUsage.total_tokens }}</div>
        </Space>
        <div v-if="retryArr.length">
          错误步骤序号：{{ retryArr.map((ele) => ele + 1).join('、') }}
        </div>
      </Space>
    </div>
    <div class="steps">
      <GenerateSteps
        :module-name="moduleName"
        :module-name-cn="moduleNameCn"
        :table-value="tableValue"
        :detail-value="detailValue"
        :search-value="searchValue"
        :model-value="modelValue"
        :authorization="authorization"
        :engine="engine"
        :token="token"
        :root-path="rootPath"
        v-model:resultRecord="resultRecord"
      />
    </div>
    <Modal
      wrapClassName="table-modal"
      v-model:open="tableModalVisible"
      title="查看完整prompt"
      @ok="tableModalVisible = false"
      width="calc(100vw - 200px)"
    >
      <div class="table-modal-content">
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
      </div>
    </Modal>
  </div>
</template>
<script setup lang="ts">
import { camelCaseToUpperCaseUnderscore, deInitial, getRandomValueFromFirstColumn } from '@/utils';
import { fetchGPTResult } from '@/utils/fetchLLM';
import { writeFileIO } from '@/utils/fs';
import type { ILLMData, IUsage } from '@/utils/types';
import {
  writeFileDataType,
  writeFileDataTypeEnum,
  writeFileTypeRouter,
  writeFileTypeRouterData,
  writeFileCn
} from '@/views/ai/basic/writeBasic';
import GenerateSteps from '@/views/ai/GenerateSteps.vue';
import { usePrompts } from '@/views/ai/prompts/usePrompts';
import { ref, computed } from 'vue';
import {
  Textarea,
  Space,
  Tooltip,
  Button,
  Progress,
  message,
  Input,
  Modal,
  Select
} from 'ant-design-vue';
const moduleName = ref(localStorage.getItem('moduleName') || '');
const moduleNameCn = ref(localStorage.getItem('moduleNameCn') || '');
const rootPath = ref(localStorage.getItem('rootPath') || '');
const tableValue = ref(localStorage.getItem('tableValue') || '');
const searchValue = ref(localStorage.getItem('searchValue') || '');
const detailValue = ref(localStorage.getItem('detailValue') || '');
const modelValue = ref(localStorage.getItem('modelValue') || undefined);
const authorization = ref(localStorage.getItem('authorization') || '');
const resultRecord = ref<Record<string, string>>({});
const retryArr = ref<number[]>([]);
const engine = computed((): string => {
  return options.find((opt) => opt.value === modelValue.value)?.engine || 'azure';
});
const token = computed((): number => {
  return options.find((opt) => opt.value === modelValue.value)?.token || 4096;
});
const loading = ref(false);
const tableModalVisible = ref(false);
const progress = ref(0);
const totalUsage = ref<IUsage>({ completion_tokens: 0, prompt_tokens: 0, total_tokens: 0 });
const options = [
  { value: 'claude-3-haiku', label: 'claude-3-haiku', engine: 'anthropic' },
  { value: 'claude-3-sonnet', label: 'claude-3-sonnet', engine: 'anthropic' },
  { value: 'claude-3-opus', label: 'claude-3-opus', engine: 'anthropic' },
  { value: 'gemini-1.5-pro-preview-0409', label: 'gemini-1.5-pro-preview-0409', engine: 'google' },
  { value: 'gpt-3.5-turbo', label: 'gpt-3.5-turbo', engine: 'azure', token: 4096 },
  { value: 'gpt-3.5-turbo-16k', label: 'gpt-3.5-turbo-16k', engine: 'azure' },
  { value: 'gpt-4', label: 'gpt-4', engine: 'azure' },
  { value: 'gpt-4-turbo', label: 'gpt-4-turbo', engine: 'openai' }
];
const { steps } = usePrompts({
  moduleName: moduleName.value,
  moduleNameCn: moduleNameCn.value,
  detailValue: detailValue.value,
  searchValue: searchValue.value,
  tableValue: tableValue.value
});
const changeModuleName = (e: any) => {
  moduleName.value = e.target.value;
  localStorage.setItem('moduleName', e.target.value);
};
const changeModuleNameCn = (e: any) => {
  moduleNameCn.value = e.target.value;
  localStorage.setItem('moduleNameCn', e.target.value);
};
const changeRoutePath = (e: any) => {
  rootPath.value = e.target.value;
  localStorage.setItem('rootPath', e.target.value);
};
const changeTableValue = (e: any) => {
  tableValue.value = e.target.value;
  localStorage.setItem('tableValue', e.target.value);
};
const changeSearchValue = (e: any) => {
  searchValue.value = e.target.value;
  localStorage.setItem('searchValue', e.target.value);
};
const changeDetailValue = (e: any) => {
  detailValue.value = e.target.value;
  localStorage.setItem('detailValue', e.target.value);
};
const changeAuthorization = (e: any) => {
  authorization.value = e.target.value;
  localStorage.setItem('authorization', e.target.value);
};
const handleChangeModel = (value: string) => {
  modelValue.value = value;
  localStorage.setItem('modelValue', value);
};
const allWithProgress = (requests: Promise<any[]>[], callback: () => void) => {
  requests.forEach((item) => {
    item.then(() => {
      callback();
    });
  });
  return Promise.all(requests);
};
const generateAll = () => {
  const step = Math.floor(100 / steps.length);
  const start = 100 - step * steps.length;
  if (!rootPath.value) {
    alert('请输入根目录');
    return;
  }
  if (!moduleName.value) {
    alert('请输入模块名称');
    return;
  }
  if (!tableValue.value || !searchValue.value || !detailValue.value) {
    alert('请输入所有表格信息');
    return;
  }
  loading.value = true;
  progress.value = start - 1;
  const addUpUsage = (usageCur: IUsage, usageNew: IUsage[]) => {
    return {
      completion_tokens:
        usageCur.completion_tokens + usageNew.reduce((acc, cur) => acc + cur.completion_tokens, 0),
      prompt_tokens:
        usageCur.prompt_tokens + usageNew.reduce((acc, cur) => acc + cur.prompt_tokens, 0),
      total_tokens: usageCur.total_tokens + usageNew.reduce((acc, cur) => acc + cur.total_tokens, 0)
    };
  };
  /**
   * 添加重试机制
   * 重试3次，三次后仍有问题则给出提示
   */
  const getStepsFetch = (stepsArr: number[]) => {
    const allStep = stepsArr.map((index) => {
      const prompts = steps[index]?.promptGenerator?.() as string[];
      const promiseArr = prompts.map((ele) =>
        fetchGPTResult(authorization.value, engine.value, {
          message: ele,
          model: modelValue.value,
          max_tokens: token.value
        })
      );
      return Promise.all(promiseArr);
    });
    return allStep;
  };
  const allStepsArr = Array.from({ length: steps.length }, (_, index) => index);
  const allStep = getStepsFetch(allStepsArr);
  const handleReturn = (res: ILLMData[], index: number, otherFn?: (text: string) => void) => {
    const text = `${res.map((ele) => ele.code).join('\n\n')}`;
    const messages = `${res.map((ele) => ele.message).join('\n\n')}`;
    totalUsage.value = addUpUsage(
      totalUsage.value,
      res.map((ele) => ele.usage)
    );
    resultRecord.value = {
      ...resultRecord.value,
      [`${index}`]: messages
    };
    const filepath = `${rootPath.value}${steps[index].filePath()}`;
    const filename = steps[index].fileName();
    otherFn?.(text);
    return writeFileIO(text, filepath, filename);
  };
  allWithProgress(allStep, () => {
    progress.value += step;
  }).then(
    (resArr) => {
      resArr.map((res, index) => {
        const checkFn = (text: string) => {
          const afterGenerateCheck = steps[index].afterGenerateCheck;
          if (afterGenerateCheck && !afterGenerateCheck(text)) {
            retryArr.value.push(index);
          }
        };
        handleReturn(res, index, checkFn);
      });
      message.success('生成成功');
      progress.value = 100;
      loading.value = false;
      // if (retryArr.value.length) {
      //   message.warning(
      //     `一键生成成功，存在${retryArr.value.length}个文件内容有误，正在重新生成，请稍后`
      //   );
      //   const retryPromises = getStepsFetch(retryArr.value);
      //   Promise.all(retryPromises).then((retryRes) => {
      //     retryRes.map((retry, retryIndex) => {
      //       const retryResult = retry as ILLMData[];
      //       const stepIndex = retryArr.value[retryIndex];
      //       handleReturn(retryResult, stepIndex);
      //     });
      //     message.success('重试成功');
      //     progress.value = 100;
      //     loading.value = false;
      //   });
      // } else {
      //   message.success('生成成功');
      //   progress.value = 100;
      //   loading.value = false;
      // }
    },
    (err) => {
      alert(`请求失败: ${err}`);
      loading.value = false;
    }
  );
};

const writeBasic = () => {
  const ModuleName = moduleName.value;
  const MODULE_NAME = camelCaseToUpperCaseUnderscore(ModuleName);
  const moduleN = deInitial(moduleName.value);
  const dataType = `${MODULE_NAME} = '${ModuleName}'`;
  const dataTypeEnum = `[E_DATA_TYPE.${MODULE_NAME}]: new DataTypeEnum(
    E_DATA_TYPE.${MODULE_NAME},
    '${moduleNameCn.value}',
    '${moduleN}Id'
  )`;
  const typeRouter = `/* ------------------------------------------------- ${moduleNameCn.value} ------------------------------------------------ */
  ${MODULE_NAME} = '${MODULE_NAME}',
  ${MODULE_NAME}_LIST = '${MODULE_NAME}_LIST',
  ${MODULE_NAME}_DETAIL = '${MODULE_NAME}_DETAIL',
  ${MODULE_NAME}_EDIT = '${MODULE_NAME}_EDIT',
  ${MODULE_NAME}_EDIT_LIST = '${MODULE_NAME}_EDIT_LIST',
  ${MODULE_NAME}_RECYCLE_BIN = '${MODULE_NAME}_RECYCLE_BIN',`;
  const typeRouterParams = `${MODULE_NAME}_ID = 'id',`;

  const routerDataImport = `import { ${ModuleName}Routes } from './${moduleN}';`;
  const routerDataValue = `    ${ModuleName}Routes`;

  const cnValue = `      ${moduleN}: '转化医学',`;

  const promiseArr = [
    writeFileDataType({
      filepath: `${rootPath.value}/types/DataType.ts`,
      content: dataType,
      start: 'export enum E_DATA_TYPE {'
    }),
    writeFileDataTypeEnum({
      filepath: `${rootPath.value}/utils/dataType.ts`,
      content: dataTypeEnum,
      start: 'export const DATA_TYPE_ENUM = {'
    }),
    writeFileTypeRouter({
      filepath: `${rootPath.value}/type/router.ts`,
      content: [typeRouter, typeRouterParams],
      start: ['export const enum E_ROUTER_NAME {', 'export const enum E_ROUTER_PARAMS {']
    }),
    writeFileTypeRouterData({
      filepath: `${rootPath.value}/router/data/index.ts`,
      content: [routerDataImport, routerDataValue],
      start: ['/** inject import here */', '/** inject routes here  */']
    }),
    writeFileCn({
      filepath: `${rootPath.value}/locales/cn.ts`,
      content: [cnValue],
      start: ['/** inject here 勿删, 占位符 */']
    })
  ];
  Promise.all(promiseArr).then(() => {
    message.success('基本信息写入成功');
  });
};
</script>

<style>
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
      .ant-progress {
        width: 300px;
      }
      .details {
        td {
          white-space: nowrap;
        }
      }
    }
  }
  .steps {
    margin-top: 20px;
  }
}
.table-modal {
  .table-modal-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    h3 {
      text-align: center;
    }
  }
}
</style>
