export interface Config {
    title?: string,
    redirects?: Record<string, string>
}

export default {
    title: 'Jade'
} satisfies Config;
