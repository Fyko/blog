import { stripIndent, stripIndents } from 'common-tags';
import Link from 'next/link';
import { Badge } from '../../../../client/components/badge';
import { Highlighter } from '../../../../client/components/highlighter';
import {Post} from '../../../Post';

export class PluginHuskyInstall extends Post {
	public name = 'Using Husky with Yarn 3';

	public slug = 'plugin-install-husky';

	public date = new Date('15 November 2022');

	public hidden = false;

	public keywords = ['husky', 'git', 'yarn', 'yarn 3', 'nodejs', 'typescript'];

	public excerpt =
		"How do you install Husky without a postinstall script?";

	public badges = [
		<Badge color='teal' title='new' />
	];

	public render() {
		return (
			<>
				<h1>{this.name}</h1>

				<a href='#tldr'>Jump to tl;dr</a>

				<p>
					With Yarn 2, you could easily install Husky by setting your package to private and defining a `postinstall` script:
				</p>

				<Highlighter language="json">
					{stripIndent`
						{
							"private": true,
							"scripts": {
								"postinstall": "husky install"
							},
							"packageManager": "yarn@2.4.3"
						}
					`}
				</Highlighter>

				<p>
					However, Yarn 3 doesntt seem to work with <code>postinstall</code>. This means that you can't use Husky with Yarn 3 without some extra work.
				</p>

				<h2><code>plugin-install-husky</code></h2>

				<p>
					Wanna know what awesome feature Yarn 3 has? A plugin system! This means that you can write your own plugins to extend Yarn's functionality.
					This is exactly what we're going to do.
				</p>

				<p>
					If you don't already use plugins, you'll have to create the <code>plugins</code> directory in your <code>.yarn</code> folder.
				</p>

				<p>
					Yarn's 'provided' plugins go to <code>.yarn/plugins/@yarnpkg</code>, so create a scoped-subfolder in <code>.yarn/plugins</code>, like <code>.yarn/plugins/@fykowo</code>.
				</p>
				
				<p>
					Now, create your plugin in that folder. I'll call mine <code>plugin-install-husky.cjs</code> (use <code>.cjs</code>).
				</p>

				<Highlighter id="code">
					{stripIndent`
						// Creative Commons (c) 2022 Spore, Inc. 
						const { exec } = require('child_process');

						const plugin = {
							default: {
								hooks: {
									afterAllInstalled: () =>
										exec('yarn husky install'),
								},
							},
						};

						module.exports = {
							name: \`plugin-install-husky\`,
							factory: () => plugin,
						};

					`}
				</Highlighter>

				<p>
					Finally, register your plugin by adding a plugin definition to <code>.yarnrc.yml</code>: 
				</p>
				<Highlighter id="yarnrc" language="yaml">
					{stripIndent`
						plugins:
							- path: .yarn/plugins/@fykowo/plugin-install-husky.cjs
					`}
				</Highlighter>

				<p>
					Now, whenever you run <code>yarn</code>, Husky will be installed automatically.
				</p>

				<h3 id="tldr">tl;dr</h3>
				<ul>
					<li>Create your plugin file in <code>.yarn/plugins/@yourscope/plugin-install-husky.cjs</code></li>
					<li>{'>>'} the content of <a href='#code'>Code Block #1</a></li>
					<li>Add plugin to <code>.yarnrc.yml</code> (see <a href="#yarnrc">Code Block #2</a>)</li>
				</ul>

				<p>
					Thanks to <a href='https://github.com/trufflehq' rel="noreferrer" target='_blank'>Truffle</a> for letting me open-source this plugin!
				</p>
			</>
		);
	}
}
