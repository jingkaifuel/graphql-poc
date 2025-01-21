import { gql } from "graphql-tag";

// Define the GraphQL schema
export default gql`
  type Query {
    getCurrentUser: User
  }

  type Mutation {
    login(username: String!, password: String!): AuthPayload
    refresh(token: String!): AuthPayload
  }

  type User {
    _id: ID!
    username: String!
    password: String!
    email: String
  }

  type AuthPayload {
    token: String!
    user: User!
  }
`;
