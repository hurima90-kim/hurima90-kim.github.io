---
layout: post
title: "cloneElement()는 무엇인가?"
date: 2022-01-14 02:17:00
categories: React
---

<h3>📌 props.children에 데이터 전달하기</h3>
<!-- <h4>❗️ 주의사항</h4> -->
<!-- <strong>React 16.3 이후 버전</strong>에서만 사용 가능합니다.<br><br> -->

<h4>🔸 시작하기전에</h4>
React에서 props는 읽기전용이므로 수정이 불가능하며, props.children도 수정할 수 없습니다.<br><br>

<h4>🔸 React.cloneElement()</h4>
cloneElement()를 설명하기에 앞서 props를 조작하면 어떤 문제가 발생하는지 보여드리겠습니다.<br><br>

```javascript
//부모 컴포넌트
function App() {
  const element = <Test testProps="Hi" />;
  console.log(element.props.testProps);

  element.props.testProps = "Hello";

  return <React.Fragment>{element}</React.Fragment>;
}
```

<br>

```javascript
//자식 컴포넌트
function Test() {
  return <h1>Test</h1>;
}
```

위 코드는 props의 속성을 변경후 오류가 발생합니다.<br>
확인해보시면 <span style="color: red">TypeError</span>가 발생합니다.<br><br>

수정이나 속성을 추가하는 것 모두 불가능하나, 복제는 가능합니다.<br>
복제를 하면서 props의 속성을 변경하거나 추가할 수 있습니다.<br><br>

복제하는 방법은 바로 오늘 우리가 공부하는 React.cloneElement()입니다.<br>

```javascript
const cloneObj = React.cloneElement(element[, props[, ...children]]);
```

- 첫번째 인수(element)의 type과 props가 동일한 엘리먼트 객체를 반환합니다.<br>
- 두번째 인수(props)는 생략 가능하며, props를 작성하면 기존 props에 새로운 속성을 추가합니다.<br><br>

새로운 예제를 보면서 자세하게 알아보겠습니다.

```javascript
// 부모 컴포넌트
// 자식 컴포넌트는 이전코드와 동일합니다.
function App() {
  const element = <Test testProps="Hi" />;
  const cloneObj = React.cloneElement(element, {
    testProps: "Hello",
    addProps: "Good Bye",
  });

  console.log("element", element);
  console.log("cloneObj", cloneObj);

  return <React.Fragment>{element}</React.Fragment>;
}
```

<br>

예시 코드에서 어떤 일이 일어났는지 보이시나요?<br>

<img src="https://user-images.githubusercontent.com/66353903/149527786-d23a1d43-6132-4d3e-b61e-7fca180b6aa3.png" alt="result"/><br>
기존의 props에는 testProps: "Hi"만 존재하였는데, 복제한 뒤에는 testProps: "Hello"로 속성이 변경되고, addProps: "Good Bye"가 추가 되었습니다.<br><br>

<strong>React.cloneElement 함수를 이용하여 JSX객체를 복사하고 props의 속성 값 변경 및 추가하는 방법에 대해 알아보았습니다.</strong>

<h3>📝 참조</h3>
<a href="https://blog.logrocket.com/using-react-cloneelement-function/">Habdul Hazeez님의 글</a><br>
<a href="hhttps://developer-talk.tistory.com/233">평범한 직장인의 공부 정리 - 블로그</a>
