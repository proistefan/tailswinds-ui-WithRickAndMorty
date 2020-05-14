import { withApollo } from '../../apollo/apollo.js';
import React from 'react';
import { useRouter } from 'next/router';
import Card from "../../components/Card";
import apolloClient from "../../apolloClient";
import { ALL_EPISODE_IDS, GET_EPISODE } from "../../queries/episodeQueries";
import useSWR from  'swr';
import { request } from 'graphql-request';
import gql from "graphql-tag";

export async function getStaticPaths() {
  const episodes = `
    query{
        episodes{
            info{
                count
            }
            results{
                id
        }
    }
}
`
  const response = await request('http://rickandmortyapi.com/graphql', episodes)

  const { count } = response.episodes.info;

  const ids = [...Array(count).keys()];

  const paths = ids.map(id => ({
    params: { id: `${id + 1}` },
  }))

  return { paths, fallback: true }
}

export async function getStaticProps({ params }) {
  const getEpisode = `
    query {
        episode(id: ${params.id}){
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

  const response = await request('http://rickandmortyapi.com/graphql', getEpisode)

  const { episode } = response;

  return {
    props: {
      episode: !episode ? {} : episode,
      characters: !episode ? [] : episode.characters,
      loading: !response.loading ? null : response.loading,
      error: !response.error ? null : response.error
    }
  }
}

const episode = ({ episode }) => {

  const { characters } = episode.characters;

  const router = useRouter();

  if (router.isFallback) {
    return <div className="flex items-center justify-center title">Loading...</div>
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
          <br/>
          <hr style={{marginRight: '20%', marginLeft: '20%', border: '1px solid black', marginBottom: '2rem'}} />
          <br/>
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
                img={!data ? '/rickandmorty.jpg' : data.image}
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

export default withApollo({ssr: false})(episode);