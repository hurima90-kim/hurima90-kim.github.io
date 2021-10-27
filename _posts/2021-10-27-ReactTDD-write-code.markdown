---
layout: post
title: "React TDD 코드 작성법"
date: 2021-10-27 00:53:00
categories: React TDD
---

<h3>📌 TDD를 활용한 Counter앱 만들기</h3>
<h4>🔸 폴더구조</h4>
아주 간단한 <strong style="color: lightblue">counter</strong> 앱을 만들며 테스트 코드 작성법에 대해 살펴보겠습니다.<br>
코드 작성에 앞서 저는 <span style="text-decoration: underline">"tests" 폴더를 생성한 후 모든 테스트코드 파일을 해당 폴더 안에 위치</span>를 시키겠습니다.<br><br>

![image](https://user-images.githubusercontent.com/66353903/138917159-7b2379de-6aec-46d4-8951-ebeccdf942e7.png)<br><br>

이렇게 폴더를 구성하는 이유는 이전 포스트에서도 말씀드렸지만 Jest가 테스트파일을 찾는 방법중의 하나이기 때문입니다.<br><br>
<strong style="color: lightblue">counter</strong> 앱은 다른 강의에서도 많이 보셨을거에요. <br>
더하기 버튼을 누르면 +1 씩 숫자가 증가하고, 빼기 버튼을 누르면 -1 씩 숫자가 감소합니다.<br><br>

<h4>🔸 TDD 코드 작성</h4>
counter.test.js 파일을 생성한 후 "tests" 폴더 내에 위치시켜주세요.<br>

```javascript
import { render, screen } from "@testing-library/react";
import App from "../App";

test("the counter starts at 0", () => {
  render(<App />);
  // screen object를 이용해서 원하는 엘리멘트에 접근
  const counterElement = screen.getByTestId("counter");
  // id가 counter인 엘리멘트의 텍스트가 0인지 테스트
  expect(counterElement).toHaveTextContent(0);
});
```

위와 같이 코드를 작성 후 터미널에서 `npm test`를 입력하면...!!!!<br>
그렇습니다. 에러가 나지요 😂

![image](https://user-images.githubusercontent.com/66353903/138919243-57bda632-deda-4f49-aba1-d4257383de5d.png)

그 이유는 ... 바로 App.js에 실제로 구현되는 코드를 아무것도 작성하지 않았기 때문입니다. <br>

```javascript
import { useState } from "react";

function App() {
  const [counter, setCounter] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <h3 data-testid="counter">{counter}</h3>
      </header>
    </div>
  );
}
```

App.js 에 위와 같이 코드를 작성한 뒤에 다시 테스트 코드를 실행시키면 <br>

![image](https://user-images.githubusercontent.com/66353903/138920065-16d215a0-4c60-43a5-a23e-d5346cc38aca.png)

이렇게 테스트에 통과하는 걸 확인하실수 있습니다. (이미지와 좀 다르게 나타나니 걱정하지마세요)<br>
생각보다 간단하죠..? <b>아직은...</b> <br><br>

<h3>📝 마무리</h3>
생각보다 굉장히 간단해 보이죠..? <br>
지금은 그냥 테스트코드 체험판 경험중이다라고 생각하면 좋을 것 같아요.<br>
다음 포스팅에서 차근차근 더 배워나가겠습니다 !! <br>
혹시 이전내용이 생각나지 않는다면 
<strong><a href="https://hurima90-kim.github.io/react/tdd/2021/10/26/ReactTDD.html">React TDD(Test Driven Development)</a></strong> 이 글을 다시 한번 확인해주세요
