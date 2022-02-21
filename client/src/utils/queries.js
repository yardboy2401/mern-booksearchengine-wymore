// import gql from "graphql-tag";

// export const GET_ME = gql`
//     {
//         me {
//             _id
//             username
//             email
//             bookCount
//             savedBooks {
//                 bookId
//                 authors
//                 image
//                 link
//                 title
//                 description
//             }
//         }
//     }
// `;

import { gql } from '@apollo/client';

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