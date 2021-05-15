import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'Knowledge Points',
  mode: 'site',
  resolve: {
    includes: ['docs', 'packages/src'],
  },
  // more config: https://d.umijs.org/config
});
