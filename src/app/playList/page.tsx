import Container from '@/components/container'
import MusicPlayer from '@/components/musicPlayer'
import Link from 'next/link'
import React from 'react'

const PlayList = () => {
  return (
    <Container>
      <div className='pt-15'>
        <Link href={'/playList/1'}>
          <MusicPlayer
          src="/musics/bbalTarik.mp3"
          />
        </Link>
      </div>

    </Container>
  )
}

export default PlayList
