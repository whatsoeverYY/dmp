const writeFile = (
  url: string,
  params: { filepath: string; content: string | string[]; start: string | string[] }
) => {
  return new Promise((resolve) => {
    fetch(url, {
      method: 'POST',
      // mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
      });
  });
};
export const writeFileDataType = (params: { filepath: string; content: string; start: string }) => {
  return writeFile('http://localhost:3000/write-data-type/', params);
};
export const writeFileDataTypeEnum = (params: {
  filepath: string;
  content: string;
  start: string;
}) => {
  return writeFile('http://localhost:3000/write-data-type-enum/', params);
};
export const writeFileTypeRouter = (params: {
  filepath: string;
  content: string[];
  start: string[];
}) => {
  return writeFile('http://localhost:3000/write-router/', params);
};
export const writeFileTypeRouterData = (params: {
  filepath: string;
  content: string[];
  start: string[];
}) => {
  return writeFile('http://localhost:3000/write-router-data/', params);
};
export const writeFileCn = (params: { filepath: string; content: string[]; start: string[] }) => {
  return writeFile('http://localhost:3000/write-cn/', params);
};
