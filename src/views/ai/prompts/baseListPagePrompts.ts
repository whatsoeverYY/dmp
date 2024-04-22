import { basicPrompts } from '@/views/ai/prompts/basicPrompts';

export const baseListPagePrompts =
  basicPrompts.startPhaseWithoutTable +
  // '导出Base{name}ListPage，值为一个component\n' +
  '所有的{name}均需要根据给定值进行替换。\n' +
  basicPrompts.templateCode +
  "import { ActionButtonPermGroup } from '@/components/business/Table/ActionButtons';\n" +
  "import { PaginationTable } from '@/components/business/Table/PaginationTable';\n" +
  "import { GCollapseFormLayout } from '@/components/layout/CollapseFormLayout/CollapseFormLayout';\n" +
  "import { SearchForm } from '@/components/SearchForm';\n" +
  "import { {name}Entity } from '@/domains/{首字母小写(name)}Domain/entity';\n" +
  "import { base{name}ListPageProps } from '@/views/{首字母小写(name)}/Base{name}ListPageProps';\n" +
  "import { use{name}Action } from '@/views/{首字母小写(name)}/composition/use{name}Action';\n" +
  "import { use{name}ListColumns } from '@/views/{首字母小写(name)}/composition/use{name}ListColumns';\n" +
  "import { use{name}SearchAction } from '@/views/{首字母小写(name)}/composition/use{name}SearchAction';\n" +
  "import { use{name}SearchFormItems } from '@/views/{首字母小写(name)}/composition/use{name}SearchFormItems';\n" +
  "import cn from './locales/cn';\n" +
  "import { defineComponent, computed } from 'vue';\n" +
  '\n' +
  'export const Base{name}ListPage = defineComponent({\n' +
  "name: 'Base{name}ListPage',\n" +
  'i18n: {\n' +
  'messages: {\n' +
  'cn,\n' +
  '},\n' +
  '},\n' +
  'props: base{name}ListPageProps(),\n' +
  'setup(props) {\n' +
  'const { appSearchFormItems } = use{name}SearchFormItems(\n' +
  'computed(() => props.formItemConfig)\n' +
  ');\n' +
  'const { tableListConfig } = use{name}ListColumn();\n' +
  'const {\n' +
  'loading,\n' +
  'list,\n' +
  'onSearch,\n' +
  'onAfterAction,\n' +
  '\n' +
  '  params,\n' +
  '\n' +
  '  checkedRecords,\n' +
  '  resetChecked,\n' +
  '\n' +
  '  pagination,\n' +
  '  onPaginationChange,\n' +
  '\n' +
  '  onSortChange,\n' +
  '\n' +
  '  appSearchActions,\n' +
  '} = use{name}SearchAction(props);\n' +
  '\n' +
  'const { appActions } = use{name}Action({\n' +
  '  onAfterAction,\n' +
  '  resetChecked,\n' +
  '  dataSource: props.dataSource,\n' +
  '  configList: computed(() => props.actionButtons),\n' +
  '});\n' +
  '\n' +
  'const computedRenderSearchForm = computed(() => {\n' +
  '  return (collapse: boolean) => (\n' +
  '    <SearchForm\n' +
  '      formItems={appSearchFormItems.value as any}\n' +
  '      formState={params.value}\n' +
  "      mode={collapse ? 'simple' : 'complex'}\n" +
  '      onSubmit={onSearch}\n' +
  '    />\n' +
  '  );\n' +
  '});\n' +
  'const computedSearchButtons = computed(() => {\n' +
  '  return (\n' +
  '    <ActionButtonPermGroup\n' +
  '      data={params.value}\n' +
  '      dataSource={props.dataSource}\n' +
  '      buttonGroup={appSearchActions.value as any}\n' +
  '      type="primary"\n' +
  '      size="middle"\n' +
  '      layout="block"\n' +
  '    />\n' +
  '  );\n' +
  '});\n' +
  'const computedActionButtons = computed(() => {\n' +
  '  return (row: {name}Entity) => (\n' +
  '    <ActionButtonPermGroup\n' +
  '      data={row}\n' +
  '      dataSource={props.dataSource}\n' +
  '      buttonGroup={appActions.value as any}\n' +
  '    />\n' +
  '  );\n' +
  '});\n' +
  'const computedRenderTable = computed(() => {\n' +
  '  return (\n' +
  '    <PaginationTable\n' +
  '      canResizable\n' +
  '      virtualTable\n' +
  '      type="Grid"\n' +
  '      virtualRowHeight={130}\n' +
  '      cacheResizableKey="{转小写横杠(name)}"\n' +
  '      rowId={props.rowId}\n' +
  '      onSortChange={onSortChange}\n' +
  '      defaultSort={{\n' +
  '        field: props.defaultSort.name,\n' +
  '        order: props.defaultSort.order,\n' +
  '      }}\n' +
  '      pagination={pagination.value}\n' +
  '      onPaginationChange={onPaginationChange}\n' +
  '      columns={props.columns}\n' +
  '      columnRecord={tableListConfig.value as any}\n' +
  '      loading={loading.value}\n' +
  '      data={list.value}\n' +
  '      dataSource={props.dataSource}\n' +
  '      canCheckColumn={props.canCheckColumn}\n' +
  "      v-model={[checkedRecords.value, 'checkedRecords']}\n" +
  '      v-slots={{\n' +
  '        action: computedActionButtons.value,\n' +
  '      }}\n' +
  '      checkMethod={() => true}\n' +
  '    />\n' +
  '  );\n' +
  '});\n' +
  '\n' +
  'return () => {\n' +
  '  return (\n' +
  '    <GCollapseFormLayout\n' +
  '      collapseAble={true}\n' +
  '      extraButtonMode={false}\n' +
  '      noHeaderPadding={false}\n' +
  '      v-slots={{\n' +
  '        header: computedRenderSearchForm.value,\n' +
  '        extraButton: () => computedSearchButtons.value,\n' +
  '        default: () => computedRenderTable.value,\n' +
  '      }}\n' +
  '    ></GCollapseFormLayout>\n' +
  '  );\n' +
  '};\n' +
  '\n' +
  '},\n' +
  '});\n' +
  basicPrompts.importPhaseRule +
  basicPrompts.endPhase;
