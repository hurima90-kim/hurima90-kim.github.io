import { GatsbyNode } from 'gatsby'

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] =
  ({ actions }) => {
    const { createTypes } = actions

    createTypes(`
      type MdxFrontmatter {
        title: String
        date: String
        category: [String]
        slug: String
        description: String
        thumbnail: File @fileByRelativePath
      }
    `)
  }
