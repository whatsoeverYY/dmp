import { deInitial, extractTableColumns } from '@/utils';
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
import { enumPrompt } from '@/views/ai/prompts/updated/enumPrompt';
import { typePrompt } from '@/views/ai/prompts/updated/typePrompt';
import { useValidation } from '@/views/ai/validation/useValidation';
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
  const {
    typeAfterGenerateCheck,
    entityAfterGenerateCheck,
    enumAfterGenerateCheck,
    transformAfterGenerateCheck,
    i18nAfterGenerateCheck,
    searchFormAfterGenerateCheck,
    listColumnAfterGenerateCheck,
    listPageAfterGenerateCheck,
    docEditAfterGenerateCheck,
    editPageAfterGenerateCheck
  } = useValidation(props);

  const getTablePrompt = (type: string, columnIndex?: number[]) => {
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
    if (columnIndex) {
      return `\n\n${extractTableColumns(resTable, columnIndex)}`;
    }
    return `\n\n${resTable}`;
  };
  const generatePrompt = (
    prompt: Array<{ prompt: string; tableType: string; columnIndex?: number[] }> | string,
    endPrompt?: string
  ): string[] => {
    if (isArray(prompt)) {
      return prompt.map(
        (ele) =>
          `${ele.prompt}${variablePrompt.value}${getTablePrompt(ele.tableType, ele.columnIndex)}`
      );
    } else {
      return [`${prompt}${variablePrompt.value}${endPrompt ? '\n\n' + endPrompt : ''}`];
    }
  };

  const fullTablePrompt = `列表字段表格：\n${props.tableValue}\n检索字段表格：\n${props.searchValue}\n详情字段表格：\n${props.detailValue}\n`;
  const tableAndSearchTablePrompt = `列表字段表格：\n${extractTableColumns(props.tableValue, [0])}\n检索字段表格：\n${extractTableColumns(props.searchValue, [0])}\n`;
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
        const emdPrompt = `列表字段表格：\n${extractTableColumns(props.tableValue, [0, 1, 2])}\n检索字段表格：\n${extractTableColumns(props.searchValue, [0, 1, 2, 3, 7])}\n`;
        return generatePrompt(typePrompt, emdPrompt);
      },
      afterGenerateCheck: typeAfterGenerateCheck
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
      },
      afterGenerateCheck: entityAfterGenerateCheck
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
        return generatePrompt(enumPrompt, fullTablePrompt);
      },
      afterGenerateCheck: enumAfterGenerateCheck
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
      },
      afterGenerateCheck: transformAfterGenerateCheck
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
      },
      afterGenerateCheck: i18nAfterGenerateCheck
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
      },
      afterGenerateCheck: searchFormAfterGenerateCheck
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
      },
      afterGenerateCheck: listColumnAfterGenerateCheck
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
        return generatePrompt(previewPrompts, tableAndSearchTablePrompt);
      },
      afterGenerateCheck: (data: string) => {
        return listPageAfterGenerateCheck(data);
      }
    },
    {
      key: 'step15',
      title: '生成线下编辑列表',
      fileName: () => `${props.moduleName}EditList.tsx`,
      filePath: () => `/views/${deInitial(props.moduleName)}`,
      basePrompt: editPrompts,
      promptGenerator: () => {
        return generatePrompt(editPrompts, tableAndSearchTablePrompt);
      },
      afterGenerateCheck: (data: string) => {
        return listPageAfterGenerateCheck(data);
      }
    },
    {
      key: 'step16',
      title: '生成回收站',
      fileName: () => `${props.moduleName}RecycleList.tsx`,
      filePath: () => `/views/${deInitial(props.moduleName)}`,
      basePrompt: recyclePrompts,
      promptGenerator: () => {
        return generatePrompt(recyclePrompts, tableAndSearchTablePrompt);
      },
      afterGenerateCheck: (data: string) => {
        return listPageAfterGenerateCheck(data);
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
      },
      afterGenerateCheck: docEditAfterGenerateCheck
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
      },
      afterGenerateCheck: editPageAfterGenerateCheck
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
