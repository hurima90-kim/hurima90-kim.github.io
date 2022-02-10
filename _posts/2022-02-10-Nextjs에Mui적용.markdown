---
layout: post
title: 'Next.js에 MUI적용하기'
date: 2022-02-10 02:17:00
categories: React Next.js MUI
---

<h3>📌 Next.js로 정적 웹사이트만들때 MUI적용하기</h3>

<h4>🔸 시작하기전에</h4>
Next.js로 정적 웹사이트를 만들때 MUI(v5)를 적용하는 방법에 대해 알아보려고 합니다.<br><br>

<h4>❗️ 주의사항</h4>

```
Material UI는 v5로 업데이트되면서 MUI로 명칭이 변경되었습니다.
```

```
해당 포스팅에서는 Next.js 세팅하는 방법에 대해서는 설명을 하지않습니다.
```

<h4>🔸 패키지 설치</h4>
먼저 Next.js와 MUI를 사용하기 위해서 패키지 다운로드를 먼저 해주세요.<br><br>

<span color="#0080ff">Next.js</span>

```
$ npm install next --save
```

<span color="#0080ff">MUI ( v5 )</span>

```
npm install @mui/material @emotion/react @emotion/styled @emotion/cache @emotion/server
```

그 밖의 자세한 설치방법은 <a href="https://mui.com/getting-started/installation/">MUI 공식문서</a>를 확인해주세요.<br><br>

`Next.js` 는 기본적으로 SSR(Server Side Rendering)이며, 커스터마이징없이 MUI만 컴포넌트들을 사용할 경우에는 스타일이 제대로 적용되지 않습니다. 자세한 코드는 <a href="https://github.com/mui/material-ui/tree/master/examples/nextjs">Material with Next.js</a>를 참고하시면 됩니다.<br><br>

<h4>🔸 적용코드 예시</h4>
layout과 관련된 컴포넌트들은 개인의 취향이기에 따로 코드를 보여드리진 않겠습니다.<br><br>

### \_app.js

```javascript
import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '../theme/theme';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '../createEmotionCache';

const clientSideEmotionCache = createEmotionCache();

function App(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/images/favicon.png" />
        <title>WhatToEat</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};

export default App;
```

### \_document.js

```javascript
import * as React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';
import theme from '../theme/theme';
import createEmotionCache from '../createEmotionCache';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link rel="shortcut icon" href="/static/favicon.ico" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          {this.props.emotionStyleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage;
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />;
        },
    });

  const initialProps = await Document.getInitialProps(ctx);
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    emotionStyleTags,
  };
};
```

### createEmotionCache.js

```javascript
import createCache from '@emotion/cache';

export default function createEmotionCache() {
  return createCache({ key: 'css', prepend: true });
}
```

위 코드들을 작성하지 않고 개발을 하게된다면, 스타일이 적용되지 않거나 렌더링이 다 끝난 후에 스타일이 적용되는 걸 볼 수 있으니 번거롭더라도 꼭 적용을 해주세요.<br><br>

그리고 추가적으로 `.babelrc` 파일을 생성한 뒤 아래와 같은 코드 작성을 해주시면 좋습니다.<br>

```json
{
  "presets": ["next/babel"],
  "plugins": [["styled-components", { "ssr": true }]]
}
```

<h3>📝 마무리</h3>
새로운 직장에서 MUI를 커스터마이징해서 개발을 하고있어서 공부할 겸 퇴근 후에<br>
혼자 작은 토이프로젝트를 진행중인데... Next.js에서 MUI가 정상작동하지 않는다는걸 처음 알게되었네요.<br>
왜냐...회사에서 서비스중인 앱은 SSR이 적용하지 않기때문이죠.. 👀<br>
그래도 공식문서 열심히 뒤적거리면 다 해결법은 나타나는 법이죠!<br><br>

<h3>📝 참조</h3>
<a href="https://mui.com/">MUI 공식문서</a>
