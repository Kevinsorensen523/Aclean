import * as React from 'react';

// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './pages/Home';
import Theme from './theme/theme';
import Fonts from './utilities/fonts';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
	},
]);

function App() {
	// 2. Wrap ChakraProvider at the root of your app
	return (
		<ChakraProvider theme={Theme}>
			<Fonts />
			<RouterProvider router={router} />
		</ChakraProvider>
	);
}

export default App;
