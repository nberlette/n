import type { Agent } from '~/agents';
import type { DetectOptions } from '~/detect';
export interface RunnerContext {
    hasLock?: boolean;
    cwd?: string;
}
export declare type Runner = (agent: Agent, args: string[], ctx?: RunnerContext) => Promise<string | undefined> | string | undefined;
export declare function runCli(fn: Runner, options?: DetectOptions): Promise<void>;
export declare function run(fn: Runner, args: string[], options?: DetectOptions): Promise<void>;
