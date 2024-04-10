import { basicPrompts } from '@/views/ai/prompts/basicPrompts';

export const routerPrompt =
  basicPrompts.startPhaseWithoutTable +
  '导出常量{name}Routes，类型为CustomRouteRecord' +
  basicPrompts.templateCode +
  'export const {name}Routes: CustomRouteRecord = {\n' +
  "  path: '/{转小写横杠(name)}',\n" +
  '  component: RouterView,\n' +
  '  name: E_ROUTER_NAME.{转下划线大写(name)},\n' +
  '  meta: {\n' +
  "    title: 'menus.dataSubMenus.{首字母小写(name)}',\n" +
  "    icon: 'icon-{name}',\n" +
  "    breadcrumbName: '{nameCn}',\n" +
  '    redirect: true,\n' +
  "    countKeyPath: '{name}.total',\n" +
  "    permCode: 'data.{首字母小写(name)}',\n" +
  '  },\n' +
  '  children: [\n' +
  '    {\n' +
  "      path: 'preview',\n" +
  '      name: E_ROUTER_NAME.{转下划线大写(name)}_LIST,\n' +
  "      component: () => import('@/views/{首字母小写(name)}/{name}PreviewList'),\n" +
  '      meta: {\n' +
  "        breadcrumbName: '线上列表',\n" +
  "        title: 'commonSubMenus.preview',\n" +
  "        permCode: 'data.{name}.preview',\n" +
  '      },\n' +
  '    },\n' +
  '    {\n' +
  '      path: `detail/:${E_ROUTER_PARAMS.{转下划线大写(name)}_ID}`,\n' +
  '      name: E_ROUTER_NAME.{转下划线大写(name)}_DETAIL,\n' +
  '      component: () =>\n' +
  '        import(\n' +
  "          '@/views/{首字母小写(name)}/detail/{name}EditPage'\n" +
  '        ),\n' +
  '      meta: {\n' +
  '        hidden: true,\n' +
  "        breadcrumbName: '{nameCn}详情',\n" +
  '      },\n' +
  '    },\n' +
  '    {\n' +
  '      path: `edit/:${E_ROUTER_PARAMS.{转下划线大写(name)}_ID}`,\n' +
  '      name: E_ROUTER_NAME.{转下划线大写(name)}_EDIT,\n' +
  '      component: () =>\n' +
  '        import(\n' +
  "          '@/views/{首字母小写(name)}/detail/{name}EditPage'\n" +
  '        ),\n' +
  '      meta: {\n' +
  '        hidden: true,\n' +
  "        breadcrumbName: '编辑{nameCn}',\n" +
  '      },\n' +
  '    },\n' +
  '  ],\n' +
  '};\n' +
  basicPrompts.importPhase +
  basicPrompts.endPhase +
  'nameCn=转化医学\n';
