import { apiPrompt } from '@/views/ai/prompts/apiPrompts';
import { entityPrompts } from '@/views/ai/prompts/entityPrompts';
import { enumPrompt } from '@/views/ai/prompts/enumPrompts';
import { localePrompts } from '@/views/ai/prompts/localePrompts';
import { routerPrompt } from '@/views/ai/prompts/routerPrompts';
import { servicePrompt } from '@/views/ai/prompts/servicePrompts';
import { transformPrompts } from '@/views/ai/prompts/transformPrompts';
import { typePrompt } from '@/views/ai/prompts/typePrompts';
import { isArray } from 'ant-design-vue/es/_util/util';
import { computed } from 'vue';

export function usePrompts(props: {
  tableValue: string;
  searchValue: string;
  detailValue: string;
  moduleName: string;
}) {
  const variablePrompt = computed(() => `name=${props.moduleName}`);
  const initial = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const deInitial = (str: string) => {
    return str.charAt(0).toLowerCase() + str.slice(1);
  };
  const replaceStr = (str: string) => {
    return str.replace('\\n', '\n');
  };
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
  const generatePrompt = (
    prompt: Array<{ prompt: string; tableType: string }> | string,
    endPrompt?: string
  ) => {
    if (isArray(prompt)) {
      return prompt.map(
        (ele) => `${ele.prompt}${variablePrompt.value}${getTablePrompt(ele.tableType)}`
      );
    } else {
      return [`${prompt}${variablePrompt.value}${endPrompt ? '\n\n' + endPrompt : ''}`];
    }
  };
  const steps = [
    {
      key: 'step1',
      title: '生成类型定义',
      fileName: () => `${props.moduleName}Type.ts`,
      filePath: () => `/types`,
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
      filePath: () => `/domains/${deInitial(props.moduleName)}Domain`,
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
      filePath: () => `/domains/${deInitial(props.moduleName)}Domain`,
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
      filePath: () => `/domains/${deInitial(props.moduleName)}Domain`,
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
      filePath: () => `/apis`,
      basePrompt: apiPrompt,
      promptGenerator: () => {
        return generatePrompt(apiPrompt);
      }
    },
    {
      key: 'step6',
      title: '生成service',
      fileName: () => `service.ts`,
      filePath: () => `/domains/${deInitial(props.moduleName)}Domain`,
      basePrompt: servicePrompt,
      promptGenerator: () => {
        return generatePrompt(servicePrompt);
      }
    },
    {
      key: 'step7',
      title: '生成router',
      fileName: () => `${deInitial(props.moduleName)}.ts`,
      filePath: () => `/router/data`,
      basePrompt: routerPrompt,
      promptGenerator: () => {
        return generatePrompt(routerPrompt);
      }
    },
    {
      key: 'step8',
      title: '生成i18n',
      fileName: () => `cn.ts`,
      filePath: () => `/views/${deInitial(props.moduleName)}/locales`,
      basePrompt: localePrompts,
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
        return generatePrompt(localePrompts);
      }
    }
  ];

  return {
    steps
  };
}
