import React from 'react';
import Grid from '@mui/material/Grid';
import Swiper from './Swiper';
import Typography from '@mui/material/Typography';

function About() {
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
				<Typography variant="h3">HAKKINDA</Typography>
				<Typography variant="p">
					Cinek Film, 2015’ten bu yana kısa film ve animasyonlar üreten bağımsız
					bir yapım kanalıdır. Her yapımda güçlü hikâyeler, sinemasal anlatım ve
					özgün bir bakış sunmayı hedefler.
				</Typography>
			</Grid>
			<Grid item xs={10} sm={10} lg={6}>
				<Swiper />
			</Grid>
		</Grid>
	);
}

export default About;
