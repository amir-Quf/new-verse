import React from 'react'

const Container = ({children} : {children : React.ReactNode}) => {
  return (
    <section className='container mx-auto'>
      {children}
    </section>
  )
}

export default Container
