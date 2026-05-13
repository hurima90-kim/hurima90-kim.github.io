import { createElement, HTMLAttributes } from 'react'
import styled from 'styled-components'

type HeadingProps = {
  as: 'h1' | 'h2' | 'h3'
} & HTMLAttributes<HTMLHeadingElement>

const Components = {
  h1: styled.h1`
    font-size: 30px;
    font-weight: 700;
    margin-bottom: 40px;

    * + & {
      margin-top: 100px;
    }

    hr + & {
      margin-top: 0;
    }
  `,
  h2: styled.h2`
    font-size: 25px;
    font-weight: 700;
    margin-bottom: 35px;

    * + & {
      margin-top: 90px;
    }

    hr + & {
      margin-top: 0;
    }
  `,
  h3: styled.h3`
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 30px;

    * + & {
      margin-top: 80px;
    }

    hr + & {
      margin-top: 0;
    }
  `,
}

export default function Heading({ as: tag, children, ...props }: HeadingProps) {
  return createElement(Components[tag], props, children)
}
