import { basicPrompts } from '@/views/ai/prompts/basicPrompts';

export const apiPrompt =
  basicPrompts.startPhaseWithoutTable +
  basicPrompts.templateCode +
  '\n' +
  basicPrompts.importPhase +
  basicPrompts.endPhase;
