import { basicPrompts } from '@/views/ai/prompts/basicPrompts';

const entityPrompt =
  '根据下面表格以及变量生成一段ts class，要求如下：\n' +
  'class名称为{name}Entity，集成BaseReadableEntity<{name}Dto>，并实现BaseEditableEntity<{name}Dto>。\n' +
  '先对定义静态属性dataTypeEnum，类型为DataTypeEnum，值为DATA_TYPE_ENUM[E_DATA_TYPE.{转大写(name)}]。\n' +
  '\n' +
  '再定义constructor，参数为data，类型为{name}Dto，默认值为空对象，并使用ts的as语法认为它的类型为{name}Dto。constructor内调用super方法，传入data参数。\n' +
  '\n' +
  '对表格中所有列表展示值不为No的字段按顺序定义取值函数get\n' +
  '规则1： 每个字段的取值函数名称为 [li][数据库field名称转成首字母大写的驼峰格式] ，返回值为this.data.[数据库field名称(小写下划线格式)]。\n' +
  '规则2：备注值为KEY的字段，在规则1的基础上，增加一下取值函数，名为dyDbId，返回值同规则1。\n' +
  '规则3：最后定义get postData，返回类型为{name}Dto,返回值为this.data.\n' +
  '规则4：除了dyDbId和postData，在每一个取值函数的上方加/** 注释 /格式的单行注释，注释内容为该字段在下表中对应的字段名称值。\n' +
  '\n' +
  '规则5：不需要任何其他的注释说明。\n' +
  '下面是class定义部分以及部分示例：\n' +
  'export class XXXEntity extends BaseReadableEntity<XXXDto> implements BaseEditableEntity<XXXDto> {\n' +
  '\tstatic dataTypeEnum: DataTypeEnum = DATA_TYPE_ENUM[E_DATA_TYPE.XXX];\n' +
  '\t\n' +
  '  get dyDbId() {\n' +
  '    return this.data.deal_id;\n' +
  '  }\n' +
  '  /** 字段名称 */\n' +
  '  get liXxx() {\n' +
  '\n' +
  'return this.data.xxx;\n' +
  '\n' +
  '  }\n' +
  '  get postData(): XXXDto {\n' +
  '    return {\n' +
  '      ...this.data,\n' +
  '    };\n' +
  '  }\n' +
  '}\n' +
  basicPrompts.importPhase +
  basicPrompts.endPhase;

export const entityPrompts = [{ prompt: entityPrompt, tableType: 'table' }];
