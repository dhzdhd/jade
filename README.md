# Jade

Jade is a lightweight, Svelte-based static site generator. The project uses ShadCN for styling due to its simplicity, customisability, and ease of use. 

The SSG can be used for any markdown-based files, including Obsidian. Unlike other SSG's, you do not have to clone Jade and run it locally. A simple GitHub Action workflow is provided to deploy the site to any hosting provider (Vercel, Netlify, GitHub Pages, etc.) with zero configuration required.

## Features

- Incredibly fast routing, including support for a SPA router and View Transitions API.
- Custom styling support by providing a custom CSS file, with templates available at [tweakcn](https://tweakcn.com/editor/theme).
- Obsidian editor like graph UI for exploring related links.
- Excalidraw support for rendering diagrams (Use Obsidian Excalidraw plugin for generating `.excalidraw.md` files).
- File tree and table of contents sidebars.
- Local settings dialog to remove unnecessary clutter.
- Dark mode support and search functionality.
- Support for custom landing page.
- Website configuration using a single, simple `config.ts` file.

## Installation steps

Jade is meant to be used with GitHub Actions/CD workflows only. There is no need to clone this repository/download the source code and all you will need is the `.md` files in any directory (even root) along with an optional `.config` folder for [customisation](#customisation).

The example workflows are present in the `examples` [directory](/examples/) in the project.

In each workflow, there are two environment variables that have to be changed
```
env:
  MD_FOLDER: <the folder where the .md files are present>
  DEPLOY_BRANCH: <the git branch where the site will be deployed (do not set it to main/master)>
```

There are mainly two sort of workflows present

### Vercel/Netlify/Cloudflare Pages

For providers that have the ability to build the site code on their own and deploy it, use this option. The relevant workflow is [vercel.yml](/examples/vercel.yml)

In Vercel, follow the usual steps to create a new project. The one change required is to set the production branch to the branch you chose for the site to be deployed to.

### GitHub Pages

For providers that support only static hosting with prebuilt code, use this option. The relevant workflow is [vercel.yml](/examples/static.yml)

> [!NOTE]  
> Deployment currently shows 404 error on GitHub Pages. This issue is due to GitHub Pages expecting the site to start with `/<repo_name>/` and not `/`

## Customisation

Create a `.config` folder in the root of your notes directory, where the `.github` folder (workflows) is located
Inside the .config folder, the following files can be created

### config.ts

This file is used to set up the configuration for the site. It is a typescript file, so you can use typescript features in it. A sample configuration is given below.

```ts
export default {
    // The base title of the site which will also show up in the browser tab
    title: "My Site",
    // The description of the site which is included in the meta tag
    description: "This is a sample site",
} 
```

### custom.css

This file is used to add custom CSS to the site. You can use the [tweakcn site](https://tweakcn.com/editor/theme) to create the custom CSS (Select only Tailwind v4). A sample configuration (Ocean Breeze on tweakcn) is given below.

```css
:root {
  --background: oklch(0.98 0.01 244.25);
  --foreground: oklch(0.37 0.03 259.73);
  --card: oklch(1.00 0 0);
  --card-foreground: oklch(0.37 0.03 259.73);
  --popover: oklch(1.00 0 0);
  --popover-foreground: oklch(0.37 0.03 259.73);
  --primary: oklch(0.72 0.19 149.58);
  --primary-foreground: oklch(1.00 0 0);
  --secondary: oklch(0.95 0.03 236.82);
  --secondary-foreground: oklch(0.45 0.03 256.80);
  --muted: oklch(0.97 0.00 264.54);
  --muted-foreground: oklch(0.55 0.02 264.36);
  --accent: oklch(0.95 0.05 163.05);
  --accent-foreground: oklch(0.37 0.03 259.73);
  --destructive: oklch(0.64 0.21 25.33);
  --destructive-foreground: oklch(1.00 0 0);
  --border: oklch(0.93 0.01 264.53);
  --input: oklch(0.93 0.01 264.53);
  --ring: oklch(0.72 0.19 149.58);
  --chart-1: oklch(0.72 0.19 149.58);
  --chart-2: oklch(0.70 0.15 162.48);
  --chart-3: oklch(0.60 0.13 163.23);
  --chart-4: oklch(0.51 0.10 165.61);
  --chart-5: oklch(0.43 0.09 166.91);
  --sidebar: oklch(0.95 0.03 236.82);
  --sidebar-foreground: oklch(0.37 0.03 259.73);
  --sidebar-primary: oklch(0.72 0.19 149.58);
  --sidebar-primary-foreground: oklch(1.00 0 0);
  --sidebar-accent: oklch(0.95 0.05 163.05);
  --sidebar-accent-foreground: oklch(0.37 0.03 259.73);
  --sidebar-border: oklch(0.93 0.01 264.53);
  --sidebar-ring: oklch(0.72 0.19 149.58);
  --font-sans: DM Sans, sans-serif;
  --font-serif: Lora, serif;
  --font-mono: IBM Plex Mono, monospace;
  --radius: 0.5rem;
  --shadow-2xs: 0px 4px 8px -1px hsl(0 0% 0% / 0.05);
  --shadow-xs: 0px 4px 8px -1px hsl(0 0% 0% / 0.05);
  --shadow-sm: 0px 4px 8px -1px hsl(0 0% 0% / 0.10), 0px 1px 2px -2px hsl(0 0% 0% / 0.10);
  --shadow: 0px 4px 8px -1px hsl(0 0% 0% / 0.10), 0px 1px 2px -2px hsl(0 0% 0% / 0.10);
  --shadow-md: 0px 4px 8px -1px hsl(0 0% 0% / 0.10), 0px 2px 4px -2px hsl(0 0% 0% / 0.10);
  --shadow-lg: 0px 4px 8px -1px hsl(0 0% 0% / 0.10), 0px 4px 6px -2px hsl(0 0% 0% / 0.10);
  --shadow-xl: 0px 4px 8px -1px hsl(0 0% 0% / 0.10), 0px 8px 10px -2px hsl(0 0% 0% / 0.10);
  --shadow-2xl: 0px 4px 8px -1px hsl(0 0% 0% / 0.25);
}

.dark {
  --background: oklch(0.21 0.04 265.75);
  --foreground: oklch(0.87 0.01 258.34);
  --card: oklch(0.28 0.04 260.03);
  --card-foreground: oklch(0.87 0.01 258.34);
  --popover: oklch(0.28 0.04 260.03);
  --popover-foreground: oklch(0.87 0.01 258.34);
  --primary: oklch(0.77 0.15 163.22);
  --primary-foreground: oklch(0.21 0.04 265.75);
  --secondary: oklch(0.34 0.03 260.91);
  --secondary-foreground: oklch(0.71 0.01 286.07);
  --muted: oklch(0.28 0.04 260.03);
  --muted-foreground: oklch(0.55 0.02 264.36);
  --accent: oklch(0.37 0.03 259.73);
  --accent-foreground: oklch(0.71 0.01 286.07);
  --destructive: oklch(0.64 0.21 25.33);
  --destructive-foreground: oklch(0.21 0.04 265.75);
  --border: oklch(0.45 0.03 256.80);
  --input: oklch(0.45 0.03 256.80);
  --ring: oklch(0.77 0.15 163.22);
  --chart-1: oklch(0.77 0.15 163.22);
  --chart-2: oklch(0.78 0.13 181.91);
  --chart-3: oklch(0.72 0.19 149.58);
  --chart-4: oklch(0.70 0.15 162.48);
  --chart-5: oklch(0.60 0.13 163.23);
  --sidebar: oklch(0.28 0.04 260.03);
  --sidebar-foreground: oklch(0.87 0.01 258.34);
  --sidebar-primary: oklch(0.77 0.15 163.22);
  --sidebar-primary-foreground: oklch(0.21 0.04 265.75);
  --sidebar-accent: oklch(0.37 0.03 259.73);
  --sidebar-accent-foreground: oklch(0.71 0.01 286.07);
  --sidebar-border: oklch(0.45 0.03 256.80);
  --sidebar-ring: oklch(0.77 0.15 163.22);
  --font-sans: DM Sans, sans-serif;
  --font-serif: Lora, serif;
  --font-mono: IBM Plex Mono, monospace;
  --radius: 0.5rem;
  --shadow-2xs: 0px 4px 8px -1px hsl(0 0% 0% / 0.05);
  --shadow-xs: 0px 4px 8px -1px hsl(0 0% 0% / 0.05);
  --shadow-sm: 0px 4px 8px -1px hsl(0 0% 0% / 0.10), 0px 1px 2px -2px hsl(0 0% 0% / 0.10);
  --shadow: 0px 4px 8px -1px hsl(0 0% 0% / 0.10), 0px 1px 2px -2px hsl(0 0% 0% / 0.10);
  --shadow-md: 0px 4px 8px -1px hsl(0 0% 0% / 0.10), 0px 2px 4px -2px hsl(0 0% 0% / 0.10);
  --shadow-lg: 0px 4px 8px -1px hsl(0 0% 0% / 0.10), 0px 4px 6px -2px hsl(0 0% 0% / 0.10);
  --shadow-xl: 0px 4px 8px -1px hsl(0 0% 0% / 0.10), 0px 8px 10px -2px hsl(0 0% 0% / 0.10);
  --shadow-2xl: 0px 4px 8px -1px hsl(0 0% 0% / 0.25);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);

  --font-sans: var(--font-sans);
  --font-mono: var(--font-mono);
  --font-serif: var(--font-serif);

  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);

  --shadow-2xs: var(--shadow-2xs);
  --shadow-xs: var(--shadow-xs);
  --shadow-sm: var(--shadow-sm);
  --shadow: var(--shadow);
  --shadow-md: var(--shadow-md);
  --shadow-lg: var(--shadow-lg);
  --shadow-xl: var(--shadow-xl);
  --shadow-2xl: var(--shadow-2xl);
}
```

### landing.md

This file is used to modify the landing page (`/` route) of the site. A sample configuration is given below.

```md
# Welcome to my site

This is a sample landing page for my site.
```
