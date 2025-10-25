import type { BundledTheme } from "shiki";

interface ConfigData {
    title: string,
    description: string,
    redirects: Record<string, string>,
    codeblockTheme: BundledTheme
}
export type Config = Partial<ConfigData>;
