import Pallate from '@/components/pallate';
import React from 'react'

const Page = ({params} : {
  params: {
    hex: string,
  };
}) => {

  const hex = params.hex
  const colors: undefined | string[] | any =
    hex && hex.split("-");
  
  console.log(colors)
  return (
    <>
      <main className='w-full h-full grid grid-rows-5 md:flex'>
        {colors.map((color:string , index: number) => (
          <Pallate key={index} color={color} />
        ))}
      </main>
    </>
  )
}

export default Page