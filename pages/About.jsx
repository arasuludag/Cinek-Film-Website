import React from 'react';
import Grid from '@mui/material/Grid';
import Swiper from './Swiper';
import Typography from '@mui/material/Typography';

function About({ aboutSection }) {
	if (!aboutSection) return null;

	return (
		<Grid
			id="About"
			container
			direction="row"
			justifyContent="center"
			alignItems="center"
			className="About"
		>
			<Grid item xs={10} sm={10} lg={6}>
				<Typography variant="h3">{aboutSection.title}</Typography>
				<Typography variant="p" sx={{ whiteSpace: 'pre-wrap' }}>
					{aboutSection.body}
				</Typography>
			</Grid>
			<Grid item xs={10} sm={10} lg={6}>
				<Swiper />
			</Grid>
		</Grid>
	);
}

export default About;
