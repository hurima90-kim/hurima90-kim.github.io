import { ReactNode, useEffect } from 'react'
import styled from 'styled-components'
import Prism from 'prismjs'
import 'prismjs/components/prism-typescript'
import Comment from './Comment'
import TableOfContents from './TableOfContents'

type PostBodyProps = {
  children: ReactNode
  tableOfContents: unknown
}

const Wrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 220px;
  grid-gap: 30px;
  justify-content: space-between;
  align-items: flex-start;
  padding-top: 100px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding-top: 60px;
  }
`

const Content = styled.div`
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 100px;
  font-size: 16px;
  line-height: 2;
  word-break: break-word;

  img {
    display: block;
    margin: 20px auto;
    max-width: 100%;
  }

  @media (max-width: 768px) {
    gap: 50px;
    font-size: 14px;
    line-height: 1.8;
  }
`

export default function PostBody({ children, tableOfContents }: PostBodyProps) {
  useEffect(Prism.highlightAll, [])

  return (
    <Wrapper>
      <Content>
        <div id="content">{children}</div>
        <Comment />
      </Content>
      <TableOfContents tableOfContents={tableOfContents} />
    </Wrapper>
  )
}
