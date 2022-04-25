---
layout: post
title: 'React Slick 슬라이드 번호(currentNumber) 생성하기'
date: 2022-04-25T00:00:00+00:00
author: Jason Kim
permalink: /justo-imperdiet-condimentum-ad-cum-acanone/
tags: [Slide React React-Slick 리액트 리액트슬릭 슬라이드 슬라이드번호]
categories: React React-Slick
---

<h3>📌 [React-Slick] React-Slice으로 구현한 슬라이드에 슬라이드 번호 생성하기</h3>

![mvc](https://user-images.githubusercontent.com/66353903/165012723-c3d89ac3-9d03-4b25-b32a-3f30708b64e3.png)

회사홈페이지 리뉴얼 작업도중 슬라이드를 구현해야하는 부분이 있어 간단하게 React-slick 라이브러리로 슬라이드는 구현하였습니다.
허나 이미지 우측하단에 현재 슬라이드 번호 / 총 슬라이드 갯수가 표기되는데 슬라이드가 auto play가 되도 현재 번호값을 표기할 수 있도록 하기위해서 작업을 진행하였고 그 방법을 공유하려고 합니다.<br><br>

<h3>🔸 React-slick 설치하기</h3>

1. Installation

```javascript
npm install react-slick --save
```

2. Include CSS

```javascript
npm install slick-carousel --save
```

```javascript
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
```

슬라이더가 들어가는 컴포넌트에 import 해주는 것을 좋습니다.
허나 슬라이드가 여러곳에서 사용된다면 상위 컴포넌트 또는 훅으로 빼내는게 더 좋습니다.
<strong style="color: blue">본 포스트에서는 react-slick 세팅에 대해선 공식문서로 충분히 세팅이 가능하기에 더 이상 다루지 않습니다.</strong><br><br>

<h3>🔸 코드 살펴보기</h3>

```javascript
// Parent Component

function Slide() {
  const [slideIndex, setSlideIndex] = useState(0);

  const handleAfterChange = (index) => {
    setSlideIndex(index);
  };

  const slickSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    afterChange: handleAfterChange,
  };

  return (
    <div className="content-box">
      <Slider {...slickSettings}>
        {images.map((item) => {
          return <ImageWrapper key={item.id} item={item} images={images} alt={item.alt} />;
        })}
      </Slider>
      <SlideNumber slideIndex={slideIndex} />
    </div>
  );
}
```

Slider Component 안에 번호를 넣으면 번호가 고정되지 않고 슬라이드와 함께 좌측으로 이동하기에 바깥으로 빼내주었습니다.<br><br>

다음으로 아래와 같이 Children Component를 작성해줍니다.<br>

```javascript
// Children Component

function SlideNumber({ slideIndex }) {
  return (
    <SlideNumWrapper className="slide-number-wrapper">
      <span className="slide-current-number">{slideIndex + 1}</span>
      <span className="slide-total-number"> / {images.length}</span>
    </SlideNumWrapper>
  );
}
```

부모컴포넌트에서 `slideIndex`상태를 전달받아 화면에 렌더링 되도록 해주고
전체 슬라이드의 갯수는 슬라이드의 정보가 포함된 배열의 전체 길이를 렌더링시켜주면 됩니다.<br>

`slickSetting`내에 이씨는 afterChange는 슬라이드가 된 직후에 변경을 시키는것인데요.
슬라이드가 된 직후 `handleAfterChange`라는 함수가 실행되게 하였습니다.<br>

이렇게 되면 슬라이드가 자동으로 넘어가던지 직접 마우스 드래그로 넘기던지 모두 그에 맞게 슬라이드 번호가 나타나는걸 볼 수 있습니다.<br><br>

<h3>📝 마무리</h3>
생각보다 간단한데...구글링을 해보면 대부분 기본셋팅에 대해서 다룬 글들이라 저도 몇시간을 모니터만 바라보고 있었어요.<br>
물론 제 실력이 아직 부족하다는 것이겠죠. 제가 작성한 코드가 좋은 코드인지는 모르겠으나 다른분들에게 조금이라도 도움이 되었으면 합니다.<br><br>

<h3>📝 참조</h3>
<a href="https://react-slick.neostack.com/docs/get-started">React-slick 공식문서</a>
