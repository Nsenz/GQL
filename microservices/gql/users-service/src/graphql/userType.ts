import {gql} from 'apollo-server';

export const userType = gql`
    scalar Date

    interface Entity{
      id: ID!
      firstName: String!
      lastName: String!
    }

    type User implements Entity @key(fields: "id"){
        id: ID!
        firstName: String!
        lastName: String!
        password: String!
        createdAt: Date
    }

    input UserInput{
      firstName: String!
      lastName: String!
      password: String!
    }

    extend type Query{
      users: [User]
    }

    extend type Mutation{
      createUser(userInput: UserInput): Boolean
    }
`;