import React from 'react';

const DefaultCard = () => {
  return (
    <div className="max-w-sm px-4 py-2 m-2 font-mono text-lg text-gray-800 text-center border-gray-600 border rounded-lg bg-white
      shadow-lg hover:bg-black hover:text-white duration-300">
      <img src={'../public/rickandmorty.jpg'} alt="Rick and Morty Outline" />
    </div>
  );
};

export default DefaultCard;