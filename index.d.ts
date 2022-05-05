declare const AGENTS: {
    npm: {
        run: (args: string[]) => string;
        install: string;
        frozen: string;
        global: string;
        add: string;
        upgrade: string;
        'upgrade-interactive': null;
        execute: string;
        uninstall: string;
        global_uninstall: string;
        audit: string;
        bin: string;
        global_bin: string;
        link: string;
        list: string;
        global_list: string;
        outdated: string;
        global_outdated: string;
        publish: string;
        version: string;
        test: string;
        help: string;
        diff: string;
    };
    pnpm: {
        run: (args: string[]) => string;
        install: string;
        frozen: string;
        global: string;
        add: string;
        upgrade: string;
        'upgrade-interactive': string;
        execute: string;
        uninstall: string;
        global_uninstall: string;
        audit: string;
        bin: string;
        global_bin: string;
        link: string;
        list: string;
        global_list: string;
        outdated: string;
        global_outdated: string;
        publish: string;
        version: string;
        test: string;
        help: string;
        diff: string;
    };
    yarn: {
        run: string;
        install: string;
        frozen: string;
        global: string;
        add: string;
        upgrade: string;
        'upgrade-interactive': string;
        execute: string;
        uninstall: string;
        global_uninstall: string;
        audit: string;
        bin: string;
        global_bin: string;
        link: string;
        list: string;
        global_list: string;
        outdated: string;
        global_outdated: string;
        publish: string;
        version: string;
        test: string;
        help: string;
        diff: string;
    };
    'yarn@berry': {
        run: string;
        install: string;
        frozen: string;
        global: string;
        add: string;
        upgrade: string;
        'upgrade-interactive': string;
        execute: string;
        uninstall: string;
        global_uninstall: string;
        audit: string;
        bin: string;
        global_bin: string;
        link: string;
        list: string;
        global_list: string;
        outdated: string;
        global_outdated: string;
        publish: string;
        version: string;
        test: string;
        help: string;
        diff: string;
    };
};
declare type Agent = (keyof typeof AGENTS) | 'prompt';
declare type Command = keyof typeof AGENTS.npm;

declare interface DetectOptions {
    autoInstall?: boolean;
    cwd?: string;
}
declare interface RunnerContext {
    hasLock?: boolean;
    cwd?: string;
}
declare interface Config {
    defaultAgent: Agent | 'prompt';
    globalAgent: Agent;
}
declare type Runner = (agent: Agent, args: string[], ctx?: RunnerContext) => Promise<string | undefined> | string | undefined;
declare type Agents = Exclude<Agent, 'prompt'>;

declare module '@brlt/n' {
    export function detect({ autoInstall, cwd }: DetectOptions): Promise<Agent | null>;
    
    export function runCli(fn: Runner, options?: DetectOptions): Promise<void>;
    export function run(fn: Runner, args: string[], options?: DetectOptions): Promise<void>;

    export function getCommand(agent: Agents, command: Command, args?: string[]): string;
    export const parseNi: Runner;
    export const parseNr: Runner;
    export const parseNu: Runner;
    export const parseNun: Runner;
    export const parseNx: Runner;
    export const parseNo: Runner;
    export const parseNp: Runner;
    export const parseNh: Runner;
    export const parseNv: Runner;
    export const parseNl: Runner;
    export const parseNt: Runner;
    export const parseNd: Runner;
    export const parseNa: Runner;
    export const parseNb: Runner;

    export function getConfig(): Promise<Config>;
    export const getDefaultAgent: () => Promise<Agent>;
    export const getGlobalAgent: () => Promise<Agent>;

    export function remove<T>(arr: T[], v: T): T[];
    export function exclude<T>(arr: T[], v: T): T[];
    export function cmdExists(cmd: string): boolean;
    export function getVoltaPrefix(): string;

    // export { Agents, DetectOptions, Runner, RunnerContext, cmdExists, detect, exclude, getCommand, getConfig, getDefaultAgent, getGlobalAgent, getVoltaPrefix, parseNa, parseNb, parseNd, parseNh, parseNi, parseNl, parseNo, parseNp, parseNr, parseNt, parseNu, parseNun, parseNv, parseNx, remove, run, runCli };
}