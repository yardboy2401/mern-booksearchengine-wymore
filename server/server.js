//requires for express, ApolloServer, path, schemas, db, authMiddleware and PORT
const express = require('express');
const { ApolloServer } = require("apollo-server-express");
const path = require('path');
const { typeDefs, resolvers } = require("./schemas");
const db = require('./config/connection');
const { authMiddleware } = require('./utils/auth');
const app = express();
const PORT = process.env.PORT || 3001;

//create instance of ApolloServer with typeDefs/Resolvers/and AuthMiddleware
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

//apply middleware
server.applyMiddleware({ app });

//.use for urlencoded and json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//If in production serve client/build as static assets pointing to build folder
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

//.get pointing to client build index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

//app.listen for ports
db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
  console.log(`GraphQL server ready at http://localhost:${PORT}${server.graphqlPath}`);
});
