import Document, {Head, Html, Main, NextScript} from 'next/document';

export default class BlogDocument extends Document {
	public render() {
		return (
			<Html>
				<Head>
					<link href="https://fonts.googleapis.com" rel="preconnect" />
					<link href="https://fonts.gstatic.com" rel="preconnect" />
					<link
						href="https://avatars1.githubusercontent.com/u/45381083"
						rel="icon"
						type="image/png"
					/>
					<link
						href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;500&display=swap"
						rel="stylesheet"
					/>
				</Head>

				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
