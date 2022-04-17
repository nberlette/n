import type { Agent, Command } from '~/agents'
import { AGENTS } from '~/agents'
import type { Runner, RunnerContext } from '~/runner'
import { exclude } from '~/utils'
import pkg from '../package.json'
const { name, version } = pkg
type Agents = Exclude<Agent, 'prompt'>

export function getCommand(
  agent: Agents,
  command: Command,
  args: string[] = [],
) {
  if (!(agent in AGENTS))
    throw new Error(`Unsupported agent "${agent}"`)

  const c = AGENTS[agent][command]

  if (typeof c === 'function')
    return c(args)

  if (!c)
    throw new Error(`Command "${command}" is not support by agent "${agent}"`)
  return c.replace('{0}', args.join(' ')).trim()
}

export const parseNi = <Runner>((agent: Agents, args: any[], ctx: RunnerContext) => {
  if (args.length === 1 && args[0] === '-v') {
    // eslint-disable-next-line no-console
    console.log(`${pkg.name} v${pkg.version}`)
    process.exit(0)
  }

  if (args.length === 0)
    return getCommand(agent, 'install')

  if (args.includes('-g'))
    return getCommand(agent, 'global', exclude(args, '-g'))

  if (args.length === 1 && args[0] === '-f')
    return getCommand(agent, 'install', args)

  if (args.includes('--frozen-if-present')) {
    args = exclude(args, '--frozen-if-present')
    return getCommand(agent, ctx?.hasLock ? 'frozen' : 'install', args)
  }

  if (args.includes('--frozen'))
    return getCommand(agent, 'frozen', exclude(args, '--frozen'))

  return getCommand(agent, 'add', args)
})

export const parseNr = <Runner>((agent: Agents, args: any[]) => {
  if (args.length === 0)
    args.push('start')

  if (args.includes('--if-present')) {
    args = exclude(args, '--if-present')
    args[0] = `--if-present ${args[0]}`
  }

  return getCommand(agent, 'run', args)
})

export const parseNu = <Runner>((agent: Agents, args: any[]) => {
  if (args.includes('-i'))
    return getCommand(agent, 'upgrade-interactive', exclude(args, '-i'))

  return getCommand(agent, 'upgrade', args)
})

export const parseNun = <Runner>((agent: Agents, args: any[]) => {
  if (args.includes('-g'))
    return getCommand(agent, 'global_uninstall', exclude(args, '-g'))
  return getCommand(agent, 'uninstall', args)
})

export const parseNx = <Runner>((agent: Agents, args: any[]) => {
  return getCommand(agent, 'execute', args)
})

export const parseNo = <Runner>((agent: Agents, args: any[]) => {
  return getCommand(agent, 'outdated', args)
})

export const parseNp = <Runner>((agent: Agents, args: any[]) => {
  return getCommand(agent, 'publish', args)
})

export const parseNh = <Runner>((agent: Agents, args: any[]) => {
  return getCommand(agent, 'help', args)
})

export const parseNv = <Runner>((agent: Agents, args: any[]) => {
  return getCommand(agent, 'version', args)
})

export const parseNl = <Runner>((agent: Agents, args: any[]) => {
  return getCommand(agent, 'list', args)
})

export const parseNt = <Runner>((agent: Agents, args: any[]) => {
  return getCommand(agent, 'test', args)
})

export const parseNd = <Runner>((agent: Agents, args: any[]) => {
  return getCommand(agent, 'diff', args)
})

export const parseNa = <Runner>((agent: Agents, args: any[]) => {
  return getCommand(agent, 'audit', args)
})

export const parseNb = <Runner>((agent: Agents, args: any[]) => {
  return getCommand(agent, 'bin', args)
})