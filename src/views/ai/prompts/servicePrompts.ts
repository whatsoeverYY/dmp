import { basicPrompts } from '@/views/ai/prompts/basicPrompts';

export const servicePrompt =
  basicPrompts.startPhaseWithoutTable +
  '类名为{name}DomainService，其中定义两个函数分别为getList和getDetail，函数入参及其类型定义、函数体如下示例\n' +
  basicPrompts.templateCode +
  'import {\n' +
  '  getDynamodb{name}List,\n' +
  '  getPg{name}List,\n' +
  '  getPg{name}Detail,\n' +
  '  getDynamodb{name}Detail,\n' +
  "} from '@/apis/{首字母小写(name)}';\n" +
  "import { DATA_SOURCE } from '@/constants/enum';\n" +
  "import { BaseDomainService } from '@/domains/baseDomain';\n" +
  "import { {name}Entity } from '@/domains/{首字母小写(name)}Domain/entity';\n" +
  "import { {name}SearchFormParams } from '@/types/{name}Type';\n" +
  "import { transformSearchForm2PostData } from './transform';\n" +
  '\n' +
  "import { transformSearchForm2PostData } from './transform';\n" +
  '\n' +
  'class {name}DomainService extends BaseDomainService {\n' +
  'public transformSearchForm2PostData = transformSearchForm2PostData;\n' +
  '\n' +
  'async getList(\n' +
  '  dataSource: DATA_SOURCE,\n' +
  '  params: {name}SearchFormParams,\n' +
  '  override: {name}SearchFormParams = {}\n' +
  ') {\n' +
  '    const fetchList =\n' +
  '  dataSource === DATA_SOURCE.PROD\n' +
  '    ? getDynamodb{name}List\n' +
  '    : getPg{name}List;\n' +
  'const postParams = this.overrideParams(\n' +
  '  params,\n' +
  '  override,\n' +
  '  transformSearchForm2PostData\n' +
  ');\n' +
  'const rt = await getDynamodb{name}List(postParams);\n' +
  '\n' +
  'return this.generateItemList(rt, (i) => new {name}Entity(i));\n' +
  '}\n' +
  '\n' +
  '  async getDetail(dataSource: DATA_SOURCE, id: string) {\n' +
  '    const fetchDetail =\n' +
  '      dataSource === DATA_SOURCE.PROD\n' +
  '        ? getDynamodb{name}Detail\n' +
  '        : getPg{name}Detail;\n' +
  '    const rt = await fetchDetail(id);\n' +
  '    if (rt.success && rt.data) {\n' +
  '      return new {name}Entity(rt.data);\n' +
  '    }\n' +
  '    return new {name}Entity();\n' +
  '  }\n' +
  '\n' +
  '}\n' +
  'export const {name}Service = new {name}DomainService().getProxyInstance();\n' +
  basicPrompts.importPhaseRule +
  basicPrompts.endPhase;
