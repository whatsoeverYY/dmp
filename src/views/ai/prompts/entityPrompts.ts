import { basicPrompts } from '@/views/ai/prompts/basicPrompts';

const entityPrompt =
  basicPrompts.startPhase +
  'class名称为{name}Entity，集成BaseReadableEntity<{name}Dto>，并实现BaseEditableEntity<{name}Dto>。\n' +
  '先对定义静态属性dataTypeEnum，类型为DataTypeEnum，值为DATA_TYPE_ENUM[E_DATA_TYPE.{转大写(name)}]。\n' +
  '再定义constructor，参数为data，类型为{name}Dto，默认值为空对象，并使用ts的as语法认为它的类型为{name}Dto。constructor内调用super方法，传入data参数。\n' +
  '定义一个取值函数get id()，函数体为return this.data.id;这部代码不受下面规则的影响，就按照模版代码内容返回。\n' +
  '再对表格中所有字段按顺序定义取值函数get：\n' +
  '规则1： 每个字段的取值函数名称为 [li+转首字母大写驼峰{列表字段}] ，返回值为this.data.[列表字段(小写下划线格式)]。\n' +
  '规则2：列表的第一个id结尾的字段，在规则1的基础上，增加一个取值函数，名为dyDbId，返回值同规则1。\n' +
  '规则3：最后定义get postData，返回类型为{name}Dto,返回值为this.data。\n' +
  '规则4：除了dyDbId和postData，在每一个取值函数的上方加/** 注释 /格式的单行注释，注释内容为该字段在下表中对应的字段名称值。\n' +
  '规则5：列表字段值以_id_view结束的字段不需要添加get函数\n' +
  '规则6：不需要任何其他的注释说明。\n' +
  basicPrompts.templateCode +
  "import { BaseReadableEntity, BaseEditableEntity } from '@/domains/baseDomain';\n" +
  "import { E_DATA_TYPE } from '@/types/DataType';\n" +
  "import { {name}eDto } from '@/types/{首字母大写(name)}Type';\n" +
  "import { DataTypeEnum, DATA_TYPE_ENUM } from '@/utils/dataType';\n" +
  '\n' +
  'export class {name}Entity extends BaseReadableEntity<{name}Dto> implements BaseEditableEntity<XXXDto> {\n' +
  'static dataTypeEnum: DataTypeEnum = DATA_TYPE_ENUM[E_DATA_TYPE.{转大写(name)}];\n' +
  '\n' +
  '  constructor(data: {name}Dto = {}) {\n' +
  '    super(data as {name}Dto);\n' +
  '  }' +
  '\n' +
  '  get id() {\n' +
  '    return this.data.id;\n' +
  '  }\n' +
  '  get dyDbId() {\n' +
  '    return this.data.xx_xx_id;\n' +
  '  }\n' +
  '  /** 字段名称 */\n' +
  '  get liXxx() {\n' +
  '    return this.data.xxx;\n' +
  '  }\n' +
  '  /** 字段名称 */\n' +
  '  get liXxxId() {\n' +
  '    return this.data.xxx_id;\n' +
  '  }\n' +
  '  get postData(): XXXDto {\n' +
  '    return {\n' +
  '      ...this.data,\n' +
  '    };\n' +
  '  }\n' +
  '}\n' +
  basicPrompts.importPhaseRule +
  basicPrompts.endPhase;

export const entityPrompts = [{ prompt: entityPrompt, tableType: 'table', columnIndex: [0, 1] }];
