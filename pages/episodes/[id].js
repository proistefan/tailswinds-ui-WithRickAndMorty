import { withApollo } from '../../apollo/apollo.js';
import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import Card from "../../components/Card";
import apolloClient from "../../apolloClient";
import { ALL_EPISODE_IDS, GET_EPISODE } from "../../queries/episodeQueries";
import _, {debounce} from "lodash";

export async function getStaticPaths(ctx) {
  const client = await apolloClient(ctx)
  const response = await client.query({
    query: ALL_EPISODE_IDS
  })

  const { count } = response.data.episodes.info;

  const ids = [...Array(count).keys()];

  const paths = ids.map(id => ({
    params: { id: `${id + 1}` },
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

  if (router.isFallback) {
    if (loading) return <div className="flex items-center justify-center title">Loading...</div>
    if (error) return <div>{Error.toString()}</div>
  }

  const handleClick = e => {
    e.preventDefault()
    router.push('/')
  }

  const [chars, setChars] = useState(episode.characters);

  const [lookup, setLookup] = useState('');

  useEffect(() => {
    const res = _.filter(chars, char => char.name.toLowerCase().includes(lookup.toLowerCase()))

    setChars(res);
  }, [lookup]);

  const handleChange = e => {
    debounce(
        (e) => setLookup(e.target.value), 100
    )
    setLookup(e.target.value);
    if (e.target.value === ''){
      setChars(episode.characters)
    }
  };

  const handleResetClick = e => {
    e.preventDefault()
    setChars(episode.characters)
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
        <div className="flex justify-center">
          <input
              className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username" type="text" placeholder="Character Search"
              value={lookup}
              onChange={handleChange}
          />
          <button
              className="text-black bg-white hover:bg-black hover:text-white font-mono py-2
         px-4 border border-black rounded m-2"
              onClick={handleResetClick}
          >
            Reset Search
          </button>
        </div>
        <div className="sm:flex sm:flex-col sm:justify-center sm:content-center
         sm:items-center md:grid md:grid-cols-2 lg:grid lg:grid-cols-4">
          {chars.map((data) => {
            return (
              <Card
                heading={data.name}
                text={data.status}
                img={!data.image ? '/rickandmorty.jpg' : data.image}
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