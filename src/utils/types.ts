export interface IUsage {
  completion_tokens: number;
  prompt_tokens: number;
  total_tokens: number;
}

export interface ILLMData {
  code: string;
  message: string;
  usage: IUsage;
}
