import { gql } from "graphql-tag";

// Define the GraphQL schema
export default gql`
  type Query {
    getPosts: [Post!]!
    getPost(_id: String!): Post!
    getSelfPosts: [Post!]!
  }

  type Mutation {
    createPost(content: String): Post
    updatePost(_id: String!, content: String!): Post
  }

  type Post {
    _id: ID!
    content: String!
    createdBy: User
    createdAt: String!
    updatedAt: String
  }
`;
