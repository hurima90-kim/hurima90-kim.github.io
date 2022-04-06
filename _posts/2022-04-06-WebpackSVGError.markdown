---
layout: post
title: 'Webpack에서 SVG Import시 Unexpected token 에러 해결하기'
date: 2022-04-06 00:53:00
categories: Error React Webpack
---

<h3>📌 [Error] Webpack에서 SVG Import시 Unexpected token 에러 해결하기</h3>

<!-- ![mvc](https://user-images.githubusercontent.com/16752611/38287089-cb8a4198-3803-11e8-93a2-47ee9ac3480e.png) -->

```
module parse failed: unexpected token (1:0) you may need an appropriate loader to handle this file type, currently no loaders are configured to process this file.
```

회사홈페이지 리뉴얼중 Webpack build 과정에서 SVG파일을 처리할 loader가 필요하다는 에러가 발생하여, 해결하는 방법을 찾아보고 기록도 남기고 저와 같은 에러를 만나는 분들에게 도움이 되고자 포스팅을 합니다.<br><br>

<h3>🔸 해결방법</h3>

1. img src에 이용하는 경우
2. svg를 Component로 사용
3. svgr을 통해 React Component로 사용

이 외에도 다른 방법이 더 있는 것 같습니다만 오늘은 3번째 방법을 통해 해결을 하겠습니다.<br>
그 이유는 1, 2번 해결방법의 경우 CRA로 프로젝트를 생성했을 경우에 적용되기에 Webpack으로 프로젝트 생성을 한 우리에게는 적합하지 않기때문입니다.<br><br>

<h3>🔸 SVGR을 통해 React Component로 사용하기</h3>

```
npm install @svgr/webpack -D
```

svgr을 devDependency로 설치를 먼저 해줍니다.<br><br>

다음으로 아래와 같이 webpack.config.js를 작성해줍니다.<br>

```javascript
// webpack.config.js

module.exports = {
    entry: './src/index.js',
    module: {
        rules: [
            //...
            {
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            },
        ],
    },
    //...
};
```

이렇게 세팅을 하고 난뒤 혹시 모르니 `npm run build`로 다시 한번 빌드를 해주시면<br>
아래의 소스코드와 같이 svg를 사용할 수 있습니다.<br>

```javascript
import React from 'react';
import SVGIcon from '../../assets/logo.svg';

function App() {
  ....
  return (
    <div>
      <SVGIcon />
    </div>
  )
}

export default App;
```

<h3>📝 마무리</h3>
Webpack으로 프로젝트 세팅하는거 ...너무 어렵습니다 ㅠㅠ 틈만 나면 에러 폭발이지만 이렇게 배워가는거죠!<br><br>

<h3>📝 참조</h3>
<a href="https://velog.io/@juno7803/React-React%EC%97%90%EC%84%9C-SVG-%ED%99%9C%EC%9A%A9%ED%95%98%EA%B8%B0">junoflog</a><br>
<a href="https://velog.io/@haebin/Webpack-Babel-svg-import%EC%8B%9C-Unexpected-token-%EC%97%90%EB%9F%AC-%ED%95%B4%EA%B2%B0%ED%95%98%EA%B8%B0">haebin.log</a>
