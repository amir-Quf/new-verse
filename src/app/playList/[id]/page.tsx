import { notFound } from 'next/navigation'
import React from 'react'

const Track = async ({params} : {params: Promise<{id : string}>}) =>  {
  const {id} = await params
  if(parseInt(id) > 10){
    notFound()
  } 
  return (
    <div className=''>
      <h1 className='pt-20 text-2xl text-white'>Music{id}</h1>
    </div>
  )
}

export default Track
