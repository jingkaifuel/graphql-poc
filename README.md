# Sample GraphQL server

This server includes Authorisation and Authentication via JWT

<!-- GETTING STARTED -->

## Getting Started

To make sure you can install the correct packages and server the server as intended, it is recommended to follow the steps below.

### Prerequisites

- [Bun](https://bun.sh/docs/installation)
  ```sh
  npm install -g bun
  ```
- MongoDB server
  - Recommend to use [MongoDB Atlas](https://cloud.mongodb.com)

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/github_username/repo_name.git
   ```
2. Install packages
   ```sh
   bun install
   ```
3. Set up the environmental values in `.env`
   ```js
   MONGODB_URI = "mongodb://localhost:27017/sample";
   ACCESS_TOKEN_SECRET = "ACCESS_SECRET_KEY";
   REFRESH_TOKEN_SECRET = "REFRESH_SECRET_KEY";
   ```

## Sidenotes

This is a proof-of-concept (POC) project designed to demonstrate how GraphQL can handle authorization using JWTs, along with a direct MongoDB database connection. While this stack is suitable for testing and small-scale applications, it may face scalability challenges as the project grows due to limitations in direct database access and the potential performance bottlenecks of handling large-scale user authentication and authorization through JWTs.

Consider this POC as a starting point, and explore alternative approaches, such as adding an API gateway, introducing database connection pooling, or implementing microservices for more robust scalability in production environments.
