import { actionPrompts } from '@/views/ai/prompts/actionPrompts';
import { apiPrompt } from '@/views/ai/prompts/apiPrompts';
import { baseListPagePrompts } from '@/views/ai/prompts/baseListPagePrompts';
import { baseListPropsPrompts } from '@/views/ai/prompts/baseListPropsPrompts';
import { entityPrompts } from '@/views/ai/prompts/entityPrompts';
import { enumPrompt } from '@/views/ai/prompts/enumPrompts';
import { listColumnsPrompts } from '@/views/ai/prompts/listColumnsPrompts';
import { localePrompts } from '@/views/ai/prompts/localePrompts';
import { previewPrompts } from '@/views/ai/prompts/previewPrompts';
import { routerPrompt } from '@/views/ai/prompts/routerPrompts';
import { searchActionPrompts } from '@/views/ai/prompts/searchActionPrompts';
import { searchFormPrompts } from '@/views/ai/prompts/searchFormPrompts';
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
      title: '生成type',
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
    },
    {
      key: 'step9',
      title: '生成searchForm',
      fileName: () => `use${props.moduleName}SearchFormItems.ts`,
      filePath: () => `/views/${deInitial(props.moduleName)}/composition`,
      basePrompt: searchFormPrompts,
      promptGenerator: () => {
        if (!props.searchValue) {
          alert('请填写检索字段表格信息');
          return '';
        }
        return generatePrompt(searchFormPrompts);
      }
    },
    {
      key: 'step10',
      title: '生成listColumn',
      fileName: () => `use${props.moduleName}ListColumns.ts`,
      filePath: () => `/views/${deInitial(props.moduleName)}/composition`,
      basePrompt: listColumnsPrompts,
      promptGenerator: () => {
        if (!props.tableValue) {
          alert('请填写列表字段表格信息');
          return '';
        }
        return generatePrompt(listColumnsPrompts);
      }
    },
    {
      key: 'step11',
      title: '生成searchAction',
      fileName: () => `use${props.moduleName}SearchAction.ts`,
      filePath: () => `/views/${deInitial(props.moduleName)}/composition`,
      basePrompt: searchActionPrompts,
      promptGenerator: () => {
        return generatePrompt(searchActionPrompts);
      }
    },
    {
      key: 'step12',
      title: '生成action',
      fileName: () => `use${props.moduleName}Action.ts`,
      filePath: () => `/views/${deInitial(props.moduleName)}/composition`,
      basePrompt: actionPrompts,
      promptGenerator: () => {
        return generatePrompt(actionPrompts);
      }
    },
    {
      key: 'step13',
      title: '生成listPageProps',
      fileName: () => `Base${props.moduleName}ListPageProps.ts`,
      filePath: () => `/views/${deInitial(props.moduleName)}`,
      basePrompt: baseListPropsPrompts,
      promptGenerator: () => {
        return generatePrompt(baseListPropsPrompts);
      }
    },
    {
      key: 'step13',
      title: '生成baseListPage',
      fileName: () => `Base${props.moduleName}ListPage.ts`,
      filePath: () => `/views/${deInitial(props.moduleName)}`,
      basePrompt: baseListPagePrompts,
      promptGenerator: () => {
        return generatePrompt(baseListPagePrompts);
      }
    },
    {
      key: 'step14',
      title: '生成线上列表',
      fileName: () => `${props.moduleName}PreviewList.ts`,
      filePath: () => `/views/${deInitial(props.moduleName)}`,
      basePrompt: previewPrompts,
      promptGenerator: () => {
        const endPrompt = `列表字段表格：\n${props.tableValue}\n检索字段表格：\n${props.searchValue}\n`;
        return generatePrompt(previewPrompts, endPrompt);
      }
    }
  ];

  return {
    steps
  };
}
