import { basicPrompts } from '@/views/ai/prompts/basicPrompts';

export const apiPrompt =
  basicPrompts.startPhaseWithoutTable +
  '所有的{name}均需要根据给定值进行替换。\n' +
  basicPrompts.templateCode +
  "import { BASE_URL } from '@/constants';\n" +
  "import { IHttpWrap } from '@/service/http';\n" +
  "import { BaseListResponse } from '@/types/BaseTypes';\n" +
  'import {\n' +
  '  {name}SearchParams,\n' +
  '  {name}Dto,\n' +
  "} from '@/types/{name}Type';\n" +
  "import { removeEmptyStringAnfEmptyArray } from '@/utils/common';\n" +
  "import { addUrlPrefix } from '@/utils/http';\n" +
  '\n' +
  "const dyDbHttp = addUrlPrefix('{小写中划线(name)}/dynamodb');\n" +
  "const pgHttp = addUrlPrefix('{小写中划线(name)}/pg')\n" +
  '\n' +
  '/** 线上列表查询 */\n' +
  'export const getDynamodb{name}List = async(params: {name}SearchParams): Promise<IHttpWrap<BaseListResponse<{name}Dto>>> => {\n' +
  '  return dyDbHttp({\n' +
  '    baseURL: BASE_URL,\n' +
  "    url: 'search?view=true',\n" +
  "    method: 'POST',\n" +
  '    data: params,\n' +
  '  });\n' +
  '}\n' +
  '\n' +
  '/** 线下列表查询 */\n' +
  'export const getPg{name}List = async(params: {name}SearchParams): Promise<IHttpWrap<BaseListResponse<{name}Dto>>> => {\n' +
  '  return pgHttp({\n' +
  '    baseURL: BASE_URL,\n' +
  "    url: 'search?view=true',\n" +
  "    method: 'POST',\n" +
  '    data: params,\n' +
  '  });\n' +
  '}\n' +
  '\n' +
  '/** 线上详情查询 */\n' +
  'export const getDynamodb{name}Detail = async (\n' +
  '  id: string\n' +
  '): Promise<IHttpWrap<{name}Dto>> => {\n' +
  '  return dyDbHttp({\n' +
  '    baseURL: BASE_URL,\n' +
  '    url: `${id}?view=true`,\n' +
  "    method: 'GET',\n" +
  '  });\n' +
  '};\n' +
  '\n' +
  '/** 线下详情查询 */\n' +
  'export const getPg{name}Detail = async(id: string): Promise<IHttpWrap<{name}Dto>> => {\n' +
  '  return pgHttp({\n' +
  '    baseURL: BASE_URL,\n' +
  '    url: `${id}?view=true`,\n' +
  "    method: 'GET',\n" +
  '  });\n' +
  '}\n' +
  '\n' +
  '/** 线下详情保存 */\n' +
  'export const submitPg{name} = (\n' +
  '  params: {name}Dto,\n' +
  '  isPublish: boolean\n' +
  '): Promise<IHttpWrap<void>> => {\n' +
  '  return pgHttp({\n' +
  '    baseURL: BASE_URL,\n' +
  "    url: '',\n" +
  "    method: 'POST',\n" +
  '    params: { release: isPublish },\n' +
  '    data: removeEmptyStringAnfEmptyArray(params),\n' +
  '    showErrorMessage: true,\n' +
  '  });\n' +
  '};\n' +
  basicPrompts.importPhaseRule +
  basicPrompts.endPhase;
