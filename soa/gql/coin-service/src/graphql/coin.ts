import {gql} from 'apollo-server';

export const coinType = gql`
    type Coin{
        id: ID!
        name: String!
        rank: Int!
        symbol: String!
        icon: String
        volume24: String
    }

    extend type User @key(fields: "id"){
        id: ID! @external
        subscriptions: [Coin]
    }

    extend type Query{
        coins: [Coin]
        coin(id: ID!): Coin
    }

    extend type Mutation{
        subscribeCoin(userSubscriptionPayload: UserSubscriptionPayload)
    }

    input UserSubscriptionPayload{
        userId: ID!,
        coinId: ID!
    }
`