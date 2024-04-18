import { deInitial, extractTableColumns } from '@/utils';
import { importPhases } from '@/views/ai/importPhases/importPhases';
import { actionPrompts } from '@/views/ai/prompts/actionPrompts';
import { apiPrompt } from '@/views/ai/prompts/apiPrompts';
import { baseListPagePrompts } from '@/views/ai/prompts/baseListPagePrompts';
import { baseListPropsPrompts } from '@/views/ai/prompts/baseListPropsPrompts';
import { docEditPrompts } from '@/views/ai/prompts/docEditPrompts';
import { editablePrompt } from '@/views/ai/prompts/editablePrompts';
import { editPagePrompts } from '@/views/ai/prompts/editPagePrompts';
import { editPrompts } from '@/views/ai/prompts/editPrompts';
import { entityPrompts } from '@/views/ai/prompts/entityPrompts';
import { formRulePrompts } from '@/views/ai/prompts/formRulePrompts';
import { listColumnsPrompts } from '@/views/ai/prompts/listColumnsPrompts';
import { localePrompts } from '@/views/ai/prompts/localePrompts';
import { previewPrompts } from '@/views/ai/prompts/previewPrompts';
import { readablePrompt } from '@/views/ai/prompts/readablePrompts';
import { recyclePrompts } from '@/views/ai/prompts/recyclePrompts';
import { routerPrompt } from '@/views/ai/prompts/routerPrompts';
import { searchActionPrompts } from '@/views/ai/prompts/searchActionPrompts';
import { searchFormPrompts } from '@/views/ai/prompts/searchFormPrompts';
import { servicePrompt } from '@/views/ai/prompts/servicePrompts';
import { transformPrompts } from '@/views/ai/prompts/transformPrompts';
import { typePrompt } from '@/views/ai/prompts/typePrompts';
import { enumPrompt } from '@/views/ai/prompts/updated/enumPrompt';
import { isArray } from 'ant-design-vue/es/_util/util';
import { computed } from 'vue';

export function usePrompts(props: {
  tableValue: string;
  searchValue: string;
  detailValue: string;
  moduleName: string;
  moduleNameCn: string;
}) {
  const variablePrompt = computed(() => `name=${props.moduleName}`);

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
      importPhase: () => importPhases.typeImports,
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
    // {
    //   key: 'step3',
    //   title: '生成enum',
    //   fileName: () => `enum.ts`,
    //   filePath: () => `/domains/${deInitial(props.moduleName)}Domain`,
    //   basePrompt: enumPrompts,
    //   promptGenerator: () => {
    //     if (!props.tableValue) {
    //       alert('请填写列表字段表格信息');
    //       return '';
    //     }
    //     if (!props.searchValue) {
    //       alert('请填写检索字段表格信息');
    //       return '';
    //     }
    //     if (!props.detailValue) {
    //       alert('请填写详情字段表格信息');
    //       return '';
    //     }
    //     return generatePrompt(enumPrompts);
    //   }
    // },
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
        const endPrompt = `列表字段表格：\n${props.tableValue}\n检索字段表格：\n${props.searchValue}\n详情字段表格：\n${props.detailValue}\n`;
        return generatePrompt(enumPrompt, endPrompt);
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
      key: 'step8',
      title: '生成searchForm',
      fileName: () => `use${props.moduleName}SearchFormItems.tsx`,
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
      key: 'step9',
      title: '生成listColumn',
      fileName: () => `use${props.moduleName}ListColumns.tsx`,
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
      key: 'step10',
      title: '生成listPageProps',
      fileName: () => `Base${props.moduleName}ListPageProps.ts`,
      filePath: () => `/views/${deInitial(props.moduleName)}`,
      basePrompt: baseListPropsPrompts,
      promptGenerator: () => {
        return generatePrompt(baseListPropsPrompts);
      }
    },
    {
      key: 'step11',
      title: '生成searchAction',
      fileName: () => `use${props.moduleName}SearchAction.tsx`,
      filePath: () => `/views/${deInitial(props.moduleName)}/composition`,
      basePrompt: searchActionPrompts,
      promptGenerator: () => {
        return generatePrompt(searchActionPrompts);
      }
    },
    {
      key: 'step12',
      title: '生成action',
      fileName: () => `use${props.moduleName}Action.tsx`,
      filePath: () => `/views/${deInitial(props.moduleName)}/composition`,
      basePrompt: actionPrompts,
      promptGenerator: () => {
        return generatePrompt(actionPrompts);
      }
    },
    {
      key: 'step13',
      title: '生成baseListPage',
      fileName: () => `Base${props.moduleName}ListPage.tsx`,
      filePath: () => `/views/${deInitial(props.moduleName)}`,
      basePrompt: baseListPagePrompts,
      promptGenerator: () => {
        return generatePrompt(baseListPagePrompts);
      }
    },
    {
      key: 'step14',
      title: '生成线上列表',
      fileName: () => `${props.moduleName}PreviewList.tsx`,
      filePath: () => `/views/${deInitial(props.moduleName)}`,
      basePrompt: previewPrompts,
      promptGenerator: () => {
        const endPrompt = `列表字段表格：\n${props.tableValue}\n检索字段表格：\n${extractTableColumns(props.searchValue)}\n`;
        return generatePrompt(previewPrompts, endPrompt);
      }
    },
    {
      key: 'step15',
      title: '生成线下编辑列表',
      fileName: () => `${props.moduleName}EditList.tsx`,
      filePath: () => `/views/${deInitial(props.moduleName)}`,
      basePrompt: editPrompts,
      promptGenerator: () => {
        const endPrompt = `列表字段表格：\n${props.tableValue}\n检索字段表格：\n${extractTableColumns(props.searchValue)}\n`;
        return generatePrompt(editPrompts, endPrompt);
      }
    },
    {
      key: 'step16',
      title: '生成回收站',
      fileName: () => `${props.moduleName}RecycleList.tsx`,
      filePath: () => `/views/${deInitial(props.moduleName)}`,
      basePrompt: recyclePrompts,
      promptGenerator: () => {
        const endPrompt = `列表字段表格：\n${props.tableValue}\n检索字段表格：\n${extractTableColumns(props.searchValue)}\n`;
        return generatePrompt(recyclePrompts, endPrompt);
      }
    },
    {
      key: 'step17',
      title: '生成详情readableField',
      fileName: () => `renderReadableField.tsx`,
      filePath: () => `/views/${deInitial(props.moduleName)}/config`,
      basePrompt: readablePrompt,
      promptGenerator: () => {
        return generatePrompt(readablePrompt);
      }
    },
    {
      key: 'step18',
      title: '生成详情editableField',
      fileName: () => `renderEditableField.tsx`,
      filePath: () => `/views/${deInitial(props.moduleName)}/config`,
      basePrompt: editablePrompt,
      promptGenerator: () => {
        return generatePrompt(editablePrompt);
      }
    },
    {
      key: 'step19',
      title: '生成详情docEdit',
      fileName: () => `use${props.moduleName}DocEdit.tsx`,
      filePath: () => `/views/${deInitial(props.moduleName)}/composition`,
      basePrompt: docEditPrompts,
      promptGenerator: () => {
        if (!props.detailValue) {
          alert('请填写详情字段表格信息');
          return '';
        }
        return generatePrompt(docEditPrompts);
      }
    },
    {
      key: 'step20',
      title: '生成详情formRule',
      fileName: () => `use${props.moduleName}FormRule.tsx`,
      filePath: () => `/views/${deInitial(props.moduleName)}/composition`,
      basePrompt: formRulePrompts,
      promptGenerator: () => {
        return generatePrompt(formRulePrompts);
      }
    },
    {
      key: 'step21',
      title: '生成详情editPage',
      fileName: () => `${props.moduleName}EditPage.tsx`,
      filePath: () => `/views/${deInitial(props.moduleName)}/detail`,
      basePrompt: editPagePrompts,
      promptGenerator: () => {
        if (!props.detailValue) {
          alert('请填写详情字段表格信息');
          return '';
        }
        return generatePrompt(editPagePrompts);
      }
    },
    {
      key: 'step22',
      title: '生成router',
      fileName: () => `${deInitial(props.moduleName)}.ts`,
      filePath: () => `/router/data`,
      basePrompt: routerPrompt,
      promptGenerator: () => {
        return generatePrompt(routerPrompt, `nameCn=${props.moduleNameCn}`);
      }
    }
  ];

  return {
    steps
  };
}
