import { matchCode } from '@/utils/index';
import type { IUsage } from '@/utils/types';

export const fetchGPTResult = async (
  authorization: string,
  engine: string,
  param: { message: string; model?: string; max_tokens?: number; temperature?: number }
): Promise<{
  code?: string;
  message?: string;
  usage?: IUsage;
}> => {
  return new Promise((resolve, reject) => {
    const bodyParams = {
      temperature: 0.2,
      model: 'gpt-3.5-turbo',
      max_tokens: 4096,
      ...param
    };
    fetch('http://rd-gateway.patsnap.info/compute/openai_chatgpt_turbo', {
      method: 'POST',
      headers: {
        Authorization: authorization,
        'X-Ai-Engine': engine
      },
      body: JSON.stringify(bodyParams)
    })
      .then((response) => response.json())
      .then((data) => {
        const message = data.data?.message;
        const code = matchCode(message);
        const usage = data.data?.usage;
        resolve({ message, code, usage });
      })
      .catch((error) => {
        reject(error);
      });
  });
};
