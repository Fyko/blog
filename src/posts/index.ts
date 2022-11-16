import { CommandsLockJson } from './2022/11/commands-lockfile/commands-lockfile';
import { PluginHuskyInstall } from './2022/11/plugin-install-husky/plugin-install-husky';

export const posts = [
	new PluginHuskyInstall(),
	new CommandsLockJson(),
] as const;
