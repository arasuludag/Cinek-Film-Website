import { useEffect, useState } from 'react';
import SanityFilmsCarousel from './SanityFilmsCarousel';
import FilmModal from './FilmModal';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function DynamicCarousels({ categories = [] }) {
	const [loading, setLoading] = useState(false);
	const [localCategories, setLocalCategories] = useState(categories);
	const [activeFilm, setActiveFilm] = useState(null);

	useEffect(() => {
		if (categories && categories.length > 0) {
			setLocalCategories(categories);
			return;
		}

		const fetchCategories = async () => {
			try {
				setLoading(true);
				const { getCategoriesWithFilms } = await import('../lib/sanity');
				const data = await getCategoriesWithFilms();
				setLocalCategories(data);
			} catch (err) {
				console.error('Failed to load categories:', err);
			} finally {
				setLoading(false);
			}
		};

		fetchCategories();
	}, [categories]);

	if (loading) {
		return (
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				minHeight="200px"
			>
				<CircularProgress />
			</Box>
		);
	}

	return (
		<>
			{localCategories.length > 0 &&
				localCategories.map((category) => (
					<SanityFilmsCarousel
						key={category._id}
						categorySlug={category.slug.current}
						title={category.name}
						films={category.films}
						onFilmClick={setActiveFilm}
					/>
				))}
			<FilmModal
				film={activeFilm}
				open={Boolean(activeFilm)}
				onClose={() => setActiveFilm(null)}
			/>
		</>
	);
}
