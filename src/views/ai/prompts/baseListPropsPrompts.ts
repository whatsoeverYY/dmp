import { basicPrompts } from '@/views/ai/prompts/basicPrompts';

export const baseListPropsPrompts =
  basicPrompts.startPhaseWithoutTable +
  '导出常量base{name}ListPageProps，值为一个箭头函数，函数体如下示例\n' +
  basicPrompts.templateCode +
  'export const base{name}ListPageProps = () => \n' +
  'defineComponentProps({\n' +
  '...baseListPageProps<{name}SearchFormParams, {name}Entity>(),\n' +
  'defaultSort: {\n' +
  'type: Object as PropType<{\n' +
  'name: E_BASE_TABLE_COLUMN;\n' +
  "order: 'asc' | 'desc';\n" +
  '}>,\n' +
  'default: () => ({\n' +
  'name: E_BASE_TABLE_COLUMN.UPDATED_TS,\n' +
  "order: 'desc',\n" +
  '}),\n' +
  '},\n' +
  'columns: {\n' +
  'type: Array as PropType<(E_BASE_TABLE_COLUMN | E_{转下划线大写(name)}_LIST_COLUMNS)[]>,\n' +
  'default: () => [],\n' +
  '},\n' +
  'formItemConfig: {\n' +
  'type: Array as PropType<\n' +
  '(E_BASE_SEARCH_PARAMS | E_转下划线大写(name)_SEARCH_PARAMS)[]\n' +
  '>,\n' +
  'default: () => [],\n' +
  '},\n' +
  'searchButtons: {\n' +
  'type: Array as PropType<E_BASE_LIST_BUTTON_NAME[]>,\n' +
  'default: () => [],\n' +
  '},\n' +
  'actionButtons: {\n' +
  'type: Array as PropType<E_PERMISSION[]>,\n' +
  'default: () => [],\n' +
  '},\n' +
  '});\n' +
  'export type Base{name}ListPageProps = ExtractPropTypes<\n' +
  'ReturnType<typeof base{name}ListPageProps>>;\n' +
  basicPrompts.importPhase +
  basicPrompts.endPhase;
