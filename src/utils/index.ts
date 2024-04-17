export function camelCaseToUpperCaseUnderscore(str: string) {
  return str.replace(/([a-z])([A-Z])/g, '$1_$2').toUpperCase();
}

export const initial = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
export const deInitial = (str: string) => {
  return str.charAt(0).toLowerCase() + str.slice(1);
};

export const matchCode = (str: string): string => {
  const regex = /```(?:\w+)?\s([\s\S]*?)```/g;
  const match = regex.exec(str);
  if (match) {
    return match?.[1] as string;
  }
  return str;
};
