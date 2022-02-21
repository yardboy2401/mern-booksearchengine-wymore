//import graphql from apollo/client
import { gql } from '@apollo/client';

//export graphql GET_ME query
export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;
