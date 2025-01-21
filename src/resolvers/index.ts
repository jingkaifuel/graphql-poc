import { mergeResolvers } from "@graphql-tools/merge";
import { userResolver } from "./user.resolver";
import { postResolver } from "./post.resolver";

const resolvers = mergeResolvers([userResolver, postResolver]);

export default resolvers;
