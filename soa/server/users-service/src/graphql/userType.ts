import {gql} from 'apollo-server';

export const userType = gql`
    scalar Date

    interface Entity{
      _id: ID!
      username: String!
      password: String!
    }

    type User implements Entity @key(fields: "_id"){
        _id: ID!
        username: String!
        password: String!
    }

    input UserInput{
      username: String!
      password: String!
    }

    extend type Query{
      users: [User]!
      paginatedUsers(page: Int, limit: Int): [User]!
    }

    extend type Mutation{
      createUser(userInput: UserInput): Boolean
    }
`;