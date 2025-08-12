import React from 'react'
import Link from 'next/link'
import Scroll from './scroll'

const Footer = () => {
  return (
    <footer className='text-white bg-secondary pt-8 '>
      <div className='flex justify-between mb-4 mx-5 font-bold lg:mx-50 leading-10'>
        <ul className="">
        <li>
          <Link className='flex gap-1' href="">
          <img src="/images/youtube.png" width='40' height='40' alt="youtubeLogo"/>
          <h4 className='active:text-blue-500'>my youtube</h4>
          </Link>
        </li>
        <li>
          <Link className='flex gap-1' href="">
          <img src="/images/instagram.png" width='40' height='40' alt="instagramLogo"/>
          <h4 className='active:text-blue-500'>my instagram</h4>
          </Link>
        </li>
        <li>
          <Link className='flex gap-1' href="">
            <img src="/images/soundCloud.png" width='40' height='40' alt="soundCloudLogo"/>
            <h4 className='active:text-blue-500'>my sound cloud</h4>
          </Link>
        </li>
        <li>
          <Link className='flex gap-1' href="">
            <img src="/images/gmail.png" width='40' height='40' alt="gmailLogo"/>
            <h4 className='active:text-blue-500'>my gmail</h4>
          </Link>
        </li>
        <li>
          <Link className='flex gap-1' href="">
            <img src="/images/telegram.png" width='40' height='40' alt="telegramLogo"/>
            <h4 className='active:text-blue-500'>my telegram chanel</h4>
          </Link>
        </li>
        <li>
          <Link className='flex gap-1' href="">
            <img src="/images/telegram.png" width='40' height='40' alt="telegramLogo"/>
            <h4 className='active:text-blue-500'>my telegram Id</h4>
          </Link>
        </li>
      </ul>
      <div className='relative'>
      <Scroll/>
      <Link href=''>
        <h3>My tracks</h3>
        </Link>
        <Link href=''>
        <h3>My Producer</h3>
        </Link>
      </div>
      </div>
      <p className="text-center pb-2 text-xs font-light text-gray-300">
            © {new Date().getFullYear()} New verse, All rights reserved.
          </p>
    </footer>
  )
}

export default Footer
