import { basicPrompts } from '@/views/ai/prompts/basicPrompts';

const listPrompt =
  basicPrompts.startPhase +
  'fieldNames对象属性为表格中的转为驼峰(XX字段)，属性值为对应字段名称；\n' +
  'placeholder对象属性为表格中的转为驼峰(XX字段)，表格中对应的备注值为ID则属性值为请选择[对应字段名称]，否则属性值为请输入[对应字段名称]；' +
  '请直接罗列出所有key-value，不需要写单独function。\n' +
  '\n' +
  '下面是模板代码：\n' +
  'const fieldNames = {\n' +
  '\txXX: ‘[字段名称]’,\n' +
  '}\n' +
  'const placeholder = {\n' +
  '\txXX: ‘[字段名称]’,\n' +
  '}\n' +
  '\n' +
  'export default {\n' +
  '  columns: { ...fieldNames },\n' +
  '  label: { ...fieldNames },\n' +
  '  placeholder:{ ...placeholder }\n' +
  '}\n' +
  basicPrompts.endPhase;

const searchPrompt = basicPrompts.startPhase;

const detailPrompt = basicPrompts.startPhase;

export const endPrompt =
  'export default {\n' +
  '  columns: { ...columns },\n' +
  '  label: { ...searchFieldNames, ...detailFieldNames },\n' +
  '  placeholder:{ ...searchPlaceholder, ...detailPlaceholder }\n' +
  '}';

export const localePrompts = [
  { prompt: listPrompt, tableType: 'table' },
  { prompt: searchPrompt, tableType: 'search' },
  { prompt: detailPrompt, tableType: 'detail' }
];
