import 'tailwindcss/tailwind.css';
import '../styles/main.css';

import type {AppProps} from 'next/app';
import Head from 'next/head';
import Script from 'next/script';

export default function App({Component, pageProps, router}: AppProps) {
	return (
		<div className="px-4 md:px-16 space-y-24 py-24 max-w-4xl">
			<Head>
				<title>carter himmel • blog</title>
			</Head>

			<Component {...pageProps} />

			<script async defer src="https://science.fyko.net/latest.js" />
			<noscript>
				{/* eslint-disable @next/next/no-img-element */}
				<img
					alt=""
					referrerPolicy="no-referrer-when-downgrade"
					src="https://science.fyko.net/noscript.gif"
				/>
			</noscript>

			<footer className="space-y-2">
				<a
					className="underline decoration-blue-500/20 hover:decoration-blue-500/50 text-neutral-400 dark:text-neutral-700"
					href="https://fyko.net"
				>
					Carter Himmel
				</a>
				<br />
				<small className="underline text-neutral-400 dark:text-neutral-700">
					fork of{' '}
					<a
						className="underline decoration-blue-500/20 hover:decoration-blue-500/50"
						href="https://github.com/alii/blog"
					>
						alii/blog
					</a>
				</small>
			</footer>
		</div>
	);
}
