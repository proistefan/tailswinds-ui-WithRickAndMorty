import { withApollo } from '../../apollo/apollo.js';
import React , { useState, useEffect }from 'react';
import { useRouter } from 'next/router';
import Card from "../../components/Card";

import { request } from 'graphql-request';
import _, {debounce} from "lodash";

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

const episode = ({ episode, characters }) => {

  const [chars, setChars] = useState(characters);

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
      setChars(characters)
    }
  };

  const handleReset = e => {
    e.preventDefault()
    setChars(characters)
  };

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
        <div className="flex justify-center">
          <input
            className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username" type="text" placeholder="Character Search"  aria-label="Character Search Bar"
            value={lookup}
            onChange={handleChange}
          />
          <button
            className="text-black bg-white hover:bg-black hover:text-white font-mono py-2
         px-4 border border-black rounded m-2"
            onClick={handleReset}
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