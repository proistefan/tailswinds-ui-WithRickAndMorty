import gql from 'graphql-tag';

export const GET_EPISODE =  gql`
    query episode($id: ID!){
        episode(id: $id){
            id
            name
            air_date
            episode
            characters{
                id
                name
                image
            }
        }
    }
`;

export const ALL_EPISODE_IDS = gql`
    query{
        episodes{
            results{
                id
        }
    }
}
`;