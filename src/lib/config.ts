interface ConfigData {
    title: string,
    description: string,
    redirects: Record<string, string>,
}
export type Config = Partial<ConfigData>;
