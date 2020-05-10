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

export const GET_CHARACTER = gql`
    query character($id: ID!){
        character(id: $id){
            name
            status
            species
            type
            gender
            origin{
                name
            }
            image
            episode {
                id
                name
                air_date
                episode
            }
            created
        }
    }
`;