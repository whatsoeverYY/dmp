import { basicPrompts } from '@/views/ai/prompts/basicPrompts';

export const searchActionPrompts =
  basicPrompts.startPhaseWithoutTable +
  '导出方法use{name}SearchAction，函数入参及其类型定义、函数体如下示例\n' +
  basicPrompts.templateCode +
  "import { computed, unref } from 'vue';\n" +
  "import { Base{name}ListPageProps } from '../Base{name}ListPageProps';\n" +
  '\n' +
  'export function use{name}SearchAction(props: Base{name}ListPageProps) {\n' +
  'const configList = computed(() => props.searchButtons);\n' +
  'const dataTypeEnum = {name}Entity.dataTypeEnum;\n' +
  '\n' +
  'const isFromDetail = (r: RouteLocationNormalized): boolean => {\n' +
  'return [E_ROUTER_NAME.{转下划线大写(name)}_DETAIL].includes(r.name as E_ROUTER_NAME);\n' +
  '};\n' +
  '\n' +
  'const {\n' +
  'loading,\n' +
  'list,\n' +
  'onSearch,\n' +
  'onReset,\n' +
  'onAfterAction,\n' +
  '\n' +
  'disabledSearch,\n' +
  '\n' +
  'params,\n' +
  'setParams,\n' +
  '\n' +
  'checkedRecords,\n' +
  'hasCheckedRecord,\n' +
  'resetChecked,\n' +
  '\n' +
  'pagination,\n' +
  'onPaginationChange,\n' +
  '\n' +
  'sortFields,\n' +
  'onSortChange,\n' +
  '\n' +
  '} = useSearch<{name}SearchParams, {name}Entity>({\n' +
  'defaultParams: () => ({\n' +
  'recycle_bin: props.recycle_bin,\n' +
  'data_status_list: props.defaultDataStatusList,\n' +
  '}),\n' +
  'defaultSortFields: getDefaultSortFieldByColumns(\n' +
  'props.dataSource,\n' +
  'props.defaultSort,\n' +
  'baseColumnRecord\n' +
  '),\n' +
  "rowKey: 'dyDbId',\n" +
  'fetchListFunc: (params) =>\n' +
  '{name}Service.getList(\n' +
  'props.dataSource,\n' +
  'params,\n' +
  'props.overrideEmptyParams\n' +
  '),\n' +
  "storeKey: '{转下划线大写(name)}_LIST',\n" +
  'checkFromOrToPage: isFromDetail,\n' +
  '});\n' +
  '\n' +
  'setParams({ ...params.value, ...getDecodeQuery() });\n' +
  '\n' +
  'const {\n' +
  'isProd,\n' +
  'onAdd,\n' +
  'getPgIds,\n' +
  'checkExistEditing,\n' +
  'onionExecuteWrapper,\n' +
  'onionLockEditing,\n' +
  'onPublish,\n' +
  'onPreCheckItem,\n' +
  'onAfterExecute,\n' +
  'onRestore,\n' +
  'onBatchEdit,\n' +
  'onDelete,\n' +
  '} = useCommonListOperate({\n' +
  'onAfterAction,\n' +
  'resetChecked,\n' +
  'dataSource: props.dataSource,\n' +
  'dataTypeEnum: dataTypeEnum,\n' +
  'routeId: E_ROUTER_PARAMS.{转下划线大写(name)}_ID,\n' +
  '});\n' +
  '\n' +
  'const searchActionConfig: PermActionType<\n' +
  'E_BASE_LIST_BUTTON_NAME,\n' +
  '{name}Entity\n' +
  '\n' +
  '= {\n' +
  '[E_BASE_LIST_BUTTON_NAME.SEARCH]: {\n' +
  'disabled: disabledSearch.value,\n' +
  'execute: () => onSearch(),\n' +
  '},\n' +
  '[E_BASE_LIST_BUTTON_NAME.RESET]: {\n' +
  'disabled: disabledSearch.value,\n' +
  'execute: onReset,\n' +
  '},\n' +
  '}\n' +
  '\n' +
  'const { completedConfig, getSearchActionButtons, appSearchActions } =\n' +
  'useSearchActionProcessUnit(searchActionConfig, { configList });\n' +
  '\n' +
  'return {\n' +
  'loading,\n' +
  'list,\n' +
  'onSearch,\n' +
  'onReset,\n' +
  'onAfterAction,\n' +
  '\n' +
  'disabledSearch,\n' +
  '\n' +
  'params,\n' +
  'setParams,\n' +
  '\n' +
  'checkedRecords,\n' +
  'resetChecked,\n' +
  '\n' +
  'pagination,\n' +
  'onPaginationChange,\n' +
  '\n' +
  'sortFields,\n' +
  'onSortChange,\n' +
  '\n' +
  'searchActionConfig: completedConfig,\n' +
  'getSearchActionButtons,\n' +
  'appSearchActions,\n' +
  '\n' +
  '};\n' +
  '\n' +
  '}\n' +
  basicPrompts.importPhase +
  basicPrompts.endPhase;
