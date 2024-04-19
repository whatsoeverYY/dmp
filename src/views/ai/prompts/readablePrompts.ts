import { basicPrompts } from '@/views/ai/prompts/basicPrompts';

export const readablePrompt =
  basicPrompts.startPhaseWithoutTable +
  basicPrompts.templateCode +
  "import { ReadableFieldFunc } from '@/components/business/DocEditV2/DocEditType';\n" +
  "import { {name}Entity } from '@/domains/{首字母小写(name)}Domain/entity';\n" +
  "import { E_{大写下划线(name)}_DOC_ITEMS } from '@/domains/{首字母小写(name)}Domain/enum';\n" +
  '\n' +
  'export type {name}ReadableFieldFunc =\n' +
  '  ReadableFieldFunc<{name}Entity>;\n' +
  'export function renderReadableField() {\n' +
  'const readableConfig: Partial<\n' +
  'Record<E_{下划线转大写(name)}_DOC_ITEMS, {name}ReadableFieldFunc>\n' +
  '= {\n' +
  '\n' +
  '};\n' +
  'return readableConfig;\n' +
  '}\n' +
  basicPrompts.importPhaseRule +
  basicPrompts.endPhase;
