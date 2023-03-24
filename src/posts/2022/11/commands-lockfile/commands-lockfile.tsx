import {stripIndent, stripIndents} from 'common-tags';
import Link from 'next/link';
import { HiddenBadge } from '../../../../client/components/badge';
import {Highlighter} from '../../../../client/components/highlighter';
import {Post} from '../../../Post';

export class CommandsLockJson extends Post {
	public name = 'Automatically update Discord slash commands';

	public slug = 'commands-lockfile';

	public date = new Date('15 November 2022');

	public hidden = true;

	public keywords = ['discord', 'discord.js'];

	public excerpt = 'How do you automatically update your Discord slash commands? Use a lockfile.';

	public badges = [<HiddenBadge />];

	public render() {
		return (
			<>
				<h1>commands.lock.json</h1>
				<p>
					How do you automatically update your Discord slash commands?
					<br />
					Use a lockfile.
				</p>
			</>
		);
	}
}
