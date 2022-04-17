import type { Agent } from '~/agents';
export interface DetectOptions {
    autoInstall?: boolean;
    cwd?: string;
}
export declare function detect({ autoInstall, cwd }: DetectOptions): Promise<Agent | null>;
