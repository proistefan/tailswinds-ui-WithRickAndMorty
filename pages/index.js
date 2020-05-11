import Card from "../components/Card";
import { withApollo } from '../apollo/apollo';
import { useQuery } from '@apollo/react-hooks';
import React from "react";
import gql from 'graphql-tag';

const ALL_CHARACTERS = gql`
    query{
        characters{
            results{
                id
                name
                image
                status
            }
        }
    }
`;

const IndexPage = () => {
  const { data, loading, error } = useQuery(ALL_CHARACTERS);
  if (error) return <h1 className="flex justify-center">Error</h1>;
  if (loading) return <h1 className="flex items-center justify-center title">... Loading</h1>


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
          {data.characters.results.map((data) => {
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
  )
};

export default withApollo({ ssr: true })(IndexPage);
