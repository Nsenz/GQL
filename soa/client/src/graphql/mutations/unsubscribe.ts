import { gql } from "@apollo/client";

export const unsubscribeMutationGQL = gql`
    mutation Unsubscribe($coinId: ID!, $userId: ID!){
        removeCoinsubscribers(_id:$coinId, userId:$userId)
    }
`;