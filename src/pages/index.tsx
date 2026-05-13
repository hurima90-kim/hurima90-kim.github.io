import { HeadFC, PageProps, graphql } from 'gatsby'
import Introduction from '../components/main/Introduction'
import Category from '../components/main/Category'
import { useState } from 'react'
import PostList from '../components/main/PostList'
import SEO from '../components/common/Seo'

export default function Index({
  data: {
    allMdx: { nodes },
  },
}: PageProps<Queries.IndexPageQuery>) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const categories = nodes.reduce<Record<string, number>>(
    (categories, post) => {
      post.frontmatter?.category
        ?.filter((category): category is string => !!category)
        .forEach(
          category => (categories[category] = (categories[category] ?? 0) + 1),
        )
      return categories
    },
    { All: nodes.length },
  )

  const posts = nodes.filter(
    ({ frontmatter }) =>
      selectedCategory === 'All' ||
      frontmatter?.category?.includes(selectedCategory),
  )

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category)
  }

  return (
    <>
      <Introduction />
      <Category
        categories={categories}
        selectedCategory={selectedCategory}
        handleSelect={handleSelectCategory}
      />
      <PostList posts={posts} />
    </>
  )
}

export const Head: HeadFC = () => <SEO />

export const query = graphql`
  query IndexPage {
    allMdx(sort: { frontmatter: { date: DESC } }) {
      nodes {
        frontmatter {
          title
          category
          slug
          date
          description
          thumbnail {
            childImageSharp {
              gatsbyImageData(width: 500)
            }
          }
        }
      }
    }
  }
`
