import Card from "../components/Card";

export default function IndexPage() {
  return (
    <>
    <div class=" bg-gray-200 h-screen w-screen">
      <div class="shadow-lg hero bg-blue-200">
        <h1 class="title">Apollo with Next.js</h1>
      </div>
      <div class="flex justify-center">
        <Card link={'/page1'} heading={'Card Heading'} text={'Click Me to head on over to page 1'}/>
      </div>
    </div>
    </>
  )
}
