import type { Agent, Command } from '~/agents'
import type { Runner } from '~/runner'

export declare type Agents = Exclude<Agent, 'prompt'>;
export declare function getCommand(agent: Agents, command: Command, args?: string[]): string;
export declare const parseNi: Runner;
export declare const parseNr: Runner;
export declare const parseNu: Runner;
export declare const parseNun: Runner;
export declare const parseNx: Runner;
export declare const parseNo: Runner;
export declare const parseNp: Runner;
export declare const parseNh: Runner;
export declare const parseNv: Runner;
export declare const parseNl: Runner;
export declare const parseNt: Runner;
export declare const parseNd: Runner;
export declare const parseNa: Runner;
export declare const parseNb: Runner;
export {}

