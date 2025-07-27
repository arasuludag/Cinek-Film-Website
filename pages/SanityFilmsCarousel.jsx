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

export default function SanityFilmsCarousel({ categorySlug, title, films = [] }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // If films are provided as props, use them directly
  // Otherwise, fall back to fetching them (for backward compatibility)
  const [localFilms, setLocalFilms] = useState(films)

  useEffect(() => {
    // If films are provided as props, use them
    if (films && films.length > 0) {
      setLocalFilms(films)
      return
    }

    // Fallback: fetch films if not provided as props
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
      <div style={{ margin: "50px auto", textAlign: "center" }}>
        <Typography variant="h3" sx={{ margin: "10px 15px" }}>
          {title}
        </Typography>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <CircularProgress />
        </Box>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ margin: "50px auto", textAlign: "center" }}>
        <Typography variant="h3" sx={{ margin: "10px 15px" }}>
          {title}
        </Typography>
        <Typography color="error">
          Error loading films: {error}
        </Typography>
      </div>
    )
  }

  if (localFilms.length === 0) {
    return null // Don't render empty carousels
  }

  const renderPosters = () =>
    localFilms.map((film) => (
      <SwiperSlide className="posterSwiperSlide" key={film._id}>
        <Posters
          image={getImageUrl(film.poster)}
          title={film.title}
          date={film.date ? new Date(film.date).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long' }) : ''}
          href={film.href}
          categories={film.categories}
        />
      </SwiperSlide>
    ))

  return (
    <div style={{ margin: "50px auto" }}>
      <Typography id={title} variant="h3" sx={{ margin: "10px 15px" }}>
        {title}
      </Typography>
      <Swiper
        navigation={true}
        slidesPerView={"auto"}
        freeMode={true}
        modules={[FreeMode, Navigation]}
        className="posterSwiper"
      >
        {renderPosters()}
      </Swiper>
    </div>
  )
} 