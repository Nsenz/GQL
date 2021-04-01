import {gql} from 'apollo-server';

export const coinType = gql`
    type Coin{
        _id: ID!
        name: String!
        rank: Int!
        symbol: String!
        icon: String
        volume24: String
        watchers: [User]
    }

    input CoinInput{
        name: String!
        rank: Int!
        symbol: String!
        icon: String
        volume24: String
    }

    extend type User @key(fields: "_id"){
        _id: ID! @external
        watchList: [Coin]
    }

    extend type Query{
        coins: [Coin!]!
    }

    extend type Mutation{
        addCoinWatcher(_id: ID!, userId: ID!): Boolean
        addCoin(coin: CoinInput!): Boolean
    }
`