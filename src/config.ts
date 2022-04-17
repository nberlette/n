import { existsSync as exists, readJson } from 'fs-extra'
import ini from 'ini'
import path from 'path'
import type { Agent } from '~/agents'
import { LOCKS_PATTERN } from '~/agents'
import { findPackageJson } from '~/fs'

const home = process?.env?.[(process.platform === 'win32' ? 'USERPROFILE' : 'HOME')]
const customRcPath = process?.env?.NI_CONFIG_FILE
const defaultRcPath = path.join(home || '~/', '.nirc')
const rcPath = customRcPath ?? defaultRcPath

interface Config {
  defaultAgent: Agent | 'prompt'
  globalAgent: Agent
}

const defaultConfig: Config = {
  defaultAgent: 'prompt',
  globalAgent: 'npm',
}

const parseAgent = (agent: string, version: string): string =>
  (agent === 'yarn' && parseInt(version) > 1) ? 'yarn@berry' : agent;

export async function getConfig(): Promise<Config> {
  let {packageManager = ''} = await readJson(findPackageJson())
  const [, agent, version] = packageManager.match(LOCKS_PATTERN) || []
  if (agent) {
    return Object.assign({},
      defaultConfig,
      { defaultAgent: parseAgent(agent, version) }
    ) as Config
  }
  if (!exists(rcPath)) return defaultConfig;
  return Object.assign({},
    defaultConfig,
    await readJson(rcPath)
      .then((data: any) => ini.parse(data))
  ) as Config;
}

export const getDefaultAgent = async (): Promise<Agent> => await getConfig()
  .then(({ defaultAgent = 'prompt' }) =>
    (defaultAgent === 'prompt' && process.env.CI) ? 'npm' : defaultAgent
  ) as Agent

export const getGlobalAgent = async (): Promise<Agent> => await getConfig()
  .then(({ globalAgent = 'npm' }) => globalAgent)
