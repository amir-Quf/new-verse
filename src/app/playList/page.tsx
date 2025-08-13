import Container from '@/components/container'
import MusicPlayer from '@/components/musicPlayer'
import Link from 'next/link'
import React from 'react'
import musics from '@/utils/utils'
const PlayList = () => {
  return (
    <Container>
      <div className='pt-15'>
        {musics.map(music => (
          <MusicPlayer key={music.id}
          src={music.src}
          id={music.id}
          />
        ))}
      </div>

    </Container>
  )
}

export default PlayList
