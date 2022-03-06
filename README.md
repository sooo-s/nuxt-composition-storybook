# nuxt-composition-storybook

Nuxt.js (v2) + composition-api + Storybookを同時に利用する際の設定方法

## 結論
Storybookのmain.jsに以下を追加すると動く。

```
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
```

### javascript/auto
https://github.com/nuxt-community/composition-api のここ  
https://github.com/nuxt-community/composition-api/blob/53b692e44d69542925b2266f89ffcb8ce7d8f34c/src/module/index.ts#L100-L116  
でWebpackの設定を変えている。  
Storybookにはこの設定が反映されていないようなので追加する。  

`type: 'javascript/auto'` についてはこちらに記載がある。  
https://github.com/webpack/webpack/releases/tag/v4.0.0  

typeは5種類あって、`.mjs`ファイルはデフォルトだと`javascript/esm`になる。  

> javascript/esm handles ESM more strictly compared to javascript/auto:

とのことで、 `@nuxtjs/composition-api`では`.mjs`ファイルを`javascript/auto`のtypeで読み込みたいので設定を上書きしている模様。

### fs: 'empty'
https://github.com/storybookjs/storybook/issues/4082

