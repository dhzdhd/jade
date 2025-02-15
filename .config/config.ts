export interface Config {
    title?: string,
    redirects?: Record<string, string>
}

export default {
    title: 'Test title'
} satisfies Config;