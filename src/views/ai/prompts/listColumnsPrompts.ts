import { basicPrompts } from '@/views/ai/prompts/basicPrompts';

const tablePrompt =
  basicPrompts.startPhase +
  'columnConfig对象中的key为下表中的[E_{转大写下划线(name)}_LIST_COLUMNS.{转大写(列表字段)}]，每个key对应的值为一个对象。' +
  '此对象有一个必选属性field，值为[li][转首字母大写驼峰(列表字段)]。\n' +
  '备注列的值为KEY的字段，field值为dyDbId；列表字段值以_id_view结尾的字段不在columnConfig中添加，其余遵循上述规则。\n' +
  basicPrompts.templateCode +
  'export function useXXXListColumns() {\n' +
  'const columnConfig: PartialRecord<\n' +
  'E_XX_XX_LIST_COLUMNS,\n' +
  'GTableColumn<XXXEntity, E_XX_XX_LIST_COLUMNS>\n' +
  '= {\n' +
  '[E_XX_XX_LIST_COLUMNS.XX_XX_ID]: {\n' +
  "field: 'dyDbId',\n" +
  '},\n' +
  '[E_XX_XX_LIST_COLUMNS.XX_XX]: {\n' +
  "field: 'liXxXx',\n" +
  '},\n' +
  '}\n' +
  'const { completedConfig } = useTableListProcessUnit(columnConfig);\n' +
  'return {\n' +
  'tableListConfig: completedConfig,\n' +
  '};\n' +
  '}\n' +
  basicPrompts.importPhase +
  basicPrompts.endPhase;

export const listColumnsPrompts = [{ prompt: tablePrompt, tableType: 'table' }];
