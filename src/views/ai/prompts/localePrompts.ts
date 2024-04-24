import { basicPrompts } from '@/views/ai/prompts/basicPrompts';

const endPrompt =
  'export default {\n' +
  '  columns: { ...columns },\n' +
  '  label: { ...searchFieldNames, ...detailFieldNames },\n' +
  '  placeholder:{ ...searchPlaceholder, ...detailPlaceholder }\n' +
  '}';

const listPrompt =
  basicPrompts.startPhase +
  'columns对象属性为表格中的不以_id_view结尾的转驼峰(列表字段)，属性值为对应字段名称；\n' +
  '请直接罗列出所有key-value，不需要写单独function。\n' +
  '\n' +
  '下面是模板代码：\n' +
  'const columns = {\n' +
  '\txXX: ‘[字段名称]’,\n' +
  '}\n' +
  basicPrompts.endPhase;

const searchPrompt =
  basicPrompts.startPhase +
  'searchFieldNames对象属性为表格中的转为驼峰(检索字段)，属性值为对应字段名称；\n' +
  'searchPlaceholder对象属性为表格中的转为驼峰(检索字段)，表格中对应的备注值为ID则属性值为请选择[对应字段名称]，否则属性值为请输入[对应字段名称]；' +
  '请直接罗列出所有key-value，不需要写单独function。\n' +
  '\n' +
  '下面是模板代码：\n' +
  'const searchFieldNames = {\n' +
  '\txXX: ‘[字段名称]’,\n' +
  '}\n' +
  'const searchPlaceholder = {\n' +
  '\txXX: ‘[字段名称]’,\n' +
  '}\n' +
  basicPrompts.endPhase;

const detailPrompt =
  basicPrompts.startPhase +
  'detailFieldNames对象属性为表格中的转为驼峰(详情字段)，属性值为对应字段名称；\n' +
  'detailPlaceholder对象属性为表格中的转为驼峰(详情字段)，表格中对应的备注值为ID则属性值为请选择[对应字段名称]，否则属性值为请输入[对应字段名称]；' +
  '请直接罗列出所有key-value，不需要写单独function。\n' +
  '\n' +
  '下面是模板代码：\n' +
  'const detailFieldNames = {\n' +
  '\txXX: ‘[字段名称]’,\n' +
  '}\n' +
  'const detailPlaceholder = {\n' +
  '\txXX: ‘[字段名称]’,\n' +
  '}\n' +
  endPrompt +
  basicPrompts.endPhase;

export const localePrompts = [
  { prompt: listPrompt, tableType: 'table' },
  { prompt: searchPrompt, tableType: 'search' },
  { prompt: detailPrompt, tableType: 'detail' }
];
