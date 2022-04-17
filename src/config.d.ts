import type { Agent } from '~/agents';
interface Config {
    defaultAgent: Agent | 'prompt';
    globalAgent: Agent;
}
export declare function getConfig(): Promise<Config>;
export declare const getDefaultAgent: () => Promise<Agent>;
export declare const getGlobalAgent: () => Promise<Agent>;
export {};
