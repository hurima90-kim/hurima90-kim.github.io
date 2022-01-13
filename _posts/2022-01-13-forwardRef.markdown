---
layout: post
title: "forwardRef란 무엇인가?"
date: 2022-01-13 02:17:00
categories: React
---

<h3>📌 Forwarding Ref로 ref 전달하기</h3>
<!-- <h4>🔸 시작하기전에</h4> -->
<h4>❗️ 주의사항</h4>
<strong>React 16.3 이후 버전</strong>에서만 사용 가능합니다.<br><br>

<h4>🔸 시작하기전에</h4>
부모 컴포넌트에서 자식 컴포넌트의 DOM을 컨트롤하기 위해 ref를 전달하는데 전달하는 방법은 여러가지가 있습니다. 오늘은 그중에 하나인 forwardRef에 대해 알아보겠습니다.<br><br>

```javascript
//부모 컴포넌트
function App() {
  const inputRef = useRef(null);

  const onFocus = () => {
    inputRef.current.focus();
  };

  return (
    <React.Fragment>
      <Input ref={inputRef} />
      <button onClick={onFocus}>입력란 포커스</button>
    </React.Fragment>
  );
}
```

<br>

```javascript
//자식 컴포넌트
const Input = ({ ref }) => {
  return <input type="text" ref={ref} />;
};
```

위 코드를 보면 부모 컴포넌트에서 자식 컴포넌트로 `ref`를 props로 넘겨줍니다.<br>
하지만....❌ 에러가 발생합니다.<br><br>

<h4>🔸 forwardRef를 사용한다면..?</h4>

forwardRef를 사용한 예제를 한번 보시죠.<br>

```javascript
import React, { forwardRef } from "react";

const Input = forwardRef((props, ref) => {
  return <input type="text" ref={ref} />;
});
```

예시 코드에서 어떤 일이 일어나는지 단계별로 설명드리겠습니다.<br><br>

1. useRef를 호출해서 React ref를 생성하고 inputRef 변수에 할당합니다.
2. ref를 JSX 속성으로 지정해서 `Input ref={inputRef} />`로 전달합니다.
3. React는 이 ref를 forwardRef 내부의 (props, ref) => ... 함수의 두 번째 인자로 전달합니다.
4. 이 ref를 JSX 속성으로 지정해서 `<input type="text" ref={ref} />`으로 전달합니다.
5. ref가 첨부되면 ref.current는 `<input />` DOM 노드를 가리키게 됩니다.<br><br>

forwardRef를 사용하면 부모 컴포넌트로부터 하위 컴포넌트로 ref를 전달할 수 있게 된다. 이렇게 전달받은 ref를 HTML요소의 속성으로 넘겨줌으로써 함수 컴포넌트 역시 ref를 통한 제어가 가능해진다.<br><br>

이해가 되시나요?<br>

위 코드와 같이 자식 컴포넌트에서 forwardRef를 사용하게 되면 에러가 발생하지 않고 ref를 전달할 수 있습니다.<br>
하지만 상위의 컴포넌트에서는 컴포넌트의 DOM요소에 접근하는 것은 Component의 캡슐화를 방해햐기 때문에 지양해야합니다.<br>

<strong style="color: lightblue; text-decoration: underline">forwardRef의 문제점은 Parent에서 ref에 무엇이 들어가던지, 무조건 그에 관련된 코드를 실행시킬 것이다. 만약에 Child에서 ref를 설정하지 않았다면? Parent에서 ref가 Null이 될테니 코드가 검증되지 않는다.

</strong>

<h3>📝 참조</h3>
<a href="https://ko.reactjs.org/docs/forwarding-refs.html">리액트 공식 문서</a><br>
<a href="https://velog.io/@jo_love/TIL.-forwardRef-with%EC%BA%98%EB%A6%B0%EB%8D%94">jo_love.log님의 블로그</a>
