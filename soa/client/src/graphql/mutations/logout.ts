import { gql } from "@apollo/client";

export const logoutMutationGQL = gql`
    mutation Logout{
        logout
    }
`;