import { basicPrompts } from '@/views/ai/prompts/basicPrompts';

const detailPrompt =
  basicPrompts.startPhase +
  '所有的{name}均需要根据给定值进行替换。\n' +
  '在{待补充数据}处根据下面提供的表格完善代码，规则如下:\n' +
  '数组值来自于下表中的[E_{转大写下划线(name)}_DOC_ITEMS.{转大写(详情字段)}]，以及4个来自E_BASE_DOC_EDIT_FORM的基本字段，只在只读模式下展示' +
  basicPrompts.templateCode +
  "import Process from '@/components/business/BpmnWorkflow/Process';\n" +
  'import {\n' +
  '  useDocEditBaseConfig,\n' +
  '  useDocEditFetchDetail,\n' +
  "} from '@/components/business/DocEditV2/composition/useDocEdit';\n" +
  "import { DocEditV2 } from '@/components/business/DocEditV2/DocEdit';\n" +
  "import { DocEditLayout } from '@/components/business/DocEditV2/DocEditLayout';\n" +
  "import { E_BASE_DOC_EDIT_FORM } from '@/components/business/DocEditV2/enum';\n" +
  'import {\n' +
  '  PermActionType,\n' +
  '  ActionButtonPermGroup,\n' +
  "} from '@/components/business/Table/ActionButtons';\n" +
  "import { useActionProcessUnit } from '@/compositions/lowcodeConfig/useActionProcessUnit';\n" +
  "import { preFilterConfig } from '@/compositions/lowcodeConfig/utils';\n" +
  'import {\n' +
  '  useRouteId,\n' +
  '  useRouteDataSource,\n' +
  '  useRouteReadMode,\n' +
  "} from '@/compositions/useRouteInfo';\n" +
  "import { {name}Entity } from '@/domains/{首字母小写(name)}Domain/entity';\n" +
  "import { E_{大写下划线(name)}_DOC_ITEMS } from '@/domains/{首字母小写(name)}Domain/enum';\n" +
  "import { {name}Service } from '@/domains/{首字母小写(name)}Domain/service';\n" +
  "import { getDataCountStore } from '@/store';\n" +
  "import { E_PERMISSION } from '@/type/enum';\n" +
  "import { E_ROUTER_PARAMS, E_ROUTER_NAME } from '@/type/router';\n" +
  "import { getGoBackLocation } from '@/utils/route';\n" +
  "import OperateHistory from '@/views/drugs/components/OperateHistory';\n" +
  "import { use{name}Action } from '@/views/{首字母小写(name)}/composition/use{name}Action';\n" +
  "import { use{name}DocEdit } from '@/views/{首字母小写(name)}/composition/use{name}DocEdit';\n" +
  "import { use{name}FormRule } from '@/views/{首字母小写(name)}/composition/use{name}FormRule';\n" +
  "import { defineComponent, unref, computed } from 'vue';\n" +
  "import { useRoute, useRouter } from 'vue-router';\n" +
  "import cn from '../locales/cn';\n" +
  '\n' +
  'export default defineComponent({\n' +
  "name: '{name}EditPage',\n" +
  'i18n: {\n' +
  'messages: {\n' +
  'cn,\n' +
  '},\n' +
  '},\n' +
  'setup() {\n' +
  'const dataTypeEnum = {name}Entity.dataTypeEnum;\n' +
  'const route = useRoute();\n' +
  'const { push } = useRouter();\n' +
  'const routeId = useRouteId(E_ROUTER_PARAMS.{转下划线大写(name)}_ID);\n' +
  'const dataSource = useRouteDataSource();\n' +
  'const isReadMode = useRouteReadMode(\n' +
  'E_ROUTER_NAME.{转下划线大写(name)}_DETAIL\n' +
  ');\n' +
  'const { actions: dataCountStoreActions } = getDataCountStore();\n' +
  '\n' +
  'const { appDocItems } = use{name}DocEdit({\n' +
  '  configList: preFilterConfig([\n' +
  '    {待补充数据示例：E_{转下划线大写(name)}_DOC_ITEMS.XX_XX,},\n' +
  '    unref(isReadMode) && E_BASE_DOC_EDIT_FORM.CREATED_BY,\n' +
  '    unref(isReadMode) && E_BASE_DOC_EDIT_FORM.CREATED_TS,\n' +
  '    unref(isReadMode) && E_BASE_DOC_EDIT_FORM.UPDATED_BY,\n' +
  '    unref(isReadMode) && E_BASE_DOC_EDIT_FORM.UPDATED_TS,\n' +
  '  ]),\n' +
  '});\n' +
  'const {\n' +
  '  loading,\n' +
  '  formState,\n' +
  '  setExtraBreadcrumb,\n' +
  '  checkIsOtherEditing,\n' +
  '  onPromiseDataReady,\n' +
  '  resetLeave,\n' +
  '} = useDocEditBaseConfig<{name}Entity>({\n' +
  '  defaultFormState: () => new {name}Entity({} as any),\n' +
  '});\n' +
  '\n' +
  'const checkAndLockEditing = async (data: {name}Entity) => {\n' +
  '  return await checkIsOtherEditing(\n' +
  '    dataTypeEnum.dataType,\n' +
  '    data.dyDbId as string\n' +
  '  );\n' +
  '};\n' +
  '\n' +
  'const getDetail = async () => {\n' +
  '  const detail = await {name}Service.getDetail(\n' +
  '    dataSource.value,\n' +
  '    routeId.value\n' +
  '  );\n' +
  '\n' +
  '  setExtraBreadcrumb([detail.dyDbId, detail.liTitle]);\n' +
  '\n' +
  '  !isReadMode.value && checkAndLockEditing(detail);\n' +
  '\n' +
  '  return detail;\n' +
  '};\n' +
  '\n' +
  'useDocEditFetchDetail<{name}Entity>({\n' +
  '  loading,\n' +
  '  formState,\n' +
  '  routeId,\n' +
  '  defaultFormState: () => new {name}Entity(),\n' +
  '  getDetail,\n' +
  '  onPromiseDataReady,\n' +
  '  resetLeave,\n' +
  '});\n' +
  '\n' +
  'const { onValid, validateInfos } = use{name}FormRule(\n' +
  '  formState,\n' +
  '  appDocItems\n' +
  ');\n' +
  '\n' +
  'const onGoToList = () => {\n' +
  '  push(\n' +
  '    getGoBackLocation(route.query, E_ROUTER_NAME.{转下划线大写(name)}_LIST)\n' +
  '  );\n' +
  '};\n' +
  '\n' +
  'const onAfterAction = () => {\n' +
  '  dataCountStoreActions.startFetchingData();\n' +
  '  onGoToList();\n' +
  '};\n' +
  '\n' +
  'const { actionConfig } = use{name}Action({\n' +
  '  dataSource,\n' +
  '  onAfterAction,\n' +
  '});\n' +
  '\n' +
  'const buttonActionConfig: PermActionType<\n' +
  '  E_PERMISSION,\n' +
  '  {name}Entity\n' +
  '> = {\n' +
  '  [E_PERMISSION.BACK]: {\n' +
  '    execute: onGoToList,\n' +
  '  },\n' +
  '};\n' +
  '\n' +
  'const { appActions } = useActionProcessUnit(\n' +
  '  [actionConfig, buttonActionConfig], {\n' +
  '  configList: computed(() => {\n' +
  '    return isReadMode.value\n' +
  '      ? [\n' +
  '          E_PERMISSION.EDIT,\n' +
  '          E_PERMISSION.DELETE,\n' +
  '          E_PERMISSION.RESTORE,\n' +
  '          E_PERMISSION.BACK,\n' +
  '        ]\n' +
  '      : [\n' +
  '          E_PERMISSION.SAVE,\n' +
  '          E_PERMISSION.POST_AND_APPROVE,\n' +
  '          E_PERMISSION.BACK,\n' +
  '        ];\n' +
  '  }),\n' +
  '});\n' +
  '\n' +
  'const computedActionButtons = computed(() => {\n' +
  '  return (\n' +
  '    <ActionButtonPermGroup\n' +
  '      data={formState.value}\n' +
  '      dataSource={dataSource.value}\n' +
  '      buttonGroup={appActions.value as any}\n' +
  '      type="primary"\n' +
  '      size="middle"\n' +
  '      layout="block"\n' +
  '    />\n' +
  '  );\n' +
  '});\n' +
  '\n' +
  'const operateHistory = computed(() => {\n' +
  '  return <OperateHistory id={routeId.value}></OperateHistory>;\n' +
  '});\n' +
  '\n' +
  'const workflow = computed(() => {\n' +
  '  return (\n' +
  '    <Process id={routeId.value} dataType={dataTypeEnum.dataType}></Process>\n' +
  '  );\n' +
  '});\n' +
  '\n' +
  'const baseDocInfo = computed(() => {\n' +
  '  return (\n' +
  '    <DocEditV2\n' +
  '      labelSize="large"\n' +
  '      type="template"\n' +
  '      formItems={appDocItems.value as any}\n' +
  '      validateInfos={validateInfos.value}\n' +
  '      formState={formState.value}\n' +
  '      isReadMode={isReadMode.value}\n' +
  '      defaultItems={[]}\n' +
  '    ></DocEditV2>\n' +
  '  );\n' +
  '});\n' +
  '\n' +
  'return () => {\n' +
  '  const tabContent = [\n' +
  '    {\n' +
  "      label: '基本信息',\n" +
  "      value: '1',\n" +
  '      content: () => baseDocInfo.value,\n' +
  '    },\n' +
  '    {\n' +
  "      label: '操作历史',\n" +
  "      value: '2',\n" +
  '      content: () => operateHistory.value,\n' +
  '      visible: isReadMode.value,\n' +
  '    },\n' +
  '    {\n' +
  "      label: '流程概览',\n" +
  "      value: '3',\n" +
  '      content: () => workflow.value,\n' +
  '      visible: isReadMode.value,\n' +
  '    },\n' +
  '  ];\n' +
  '  return (\n' +
  '    <DocEditLayout\n' +
  '      docContent={tabContent}\n' +
  '      size="small"\n' +
  "      type={isReadMode.value ? 'tab' : 'default'}\n" +
  '      loading={loading.value}\n' +
  '      wrapperClassName="w-full h-full"\n' +
  '      v-slots={{\n' +
  '        actionButtons: () => computedActionButtons.value,\n' +
  '      }}\n' +
  '    >\n' +
  '      {baseDocInfo.value}\n' +
  '    </DocEditLayout>\n' +
  '  );\n' +
  '};\n' +
  '\n' +
  '},\n' +
  '});\n' +
  basicPrompts.importPhaseRule +
  basicPrompts.endPhase;

export const editPagePrompts = [{ prompt: detailPrompt, tableType: 'detail' }];
