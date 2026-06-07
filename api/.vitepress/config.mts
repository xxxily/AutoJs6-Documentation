import { defineConfig } from 'vitepress';

const applicationRepository = 'https://github.com/xxxily/AutoJs6';
const documentationRepository = 'https://github.com/xxxily/AutoJs6-Documentation';
const allowedHtmlTags = new Set([
  'a',
  'abbr',
  'blockquote',
  'br',
  'code',
  'dd',
  'details',
  'div',
  'dl',
  'dt',
  'em',
  'figcaption',
  'figure',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'hr',
  'img',
  'ins',
  'kbd',
  'li',
  'ol',
  'p',
  'picture',
  'pre',
  'small',
  'source',
  'span',
  'strong',
  'sub',
  'summary',
  'sup',
  'table',
  'tbody',
  'td',
  'tfoot',
  'th',
  'thead',
  'tr',
  'ul',
]);

function shouldEscapeLegacyHtml(content: string) {
  const match = content.trim().match(/^<\/?([A-Za-z][\w.:-]*)\b/);
  return match ? !allowedHtmlTags.has(match[1].toLowerCase()) : false;
}

function escapeVueDelimiters(content: string) {
  return content.replace(/\{\{/g, '&#123;&#123;').replace(/\}\}/g, '&#125;&#125;');
}

export default defineConfig({
  title: 'AutoJs6 文档',
  description: 'AutoJs6 应用文档',
  lang: 'zh-CN',
  base: '/',
  outDir: '../docs',
  cleanUrls: true,
  ignoreDeadLinks: true,
  lastUpdated: true,
  markdown: {
    anchor: {
      permalink: () => {},
    },
    attrs: {
      disable: true,
    },
    config(md) {
      md.renderer.rules.text = (tokens, idx) => escapeVueDelimiters(md.utils.escapeHtml(tokens[idx].content));
      md.renderer.rules.code_inline = (tokens, idx) => `<code>${escapeVueDelimiters(md.utils.escapeHtml(tokens[idx].content))}</code>`;
      md.core.ruler.after('inline', 'escape_legacy_type_placeholders', (state) => {
        const tokens = state.tokens.flatMap((token) => token.children ?? [token]);
        for (const token of tokens) {
          if ((token.type === 'html_inline' || token.type === 'html_block') && shouldEscapeLegacyHtml(token.content)) {
            token.type = 'text';
            token.tag = '';
            token.nesting = 0;
          } else if (token.type === 'html_inline' || token.type === 'html_block') {
            token.content = escapeVueDelimiters(token.content);
          }
        }
      });
    },
  },
  head: [
    ['link', { rel: 'icon', href: '/images/logo.png' }],
    ['meta', { name: 'theme-color', content: '#3f7f6b' }],
  ],
  themeConfig: {
    logo: '/images/logo.png',
    siteTitle: 'AutoJs6',
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档',
          },
          modal: {
            noResultsText: '无搜索结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭',
            },
          },
        },
      },
    },
    nav: [
      { text: '综述', link: '/overview' },
      { text: '更新日志', link: '/changelog' },
      { text: '源码仓库', link: applicationRepository },
    ],
    sidebar: [
      {
        text: '文档信息',
        items: [
          { text: 'Overview - 综述', link: '/overview' },
          { text: 'About - 关于文档', link: '/documentation' },
          { text: 'Documentation Audit - 文档覆盖审计', link: '/documentationAudit' },
          { text: 'Documentation Roadmap - 文档更新推进清单', link: '/documentationRoadmap' },
          { text: 'Runtime API Index - 运行时 API 索引', link: '/runtimeApiIndex' },
          { text: 'Permission Capability Matrix - 权限能力矩阵', link: '/permissionCapabilityMatrix' },
          { text: 'Progress - 文档部署进度', link: '/progress' },
          { text: 'Changelog - 文档更新日志', link: '/changelog' },
        ],
      },
      {
        text: '使用说明',
        items: [
          { text: 'Manual - AutoJs6 使用手册', link: '/manual' },
          { text: 'Q & A - 疑难解答', link: '/qa' },
        ],
      },
      {
        text: 'API',
        items: [
          { text: 'Global - 全局对象', link: '/global' },
          { text: 'Automator - 自动化', link: '/automator' },
          { text: 'AutoJs6 - 本体应用', link: '/autojs' },
          { text: 'App - 通用应用', link: '/app' },
          { text: 'Color - 颜色', link: '/color' },
          { text: 'Image - 图像', link: '/image' },
          { text: 'OCR - 光学字符识别', link: '/ocr' },
          { text: 'Barcode - 条码', link: '/barcode' },
          { text: 'QR Code - 二维码', link: '/qrcode' },
          { text: 'Keys - 按键', link: '/keys' },
          { text: 'Device - 设备', link: '/device' },
          { text: 'Storage - 储存', link: '/storages' },
          { text: 'File - 文件', link: '/files' },
          { text: 'Engine - 引擎', link: '/engines' },
          { text: 'Task - 任务', link: '/tasks' },
          { text: 'Module - 模块', link: '/modules' },
          { text: 'Plugins - 插件', link: '/plugins' },
          { text: 'Toast - 消息浮动框', link: '/toast' },
          { text: 'Notice - 消息通知', link: '/notice' },
          { text: 'Console - 控制台', link: '/console' },
          { text: 'Shell', link: '/shell' },
          { text: 'Shizuku', link: '/shizuku' },
          { text: 'Media - 多媒体', link: '/media' },
          { text: 'Sensor - 传感器', link: '/sensors' },
          { text: 'Recorder - 记录器', link: '/recorder' },
          { text: 'Timer - 定时器', link: '/timers' },
          { text: 'Thread - 线程', link: '/threads' },
          { text: 'Continuation - 协程', link: '/continuation' },
          { text: 'Event - 事件监听', link: '/events' },
          { text: 'Dialog - 对话框', link: '/dialogs' },
          { text: 'Floaty - 悬浮窗', link: '/floaty' },
          { text: 'Canvas - 画布', link: '/canvas' },
          { text: 'UI - 用户界面', link: '/ui' },
          { text: 'Web - 万维网', link: '/web' },
          { text: 'HTTP', link: '/http' },
          { text: 'Base64', link: '/base64' },
          { text: 'Crypto - 密文', link: '/crypto' },
          { text: 'SQLite', link: '/sqlite' },
          { text: 'MIME', link: '/mime' },
          { text: 'NanoID', link: '/nanoid' },
          { text: 'Sysprops - 系统属性', link: '/sysprops' },
          { text: 'Pinyin - 汉语拼音', link: '/pinyin' },
          { text: 'Pinyin4j - 汉语拼音', link: '/pinyin4j' },
          { text: 'OpenCC - 中文转换', link: '/opencc' },
          { text: 'Internationalization - 国际化', link: '/i18n' },
          { text: 'Standardization - 标准化', link: '/s13n' },
          { text: 'Cvt - 单位转换', link: '/cvt' },
          { text: 'Fmt - 数据格式化', link: '/fmt' },
          { text: 'Zip', link: '/zip' },
          { text: 'MediaInfo - 媒体信息', link: '/mediainfo' },
          { text: 'E4X', link: '/e4x' },
        ],
      },
      {
        text: '类型与扩展',
        items: [
          { text: 'UiSelector - 选择器', link: '/uiSelectorType' },
          { text: 'UiObject - 控件节点', link: '/uiObjectType' },
          { text: 'UiObjectCollection - 控件集合', link: '/uiObjectCollectionType' },
          { text: 'UiObjectActions - 控件节点行为', link: '/uiObjectActionsType' },
          { text: 'WebSocket', link: '/webSocketType' },
          { text: 'EventEmitter - 事件发射器', link: '/eventEmitterType' },
          { text: 'ImageWrapper - 包装图像类', link: '/imageWrapperType' },
          { text: 'App - 应用枚举类', link: '/appType' },
          { text: 'Color - 颜色类', link: '/colorType' },
          { text: 'Version - 版本工具类', link: '/versionType' },
          { text: 'Polyfill - 代码填泥', link: '/polyfill' },
          { text: 'Arrayx - Array 扩展', link: '/arrayx' },
          { text: 'Numberx - Number 扩展', link: '/numberx' },
          { text: 'Mathx - Math 扩展', link: '/mathx' },
        ],
      },
      {
        text: '环境对象',
        items: [
          { text: 'Exceptions - 异常', link: '/exceptions' },
          { text: 'Intent - 意图', link: '/intentType' },
          { text: 'Runtime - 运行时', link: '/runtime' },
          { text: 'Context - 上下文', link: '/context' },
          { text: 'Activity - 活动', link: '/activity' },
        ],
      },
      {
        text: '参考资料',
        items: [
          { text: 'Scripting Java - 脚本化 Java', link: '/scriptingJava' },
          { text: 'Android API Level - 安卓 API 级别', link: '/apiLevel' },
          { text: 'Color Table - 颜色列表', link: '/colorTable' },
        ],
      },
      {
        text: '术语',
        items: [
          { text: 'Glossaries - 术语', link: '/glossaries' },
          { text: 'HttpHeader - HTTP 标头', link: '/httpHeaderGlossary' },
          { text: 'HttpRequestMethods - HTTP 请求方法', link: '/httpRequestMethodsGlossary' },
          { text: 'MimeType - MIME 类型', link: '/mimeTypeGlossary' },
          { text: 'NotificationChannel - 通知渠道', link: '/notificationChannelGlossary' },
        ],
      },
      {
        text: '数据类型',
        items: [
          { text: 'Data Types - 数据类型', link: '/dataTypes' },
          { text: 'Omnipotent Types - 全能类型', link: '/omniTypes' },
          { text: 'Storage - 存储类', link: '/storageType' },
        ],
      },
      {
        text: '其他类型',
        collapsed: true,
        items: [
          { text: 'AndroidBundle', link: '/androidBundleType' },
          { text: 'AndroidRect', link: '/androidRectType' },
          { text: 'CryptoCipherOptions', link: '/cryptoCipherOptionsType' },
          { text: 'CryptoKey', link: '/cryptoKeyType' },
          { text: 'CryptoKeyPair', link: '/cryptoKeyPairType' },
          { text: 'ConsoleBuildOptions', link: '/consoleBuildOptionsType' },
          { text: 'CursorWrapper', link: '/cursorWrapperType' },
          { text: 'Database', link: '/databaseType' },
          { text: 'HttpRequestBuilderOptions', link: '/httpRequestBuilderOptionsType' },
          { text: 'HttpRequestHeaders', link: '/httpRequestHeadersType' },
          { text: 'HttpResponseBody', link: '/httpResponseBodyType' },
          { text: 'HttpResponseHeaders', link: '/httpResponseHeadersType' },
          { text: 'HttpResponse', link: '/httpResponseType' },
          { text: 'HttpSaveResult', link: '/httpSaveResultType' },
          { text: 'InjectableWebClient', link: '/injectableWebClientType' },
          { text: 'InjectableWebView', link: '/injectableWebViewType' },
          { text: 'JsMime', link: '/jsMimeType' },
          { text: 'MediainfoNativeObject', link: '/mediainfoNativeObjectType' },
          { text: 'NoticeOptions', link: '/noticeOptionsType' },
          { text: 'NoticeChannelOptions', link: '/noticeChannelOptionsType' },
          { text: 'NoticePresetConfiguration', link: '/noticePresetConfigurationType' },
          { text: 'NoticeBuilder', link: '/noticeBuilderType' },
          { text: 'Okhttp3HttpUrl', link: '/okhttp3HttpUrlType' },
          { text: 'OcrOptions', link: '/ocrOptionsType' },
          { text: 'Okhttp3Request', link: '/okhttp3RequestType' },
          { text: 'OpenCVPoint', link: '/opencvPointType' },
          { text: 'OpenCVRect', link: '/opencvRectType' },
          { text: 'OpenCVSize', link: '/opencvSizeType' },
          { text: 'OpenCCConversion', link: '/openCCConversionType' },
          { text: 'ZipNativeObject', link: '/zipNativeObjectType' },
          { text: 'ZipOptions', link: '/zipOptionsType' },
        ],
      },
      {
        text: '项目链接',
        items: [
          { text: 'GitHub - 应用项目地址', link: applicationRepository },
          { text: 'GitHub - 文档项目地址', link: documentationRepository },
        ],
      },
    ],
    socialLinks: [
      { icon: 'github', link: documentationRepository },
    ],
    footer: {
      message: 'AutoJs6 应用文档',
    },
  },
});
