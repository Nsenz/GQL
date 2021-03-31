import {gql} from 'apollo-server';
import { GraphQLScalarType, Kind } from 'graphql';

export const userType = gql`
  directive @deprecated(
    reason: String = "No longer supported"
  ) on ENUM_VALUE

  scalar Date

  interface Leisure {
    name: String!
  }

  type User {
    _id: ID
    username: String!
    password: String!
    blockchain: String!
    createdAt: Date!
    role: ROLE!
    leisure: [Leisure!]!
  }

  type Movie implements Leisure {
    name: String!
    duration: Float!
  }

  type Magazine implements Leisure {
    name: String!
  }

  type Query {
    users: [User]
    user(_id: ID!): User
  }

  type Mutation {
    createUser(
      username: String!
      password: String!
      role: ROLE!
    ): Boolean
    addMovieLeisure(leisureInput: LeisureInput!, duration: Float!): Boolean
    addMagazineLeisure(leisureInput: LeisureInput!): Boolean
  }

  input LeisureInput {
    id: ID!
    name: String!
  }

  enum ROLE {
    USER
    MODERATOR @deprecated(reason: "Use 'User' instead")
    ADMIN
  }
`;

export const customDateScalar = new GraphQLScalarType({
    name: 'Date',
    serialize(date: Date) {
        return date.getTime();
    },
    parseValue(date) {
        return new Date(date);
    },
    parseLiteral(date) {
        if (date.kind === Kind.INT) {
            return new Date(parseInt(date.value, 10));
        }
        return null;
    },
});