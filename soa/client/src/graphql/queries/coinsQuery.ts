import { gql } from "@apollo/client";

export const coinsQueryGQL = gql`
        query Coins{
            coins{
                _id
                name
                rank
                symbol
                icon
                volume24
                subscribers{
                    username
                }
            }
        }
`;
