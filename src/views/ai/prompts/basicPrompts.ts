export const basicPrompts = {
  startPhase:
    '根据下面表格、示例代码、变量生成一段ts代码，其中涉及到的所有的ts类型或者枚举类型都不需要给出定义，要求如下：\n',
  startPhaseWithoutTable:
    '根据下面示例代码、变量生成一段ts代码，其中涉及到的所有的ts类型或者枚举类型都不需要给出定义，要求如下：\n',
  importPhase: '不需要生成任何import语句，只保留模板中的import语句。\n',
  endPhase: '请逐步思考，给出完整的正确的代码。生成的代码中不需要注明语言类型。\n',
  comment:
    '对应字段名称值没有值的字段直接写类型定义。' +
    '在对应字段名称有值的字段上方一行加/** 注释 */格式的单行注释，内容为该字段在下表中对应的字段名称值。\n',
  templateCode: '示例代码：\n'
};

export const columnNames = {
  tableField: '列表字段',
  searchField: '检索字段',
  detailField: '详情字段',
  dataType: '数据类型',
  note: '备注'
};
