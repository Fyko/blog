import {stripIndent} from 'common-tags';
import {Post} from '@/Post';
import {NewBadge} from '@/client/components/badge';
import {Highlighter} from '@/client/components/highlighter';

const workflow = `name: Continuous Deployment (commands)

on:
  push:
	branches: [main]
	paths:
	  - 'commands.lock.json'
	  - '.github/workflows/cd_commands.yml'
  workflow_dispatch:

jobs:
  deploy:
	name: Deploy Updated Global Commands
	runs-on: ubuntu-latest

	steps:
	  - uses: actions/checkout@v3

	  - name: PUT Global Commands
		run: |
		  curl -X PUT https://discord.com/api/applications/\${{ secrets.DISCORD_APPLICATION_ID }}/commands \\
			-H "Authorization: Bot \${{ secrets.DISCORD_TOKEN }}" \\
			-H "content-type: application/json" \\
			-d @./commands.lock.json
`;

export class CommandsLockJson extends Post {
	public name = 'Continous Deployment of Discord Slash Commands';

	public slug = 'commands-lockfile';

	public date = new Date('24 March 2023');

	public hidden = true;

	public keywords = ['discord', 'discord.js', 'slash commands', 'github actions', 'automatic'];

	public excerpt = 'How do you automatically update your Discord slash commands? Use a lockfile.';

	public badges = [<NewBadge />];

	public render() {
		return (
			<>
				<h1>commands.lock.json</h1>
				<p>
					How do you automatically update your Discord slash commands?
					<br />
					Simple, Use a lockfile.
				</p>

				<p>Package managers everywhere use it! Cargo, Mix, Yarn... why can't you?</p>

				<h2>Refactoring</h2>

				<p>
					When working on my Discord bot,{' '}
					<a href="https://github.com/fyko/thoth" rel="noreferrer" target="_blank">
						Thoth
					</a>
					, I was trying to figure out how to automatically update my slash commands.
				</p>

				<p>
					Originally, I stored all my command data in the same file as the command itself, but it
					ended up biting me in the ass when it came to scripting. I'd have to configure my DI with
					valid services like Redis and Postgres just to pull out static data.
				</p>

				<p>So, I moved all the static definitions into their own files and folders.</p>

				<h3>Before</h3>
				<p className="m-0">src/commands/util/ping.ts</p>
				<Highlighter language="typescript">
					{stripIndent`
						const data = {
							name: i18n.t('commands.ping.meta.name'),
							name_localizations: fetchDataLocalizations('commands.ping.meta.name'),
							description: i18n.t('commands.ping.meta.description'),
							description_localizations: fetchDataLocalizations('commands.ping.meta.description'),
						} as const;

						export default class implements Command {
							public readonly data = data;
						
							public exec = async (...) => {};
						}
					`}
				</Highlighter>

				<h3>After</h3>
				<p className="m-0">src/interactions/commands/util/ping.ts</p>
				<Highlighter language="typescript">
					{stripIndent`
						const PingCommand = {
							name: i18n.t('commands.ping.meta.name'),
							name_localizations: fetchDataLocalizations('commands.ping.meta.name'),
							description: i18n.t('commands.ping.meta.description'),
							description_localizations: fetchDataLocalizations('commands.ping.meta.description'),
						} as const;

						export default PingCommand;
					`}
				</Highlighter>

				<h2>Generating the lockfile</h2>

				<p>
					Now that the command data is in its own files, all I have to worry about is loading my
					i18n, and I can use the data.
				</p>

				<Highlighter>
					{stripIndent`
						import 'reflect-metadata';

						import { writeFile } from 'node:fs/promises';
						import { join } from 'node:path';
						import process from 'node:process';
						import { fileURLToPath, URL } from 'node:url';
						import { loadTranslations, walk } from '#util/index.js';
						
						export async function generateCommandsArray(): Promise<Record<string, unknown>[]> {
							const path = fileURLToPath(new URL('../interactions/commands', import.meta.url));
							const files = await walk(path);
						
							const commands: Record<string, unknown>[] = [];
							for (const file of files) {
								const { default: command } = await import(file);
								commands.push(command);
							}
						
							return commands;
						}
						
						async function main() {
							await loadTranslations(fileURLToPath(new URL('../locales', import.meta.url)));
						
							const commands = (await generateCommandsArray()).filter((cmd) => !cmd.dev);
							return writeFile(join(process.cwd(), 'commands.lock.json'), JSON.stringify(commands, null, 2));
						}
						
						void main();
					`}
				</Highlighter>

				<p>
					Using <code>plugin-git-hooks</code> (which you can read about{' '}
					<a href="/plugin-git-hooks" target="_blank">
						here
					</a>
					), I can run this script before every commit.
				</p>

				<Highlighter language="bash">
					{stripIndent`
						#!/bin/sh
						yarn run build && yarn run generate && git add commands.lock.json
					`}
				</Highlighter>

				<p>And bingo! Every time I commit, my lockfile will be updated.</p>

				<h2>The automatic part</h2>
				<p>
					Since the lockfile is included in version control (git), we can use GitHub Actions to
					update the commands when the file changes.
				</p>

				<p>
					Lets get this out of the way now -- you need to upload your bot's token and application
					ID. Head over to{' '}
					<code>{'https://github.com/{GITHUB_USER}/{GITHUB_REPO}/settings/secrets/actions'}</code>{' '}
					and create two new secrets: <code>DISCORD_TOKEN</code> and{' '}
					<code>DISCORD_APPLICATION_ID</code>.
				</p>

				<p>Finally, create your the workflow file.</p>

				<p className="m-0">github/workflows/cd_commands.yml</p>
				<Highlighter language="yaml">{workflow}</Highlighter>

				<p>
					Now, whenever you push to the main branch, your commands will be updated! Additionally, if
					the workflow file changes, it'll run. You also have the option to run it manually with
					Workflow Dispatch.
				</p>

				<p>
					If you wanna see this code in action, check out:
					<ul>
						<li key="workflow">
							<a
								href="https://github.com/fyko/thoth/blob/main/.github/workflows/cd_commands.yml"
								rel="noreferrer"
								target="_blank"
							>
								The workflow file
							</a>
						</li>
						<li key="script">
							<a
								href="https://github.com/Fyko/thoth/blob/main/services/bot/src/scripts/generate.ts"
								rel="noreferrer"
								target="_blank"
							>
								The generation script
							</a>
						</li>
					</ul>
				</p>
			</>
		);
	}
}
