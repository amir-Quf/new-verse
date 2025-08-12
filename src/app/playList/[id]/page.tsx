import React from 'react'

const Track = async ({params} : {params: Promise<{id : string}>}) =>  {
  const {id} = await params
  return (
    <div>
      <h1 className='text-2xl'>Music{id}</h1>
    </div>
  )
}

export default Track
