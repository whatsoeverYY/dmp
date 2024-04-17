import { basicPrompts } from '@/views/ai/prompts/basicPrompts';

const listPrompt =
  basicPrompts.startPhase +
  'enum名称为E_{转下划线大写(name)}_LIST_COLUMNS。\n' +
  'enum中的每个枚举成员为下表中的[转为大写(列表字段)]。\n' +
  'enum中的每个枚举成员的值为下表中的[转为大写(列表字段)]。\n' +
  '在每个字段上方一行加/** 注释 */格式的注释，内容为该字段在下表中对应的字段名称。\n' +
  basicPrompts.templateCode +
  'export const enum E_XXX_LIST_COLUMNS {\n' +
  ' /** 字段名称 */\n' +
  " XX_XX = 'XX_XX';\n" +
  '}\n' +
  basicPrompts.noImports +
  basicPrompts.endPhase;

const searchPrompt =
  basicPrompts.startPhase +
  'enum名称为E_{转下划线大写(name)}_SEARCH_PARAMS。\n' +
  'enum中的每个枚举成员为下表中的[转为大写(检索字段)]。\n' +
  'enum中的每个枚举成员的值为下表中的[转为大写(检索字段)]。\n' +
  '在每个字段上方一行加/** 注释 */格式的注释，内容为该字段在下表中对应的字段名称。\n' +
  basicPrompts.templateCode +
  'export const enum E_XXX_SEARCH_PARAMS {\n' +
  ' /** 字段名称 */\n' +
  " XX_XX = 'XX_XX';\n" +
  '}\n' +
  basicPrompts.noImports +
  basicPrompts.endPhase;

const detailPrompt =
  basicPrompts.startPhase +
  'enum名称为E_{转下划线大写(name)}_DOC_ITEMS。\n' +
  'enum中的每个枚举成员为下表中的[转为大写(详情字段)]。\n' +
  'enum中的每个枚举成员的值为下表中的[转为大写(详情字段)]。\n' +
  '在每个字段上方一行加/** 注释 */格式的注释，内容为该字段在下表中对应的字段名称。\n' +
  basicPrompts.templateCode +
  'export const enum E_XXX_DOC_ITEMS {\n' +
  ' /** 字段名称 */\n' +
  " XX_XX = 'XX_XX';\n" +
  '}\n' +
  basicPrompts.noImports +
  basicPrompts.endPhase;

export const enumPrompts = [
  { prompt: listPrompt, tableType: 'table' },
  { prompt: searchPrompt, tableType: 'search' },
  { prompt: detailPrompt, tableType: 'detail' }
];
