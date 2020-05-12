import Card from "../components/Card";
import { withApollo } from '../apollo/apollo';
import React from "react";
import apolloClient from "../apolloClient";
import {ALL_CHARACTERS} from "../queries/characterQueries";

export async function getStaticProps() {
  const ids = [...Array(591).keys()];
  const characterUrl = `https://rickandmortyapi.com/api/character/${ids.join(",")}`

  const res = await fetch(characterUrl);

  const characters = await res.json()

  return{
    props:{
      characters
    }
  }
}

// For GraphQL API - haven't figured out how to stream results
// export async function getStaticProps(ctx) {
//   const client = await apolloClient(ctx)
//   const response = await client.query({
//     query: ALL_CHARACTERS
//   })
//
//   return {
//     props: {
//       characters: response.data.characters.results,
//       loading: response.loading,
//       error: !response.error ? null : response.error
//     },
//   }
// }

const IndexPage = ({ characters }) => {

  // if (error) return <h1 className="flex justify-center">Error</h1>;
  // if (loading) return <h1 className="flex items-center justify-center title">... Loading</h1>

  return (
    <div className="bg-gray-200 h-auto w-auto">
      <div className="shadow-lg hero bg-blue-500 font-mono text-white">
        <h1 className="title">Rick & Morty</h1>
        <h3 className="flex justify-center"> with Next.js, Apollo GraphQL</h3>
        <h3 className="flex justify-center">and Tailwind CSS</h3>
        <h3 className="flex justify-center underline">
          <a href={'https://github.com/MuddyBootsCode/tailswinds-ui'}>
            Git Repo here
          </a>
        </h3>

      </div>
        <div className="sm:flex sm:flex-col sm:justify-center md:grid md:grid-cols-2 lg:grid lg:grid-cols-4">
          {characters.map((data) => {
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
  )
};

export default withApollo({ ssr: false })(IndexPage);
