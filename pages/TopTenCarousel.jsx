import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Image from 'next/image'
import { getImageUrl, getImageDimensions } from '../lib/sanity'
import FilmModal from './FilmModal'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'

import { FreeMode, Navigation } from 'swiper'

export default function TopTenCarousel({ topTen }) {
  const [activeFilm, setActiveFilm] = useState(null)

  if (!topTen || !topTen.films || topTen.films.length === 0) {
    return null
  }

  const title = topTen.title || 'En Çok İzlenenler'
  const films = topTen.films.slice(0, 10)

  return (
    <Box sx={{ margin: '40px 0' }}>
      <Typography
        id={title}
        variant="h5"
        sx={{
          margin: '0 32px 4px',
          fontWeight: 700,
          fontSize: { xs: '1.15rem', md: '1.4rem' },
          color: 'white',
        }}
      >
        {title}
      </Typography>
      <Box className="topTenSwiperViewport" sx={{ overflow: 'hidden', position: 'relative', px: { xs: '16px', sm: '32px' } }}>
      <Swiper
        navigation={true}
        slidesPerView={'auto'}
        spaceBetween={4}
        freeMode={true}
        modules={[FreeMode, Navigation]}
        className="topTenSwiper"
      >
        {films.map((film, idx) => {
          const rank = idx + 1
          const isTen = rank === 10
          const { width: posterW, height: posterH } = getImageDimensions(film.poster)
          return (
            <SwiperSlide
              className={`topTenSwiperSlide${isTen ? ' is-ten' : ''}`}
              key={film._id}
            >
              <Box
                onClick={() => setActiveFilm(film)}
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'flex-end',
                  cursor: 'pointer',
                  transition: 'transform 0.25s ease',
                  '&:hover': { transform: 'scale(1.03)' },
                }}
              >
                <Box
                  sx={{
                    flex: isTen ? '0 0 42%' : '0 0 32%',
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-start',
                    overflow: 'hidden',
                    pointerEvents: 'none',
                  }}
                >
                  <Box
                    component="span"
                    className="topTenNumeral"
                    sx={{
                      fontFamily: "'Inter', 'Helvetica Neue', 'Arial Black', sans-serif",
                      fontWeight: 800,
                      fontStyle: 'normal',
                      lineHeight: 0.85,
                      fontSize: { xs: '8rem', sm: '10.5rem', md: '13rem' },
                      letterSpacing: '-0.04em',
                      userSelect: 'none',
                      transform: 'translateY(6%)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {rank}
                  </Box>
                </Box>

                <Box
                  sx={{
                    flex: '0 0 60%',
                    position: 'relative',
                    aspectRatio: `${posterW} / ${posterH}`,
                    borderRadius: '10px',
                    overflow: 'hidden',
                    background: '#0a0a0a',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
                    marginLeft: '-5%',
                    zIndex: 1,
                  }}
                >
                  <Image
                    src={getImageUrl(film.poster)}
                    alt={film.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </Box>
              </Box>
            </SwiperSlide>
          )
        })}
      </Swiper>
      </Box>
      <FilmModal
        film={activeFilm}
        open={Boolean(activeFilm)}
        onClose={() => setActiveFilm(null)}
      />
    </Box>
  )
}
