import type {GetStaticPaths, GetStaticProps, PageConfig} from 'next';
import Head from 'next/head';
import Link from 'next/link';
import {posts} from '../posts';

export const config: PageConfig = {
	unstable_runtimeJS: false,
};

type Props = {
	slug: string;
};

export default function PostPage({slug}: Props) {
	const post = posts.find(post => post.slug === slug)!;

	return (
		<div className="space-y-4">
			<Head>
				<title>{post.name}</title>
				<meta content={post.excerpt} name="description" />
				<meta content={post.keywords.join(', ')} name="keywords" />
				<meta content={post.hidden ? '#ebb305' : '#171717'} name="theme-color" />
				<meta content="summary" name="twitter:card" />
				<meta content="@fykowo" name="twitter:site" />
				<meta content="@fykowo" name="twitter:creator" />
				<meta content={`/${post.slug}`} property="og:url" />
				<meta content={post.name} property="og:title" />
				<meta content={post.excerpt} property="og:description" />
				<meta content="https://avatars1.githubusercontent.com/u/45381083" property="og:image" />
			</Head>

			{post.hidden && (
				<div className="bg-yellow-500 text-yellow-900 rounded-md py-2 px-4">
					<p>hey! this post is hidden! please don't share the link for now...</p>
				</div>
			)}

			<div>
				<Link href="/">
					{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
					<a className="text-blue-500 dark:text-neutral-400 hover:text-blue-800 dark:hover:text-neutral-600">
						../
					</a>
				</Link>
			</div>

			<p>
				<time dateTime={post.date.toISOString()}>{post.date.toDateString()}</time>
			</p>

			<main className="prose max-w-none prose-hr:border-neutral-200 dark:prose-hr:border-neutral-800 prose-blue prose-img:rounded-md prose-img:w-full dark:prose-invert">
				{post.render()}
			</main>
		</div>
	);
}

export const getStaticProps: GetStaticProps<Props> = async ({params}) => {
	const slug = params!.slug as string;

	const post = posts.find(post => post.slug === slug);

	if (!post) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			slug,
		},
	};
};

export const getStaticPaths: GetStaticPaths = async () => ({
	paths: posts.map(post => ({params: {slug: post.slug}})),
	fallback: 'blocking',
});
