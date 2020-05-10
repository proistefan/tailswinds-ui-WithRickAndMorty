import Link from 'next/link';

const Card = (props) => {

  const { heading, link, text } = props;

  return(
    <div class="w-1/4 h-24 font-mono text-lg text-gray-800 text-center border-gray-600 border rounded-lg bg-white
      shadow-lg hover:bg-black hover:text-white duration-300 m-4
    " style={{ hover: 'transform: scale(1.5)'}}>
      <Link href={link}>
      <a>
      <h3 class="pt-2">{heading}</h3>
        <hr style={{ marginLeft: '20%', marginRight: "20%"}}/>
        <div class="flex text-sm justify-center m-4">
          {text}
        </div>
     </a>
     </Link>

    </div>
  )
}

export default Card;

