export const basicPrompts = {
  startPhase:
    '根据下面表格、模版代码、变量生成一段ts代码，所有显示声明的ts类型都需要保留，模板代码中的常量内容不做任何变更，要求如下：\n',
  startPhaseWithoutTable:
    '根据下面模版代码、变量生成一段ts代码，所有显示声明的ts类型都需要保留，要求如下：\n',
  importPhaseRule: '保留模板中的import语句。\n',
  noImports: '不生成任何import语句。\n',
  endPhase: '请逐步思考，给出完整的正确的代码。\n',
  comment:
    '对应字段名称值没有值的字段直接写类型定义。' +
    '在对应字段名称有值的字段上方一行加/** 注释 */格式的单行注释，内容为该字段在下表中对应的字段名称值。\n',
  templateCode: '模板代码：\n'
};

export const columnNames = {
  tableField: '列表字段',
  searchField: '检索字段',
  detailField: '详情字段',
  dataType: '数据类型',
  note: '备注'
};
