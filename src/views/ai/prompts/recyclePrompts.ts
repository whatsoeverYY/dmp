import { basicPrompts } from '@/views/ai/prompts/basicPrompts';

export const recyclePrompts =
  basicPrompts.startPhase +
  '导出一个component，名称为{name}PreviewList。\n' +
  'component中的setup函数中的内容补全规则如下' +
  'formItemConfig数组值来自于检索字段表格中的[E_转大写下划线{name}_SEARCH_PARAMS].[大写(检索字段)]，以及4个来自E_BASE_SEARCH_PARAMS的基本字段。\n' +
  'columns数组值来自于列表字段表格中的[E_转大写下划线{name}_LIST_COLUMNS].[大写(列表字段)]，以及5个来自E_BASE_TABLE_COLUMN的基本字段。\n' +
  '以_id_view结尾的列表字段不需要添加到columns数组中。\n' +
  '常量定义完成，最后return一个组件，名称为Base{name}ListPage。\n' +
  basicPrompts.templateCode +
  'export default defineComponent({\n' +
  "name: '{name}RecycleList',\n" +
  'setup() {\n' +
  'const formItemConfig = [\n' +
  'E_{转下划线大写(name)}_SEARCH_PARAMS.{大写(检索字段表格中的检索字段名)},\n' +
  'E_BASE_SEARCH_PARAMS.CREATED_BY,\n' +
  'E_BASE_SEARCH_PARAMS.CREATED_TIME_RANGE,\n' +
  'E_BASE_SEARCH_PARAMS.UPDATED_BY,\n' +
  'E_BASE_SEARCH_PARAMS.UPDATED_TIME_RANGE,\n' +
  '];\n' +
  'const searchButtons = [\n' +
  'E_BASE_LIST_BUTTON_NAME.SEARCH,\n' +
  'E_BASE_LIST_BUTTON_NAME.RESET,\n' +
  '];\n' +
  'const columns = [\n' +
  'E_{转下划线大写(name)}_LIST_COLUMNS.{大写(列表字段)},\n' +
  'E_BASE_TABLE_COLUMN.CREATED_TS,\n' +
  'E_BASE_TABLE_COLUMN.CREATED_BY,\n' +
  'E_BASE_TABLE_COLUMN.UPDATED_TS,\n' +
  'E_BASE_TABLE_COLUMN.UPDATED_BY,\n' +
  'E_BASE_TABLE_COLUMN.DATA_STATUS,\n' +
  '];\n' +
  '\n' +
  'const actionButtons = [E_PERMISSION.PREVIEW];\n' +
  '\n' +
  'return () => {\n' +
  'return (\n' +
  '<Base{name}ListPage\n' +
  'canCheckColumn\n' +
  'dataSource={DATA_SOURCE.PG}\n' +
  'searchButtons={searchButtons}\n' +
  'actionButtons={actionButtons}\n' +
  'formItemConfig={formItemConfig}\n' +
  'columns={columns}\n' +
  'rowId="id"\n' +
  '></Base{name}ListPage>\n' +
  ');\n' +
  '};\n' +
  '\n' +
  '},\n' +
  '});\n' +
  basicPrompts.importPhase +
  basicPrompts.endPhase;
