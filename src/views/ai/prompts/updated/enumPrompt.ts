import { basicPrompts } from '@/views/ai/prompts/basicPrompts';

export const enumPrompt =
  basicPrompts.startPhase +
  '导出三个enum，分别为：\n' +
  'enum E_{转下划线大写(name)}_SEARCH_PARAMS，' +
  'enum中的每个枚举成员为检索字段表格中的[转为大写(检索字段)]。\n' +
  'enum中的每个枚举成员的值为检索字段表格中的[转为大写(检索字段)]。\n' +
  'enum E_{转下划线大写(name)}_LIST_COLUMNS，' +
  'enum中的每个枚举成员为列表字段表格中的[转为大写(列表字段)]。\n' +
  'enum中的每个枚举成员的值为列表字段表格中的[转为大写(列表字段)]。\n' +
  'enum E_{转下划线大写(name)}_DOC_ITEMS，' +
  'enum中的每个枚举成员为详情字段表格中的[转为大写(详情字段)]。\n' +
  'enum中的每个枚举成员的值为详情字段表格中的[转为大写(详情字段)]。\n' +
  '在每个字段上方一行加/** 注释 */格式的注释，内容为该字段在下表中对应的字段名称。\n' +
  basicPrompts.templateCode +
  'export const enum E_{转下划线大写(name)}_SEARCH_PARAMS {\n' +
  ' /** 字段名称 */\n' +
  " XX_XX = '[转为大写(检索字段)]';\n" +
  '}\n' +
  '\n' +
  'export const enum E_{转下划线大写(name)}_LIST_COLUMNS {\n' +
  ' /** 字段名称 */\n' +
  " XX_XX = '[转为大写(列表字段)]';\n" +
  '}\n' +
  '\n' +
  'export const enum E_{转下划线大写(name)}_DOC_ITEMS {\n' +
  ' /** 字段名称 */\n' +
  " XX_XX = '[转为大写(详情字段)]';\n" +
  '}\n' +
  basicPrompts.noImports +
  basicPrompts.endPhase;
