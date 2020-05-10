import Link from 'next/link';

const Card = (props) => {

  const { heading, link, text, img, } = props;

  return(
    <div class="max-w-sm px-4 py-2 m-2 font-mono text-lg text-gray-800 text-center border-gray-600 border rounded-lg bg-white
      shadow-lg hover:bg-black hover:text-white duration-300
    " style={{ hover: 'transform: scale(1.5)'}}>
      <h3 class="pt-2">{heading}</h3>
        <hr style={{ marginLeft: '20%', marginRight: "20%"}}/>
        <div class="flex text-sm justify-center m-4">
          {text}
        </div>
      <div className={"flex justify-center"}>
        <img className="w-13 h-13 rounded-full mr-4" src={img} />
      </div>
    </div>
  )
}

export default Card;

