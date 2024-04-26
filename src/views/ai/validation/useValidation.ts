import { getAllContentFromFirstColumn, initial, camelize } from '@/utils';
import { computed } from 'vue';

export function useValidation(props: {
  tableValue: string;
  searchValue: string;
  detailValue: string;
}) {
  const allTableFields = computed(() => getAllContentFromFirstColumn(props.tableValue));
  const allSearchFields = computed(() => getAllContentFromFirstColumn(props.searchValue));
  const allDetailFields = computed(() => getAllContentFromFirstColumn(props.detailValue));

  /**
   * 校验所有字段是否生成
   */
  const checkAllFields = (content: string, fieldsArr: string[]) => {
    return fieldsArr.every((field) => {
      console.log(`检验内容：${field}`);
      return content.includes(field);
    });
  };

  const checkTableFields = (
    data: string,
    upper = false,
    handleField = (str: string) => str
  ): string => {
    const allTableFieldsCheck = checkAllFields(
      data,
      allTableFields.value.map((ele) => (upper ? handleField(ele.toUpperCase()) : handleField(ele)))
    );
    if (!allTableFieldsCheck) {
      return '表格字段存在遗漏';
    }
    return '';
  };

  const checkTableFieldsWithoutView = (
    data: string,
    upper = false,
    handleField = (str: string) => str
  ): string => {
    const allTableFieldsCheck = checkAllFields(
      data,
      allTableFields.value
        .filter((ele) => !ele.includes('_id_view'))
        .map((ele) => (upper ? handleField(ele.toUpperCase()) : handleField(ele)))
    );
    if (!allTableFieldsCheck) {
      return '表格字段存在遗漏';
    }
    return '';
  };

  const checkSearchFields = (
    data: string,
    upper = false,
    handleField = (str: string) => str
  ): string => {
    const allSearchFieldsCheck = checkAllFields(
      data,
      allSearchFields.value.map((ele) =>
        upper ? handleField(ele.toUpperCase()) : handleField(ele)
      )
    );
    if (!allSearchFieldsCheck) {
      return '检索字段存在遗漏';
    }
    return '';
  };

  const checkDetailFields = (
    data: string,
    upper = false,
    handleField = (str: string) => str
  ): string => {
    const allDetailFieldsCheck = checkAllFields(
      data,
      allDetailFields.value.map((ele) =>
        upper ? handleField(ele.toUpperCase()) : handleField(ele)
      )
    );
    if (!allDetailFieldsCheck) {
      return '详情字段存在遗漏';
    }
    return '';
  };

  const typeAfterGenerateCheck = (data: string) => {
    return [checkTableFields(data), checkSearchFields(data)].filter((ele) => !!ele).join(', ');
  };

  const checkExtraIdView = (data: string) => {
    if (data.includes('IdView') || data.includes('_id_view')) {
      return '生成了多余的_id_view字段';
    }
    return '';
  };

  const entityAfterGenerateCheck = (data: string) => {
    const msg = [
      checkTableFieldsWithoutView(data, false, (str) => `li${initial(camelize(str))}`),
      checkExtraIdView(data)
    ];
    if (!data.includes('get id()')) {
      msg.push('没有生成id的取值函数');
    }
    if (!data.includes('get dyDbId()')) {
      msg.push('dyDbId的取值函数');
    }

    return msg.join(', ');
  };

  const enumAfterGenerateCheck = (data: string) => {
    return [
      checkTableFieldsWithoutView(data, true),
      checkSearchFields(data, true),
      checkDetailFields(data, true)
    ]
      .filter((ele) => !!ele)
      .join(', ');
  };

  const transformAfterGenerateCheck = (data: string) => {
    return [checkSearchFields(data)].filter((ele) => !!ele).join(', ');
  };

  const i18nAfterGenerateCheck = (data: string) => {
    return [
      checkTableFieldsWithoutView(data, false, camelize),
      checkSearchFields(data, false, camelize),
      checkDetailFields(data, false, camelize)
    ]
      .filter((ele) => !!ele)
      .join(', ');
  };

  const searchFormAfterGenerateCheck = (data: string) => {
    return [checkSearchFields(data, false), checkSearchFields(data, false, (str) => `fe_${str}`)]
      .filter((ele) => !!ele)
      .join(', ');
  };

  const listColumnAfterGenerateCheck = (data: string) => {
    return [
      checkTableFieldsWithoutView(data, true),
      checkTableFieldsWithoutView(data, false, (str) => `li${initial(camelize(str))}`),
      checkExtraIdView(data)
    ]
      .filter((ele) => !!ele)
      .join(', ');
  };

  /**
   * 列表文件检查
   */
  const listPageAfterGenerateCheck = (data: string) => {
    const msg = [checkTableFieldsWithoutView(data, true), checkSearchFields(data, true)].filter(
      (ele) => !!ele
    );
    const baseSearch = 'E_BASE_SEARCH_PARAMS.';
    const baseTable = 'E_BASE_TABLE_COLUMN.';
    if (!data.includes(baseSearch)) {
      msg.push('E_BASE_SEARCH_PARAMS字段未生成');
    }
    if (!data.includes(baseTable)) {
      msg.push('E_BASE_TABLE_COLUMN字段未生成');
    }
    return msg.join(', ');
  };

  const docEditAfterGenerateCheck = (data: string) => {
    return [
      checkDetailFields(data, true),
      checkDetailFields(data, false, (str) => `li${initial(camelize(str))}`)
    ]
      .filter((ele) => !!ele)
      .join(', ');
  };

  const editPageAfterGenerateCheck = (data: string) => {
    return [checkDetailFields(data, true)].filter((ele) => !!ele).join(', ');
  };

  return {
    typeAfterGenerateCheck,
    entityAfterGenerateCheck,
    enumAfterGenerateCheck,
    transformAfterGenerateCheck,
    i18nAfterGenerateCheck,
    searchFormAfterGenerateCheck,
    listColumnAfterGenerateCheck,
    listPageAfterGenerateCheck,
    docEditAfterGenerateCheck,
    editPageAfterGenerateCheck
  };
}
