import { basicPrompts } from '@/views/ai/prompts/basicPrompts';

export const typePrompt =
  basicPrompts.startPhase +
  '导出三个接口，分别为：\n' +
  '1. 接口{name}Dto，这个接口继承IBaseEntityInfoV2，接口中的字段名为列表字段表格中的列表字段，类型为列表字段表格中中的数据类型值，每个字段均是可选字段。\n' +
  '2. 接口{name}SearchParams，这个接口继承BaseSearchParamsV2，接口中的字段名为检索字段表格中的检索字段，类型为检索字段表格中的检索类型值。\n' +
  '如果某字段的备注值为DATE，则生成两个字段，字段名为[检索字段][_from]以及[检索字段][_to]，类型均为string | number。\n' +
  '每个字段均是可选字段。\n' +
  '3. 接口{name}SearchFormParams，这个接口继承BaseSearchFormParams，接口中的字段名为检索字段表格中的[fe_][检索字段]，类型为检索字段表格中的展示数据值。\n' +
  '如果某字段的备注值为DATE，则字段名为[fe_][检索字段][_range]，类型为number[]。\n' +
  '每个字段均是可选字段。\n' +
  basicPrompts.comment +
  basicPrompts.templateCode +
  "import { IAutoCompleteInputValue } from '@/components/inputs';\n" +
  'import {\n' +
  '  IBaseEntityInfoV2,\n' +
  '  BaseSearchParamsV2,\n' +
  '  BaseCodeItemV2,\n' +
  '  BaseNormalizedNameInfo,\n' +
  '  BaseNameInfo,\n' +
  '  BaseSearchFormParams,\n' +
  "} from '@/types/BaseTypes';" +
  'export interface {name}Dto extends IBaseEntityInfoV2 {\n' +
  '    /** *字段名称* */\n' +
  '    xxx?: string;*\n' +
  '    /** *字段名称* */\n' +
  '    xxx_id?: string[];\n' +
  '    xxx_id_view?: BaseNameInfo[];\n' +
  '}\n' +
  'export interface {name}SearchParams extends BaseSearchParamsV2 {\n' +
  '/** 字段名称 */\n' +
  'xxx?: string;\n' +
  '/** *字段名称* */\n' +
  'xx?: string[];\n' +
  '}\n' +
  'export interface {name}SearchFormParams extends BaseSearchFormParams {\n' +
  '/** *字段名称* */\n' +
  'xxx?: string;\n' +
  '/** *字段名称* */\n' +
  'xx?: IAutoCompleteInputValue[];\n' +
  '}\n' +
  basicPrompts.importPhaseRule +
  basicPrompts.endPhase;
