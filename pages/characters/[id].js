import { withApollo } from '../../apollo/apollo.js';
import { useQuery } from '@apollo/react-hooks';
import React from 'react';
import { useRouter } from 'next/router';
import gql from 'graphql-tag';
import Link from 'next/link';

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
`;

const character = () => {

  const router = useRouter();

  const { data, loading, error } = useQuery(GET_CHARACTER, {
    variables: {id: router.query.id}
  });


  if (loading) return <div>...Loading</div>;
  if (error) return <div>{Error.toString()}</div>

  const character = data.character || {};

  return (
    <>
    <div className="Hero font-mono text-lg py-2">
      <div className="title">
        {character.name}
      </div>
    </div>
      <br/>
      <hr style={{marginRight: '20%', marginLeft: '20%', border: '1px solid black', marginBottom: '2rem'}}/>
      <div className="sm:gird sm:grid-cols-1 md:flex lg:flex font-mono " >
        <div className="align-center content-center mx-2">
          <img className="h-14 w-14" src={character.image} alt={character.name} />
        </div>
        <div className="flex flex-col mx-2">
          <div>
            <span className="underline text-xl">Information:</span>
          </div>
          <div>
            Gender: {character.gender}
          </div>
          <div>
            Species: {character.species}
          </div>
          <div>
            Origin: {character.origin.name}
          </div>
          <div className="text-red-500 underline">
            Status: {character.status}
          </div>
          <br/>
          <hr/>
        </div>
        <div className="mx-2">
          <span className="underline text-xl">
            Episodes: {character.episode.length}
          </span>
          <br/>
          {
            character.episode.map((episode) => {
              return(
                <div key={episode.id}>
                  <Link href={`/episodes/${episode.id}`} >
                    <a>
                      <div className="flex flex-col">
                        --
                        <br/>
                        Name: {episode.name}
                        <br/>
                        AirDate: {episode.air_date}
                      </div>
                    </a>
                  </Link>
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  )

}

export default withApollo({ssr: false})(character)

