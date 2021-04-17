import {gql} from 'apollo-server';

export const userType = gql`
    scalar Date

    enum ROLE{
      USER,
      ADMIN,
      MODERATOR
    }

    interface Entity{
      _id: ID!
      username: String!
      password: String!
    }

    type User implements Entity @key(fields: "_id"){
        _id: ID!
        username: String!
        password: String!
        role: ROLE!
    }

    input UserInput{
      username: String!
      password: String!
      role: ROLE!
    }

    extend type Query{
      users: [User]!
      me: User
      paginatedUsers(page: Int, limit: Int): [User]!
    }

    extend type Mutation{
      register(userInput: UserInput): Boolean!
      login(username: String!, password: String!): String
      logout: Boolean!
    }
`;