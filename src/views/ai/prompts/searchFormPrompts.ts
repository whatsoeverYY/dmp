import { basicPrompts } from '@/views/ai/prompts/basicPrompts';

const searchPrompt =
  basicPrompts.startPhase +
  '导出一个function，名称为use{name}SearchFormItems，该方法接受一个参数configList，参数的类型为MaybeRef<\n' +
  '    (E_{转大写下划线(name)}_SEARCH_PARAMS | E_BASE_SEARCH_PARAMS)[]\n' +
  '  >。\n' +
  '该方法中首先调用renderFormItems方法，返回renderSelect以及renderAutocompleteInput，如果下面没有用到的话则不写。\n' +
  '定义一个对象formConfig，类型为Record<\n' +
  '    E_{转大写下划线(name)}_SEARCH_PARAMS,\n' +
  '    {name}SearchFormConfig\n' +
  '  >。对象的所有key为下表中的[E_{转大写下划线(name)}_SEARCH_PARAMS.{转大写(检索字段)}]，每个key对应的值为一个对象。' +
  '此对象有一个必选属性field，值为[fe_][检索字段]，如果表中对应RangePicker为RangePicker，则field值为[fe_][检索字段][_range]。\n' +
  '如果表中对应检索方式有值，则对象还有几个可选属性：\n' +
  '一、如果表中对应检索方式值为RangePicker，则添加render属性，属性值为一个函数，具体代码见模板代码。\n' +
  '二、如果表中对应检索方式值为renderXXX，则添加render属性，属性值为renderXXX\n' +
  '三、如果表中对应字典类型列的值为[DICTYPENAMES.XXX]，添加props属性，属性值为{\n' +
  '  fetchImmediate: true,  \n' +
  '  searchFn: getDictTypeList4Autocomplete({实体类型}),  \n' +
  '  multiple: true\n' +
  '}。\n' +
  '四、如果表中对应字典类型值的为无，则添加props属性，属性值值为{\n' +
  "        searchFn: getEntityAutocompleteApi('{实体类型}'),\n" +
  '        multiple: true,\n' +
  '      }\n' +
  '五、如果表中对应字典类型值的为[DICTYPENAMES.CHECK_NOTE],则添加props属性，属性值值为{  \n' +
  'searchFn: (prefix) =>    getDictTypeList4Autocomplete(DICTYPENAMES.*CHECK_NOTE*, genEnCnLabel)(\n' +
  'prefix, \n' +
  '50, \n' +
  '[],\n' +
  "{ term_type: '{实体类型}'}\n" +
  ").then((res) => res.concat({ label: '无', value: '<BLANK>' })),  \n" +
  'fetchImmediate: true,  \n' +
  'multiple: true}\n' +
  basicPrompts.templateCode +
  "import { SearchFormConfigItem } from '@/components/SearchForm';\n" +
  "import { renderFormItems } from '@/components/SearchForm/config';\n" +
  "import { useSearchFormProcessUnit } from '@/compositions/lowcodeConfig/useSearchFormProcessUnit';\n" +
  'import {\n' +
  '  getDictTypeList4Autocomplete,\n' +
  '  getEntityAutocompleteApi,\n' +
  '  genEnCnLabel,\n' +
  "} from '@/constants/business/autocompleteApiV2';\n" +
  "import { E_BASE_SEARCH_PARAMS } from '@/domains/baseDomain/base.enum';\n" +
  "import { E_{大写下划线(name)}_SEARCH_PARAMS } from '@/domains/{首字母小写(name)}Domain/enum';\n" +
  "import { DICTYPENAMES, E_TIME_FORMAT } from '@/type/enum';\n" +
  "import { {name}SearchFormParams } from '@/types/{首字母大写(name)}Type';\n" +
  "import { MaybeRef } from '@vueuse/core';\n" +
  "import { DatePicker } from 'ant-design-vue';\n" +
  '\n' +
  'type XXXSearchFormConfig =\n' +
  'SearchFormConfigItem<XXXSearchFormParams>;\n' +
  'const RangePicker = DatePicker.RangePicker;\n' +
  'export function use{name}SearchFormItems(\n' +
  'configList?: MaybeRef<\n' +
  '(E_X_X_SEARCH_PARAMS | E_BASE_SEARCH_PARAMS)[]\n' +
  '>\n' +
  ') {\n' +
  'const { renderSelect, renderAutocompleteInput } =\n' +
  'renderFormItems<XXXSearchFormParams>();\n' +
  'const formConfig: Record<\n' +
  'E_X_X_SEARCH_PARAMS,\n' +
  'XXXSearchFormConfig\n' +
  '> = {\n' +
  '[E_X_X_SEARCH_PARAMS.XXXX_XXXX]: {\n' +
  "field: 'fe_xxxx_xxxx',\n" +
  '},\n' +
  '[E_CLINICAL_TRIAL_SEARCH_PARAMS.XXXX_ID]: {\n' +
  "field: 'fe_xxxx_id',\n" +
  'render: renderAutocompleteInput,\n' +
  'props: {\n' +
  "searchFn: getEntityAutocompleteApi('xx'),\n" +
  'multiple: true,\n' +
  '},\n' +
  '},\n' +
  '[E_CLINICAL_TRIAL_SEARCH_PARAMS.XXXX_DATE]: {\n' +
  "field: 'fe_x_date_range',\n" +
  'render: (params, config) => {\n' +
  'return (\n' +
  '<RangePicker\n' +
  "style={{ width: '100%' }}\n" +
  "v-model={[params[config.field], 'value']}\n" +
  'format={E_TIME_FORMAT.DD_MMM_YYYY}\n' +
  'valueFormat={E_TIME_FORMAT.DD_MMM_YYYY}\n' +
  '></RangePicker>\n' +
  ');\n' +
  '},\n' +
  '},\n' +
  '}\n' +
  'const { completedConfig, getFormItems, appSearchFormItems } =\n' +
  'useSearchFormProcessUnit(formConfig, { configList });\n' +
  'return {\n' +
  'formConfig: completedConfig,\n' +
  'getFormItems,\n' +
  'appSearchFormItems,\n' +
  '};\n' +
  '}\n' +
  basicPrompts.importPhaseRule +
  basicPrompts.endPhase;

export const searchFormPrompts = [
  { prompt: searchPrompt, tableType: 'search', columnIndex: [0, 1, 4, 5, 6] }
];
