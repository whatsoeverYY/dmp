export const basicPrompts = {
  tableAndVariable:
    '根据下面表格以及变量生成一段ts 接口代码，其中涉及到的所有的ts类型或者枚举类型都不需要给出定义，要求如下：\n',
  importPhase: '不需要生成任何import语句，只保留模板中的import语句。\n',
  endPhase: '请逐步思考，给出完整的正确的代码。代码中不需要注明语言类型。\n'
};
