import 'tailwindcss/tailwind.css';
import '../styles/main.css';

import React from 'react';
import Head from 'next/head';
import type {AppProps} from 'next/app';

export default function App({Component, pageProps}: AppProps) {
	return (
		<div className="px-4 md:px-16 py-24 max-w-4xl">
			<Head>
				<title>alistair smith • blog</title>
			</Head>

			<Component {...pageProps} />
		</div>
	);
}
