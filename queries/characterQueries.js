import gql from 'graphql-tag';

export const GET_CHARACTER =  gql`
    query character($id: ID!){
        character(id: $id){
            id
            name
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

export const GET_CHARACTER_IDS_BY_PAGE = gql`
    query characters($page: Int){
        characcters(page: $page){
            info{
                count
                pages
                next
                prev
            }
            results{
                id
            }
        }
    }
`;

export const ALL_CHARACTERS = gql`
    query{
        characters{
            info{
                count
            }
            results{
                id
                name
                image
                status
            }
        }
    }
`;

export const ALL_CHARACTER_IDS = gql`
    query{
        characters{
            info{
                pages
                count
            }
            results{
                id
            }
        }
    }
`;