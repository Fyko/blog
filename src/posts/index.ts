import { CommandsLockJson } from './2022/11/commands-lockfile/commands-lockfile';
import { PluginGitHooks } from './2022/11/plugin-git-hooks/plugin-git-hooks';

export const posts = [
	new PluginGitHooks(),
	new CommandsLockJson(),
] as const;
