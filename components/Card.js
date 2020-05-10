const Card = (props) => {

  const { heading, text, img, id} = props;

  return(
    <Link href={`/characters/${id}`}>
      <a>
        <div className="max-w-sm px-4 py-2 m-2 font-mono text-lg text-gray-800 text-center border-gray-600 border rounded-lg bg-white
      shadow-lg hover:bg-black hover:text-white duration-300">
          <h3 className="pt-2">{heading}</h3>
          <hr style={{marginLeft: '20%', marginRight: "20%"}}/>
          <div className="flex text-sm justify-center m-4">
            {text}
          </div>
          <div className={"flex justify-center"}>
            <img className="w-11 h-11 rounded-full mr-4" src={img}/>
          </div>
        </div>
      </a>
    </Link>
)
}

import Link from 'next/link';

export default Card;

