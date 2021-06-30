import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'Knowledge Points',
  sitemap: { hostname: 'https://bad-written.github.io/knowledge-point' },
  logo: 'https://avatars.githubusercontent.com/u/20334663?v=4',
  favicon: '/assets/favicon.ico',
  description: 'Record scattered knowledge points',
  mode: 'site',
  devtool: `${process.env.NODE_ENV === 'production' ? 'eval' : 'source-map'}`,
  resolve: {
    includes: ['docs', 'packages/src'],
  },
  analyze: {
    analyzerMode: 'server',
    analyzerPort: 8888,
    openAnalyzer: true,
    // generate stats file while ANALYZE_DUMP exist
    generateStatsFile: false,
    statsFilename: 'stats.json',
    logLevel: 'info',
    defaultSizes: 'parsed', // stat  // gzip
  },
  // more config: https://d.umijs.org/config
});
