import { basicPrompts } from '@/views/ai/prompts/basicPrompts';

const transformPrompt =
  basicPrompts.startPhase +
  'function名称为transformSearchForm2PostData，接收参数params，类型为{name}SearchFormParams，返回对象类型为{name}SearchParams。\n' +
  '先对params使用baseTransformSearchForm2PostData方法进行处理，得到baseParams，return baseParams的基础上，再对下面表格中的每个字段用下列规则处理后，按顺序逐个返回。\n' +
  '规则1：基础类型的字段直接从params中取值后返回，params中的字段值是[fe_][下表中的检索字段名]，返回字段名为[下表中的检索字段名]。\n' +
  '规则2：备注值为ID的字段，先使用handleAutoCompleteValue方法处理。再按规则1处理。\n' +
  '规则3：备注值为DATE的字段，在return之前，使用getTimeRange处理，得到[当前字段名][_from]以及[当前字段名][_to]的二元数组返回值，再直接返回。\n' +
  '规则4：在返回对象字段的每一行上方加/** 注释 /格式的单行注释，内容为该字段在下表中对应的字段名称。不需要任何其他的注释说明。\n' +
  basicPrompts.templateCode +
  "import { baseTransformSearchForm2PostData } from '@/domains/baseDomain';\n" +
  'import {\n' +
  '  {name}SearchFormParams,\n' +
  '  {name}SearchParams,\n' +
  "} from '@/types/{name}Type';\n" +
  "import { handleAutoCompleteValue } from '@/utils/drugHelper';\n" +
  "import { getTimeRange } from '@/utils/getTimeRange';\n" +
  '\n' +
  'export function transformSearchForm2PostData(params: {name}SearchFormParams): {name}SearchParams  {\n' +
  'const baseParams = baseTransformSearchForm2PostData(params);\n' +
  'const [[data]_from, [data]_to] = getTimeRange(params.fe_[data]_range)\n' +
  'return {\n' +
  '...baseParams,\n' +
  '/** 字段名 */\n' +
  'a: params.fe_a,\n' +
  '/** 字段名 */\n' +
  '[XX]_id: handleAutoCompleteValue(params.fe_[XX]_id),\n' +
  '[data]_from,\n' +
  '[data]_to,\n' +
  '}\n' +
  '}\n' +
  basicPrompts.importPhaseRule +
  basicPrompts.endPhase;

export const transformPrompts = [
  { prompt: transformPrompt, tableType: 'search', columnIndex: [0, 1, 7] }
];
