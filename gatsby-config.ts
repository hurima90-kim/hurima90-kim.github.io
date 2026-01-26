import type { GatsbyConfig } from 'gatsby'
import dotenv from 'dotenv'

dotenv.config()

const SITE_URL = 'https://hurima90-kim.github.io'

const config: GatsbyConfig = {
  siteMetadata: {
    title: `주니어 개발자 킴의 테크 블로그`,
    description: `주니어 개발자 킴의 성장과정을 담아두는 기술 블로그입니다.`,
    author: `Developer Kim`,
    siteUrl: `https://hurima90-kim.github.io`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  jsxRuntime: 'automatic',
  flags: {
    DEV_SSR: false,
  },
  plugins: [
    {
      resolve: 'gatsby-source-contentful',
      options: {
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        spaceId: process.env.CONTENTFUL_SPACE_ID,
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-sitemap',
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
    {
      resolve: 'gatsby-plugin-gtag',
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_ID,
        head: true, // 애널리틱스 스크립트를 Head 태그 내에 둘지에 대한 속성입니다.
      },
    },
  ],
}

export default config
