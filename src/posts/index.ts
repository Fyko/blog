import { CommandsLockJson } from './2023/03/commands-lockfile/commands-lockfile';
import { PluginGitHooks } from './2023/03/plugin-git-hooks/plugin-git-hooks';
import { Phished } from './2023/06/phished/phished';

export const posts = [
	new Phished(),
	new PluginGitHooks(),
	new CommandsLockJson(),
] as const;
