import gql from 'graphql-tag';

export const ALL_CHARACTERS = gql`
    query{
        characters{
            results{
                id
                name
                image
                status
            }
        }
    }
`;
