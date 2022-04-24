---
layout: post
title: 'Uncaught ReferenceError: regeneratorRuntime is not defined 해결하기'
date: 2022-04-04T00:00:00+00:00
author: Jason Kim
permalink: /justo-imperdiet-condimentum-ad-cum-acanone/
tags: [React Webpack Error 리액트 웹팩 에러해결]
categories: Error React Webpack
---

<h3>📌 [Error] Uncaught ReferenceError: regeneratorRuntime is not defined 해결하기</h3>

![mvc](https://user-images.githubusercontent.com/16752611/38287089-cb8a4198-3803-11e8-93a2-47ee9ac3480e.png)

React에서 ES8 문법인 async/await를 사용해 비동기 함수를 작성하면 브라우저에서 다음과 같은 에러가 발생합니다.<br>
애플리케이션이 컴파일될 때, regeratorRuntime이 async/await 문법을 번역하도록 했는데 해당 regenerator를 제공하지 않아서 발생한 에러입니다.<br><br>

<h3>🔸 첫번째 해결방법</h3>

-   babel-polyfill 설정해주기<br><br>

```
npm install babel-polyfill
```

```javascript
// webpack.config.js
module.exports = {
    entry: {
        app: ['babel-polyfill', './src/index.js'],
    },
    ...
}
```

<strong>src/index.js 파일을 babel-polyfill 을 사용해서 번들링을 한다는 의미입니다.</strong><br><br>

<h3>🔸 두번째 해결방법</h3>

```
✅ As of Babel 7.4.0, this package has been deprecated in favor of directly including core-js/stable (to polyfill ECMAScript features) and regenerator-runtime/runtime (needed to use transpiled generator functions):
```

-   babel 7.4.0부터는 core-js/stable(ECMAScript 기능들의 polyfill 제공)과 regenerator-runtime/runtime (transpiled generator functions 사용을 위해 필요) 직접 포함하면서 @babel/polyfill이 deprecated되었습니다.<br><br>

-   @babel/runtime과 @babel/plugin-transform-runtime을 설치해 regenerator-runtime을 추가하는 방식으로 해결할 수 있습니다.<br>

```
npm install --save-dev @babel/plugin-transform-runtime
npm install --save @babel/runtime
```

```javascript
// .babelrc
{
  "plugins": ["@babel/plugin-transform-runtime"]
}
```

babel 설정에 plugins를 설정해주면 에러는 해결됩니다.

<h3>📝 마무리</h3>
평소 에러에 관한 포스팅을 따로 작성하지 않았습니다.<br>
한번 봤던 에러인것 같은데 기억이 나지않아 또 구글링을 하게되서 기억에 남기기 위해 에러해결 포스팅도 업로드하기로 결심했습니다.<br>
