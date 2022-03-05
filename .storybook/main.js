module.exports = {
  "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  "framework": "@storybook/vue",
  webpackFinal: (config) => {
    config.module.rules.forEach(rule => {
      if (rule.test instanceof RegExp && rule.test.test('index.mjs')) {
        rule.type = 'javascript/auto'
      }
    })

    config.module.rules.unshift({
      test: /\.mjs$/,
      type: 'javascript/auto',
      include: [/node_modules/],
    })
    config.node  = { fs: 'empty' };

    return config;
  },
}
