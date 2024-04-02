import { basicPrompts } from '@/views/ai/prompts/basicPrompts';

const dtoPrompt =
  basicPrompts.tableAndVariable +
  '接口名称为{name}Dto，这个接口继承IBaseEntityInfoV2，接口中的字段名为下表中数据库 Field 名称，类型为下表中的数据类型，每个字段均是可选字段。在每个字段上方一行加/** 注释 */格式的注释，内容为该字段在下表中对应的字段名称。下面是示例：\n' +
  'export interface {name}Dto extends IBaseEntityInfoV2 {\n' +
  '    /** *字段名称* */\n' +
  '    xxx?: string;*\n' +
  '}\n' +
  basicPrompts.importPhase +
  basicPrompts.endPhase;

const searchParamsPrompt =
  basicPrompts.tableAndVariable +
  '接口名称为{name}SearchParams，这个接口继承BaseSearchParamsV2，接口中的字段名为下表中的检索字段名，类型为下表中的检索字段数据类型。\n' +
  '如果某字段的备注值为DATE，则生成两个字段，字段名为[当前字段名][_from]以及[当前字段名][_to]，类型均为string | number。\n' +
  '每个字段均是可选字段。\n' +
  '在每个字段上方一行加/** 注释 */格式的单行注释，内容为该字段在下表中对应的字段名称。下面是示例：\n' +
  'export interface {name}SearchParams extends BaseSearchParamsV2 {\n' +
  '/** *字段名称* */\n' +
  'xxx?: string;\n' +
  '/** *字段名称* */\n' +
  'xx?: string[];\n' +
  '}\n' +
  basicPrompts.importPhase +
  basicPrompts.endPhase;

const searchFormParamsPrompt =
  basicPrompts.tableAndVariable +
  '接口名称为{name}SearchFormParams，这个接口继承BaseSearchFormParams，接口中的字段名为[fe_][下表中的检索字段名]，类型为下表中的检索字段数据类型。\n' +
  '如果某字段的备注值为DATE，则字段名为[fe_][当前字段名][_range]，类型为number[]。\n' +
  '每个字段均是可选字段。\n' +
  '在每个字段上方一行加/** 注释 */格式的单行注释，内容为该字段在下表中对应的字段名称。下面是示例：\n' +
  'export interface {name}SearchParams extends BaseSearchParamsV2 {\n' +
  '/** *字段名称* */\n' +
  'xxx?: string;\n' +
  '/** *字段名称* */\n' +
  'xx?: IAutoCompleteInputValue[];\n' +
  '}\n' +
  basicPrompts.importPhase +
  basicPrompts.endPhase;

export const typePrompt = [
  { prompt: dtoPrompt, tableType: 'table' },
  { prompt: searchParamsPrompt, tableType: 'search' },
  { prompt: searchFormParamsPrompt, tableType: 'search' }
];
