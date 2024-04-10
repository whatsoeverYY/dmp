import { message } from 'ant-design-vue';

export const writeFileIO = (text: string, filepath: string, filename: string) => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:3000/write-file/', {
      method: 'POST',
      // mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ filepath: `${filepath}`, filename, content: text })
    })
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
      });
  });
};
