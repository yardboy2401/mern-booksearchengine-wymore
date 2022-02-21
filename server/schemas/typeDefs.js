// const { gql } = require('apollo-server-express');

// const typeDefs = gql`
//   type Query {
//       me: User
//   }

//   type Book {
//     bookId: String!
//     authors: [String]
//     description: String!
//     title: String!
//     image: String
//     link: String
//   }

//   type User {
//     _id: ID
//     username: String!
//     email: String!
//     bookCount: Int
//     savedBooks: [Book]
//   }

//   type Auth {
//     token: ID!
//     user: User
//   } 

//   input savedBook {
//       description: String!
//       title: String!
//       bookId: String!
//       image: String
//       link: String
//       authors: [String]
//   }

//   type Mutation {
//     addUser(username: String!, email: String!, password: String!): Auth
//     login(email: String!, password: String!): Auth
//     saveBook(input: savedBook!): User
//     removeBook(bookId: ID!): User
//   }
// `;

// module.exports = typeDefs;

const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
  }
  type Auth {
    token: ID!
    user: User
  }
  type Book {
    bookId: ID!
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }
  input InputBook {
    bookId: String
    authors: [String]
    title: String
    description: String
    image: String
    link: String
  }
  type Query {
    me: User
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(newBook: InputBook!): User
    removeBook(bookId: ID!): User
  }
`;

module.exports = typeDefs;