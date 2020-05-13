import { withApollo } from '../../apollo/apollo.js';
import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import apolloClient from "../../apolloClient";
import { ALL_CHARACTER_IDS, GET_CHARACTER } from "../../queries/characterQueries";


export async function getStaticPaths(ctx) {
  const client = await apolloClient(ctx)
  const response = await client.query({
    query: ALL_CHARACTER_IDS
  })

  const { count } = response.data.characters.info;

  const ids = [...Array(count).keys()];

  const paths = ids.map(id => ({
    params: { id: `${id + 1}` },
  }))

  return { paths, fallback: true }
}

export async function getStaticProps({ params }, ctx) {
  const client = await apolloClient(ctx)
  const response = await client.query({
    query: GET_CHARACTER,
    variables: {id: `${params.id}`}
  })

  const { character } = response.data;

  return { props: {
    character,
    loading: response.loading,
    error: !response.error ? null : response.error
    }
  }
}

const character = ({ character, loading, error }) => {

  const router = useRouter();

  if (router.isFallback) {
    if (loading) return <div className="flex items-center justify-center title">...Loading</div>;
    if (error) return <div>{Error.toString()}</div>
  }

  const handleClick = e => {
    e.preventDefault()
    router.push('/')
  }

  return (
    <>
    <div className="Hero font-mono text-lg py-2 bg-blue-500">
      <button
        onClick={handleClick}
        className="text-black bg-white hover:bg-black hover:text-white font-mono py-2
         px-4 border border-black rounded m-2"
      >
        Home
      </button>
      <div className="title">
        {character.name}
      </div>
      <br/>
      <hr style={{marginRight: '20%', marginLeft: '20%', border: '1px solid black', marginBottom: '2rem'}}/>
      <br/>
    </div>
      <br/>
      <div className="sm:gird sm:grid-cols-1 md:flex lg:flex font-mono " >
        <div className="align-center content-center mx-2">
          <img className="h-14 w-14 shadow-lg" src={character.image} alt={character.name} />
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
          <span className="underline text-xl content-center">
            Episodes: {character.episode.length}
          </span>
          <br/>
          {
            character.episode.map((episode) => {
              return(
                <div key={episode.id} className="border-gray-600 border rounded px-4 py-2 my-1 shadow
                hover:bg-black hover:text-white duration-300">
                  <Link href={`/episodes/${episode.id}`}>
                    <a>
                      <div className="flex flex-col">
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

