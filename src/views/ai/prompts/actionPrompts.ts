import { basicPrompts } from '@/views/ai/prompts/basicPrompts';

export const actionPrompts =
  basicPrompts.startPhaseWithoutTable +
  '导出方法use{name}Action，函数入参及其类型定义、函数体如下示例\n' +
  basicPrompts.templateCode +
  'export function use{name}Action(\n' +
  'opt: Pick<\n' +
  'ListOperate<{name}Entity>,\n' +
  "'onAfterAction' | 'resetChecked' | 'dataSource'\n" +
  '\n' +
  '& {\n' +
  'configList?: MaybeRef<E_PERMISSION[]>;\n' +
  '}\n' +
  ') {\n' +
  'const { onAfterAction, resetChecked, dataSource, configList } = opt;\n' +
  'const dataTypeEnum = {name}Entity.dataTypeEnum;\n' +
  'const {\n' +
  'isProd,\n' +
  'getPgIds,\n' +
  'onPreview,\n' +
  'onionExecuteWrapper,\n' +
  'onEdit,\n' +
  'onPreCheckDto,\n' +
  'onPreCheckItem,\n' +
  'onionLockEditing,\n' +
  'onPublish,\n' +
  'onDelete,\n' +
  'onRestore,\n' +
  'getPgId,\n' +
  'getDyDbId,\n' +
  'onAfterExecute,\n' +
  '} = useCommonListOperate<{name}Entity>({\n' +
  'onAfterAction,\n' +
  'resetChecked,\n' +
  'dataSource,\n' +
  'dataTypeEnum,\n' +
  'routeId: E_ROUTER_PARAMS.{转下划线大写(name)}_ID,\n' +
  'routerMeta: {\n' +
  'detail: E_ROUTER_NAME.{转下划线大写(name)}_DETAIL,\n' +
  '},\n' +
  '});\n' +
  '\n' +
  'const actionConfig: PermActionType<E_PERMISSION, {name}Entity> = {\n' +
  '[E_PERMISSION.PREVIEW]: {\n' +
  'onionExecute: [onPreview],\n' +
  '},\n' +
  '[E_PERMISSION.EDIT]: {\n' +
  'onionExecute: [onionLockEditing, onEdit],\n' +
  'visible: getPermActionBtnVisible([\n' +
  'isProd.value ? DATA_STATUS.ACTIVE : DATA_STATUS.EDITING,\n' +
  'DATA_STATUS.PUBLISHED_FAILED,\n' +
  'DATA_STATUS.PUBLISH_FAILED,\n' +
  ']),\n' +
  '},\n' +
  '[E_PERMISSION.WORKFLOW]: {\n' +
  'onionExecute: [\n' +
  '(data) => {\n' +
  'showProcessDialog(\n' +
  'getPgId(data),\n' +
  'dataTypeEnum.dataType,\n' +
  'getDyDbId(data)\n' +
  ');\n' +
  '},\n' +
  '],\n' +
  '},\n' +
  '}\n' +
  '\n' +
  'const { completedConfig, getActionButtons, appActions } =\n' +
  'useActionProcessUnit(actionConfig, { configList });\n' +
  '\n' +
  'return {\n' +
  'actionConfig,\n' +
  'completedConfig,\n' +
  'getActionButtons,\n' +
  'appActions,\n' +
  '\n' +
  'isProd,\n' +
  'onDelete,\n' +
  'onPreCheckItem,\n' +
  '\n' +
  '};\n' +
  '\n' +
  '}\n' +
  basicPrompts.importPhase +
  basicPrompts.endPhase;
