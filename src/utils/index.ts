export function camelCaseToUpperCaseUnderscore(str: string) {
  return str.replace(/([a-z])([A-Z])/g, '$1_$2').toUpperCase();
}
const hyphenateRE = /\B([A-Z])/g;
const camelizeRE = /[-_](\w)/g;
/**
 * 驼峰转下划线
 */
export const hyphenate = (str: string) => str?.replace(hyphenateRE, '_$1').toLowerCase();
/**
 * 下划线转驼峰
 */
export const camelize = (str: string) =>
  str?.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''));

export const initial = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
export const deInitial = (str: string) => {
  return str.charAt(0).toLowerCase() + str.slice(1);
};

export const matchCode = (str: string): string => {
  const regex = /```(?:\w+)?\s([\s\S]*?)```/g;
  const match = regex.exec(str);
  if (match) {
    return match?.[1] as string;
  }
  return str;
};

export const extractTableColumns = (mdTable: string, columnsIndex: number[]) => {
  // 切分表格内容为行
  const rows = mdTable.trim().split('\n');

  // 提取某几列数据
  const data = rows.map((row) => {
    // 通过竖线分割行
    const columns = row.split('|');
    // 过滤掉空格和首尾空列
    const filteredColumns = columns.filter((col) => col !== '').map((col) => col.trim());
    // 取前两列数据
    // return `| ${filteredColumns[0]} | ${filteredColumns[1]} |`;
    return `| ${columnsIndex.map((column) => filteredColumns[column]).join(' | ')} |`;
  });

  // 返回Markdown格式的前两列数据
  return data.join('\n');
};

export const getRandomValueFromFirstColumn = (mdTable: string) => {
  // 切分表格内容为行
  const rows = mdTable.trim().split('\n');
  // 获取第一列数据
  const firstColumn = rows.map((row) => {
    // 通过竖线分割行
    const columns = row.split('|');
    // 过滤掉空格和首尾空列
    const filteredColumns = columns.filter((col) => col !== '').map((col) => col.trim());
    return filteredColumns[0];
  });
  const totalNum = firstColumn.length - 2;
  // 去0 - totalNum之间的随机整数
  const randomNum = Math.floor(Math.random() * totalNum);
  return firstColumn[randomNum + 2];
};

export const getAllContentFromFirstColumn = (mdTable: string) => {
  // 切分表格内容为行
  const rows = mdTable.trim().split('\n');
  // 获取第一列数据
  const firstColumn = rows.map((row) => {
    // 通过竖线分割行
    const columns = row.split('|');
    // 过滤掉空格和首尾空列
    const filteredColumns = columns.filter((col) => col !== '').map((col) => col.trim());
    return filteredColumns[0];
  });
  return firstColumn.slice(3);
};
