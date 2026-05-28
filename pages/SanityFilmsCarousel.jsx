import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react"
import Posters from "./Posters.jsx"
import Typography from "@mui/material/Typography"
import CircularProgress from "@mui/material/CircularProgress"
import Box from "@mui/material/Box"
import { getImageUrl } from '../lib/sanity'

// Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/navigation"

// import required modules
import { FreeMode, Navigation } from "swiper"

export default function SanityFilmsCarousel({ categorySlug, title, films = [], onFilmClick }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [localFilms, setLocalFilms] = useState(films)

  useEffect(() => {
    if (films && films.length > 0) {
      setLocalFilms(films)
      return
    }

    const fetchFilms = async () => {
      try {
        setLoading(true)
        const { getFilmsByCategory } = await import('../lib/sanity')
        const data = await getFilmsByCategory(categorySlug)
        setLocalFilms(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchFilms()
  }, [categorySlug, films])

  if (loading) {
    return (
      <Box sx={{ margin: "40px auto" }}>
        <Typography variant="h5" sx={{ margin: "10px 32px", fontWeight: 700 }}>
          {title}
        </Typography>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <CircularProgress />
        </Box>
      </Box>
    )
  }

  if (error) {
    return (
      <Box sx={{ margin: "40px auto", textAlign: "center" }}>
        <Typography variant="h5" sx={{ margin: "10px 32px", fontWeight: 700 }}>
          {title}
        </Typography>
        <Typography color="error">Error loading films: {error}</Typography>
      </Box>
    )
  }

  if (localFilms.length === 0) {
    return null
  }

  return (
    <Box sx={{ margin: "40px 0" }}>
      <Typography
        id={title}
        variant="h5"
        sx={{
          margin: "0 32px 4px",
          fontWeight: 700,
          fontSize: { xs: "1.15rem", md: "1.4rem" },
          color: "white",
        }}
      >
        {title}
      </Typography>
      <Swiper
        navigation={true}
        slidesPerView={"auto"}
        spaceBetween={12}
        freeMode={true}
        modules={[FreeMode, Navigation]}
        className="posterSwiper"
      >
        {localFilms.map((film) => (
          <SwiperSlide className="posterSwiperSlide" key={film._id}>
            <Posters
              image={getImageUrl(film.poster)}
              title={film.title}
              date={
                film.date
                  ? new Date(film.date).toLocaleDateString('tr-TR', {
                      year: 'numeric',
                      month: 'long',
                    })
                  : ''
              }
              rawDate={film.date}
              href={film.href}
              categories={film.categories}
              onClick={() => onFilmClick && onFilmClick(film)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  )
}
