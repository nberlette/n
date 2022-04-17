import pkg from '../package.json'
import type { Agent, Command } from '~/agents'
import { AGENTS } from '~/agents'
import { exclude } from '~/utils'
import type { Runner, RunnerContext } from '~/runner'
const { name, version } = pkg;

export function getCommand(
  agent: Agent,
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

export const parseNi = <Runner>((agent: Agent, args: any[], ctx: RunnerContext) => {
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

export const parseNr = <Runner>((agent, args) => {
  if (args.length === 0)
    args.push('start')

  if (args.includes('--if-present')) {
    args = exclude(args, '--if-present')
    args[0] = `--if-present ${args[0]}`
  }

  return getCommand(agent, 'run', args)
})

export const parseNu = <Runner>((agent, args) => {
  if (args.includes('-i'))
    return getCommand(agent, 'upgrade-interactive', exclude(args, '-i'))

  return getCommand(agent, 'upgrade', args)
})

export const parseNun = <Runner>((agent, args) => {
  if (args.includes('-g'))
    return getCommand(agent, 'global_uninstall', exclude(args, '-g'))
  return getCommand(agent, 'uninstall', args)
})

export const parseNx = <Runner>((agent, args) => {
  return getCommand(agent, 'execute', args)
})

export const parseNo = <Runner>((agent, args) => {
  return getCommand(agent, 'outdated', args)
})

export const parseNp = <Runner>((agent, args) => {
  return getCommand(agent, 'publish', args)
})

export const parseNh = <Runner>((agent, args) => {
  return getCommand(agent, 'help', args)
})

export const parseNv = <Runner>((agent, args) => {
  return getCommand(agent, 'version', args)
})

export const parseNl = <Runner>((agent, args) => {
  return getCommand(agent, 'list', args)
})

export const parseNt = <Runner>((agent, args) => {
  return getCommand(agent, 'test', args)
})

export const parseNd = <Runner>((agent, args) => {
  return getCommand(agent, 'diff', args)
})

export const parseNa = <Runner>((agent, args) => {
  return getCommand(agent, 'audit', args)
})

export const parseNb = <Runner>((agent, args) => {
  return getCommand(agent, 'bin', args)
})