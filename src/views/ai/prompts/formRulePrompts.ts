import { basicPrompts } from '@/views/ai/prompts/basicPrompts';

export const formRulePrompts =
  basicPrompts.startPhaseWithoutTable +
  '所有的{name}均需要根据给定值进行替换。\n' +
  basicPrompts.templateCode +
  "import { useDocEditForm } from '@/components/business/DocEditV2/composition/useDocEdit';\n" +
  "import { IFromItem } from '@/components/business/DocEditV2/DocEditType';\n" +
  "import { useFormEditRule } from '@/compositions/useFormEditRule';\n" +
  "import { useGetId } from '@/compositions/useGetId';\n" +
  "import { useLocale } from '@/compositions/useLocale';\n" +
  "import { useRouteIsProd } from '@/compositions/useRouteInfo';\n" +
  "import { IFromValidatorItem } from '@/constants/business/formValidator';\n" +
  "import { {name}Entity } from '@/domains/{首字母小写(name)}Domain/entity';\n" +
  "import { E_ROUTER_NAME } from '@/type/router';\n" +
  "import { PartialRecord } from '@/types/BaseTypes';\n" +
  "import { MaybeRef } from '@vueuse/core';\n" +
  "import { Ref, unref } from 'vue';\n" +
  '\n' +
  'export function use{name}FormRule<\n' +
  'T extends {name}Entity = {name}Entity\n' +
  '>(formState: Ref<T>, formItems: MaybeRef<IFromItem<T, Partial<T>>[]>) {\n' +
  'const { t } = useLocale();\n' +
  'const isProd = useRouteIsProd();\n' +
  'const dataTypeEnum = {name}Entity.dataTypeEnum;\n' +
  'const { getDyDbId } = useGetId<T>({\n' +
  'isProd,\n' +
  'dataTypeEnum,\n' +
  '});\n' +
  '\n' +
  'const defaultRules: PartialRecord<\n' +
  'keyof {name}Entity,\n' +
  'IFromValidatorItem[]\n' +
  '> = {\n' +
  '};\n' +
  '\n' +
  'const { rules } = useFormEditRule(\n' +
  'E_ROUTER_NAME.{转下划线大写(name)}_DETAIL,\n' +
  'defaultRules\n' +
  ');\n' +
  '\n' +
  'return useDocEditForm({\n' +
  'formState,\n' +
  'formItems: unref(formItems) as any,\n' +
  'defaultRules: rules,\n' +
  '});\n' +
  '}\n' +
  basicPrompts.importPhaseRule +
  basicPrompts.endPhase;
