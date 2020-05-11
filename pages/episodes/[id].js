import { withApollo } from '../../apollo/apollo.js';
import { useQuery } from '@apollo/react-hooks';
import React from 'react';
import { useRouter } from 'next/router';
import gql from 'graphql-tag';
import Link from 'next/link';
import Card from "../../components/Card";

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
                image
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
          <div className="flex justify-center">
            {episode.air_date}
          </div>
        </div>
      </div>
      <hr/>
      <div>
        <div className="font-mono title">
          Cast
        </div>
        <div className="sm:flex sm:flex-col sm:justify-center sm:content-center
         sm:items-center md:grid md:grid-cols-2 lg:grid lg:grid-cols-4">
          {episode.characters.map((data) => {
            return (
              <Card
                heading={data.name}
                text={data.status}
                img={data.image}
                key={data.id}
                id={data.id}
              />
            )
          })}
        </div>
      </div>
    </>
  );
};

export default withApollo({ssr: true})(episode);