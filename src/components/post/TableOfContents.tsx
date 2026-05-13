import { GatsbyLinkProps, Link } from 'gatsby'
import styled from 'styled-components'
import useTableOfContents from '../../hooks/useTableOfContents'

type TableOfContentsProps = {
  tableOfContents: unknown
}

const Wrapper = styled.div`
  position: sticky;
  top: 100px;
  width: 100%;

  @media (max-width: 768px) {
    display: none;
  }
`

const Title = styled.div`
  padding-bottom: 20px;
  border-bottom: 1px solid #000000;
  font-size: 15px;
  font-weight: 600;
`

const Items = styled.div`
  display: grid;
  grid-gap: 10px;
  margin-top: 20px;
`

const Item = styled(({ className, children, to }: GatsbyLinkProps<unknown>) => (
  <Link to={to} className={className}>
    {children}
  </Link>
))<{ $depth: number; $focused: boolean }>`
  padding-left: ${({ $depth }) => $depth * 10}px;
  font-size: 13px;
  font-weight: ${({ $focused }) => ($focused ? 700 : 300)};
  color: rgba(30, 31, 33, ${({ $focused }) => ($focused ? 1 : 0.5)});
  cursor: pointer;
  text-decoration: none;
  transition: 0.1s all;
`

export default function TableOfContents({
  tableOfContents,
}: TableOfContentsProps) {
  const { toc, activeId } = useTableOfContents(tableOfContents)

  return (
    <Wrapper>
      <Title>Table of Contents</Title>
      <Items>
        {toc.map(({ url, title, depth }) => (
          <Item
            to={url}
            key={url}
            $depth={depth}
            $focused={url === `#${activeId}`}
          >
            {title}
          </Item>
        ))}
      </Items>
    </Wrapper>
  )
}
