import { gql } from "graphql-tag";
import userSchema from "./user.schema";
import postSchema from "./post.schema";

// Combine all the individual schemas
const typeDefs = gql`
  ${userSchema}
  ${postSchema}
`;

export default typeDefs;
