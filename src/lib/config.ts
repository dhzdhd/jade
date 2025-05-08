interface ConfigData {
    title: string,
    redirects: Record<string, string>,
}
export type Config = Partial<ConfigData>;
