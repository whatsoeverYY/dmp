export const typePrompt =
  '根据下面表格以及变量生成一段ts 接口代码，要求如下：\n' +
  '接口名称为{name}Dto，这个接口继承IBaseEntityInfoV2，接口中的字段名为下表中数据库 Field 名称，类型为下表中的数据类型，每个字段均是可选字段。在每个字段上方一行加/** 注释 */格式的注释，内容为该字段在下表中对应的字段名称。下面是示例：\n' +
  'export interface {name}Dto extends IBaseEntityInfoV2 {\n' +
  '    /** *字段名称* */\n' +
  '    xxx?: string;*\n' +
  '}\n' +
  '请逐步思考，给出正确代码。\n' +
  '\n';
