import { gql } from "@apollo/client";

export const loginMutationGQL = gql`
    mutation loginMutation($username: String!, $password: String!) {
        login(username: $username, password: $password)
    }
`;