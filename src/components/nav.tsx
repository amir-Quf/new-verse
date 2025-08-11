import Link from 'next/link'
import React from 'react'
import Container from './container'

const Navbar = () => {
  return (
    <nav className='bg-[rgba(24,61,61,0.95)] fixed w-screen shadow-xl md:disabled:none z-40'>
      <Container>
      <ul className='flex items-center gap-5 p-4 text-white font-bold'>
        <li><Link href='/'>Home</Link></li>
        <li><Link href='/playList'>Play list</Link></li>
        <li><Link href='/producer'>producer</Link></li>
      </ul>
      </Container>
    </nav>
  )
}

export default Navbar
