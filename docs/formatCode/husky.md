# commit提交自动校验格式化代码
## 插件  eslint + prettier + husky 
eslint安装配置自行百度

项目安装 **prettier  husky  lint-staged**(只检测格式化add区域的代码)

命令 **npm i prettier husky lint-staged --save-dev**
**根目录下创建 .prettierrc.cjs文件 不创建默认使用prettier默认配置**
.prettierrc.cjs配置
```js
module.exports = {
  semi: true, //结尾是否使用分号
  singleQuote: true, // 是否使用单引号
  trailingComma: 'es5', //尾随逗号
  tabWidth: 2, //缩进字节数
  arrowParens: 'avoid', // 箭头函数只有一个参数时省略括号
  printWidth: 120, // 最大值换行
  htmlWhitespaceSensitivity: 'ignore',
  jsxBracketSameLine: false, // '>' 是否不换行
  jsxSingleQuote: true, // 是否使用单引号代替双引号
  vueIndentScriptAndStyle: false,
};
```

**package.json配置**

```json

  "scripts": {
    "prepare": "husky install"
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged" // commit时执行的命令
    }
  },
  "lint-staged": {
    //检测得文件类型
    "*.{ts,tsx,js,vue,css,less,sass}": [
      "eslint --fix", // 执行eslint检测
      "prettier --write", //执行格式化代码操作
      "git add"
    ]
  },
```