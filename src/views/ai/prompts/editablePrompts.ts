import { basicPrompts } from '@/views/ai/prompts/basicPrompts';

export const editablePrompt =
  basicPrompts.startPhaseWithoutTable +
  basicPrompts.templateCode +
  "import { EditableFieldFunc } from '@/components/business/DocEditV2/DocEditType';\n" +
  "import { {name}Entity } from '@/domains/{首字母小写(name)}Domain/entity';\n" +
  "import { E_{大写下划线(name)}_DOC_ITEMS } from '@/domains/{首字母小写(name)}Domain/enum';\n" +
  '\n' +
  'export type {name}EditableFieldFunc =\n' +
  '  EditableFieldFunc<{name}Entity>;\n' +
  'export function renderEditableField() {\n' +
  'const editableConfig: Partial<\n' +
  'Record<E_{下划线转大写(name)}_DOC_ITEMS, {name}EditableFieldFunc>\n' +
  '= {\n' +
  '\n' +
  '};\n' +
  'return editableConfig;\n' +
  '}\n' +
  basicPrompts.importPhaseRule +
  basicPrompts.endPhase;
