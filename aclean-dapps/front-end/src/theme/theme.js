import { extendTheme } from '@chakra-ui/react';

const Theme = extendTheme({
	fonts: {
		heading: `'Gentium Book Plus', serif`,
		body: `'Inter', sans-serif`,
	},
	colors: {
		aclean: {
			50: '#DBFFFA',
			100: '#BDFFF5',
			200: '#75FFEA',
			300: '#33FFE0',
			400: '#00EBC7',
			500: '#00A991',
			600: '#008571',
			700: '#006657',
			800: '#004238',
			900: '#00241E',
			950: '#000F0D',
		},
	},
});

export default Theme;
