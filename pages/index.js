import Card from "../components/Card";
import { withApollo } from '../apollo/apollo';
import { useQuery } from '@apollo/react-hooks';
import { ALL_CHARACTERS } from '../queries/charecterQueries'
import React from "react";

const IndexPage = () => {
  const { data, loading, error } = useQuery(ALL_CHARACTERS);
  if (error) return <h1>Error</h1>;
  if (loading) return <h1>... Loading</h1>


  return (
    <div className=" bg-gray-200 h-auto w-auto">
      <div className="shadow-lg hero bg-blue-200">
        <h1 className="title">Apollo with Next.js</h1>
      </div>
        <div className="sm:grid sm:grid-cols-1 md:grid md:grid-cols-2 lg:grid lg:grid-cols-4">
          {data.characters.results.map((data) => {
            console.log(data);
            return (
              <Card
                heading={data.name}
                text={data.status}
                img={data.image}
                key={data.id}
              />
            )
          })}
        </div>
    </div>
  )
};

export default withApollo({ ssr: true })(IndexPage);
