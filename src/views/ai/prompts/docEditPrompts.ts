import { basicPrompts } from '@/views/ai/prompts/basicPrompts';

const detailPrompt =
  basicPrompts.startPhase +
  '导出一个function，名称为use{name}DocEdit，接收对象参数opt，opt有一个必选属性configList，类型为PreFilterConfigType<\n' +
  '    E_{转下划线大写(name)}_DOC_ITEMS | E_BASE_DOC_EDIT_FORM\n' +
  '  >[]。\n' +
  '定义readableConfig和editableConfig两个常量，其值分别为调用renderReadableField和renderEditableField函数的结果。\n' +
  '定义docEditConfig常量，类型为PartialRecord<\n' +
  '    E_{转下划线大写(name)}_DOC_ITEM,\n' +
  '    IFormConfigItem<{name}Entity>\n' +
  '  >，值为一个对象，对象的key为下表中的[E_{转大写下划线(name)}_DOC_ITEM.{转大写(详情字段)}]，每个key对应的值为一个对象。此对象的生成遵循以下几个规则：\n' +
  '规则一：此对象有一个必选属性field，如果表中对应可编辑列的值为-1，则值为dyDbId；如果表中对应可编辑列的值为0，值为[li][转首字母大写驼峰(详情字段)]，如果表中对应可编辑列的值为1，则field值为[li][转首字母大写驼峰(详情字段)]。\n' +
  '规则二：如果表中对应可编辑列的值为0或-1，增加可选属性readonly，值为true。\n' +
  '规则三：如果表中对应所占列数值大于1，则增加可选属性span，值为[所占列数]，值为1则不添加span属性。\n' +
  '最后调用useDocEditProcessUnit，并return。' +
  basicPrompts.templateCode +
  "import { IFormConfigItem } from '@/components/business/DocEditV2/DocEditType';\n" +
  "import { E_BASE_DOC_EDIT_FORM } from '@/components/business/DocEditV2/enum';\n" +
  "import { useDocEditProcessUnit } from '@/compositions/lowcodeConfig/useDocEditProcessUnit';\n" +
  "import { PreFilterConfigType } from '@/compositions/lowcodeConfig/utils';\n" +
  "import { {name}Entity } from '@/domains/{首字母小写(name)}Domain/entity';\n" +
  "import { E_{大写下划线(name)}_DOC_ITEMS } from '@/domains/{首字母小写(name)}Domain/enum';\n" +
  "import { renderEditableField } from '../config/renderEditableField';\n" +
  "import { renderReadableField } from '../config/renderReadableField';\n" +
  '\n' +
  'export function use{name}DocEdit(opt: {\n' +
  'configList: PreFilterConfigType<\n' +
  'E_XX_XX_DOC_ITEMS | E_BASE_DOC_EDIT_FORM\n' +
  '\n' +
  '[];\n' +
  '}) {\n' +
  'const readableConfig = renderReadableField();\n' +
  'const editableConfig = renderEditableField();\n' +
  'const docEditConfig: Record<\n' +
  'E_XX_XX_DOC_ITEMS,\n' +
  'IFormConfigItem<XXXEntity>\n' +
  '= {\n' +
  '[E_XX_XX_DOC_ITEMS.XX_XXX_ID]: {\n' +
  "field: 'dyDbId',\n" +
  '},\n' +
  '[E_XX_XX_DOC_ITEMS.XX_XX]: {\n' +
  "field: 'liXxXx',\n" +
  'readonly: true,\n' +
  'span: 2,\n' +
  '},\n' +
  '[E_XX_XX_DOC_ITEMS.XX_XX_ID]: {\n' +
  "field: 'liXxXxId',\n" +
  '},\n' +
  '};\n' +
  '\n' +
  'const { completedConfig, getDocEditItems, appDocItems } =\n' +
  'useDocEditProcessUnit(docEditConfig, {\n' +
  'readableConfig,\n' +
  'editableConfig,\n' +
  'configList: opt.configList,\n' +
  '});\n' +
  'return {\n' +
  'docEditConfig,\n' +
  'completedConfig,\n' +
  'getDocEditItems,\n' +
  'appDocItems,\n' +
  '};\n' +
  '}\n' +
  basicPrompts.importPhaseRule +
  basicPrompts.endPhase;

export const docEditPrompts = [{ prompt: detailPrompt, tableType: 'detail' }];
