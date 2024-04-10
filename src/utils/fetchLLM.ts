export const fetchGPTResult = async (prompt: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fetch('http://rd-gateway.patsnap.info/compute/openai_chatgpt_turbo', {
      method: 'POST',
      headers: {
        Authorization: ''
      },
      body: JSON.stringify({ message: prompt, temperature: 0.1, model: 'gpt-3.5-turbo-16k' })
    })
      .then((response) => response.json())
      .then((data) => {
        resolve(data.data.message);
      });
  });
};
