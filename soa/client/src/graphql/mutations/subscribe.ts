import { gql } from "@apollo/client";

export const subscribeMutationGQL = gql`
    mutation Subscribe($coinId: ID!, $userId: ID!){
        addCoinsubscribers(_id:$coinId, userId: $userId)
    }
`;