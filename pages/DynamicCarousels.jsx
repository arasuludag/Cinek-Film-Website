import { useEffect, useState } from 'react';
import SanityFilmsCarousel from './SanityFilmsCarousel';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function DynamicCarousels({ categories = [] }) {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [localCategories, setLocalCategories] = useState(categories);

	useEffect(() => {
		// If categories are provided as props, use them
		if (categories && categories.length > 0) {
			setLocalCategories(categories);
			return;
		}

		// Fallback: fetch categories if not provided as props
		const fetchCategories = async () => {
			try {
				setLoading(true);
				const { getCategoriesWithFilms } = await import('../lib/sanity');
				const data = await getCategoriesWithFilms();
				setLocalCategories(data);
			} catch (err) {
				setError(err.message);
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
			{localCategories.length > 0 && (
				localCategories.map((category) => (
					<SanityFilmsCarousel
						key={category._id}
						categorySlug={category.slug.current}
						title={category.name}
						films={category.films}
					/>
				))
			)}
		</>
	);
}
