import type { GatsbyConfig } from 'gatsby'

const SITE_URL = 'https://hurima90-kim.github.io'

function rehypeSlug() {
  function getText(node: any): string {
    if (node.type === 'text') return node.value as string
    if (node.children) return (node.children as any[]).map(getText).join('')
    return ''
  }
  function slugify(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
  }
  return function (tree: any) {
    function visit(node: any) {
      if (node.tagName && /^h[1-6]$/.test(node.tagName)) {
        if (!node.properties) node.properties = {}
        if (!node.properties.id) {
          node.properties.id = slugify(getText(node))
        }
      }
      if (node.children) (node.children as any[]).forEach(visit)
    }
    visit(tree)
  }
}

const config: GatsbyConfig = {
  siteMetadata: {
    title: `주니어 개발자 킴의 테크 블로그`,
    description: `주니어 개발자 킴의 성장과정을 담아두는 기술 블로그입니다.`,
    author: `Developer Kim`,
    siteUrl: `https://hurima90-kim.github.io`,
  },
  graphqlTypegen: {
    generateOnBuild: true,
  },
  jsxRuntime: 'automatic',
  flags: {
    DEV_SSR: false,
  },
  plugins: [
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 800,
              quality: 80,
              linkImagesToOriginal: false,
            },
          },
        ],
        mdxOptions: {
          rehypePlugins: [rehypeSlug],
        },
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: './content/posts/',
      },
      __key: 'posts',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: SITE_URL,
        stripQueryString: true,
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        policy: [{ userAgent: '*', allow: '/' }],
      },
    },
  ],
}

export default config
