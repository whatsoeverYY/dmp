import { basicPrompts } from '@/views/ai/prompts/basicPrompts';

const dtoPrompt =
  basicPrompts.startPhase +
  '接口名称为{name}Dto，这个接口继承IBaseEntityInfoV2，接口中的字段名为下表中列表字段，类型为下表中的数据类型值，每个字段均是可选字段。\n' +
  basicPrompts.comment +
  basicPrompts.templateCode +
  'export interface {name}Dto extends IBaseEntityInfoV2 {\n' +
  '    /** *字段名称* */\n' +
  '    xxx?: string;*\n' +
  '    /** *字段名称* */\n' +
  '    xxx_id?: string[];\n' +
  '    xxx_id_view?: BaseNameInfo[];\n' +
  '}\n' +
  basicPrompts.noImports +
  basicPrompts.endPhase;

const searchParamsPrompt =
  basicPrompts.startPhase +
  '接口名称为{name}SearchParams，这个接口继承BaseSearchParamsV2，接口中的字段名为下表中的检索字段，类型为下表中的检索类型值。\n' +
  '如果某字段的备注值为DATE，则生成两个字段，字段名为[检索字段][_from]以及[检索字段][_to]，类型均为string | number。\n' +
  '每个字段均是可选字段。\n' +
  basicPrompts.comment +
  basicPrompts.templateCode +
  'export interface {name}SearchParams extends BaseSearchParamsV2 {\n' +
  '/** 字段名称 */\n' +
  'xxx?: string;\n' +
  '}\n' +
  basicPrompts.noImports +
  basicPrompts.endPhase;

const searchFormParamsPrompt =
  basicPrompts.startPhase +
  '接口名称为{name}SearchFormParams，这个接口继承BaseSearchFormParams，接口中的字段名为[fe_][检索字段]，类型为下表中的展示数据值。\n' +
  '如果某字段的备注值为DATE，则字段名为[fe_][检索字段][_range]，类型为number[]。\n' +
  '每个字段均是可选字段。\n' +
  basicPrompts.comment +
  basicPrompts.templateCode +
  'export interface {name}SearchParams extends BaseSearchParamsV2 {\n' +
  '/** *字段名称* */\n' +
  'xxx?: string;\n' +
  '/** *字段名称* */\n' +
  'xx?: IAutoCompleteInputValue[];\n' +
  '}\n' +
  basicPrompts.noImports +
  basicPrompts.endPhase;

export const typePrompt = [
  { prompt: dtoPrompt, tableType: 'table' },
  { prompt: searchFormParamsPrompt, tableType: 'search' },
  { prompt: searchParamsPrompt, tableType: 'search' }
];
