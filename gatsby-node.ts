import { GatsbyNode } from 'gatsby'

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] =
  ({ actions }) => {
    const { createTypes } = actions

    createTypes(`
    type ContentfulPostContent {
      raw: String
      references: [ContentfulAsset] @link(by: "contentful_id", from: "references___NODE")
    }
  `)
  }
