import process from 'node:process';
import type { PageConfig } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { posts } from '../posts';

// Sweet zero js 🤑
export const config: PageConfig = {
	unstable_runtimeJS: false,
};

export default function Home() {
	return (
		<main className="space-y-8">
			<h2>
				<span>blog.fyko.net</span>{' '}
				<a
					className="text-neutral-500 hover:text-blue-500"
					href="https://github.com/Fyko"
					rel="noreferrer"
					target="_blank"
				>
					– github
				</a>
			</h2>

			<ul className="space-y-1 list-disc list-inside">
				{process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
					? posts
							.filter(post => !post.hidden)
							.map(post => (
								<BlogLink badges={post.badges} href={`/${post.slug}`} key={post.slug}>
									{post.name}
								</BlogLink>
							))
					: posts.map(post => (
							<BlogLink badges={post.badges} hidden={post.hidden} href={`/${post.slug}`} key={post.slug}>
								{post.name}
							</BlogLink>
					  ))}
			</ul>
		</main>
	);
}

function BlogLink(props: { badges: ReactNode[] | undefined, children: ReactNode; hidden?: boolean, href: string; }) {
	return (
		<li>
			{props.hidden && (
				<span className="inline-flex items-center px-2.5 py-0.5 mx-2 rounded-full text-xs font-medium bg-yellow-500 text-yellow-900">
					hidden
				</span>
			)}
			{props.badges ? props.badges : null}
			<Link href={props.href} passHref>
				{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
				<a className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-600">
					{props.children}
				</a>
			</Link>
		</li>
	);
}
