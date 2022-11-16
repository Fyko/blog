import SyntaxHighlighter from 'react-syntax-highlighter';
import dark from 'react-syntax-highlighter/dist/cjs/styles/hljs/darcula';
import light from 'react-syntax-highlighter/dist/cjs/styles/hljs/lightfair';

type Style = Record<`hljs-${string}`, string>;

export function Highlighter({
	children,
	id = '',
	language = 'typescript',
}: {
	children: string;
	id?: string;
	language?: string;
}) {
	return (
		<div className="no-pre-margin" id={id}>
			<div className="hidden dark:block">
				<SyntaxHighlighter language={language} style={dark as Style}>
					{children}
				</SyntaxHighlighter>
			</div>

			<div className="dark:hidden">
				<SyntaxHighlighter language={language} style={light as Style}>
					{children}
				</SyntaxHighlighter>
			</div>
		</div>
	);
}
