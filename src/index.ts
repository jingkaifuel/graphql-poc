import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import typeDefs from "./schemas";
import resolvers from "./resolvers";
import connectToDatabase from "./db";
import { getLoggedInUser } from "./auth";

// Load dotenv
require("dotenv").config({ path: __dirname + "/.env" });

async function startApolloServer() {
  // Connect to the MongoDB database
  await connectToDatabase();

  // Create an Apollo Server instance with the schema and resolvers
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  // Start the Apollo server
  const { url } = await startStandaloneServer(server, {
    context: async ({ req, res }) => {
      // Get the current user from the request header
      const user = await getLoggedInUser(req);
      return { req, res, user };
    },
  });

  console.log(`
    🚀  Server is running!
    📭  Query at ${url}
  `);
}

startApolloServer();
