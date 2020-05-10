import { withApollo } from '../../apollo/apollo.js';
import { useQuery } from '@apollo/react-hooks';
import React from 'react';
import { useRouter } from 'next/router';
import gql from 'graphql-tag';

const GET_CHARACTER =  gql`
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

`

const id = () => {

  const router = useRouter();

  const { data, loading, error } = useQuery(GET_CHARACTER, {
    variables: {id: router.query.id}
  });


  if (loading) return <div>...Loading</div>;
  if (error) return <div>{Error.toString()}</div>

  const character = data.character || {};

  console.log(character)

  return (
    <div>
      {character.name}
    </div>
  )

}

export default withApollo({ssr: false})(id)

