---
layout: post
title: "느낌표 두개(!!) 사용법"
date: 2022-01-09 02:17:00
categories: JavaScript
---

<h3>📌 논리연산자중 느낌표 2개( !! ) 사용법</h3>
<h4>🔸 시작하기전에</h4>
취뽀를 하고 회사코드를 보면서 취준생의 코드와 실무는 역시 다르다는걸 느끼고<br>
JavaScript 공부가 많이 부족하다는걸 느꼈습니다.<br>
그 중에 한 부분인 논리연산자중 느낌표 두개를 사용하는 이유에 대해 알아보겠습니다.<br><br>

자바스크립트의 논리연산자 중 NOT연산자인 (느낌표)는 입력값을 boolean으로 변환하여 값이 true이면 false로 , false이면 true로 값을 리턴합니다.<br><br>

```javascript
null; // null
!null; // true
!!null; // false

true; // true
!true; // false
!!true; // true

false; // false
!false; // true
!!false; // false

777; // 777
!777; // false
!!777; // true
```

조건문에서 논리연산자를 사용하면 부정의 부정은 긍정이라는 조건식에는 변함이 없습니다.<br>
그렇다면 어떤 경우에 !!를 사용하는 것 일까요?<br><br>

<strong style="color: lightblue">자바스크립트에서 느낌표두개(!!)는 다른 타입의 데이터를 boolean 타입으로 명시적으로 형 변환(Type Conversion)하기 위해 사용합니다.</strong><br><br>

다시 예제를 한번 보시면, 이해가 빠르실 것 같습니다.<br>

```javascript
let a = 0;
console.log(a); // 0
console.log(!a); // true
console.log(!!a); // false

let b = null;
console.log(b); // null
console.log(!b); // true
console.log(!!b); // false

let c = undefined;
console.log(c); // undefined
console.log(!c); // true
console.log(!!c); // false
```

<h3>📝 마무리</h3>
느낌표 두개를 사용하는 방식이 익숙치 않아서 그런건지 한번에 눈에 들어오진않는 것 같습니다.<br>
명시적으로 값을 비교하는 것이 더 익숙하고 깔끔해보이는데 !!를 자주 사용하다보면<br>
또 어떨지는 조금더 지켜봐야 할 것 같습니다.
