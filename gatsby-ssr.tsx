import { GatsbySSR } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import Layout from './src/components/common/Layout'
import Heading from './src/hooks/node/Heading'
import Blockquote from './src/hooks/node/Blockquote'
import HorizontalRule from './src/hooks/node/HorizontalRule'
import OrderedList from './src/hooks/node/OrderedList'
import UnorderedList from './src/hooks/node/UnorderedList'
import Link from './src/hooks/node/Link'
import { HTMLAttributes } from 'react'

const HeadComponents = [
  <link
    rel="stylesheet"
    as="style"
    crossOrigin="anonymous"
    href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
    key="pretendard-font"
  />,
]

const mdxComponents = {
  h1: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <Heading as="h1" {...props} />
  ),
  h2: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <Heading as="h2" {...props} />
  ),
  h3: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <Heading as="h3" {...props} />
  ),
  blockquote: Blockquote,
  hr: HorizontalRule,
  ol: OrderedList,
  ul: UnorderedList,
  a: Link,
} as React.ComponentProps<typeof MDXProvider>['components']

export const onRenderBody: GatsbySSR['onRenderBody'] = ({
  setHeadComponents,
}) => {
  setHeadComponents(HeadComponents)
}

export const wrapPageElement: GatsbySSR['wrapPageElement'] = ({
  element,
  props,
}) => {
  return (
    <MDXProvider components={mdxComponents}>
      <Layout {...props}>{element}</Layout>
    </MDXProvider>
  )
}
