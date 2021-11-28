---
layout: post
title: "CSS in React - Inline Style"
date: 2021-11-29 02:17:00
categories: React CSS
---

<h3>📌 React 인라인 스타일에 대하여</h3>
<h4>🔸 시작하기전에</h4>
최근에 팀프로젝트를 하면서 <strong style="color: lightblue">Styled-components</strong>를 사용해본 후로 계속해서 이용하고 있었고,<br>
이력서를 넣고 합격이 되나 목놓아 기다리면서 초조해하다가 하나라도 더 만들어보자는 생각으로<br>
antd와 styled-components를 이용해서 sns 어플리케이션을 구현중에 알게된 사실에 대해 기록을 남기고 있습니다.<br><br>

인강이나 유튜브로 공부할 떄는 강의에서 inline CSS를 사용하길래 아무런 의심도 하지않고 따라했고,<br>
UI라이브러리를 처음 사용할때 커스터마이징을 할 줄 몰라서 inline CSS로 작성해서 스타일을 지정하기도 했습니다.<br>
그저 무심하게 사용하기 간편하다는 이유만으로 계속 사용해왔는데, 새로운 사실을 하나 알게 되었는데<br>
아래 코드와 같이 inline CSS로 작성을 하게되면 객체형태로 CSS를 작성하게 됩니다.<br>

```javascript
<FormWrapper style={{ padding: "10px" }}>
  <div>... // 중략 ...</div>
</FormWrapper>
```

{} === {} 는 false이기 때문에, 렌더링시에 기존 컴포넌트와 다르다고 판단하여, 리렌더링이 발생하게 됩니다.<br>
불필요한 리렌더링이 발생하게 되면 성능이 저하될 수 있고, 아주 약간의 지연시간이 발생할 수 있어 inline 스타일을 피해야합니다.

![image](https://user-images.githubusercontent.com/66353903/143779419-d8a6e6a2-cc6d-4419-a268-2825a542e8a7.png)

<h4>🔸 해결 방법</h4>
1. 변수 선언으로 사용<br>

```javascript
const style = useMemo(() => ({ marginTop: 10 }), []);
  ...
  ...
return (
  <FormWrapper style={style}>
)
```

useMemo라는 hook을 이용하지 않아도 되지만, 사용하는 이유는<br>
이전에 한번 사용한 값을 재사용하기에 스타일 객체를 캐싱해두고 재사용을 할 때에는<br>
이미 기억하는 객체이기에 메모리주소값이 바뀌지않아 리렌더링이 발생하지 않기때문입니다.<br><br>

2. Styled-components 사용<br>

```javascript
const FormWrapper = styled(Form)`
  padding: 10px;
`;
```

앞서 알려드린 방법으로 작성하게 되면 리렌더링이 없어져 조금 더 효율적인 성능을 나타낼 수 있습니다.<br><br>

<h3>📝 마무리</h3>
모를땐 정말 별 생각없이 사용했는데 알고 난뒤로 제가 잘못된 방식으로 공부를 했다는걸<br>
알게 되었습니다. 강의에서 사용하니까 문제없나보다... 했는데 의문점을 가지지 않는 자신이 부끄럽네요<br>
앞으로는 inline CSS를 지양하며 코드를 작성해야겠습니다!!<br>
