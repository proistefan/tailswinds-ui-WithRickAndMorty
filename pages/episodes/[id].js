import { withApollo } from '../../apollo/apollo.js';
import { useQuery } from '@apollo/react-hooks';
import React from 'react';
import { useRouter } from 'next/router';
import gql from 'graphql-tag';
import Link from 'next/link';

const GET_EPISODE =  gql`
    query episode($id: ID!){
        episode(id: $id){
            id
            name
            air_date
            episode
            characters{
                id
                name
            }
        }
    }
`;

const episode = () => {

  const router = useRouter();

  const { data, loading, error } = useQuery(GET_EPISODE, {
    variables: {id: router.query.id}
  });

  if (loading) return <div>...Loading</div>;
  if (error) return <div>{Error.toString()}</div>

  console.log(data)

  const episode = data.episode || {};


  return (
    <>
      <div className="Hero font-mono text-lg py-2">
        <div>
          <div className="title">
            Episode {router.query.id}
          </div>
          <div className="title">
            {episode.name}
          </div>
        </div>
      </div>
    </>
  );
};

export default withApollo({ssr: true})(episode);