import { withApollo } from '../../apollo/apollo.js';
import React from 'react';
import { useRouter } from 'next/router';
import Card from "../../components/Card";
import apolloClient from "../../apolloClient";
import { ALL_EPISODE_IDS, GET_EPISODE } from "../../queries/episodeQueries";

export async function getStaticPaths(ctx) {
  const client = await apolloClient(ctx)
  const response = await client.query({
    query: ALL_EPISODE_IDS
  })

  const { results } = response.data.episodes;

  const paths = results.map(post => ({
    params: { id: post.id },
  }))

  return { paths, fallback: true }
}

export async function getStaticProps({ params }, ctx) {
  const client = await apolloClient(ctx)
  const response = await client.query({
    query: GET_EPISODE,
    variables: {id: `${params.id}`}
  })

  const { episode } = response.data;

  return { props: {
      episode,
      loading: response.loading,
      error: !response.error ? null : response.error
    }
  }
}

const episode = ({ episode, loading, error }) => {

  const router = useRouter();

  if (loading) return <div className="flex items-center justify-center title">...Loading</div>;
  if (error) return <div>{Error.toString()}</div>
  if (router.isFallback) {
    return <div className="flex items-center justify-center title">Loading...</div>
  }

  const handleClick = e => {
    e.preventDefault()
    router.push('/')
  }

  return (
    <>
      <div className="Hero font-mono text-lg py-2">
        <button
          onClick={handleClick}
          className="text-black hover:bg-black hover:text-white font-mono py-2
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
                img={loading ? '/rickandmorty.jpg' : data.image}
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