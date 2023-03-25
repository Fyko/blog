import { CommandsLockJson } from './2023/03/commands-lockfile/commands-lockfile';
import { PluginGitHooks } from './2023/03/plugin-git-hooks/plugin-git-hooks';

export const posts = [
	new PluginGitHooks(),
	new CommandsLockJson(),
] as const;
