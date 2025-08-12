'use client'

const Scroll = () => {
  return (
    <a href='#' onClick={(e) => {
    e.preventDefault()
    window.scrollTo({
      top: 0,
      behavior: "smooth", 
    })
  }}><div className='absolute left-[-5] top-[-50] w-10 h-10'><img className='text-white rounded-full w-full h-full p-0' src="/images/arrow3.png" alt=""/></div></a>
        
  )
}

export default Scroll
