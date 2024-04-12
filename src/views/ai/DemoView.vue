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
        </Space>
        <Space size="large">
          <details class="details">
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
          <Tooltip placement="bottomRight" color="red">
            <template #title>
              <span>{{ `生成所有文件至目录: ${rootPath}` }}</span>
            </template>
            <Button :loading="loading" type="primary" @click="generateAll">一键生成</Button>
          </Tooltip>
          <Button :loading="loading" type="primary" @click="writeBasic">写入基本信息</Button>
          <Progress v-if="progress" :percent="progress" status="active" />
        </Space>
      </Space>
    </div>
    <div class="steps">
      <GenerateSteps
        :module-name="moduleName"
        :module-name-cn="moduleNameCn"
        :table-value="tableValue"
        :detail-value="detailValue"
        :search-value="searchValue"
        :root-path="rootPath"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { camelCaseToUpperCaseUnderscore, deInitial } from '@/utils';
import { fetchGPTResult } from '@/utils/fetchLLM';
import { writeFileIO } from '@/utils/fs';
import {
  writeFileDataType,
  writeFileDataTypeEnum,
  writeFileTypeRouter
} from '@/views/ai/basic/writeBasic';
import GenerateSteps from '@/views/ai/GenerateSteps.vue';
import { usePrompts } from '@/views/ai/prompts/usePrompts';
import { ref } from 'vue';
import { Textarea, Space, Tooltip, Button, Progress, message, Input } from 'ant-design-vue';
const moduleName = ref(localStorage.getItem('moduleName') || '');
const moduleNameCn = ref(localStorage.getItem('moduleNameCn') || '');
const rootPath = ref(localStorage.getItem('rootPath') || '');
const tableValue = ref(localStorage.getItem('tableValue') || '');
const searchValue = ref(localStorage.getItem('searchValue') || '');
const detailValue = ref(localStorage.getItem('detailValue') || '');
const loading = ref(false);
const progress = ref(0);
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
const allWithProgress = (requests: Promise<string[]>[], callback: () => void) => {
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
  const allStep = steps.map((ele) => {
    const prompts = ele?.promptGenerator?.() as string[];
    const promiseArr = prompts.map((ele) => fetchGPTResult(ele));
    return Promise.all(promiseArr);
  });
  allWithProgress(allStep, () => {
    progress.value += step;
  }).then((resArr) => {
    const allRes = resArr.map((ele, index) => {
      const importPhase = steps[index].importPhase?.() || '';
      const text = `${importPhase ? importPhase + '\n\n' : ''}${ele.join('\n\n')}`;
      const filepath = `${rootPath.value}${steps[index].filePath()}`;
      const filename = steps[index].fileName();
      return writeFileIO(text, `${filepath}`, filename);
    });
    Promise.all(allRes).then(() => {
      message.success('生成成功');
      progress.value = 100;
      loading.value = false;
    });
  });
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
    })
  ];
  Promise.all(promiseArr).then((ele) => {
    message.success('写入成功');
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
</style>
