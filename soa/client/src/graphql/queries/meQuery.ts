import { gql } from '@apollo/client';

export const meQueryGQL = gql`
    query meQuery {
        me {
            _id
            username
            password
            role
            watchList {
                _id
                name
                rank
                symbol
                icon
                volume24
            }
        }
    }
`;
