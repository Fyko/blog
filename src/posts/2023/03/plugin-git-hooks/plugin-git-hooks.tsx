import {stripIndent} from 'common-tags';
import {Post} from '@/Post';
import {NewBadge} from '@/client/components/badge';
import {Highlighter} from '@/client/components/highlighter';

export class PluginGitHooks extends Post {
	public name = 'Using Git Hooks with Yarn 3';

	public slug = 'plugin-git-hooks';

	public date = new Date('24 March 2023');

	public hidden = false;

	public keywords = ['husky', 'git', 'yarn', 'yarn 3', 'nodejs', 'typescript'];

	public excerpt = 'Is there a better option than Husky with Yarn 3?';

	public badges = [<NewBadge />];

	public render() {
		return (
			<>
				<h1>{this.name}</h1>

				<p>
					With Yarn 2, you could easily install Husky by setting your package to private and
					defining a `postinstall` script:
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
					However, Yarn 3 doesn't seem to work with <code>postinstall</code>. This means that you
					can't use Husky with Yarn 3 without some extra work.
				</p>

				<h2>
					<code>plugin-install-husky</code>
				</h2>

				<p>
					Wanna know what awesome feature Yarn 3 has? A plugin system! This means that you can write
					your own plugins to extend Yarn's functionality.
				</p>

				<p>
					At{' '}
					<a href="https://truffle.vip" rel="noreferrer" target="_blank">
						Truffle
					</a>
					, we've been using this short script to install Husky.
				</p>

				<Highlighter id="code">
					{stripIndent`
						// Creative Commons (c) 2022 Spore, Inc. 
						const { exec } = require('child_process');

						const plugin = {
							default: {
								hooks: {
									afterAllInstalled: async () =>
										exec('git config core.hooksPath .github/hooks'),
								},
							},
						};

						module.exports = {
							name: 'plugin-install-husky',
							factory: () => plugin,
						};
					`}
				</Highlighter>

				<p>
					But, frankly, since we have plugins, we don't really need to use Husky. Introducing...
				</p>

				<h2>
					✨
					<code>
						<a
							href="https://github.com/trufflehq/yarn-plugin-git-hooks"
							rel="noreferrer"
							target="_blank"
						>
							plugin-git-hooks
						</a>
					</code>
					✨
				</h2>

				<p>
					Lets eject Husky! Start by running <code>yarn remove husky</code> and delete the{' '}
					<code>postinstall</code> script from <code>package.json</code>.
				</p>

				<p>
					Now, you can move your scripts from <code>.husky</code> to anywhere else. I recommend{' '}
					<code>.github/hooks</code>.
				</p>

				<p>Then, import the plugin.</p>
				<Highlighter id="plugin_import" language="bash">
					{stripIndent`
						yarn plugin import https://raw.githubusercontent.com/trufflehq/yarn-plugin-git-hooks/main/bundles/%40yarnpkg/plugin-git-hooks.js
					`}
				</Highlighter>

				<p>
					Finally, add the path to your hooks in <code>.yarnrc.yml</code>:
				</p>
				<Highlighter id="yarnrc" language="yaml">
					{stripIndent`
						gitHooksPath: .github/hooks
					`}
				</Highlighter>

				<p>
					Now, whenever you run <code>yarn</code> (once packages are installed), your hooks will be
					configured.
				</p>

				<p>
					Thanks to{' '}
					<a href="https://github.com/trufflehq" rel="noreferrer" target="_blank">
						Truffle
					</a>{' '}
					for letting me open-source this plugin!
				</p>
			</>
		);
	}
}
