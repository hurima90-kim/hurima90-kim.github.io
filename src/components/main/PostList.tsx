import styled from 'styled-components'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import { MasonryInfiniteGrid } from '@egjs/react-infinitegrid'
import PostItem from './PostItem'
import { useEffect, useState } from 'react'

type MdxNode = {
  frontmatter?: {
    title?: string | null
    date?: string | null
    category?: readonly (string | null)[] | null
    slug?: string | null
    description?: string | null
    thumbnail?: {
      childImageSharp?: {
        gatsbyImageData?: IGatsbyImageData | null
      } | null
    } | null
  } | null
}

type PostListProps = {
  posts: MdxNode[]
}

const Wrapper = styled(MasonryInfiniteGrid)`
  margin-top: 40px;
`

function getInitialPosts(posts: PostListProps['posts']) {
  return posts.slice(0, 10).map(post => ({ groupKey: 0, post }))
}

export default function PostList({ posts }: PostListProps) {
  const [items, setItems] = useState(getInitialPosts(posts))

  const handleLoadPosts = (nextGroupKey: number) => {
    const nextPosts = posts
      .slice(nextGroupKey * 10, (nextGroupKey + 1) * 10)
      .map(post => ({ groupKey: nextGroupKey, post }))

    setItems(prev => [...prev, ...nextPosts])
  }

  useEffect(() => setItems(getInitialPosts(posts)), [posts])

  return (
    <Wrapper
      gap={20}
      onRequestAppend={({ groupKey }: { groupKey: number }) => {
        const nextGroupKey = parseInt(groupKey?.toString() ?? '0') + 1
        if (posts.length <= nextGroupKey * 10) return
        handleLoadPosts(nextGroupKey)
      }}
    >
      {items.map(({ post: { frontmatter }, groupKey }) => (
        <PostItem
          title={frontmatter?.title as string}
          date={frontmatter?.date as string}
          category={frontmatter?.category as string[]}
          thumbnail={
            frontmatter?.thumbnail?.childImageSharp
              ?.gatsbyImageData as IGatsbyImageData
          }
          description={frontmatter?.description as string}
          slug={frontmatter?.slug as string}
          key={frontmatter?.slug as string}
          data-grid-groupkey={groupKey}
        />
      ))}
      {items.length < 3 ? <div /> : null}
    </Wrapper>
  )
}
