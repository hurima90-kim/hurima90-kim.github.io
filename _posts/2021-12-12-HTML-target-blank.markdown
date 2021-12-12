---
layout: post
title: "target='blank'를 사용할 때 보안 취약점 보완하기"
date: 2021-12-12 02:17:00
categories: HTML
---

<h3>📌 target="_blank" rel="noopner" or rel="noreferrer에 대하여</h3>
<h4>🔸 시작하기전에</h4>
며칠전 제로초님의 강의를 보며 공부하던중 새창을 띄울때 target="_blank"를 사용하는데, <br>
새창으로 띄우는 것이 보안에 취약하다는 걸 설명을 해주시더라구요. (전... 세상 처음 알게 된 사실입니다 😥<br>
강의에서 설명을 해주시긴하셨지만 또 궁금한거 찾아보는게 개발자의 숙명이니 찾아보게 되었습니다.<br><br>

```html
<a href="#" target="_blank" rel="noopner"></a>
<a href="#" target="_blank" rel="noreferrer"></a>
```

앞서 새창을 띄울때 보안이 취약하다고 말씀드렸는데요, 바로 <strong style="color: blue">Tabnabbing</strong>이라는 공격의 위험성이 있습니다.

<h4>🔸 Tabnabbing</h4>
Tabnabbing이란, HTML문서 내에서 target="blank"인 Anchor태그를 클릭했을 때 새롭게 열린 탭(또는 페이지)에서<br>
기존의 문서의 location을 피싱 사이트로 변경해 정보를 탈취하는 공격 기술을 뜻합니다.<br>
Tabnabbing에 대해선 <a href="https://blog.coderifleman.com/2017/05/30/tabnabbing_attack_and_noopener/?fbclid=IwAR3tHOPKgv08gLPOwAouOLhFNYciJ8qGvq9_pgTPC14xyDK8Y_vG9TsdIjc" target="_blank" rel="noreferrer">해당 링크의 글</a>을 읽어보시면 좋을 것 같습니다.<br><br>

<h4>🔸 noopener & referrer</h4>
_blank 속성을 활용하면 opener객체가 생성된다는 점으로 인해 성능과 보안상 취약점이 생기게 되는데요.<br>
이를 위해 아래의 속성을 사용하게 됩니다.<br><br>

1. rel="noopener" 사용<br>
   <span style="color: lightblue">noopener</span> 속성을 사용하면 새 탭에서 opener를 참조할 수 없게되어 보안과 성능문제를 함께 해결할 수 있습니다.<br>

2. rel="referrer" 사용<br>
   추가적인 보안을 위해 <span style="color: lightblue">referrer</span> 속성을 활용할 수도 있습니다. 요청이 어디서 왔는지에 대한 정보를 담고있는 헤더를<br> 숨겨 잠재적인 보안 위협을 방지할 수 있습니다.<br><br>

<h3>📝 마무리</h3>
target="_blank" 의 문제점과 그 해결 방법에 대해서 소개해보았습니다.<br>
성능도 성능이지만 보안은 정말 너무나 중요한 부분이기에 프론트엔드 개발자라면 꼭 숙지하고 있어야할 속성입니다.<br>
저도 이번 강의를 보며 처음 알게되었는데 제 개인포폴 프로젝트에도 속성을 추가해야겠습니다. 이상입니다!<br>
