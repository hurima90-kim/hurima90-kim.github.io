import { HeadFC, HeadProps, PageProps, graphql } from 'gatsby'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import PostHead from '../components/post/PostHead'
import PostBody from '../components/post/PostBody'
import SEO from '../components/common/Seo'

export default function Post({
  data: { mdx },
  children,
}: PageProps<Queries.PostPageQuery>) {
  return (
    <>
      <PostHead
        title={mdx?.frontmatter?.title as string}
        category={mdx?.frontmatter?.category as string[]}
        date={mdx?.frontmatter?.date as string}
        thumbnail={
          mdx?.frontmatter?.thumbnail?.childImageSharp
            ?.gatsbyImageData as IGatsbyImageData
        }
      />
      <PostBody tableOfContents={mdx?.tableOfContents}>{children}</PostBody>
    </>
  )
}

export const Head: HeadFC<Queries.PostPageQuery> = ({
  data: { mdx },
}: HeadProps<Queries.PostPageQuery>) => {
  return (
    <SEO
      title={mdx?.frontmatter?.title as string}
      description={mdx?.frontmatter?.description as string}
      pathname={`/${mdx?.frontmatter?.slug}`}
      image={mdx?.frontmatter?.thumbnail?.publicURL as string}
    />
  )
}

export const query = graphql`
  query PostPage($id: String!) {
    mdx(id: { eq: $id }) {
      tableOfContents
      frontmatter {
        title
        category
        date
        slug
        description
        thumbnail {
          publicURL
          childImageSharp {
            gatsbyImageData(width: 1000)
          }
        }
      }
    }
  }
`
