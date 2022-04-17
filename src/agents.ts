const npmRun = (agent: string) => (args: string[]) => {
  if (args.length > 1)
    return `${agent} run ${args[0]} -- ${args.slice(1).join(' ')}`
  else return `${agent} run ${args[0]}`
}

export const AGENTS = {
  'npm': {
    'run': npmRun('npm'),
    'install': 'npm i',
    'frozen': 'npm ci',
    'global': 'npm i -g {0}',
    'add': 'npm i {0}',
    'upgrade': 'npm update {0}',
    'upgrade-interactive': null,
    'execute': 'npx {0}',
    'uninstall': 'npm uninstall {0}',
    'global_uninstall': 'npm uninstall -g {0}',
    // start new commands
    'audit': 'npm audit {0}',
    'bin': 'npm bin {0}',
    'global_bin': 'npm bin --global {0}',
    'link': 'npm link {0}',
    'list': 'npm ls {0}',
    'global_list': 'npm ls --global {0}',
    'outdated': 'npm outdated {0}',
    'global_outdated': 'npm outdated --global {0}',
    'publish': 'npm publish {0}',
    'version': 'npm version {0}',
    'test': 'npm test',
    'help': 'npm help {0}',
    'diff': 'npm diff {0}',
  },
  'pnpm': {
    'run': npmRun('pnpm'),
    'install': 'pnpm i',
    'frozen': 'pnpm i --frozen-lockfile',
    'global': 'pnpm add -g {0}',
    'add': 'pnpm add {0}',
    'upgrade': 'pnpm update {0}',
    'upgrade-interactive': 'pnpm update -i {0}',
    'execute': 'pnpm dlx {0}',
    'uninstall': 'pnpm remove {0}',
    'global_uninstall': 'pnpm remove --global {0}',
    // start new commands
    'audit': 'pnpm audit {0}',
    'bin': 'pnpm bin {0}',
    'global_bin': 'pnpm bin --global {0}',
    'link': 'pnpm link {0}',
    'list': 'pnpm ls {0}',
    'global_list': 'pnpm ls --global {0}',
    'outdated': 'pnpm outdated {0}',
    'global_outdated': 'pnpm outdated --global {0}',
    'publish': 'pnpm publish {0}',
    'version': 'pnpm version {0}',
    'test': 'pnpm test {0}',
    'help': 'pnpm help {0}',
    'diff': 'pnpm diff {0}',
  },
  'yarn': {
    'run': 'yarn run {0}',
    'install': 'yarn install',
    'frozen': 'yarn install --frozen-lockfile',
    'global': 'yarn global add {0}',
    'add': 'yarn add {0}',
    'upgrade': 'yarn upgrade {0}',
    'upgrade-interactive': 'yarn upgrade-interactive {0}',
    'execute': 'yarn dlx {0}',
    'uninstall': 'yarn remove {0}',
    'global_uninstall': 'yarn global remove {0}',
    // start new commands
    'audit': 'yarn audit {0}',
    'bin': 'yarn bin {0}',
    'global_bin': 'yarn global bin {0}',
    'link': 'yarn link {0}',
    'list': 'yarn ls {0}',
    'global_list': 'yarn global ls {0}',
    'outdated': 'yarn outdated {0}',
    'global_outdated': 'yarn global outdated {0}',
    'publish': 'yarn publish {0}',
    'version': 'yarn version {0}',
    'test': 'yarn test',
    'help': 'yarn help {0}',
    'diff': 'yarn diff {0}',
  },
  'yarn@berry': {
    'run': 'yarn run {0}',
    'install': 'yarn install',
    'frozen': 'yarn install --immutable',
    // yarn3 removed 'global', see https://github.com/yarnpkg/berry/issues/821
    'global': 'npm i -g {0}',
    'add': 'yarn add {0}',
    'upgrade': 'yarn up {0}',
    'upgrade-interactive': 'yarn up -i {0}',
    'execute': 'yarn dlx {0}',
    'uninstall': 'yarn remove {0}',
    'global_uninstall': 'npm uninstall -g {0}',
    // start new commands
    'audit': 'yarn audit {0}',
    'bin': 'yarn bin {0}',
    'global_bin': 'npm bin --global {0}',
    'link': 'yarn link {0}',
    'list': 'yarn ls {0}',
    'global_list': 'npm ls --global {0}',
    'outdated': 'yarn outdated {0}',
    'global_outdated': 'npm outdated --global {0}',
    'publish': 'yarn publish {0}',
    'version': 'yarn version {0}',
    'test': 'yarn test',
    'help': 'yarn help {0}',
    'diff': 'yarn diff {0}',
  },
}

export type Agent = keyof typeof AGENTS
export type Command = keyof typeof AGENTS.npm

export const agents = Object.keys(AGENTS) as Agent[]

export const LOCKS: Record<string, Agent> = {
  'pnpm-lock.yaml': 'pnpm',
  'yarn.lock': 'yarn',
  'package-lock.json': 'npm',
}

export const INSTALL_PAGE: Record<Agent, string> = {
  'pnpm': 'https://pnpm.js.org/en/installation',
  'yarn': 'https://classic.yarnpkg.com/en/docs/install',
  'yarn@berry': 'https://yarnpkg.com/getting-started/install',
  'npm': 'https://www.npmjs.com/get-npm',
}
