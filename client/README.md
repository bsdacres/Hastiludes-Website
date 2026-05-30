# Hastiludes Website

A [SolidStart](https://start.solidjs.com) site, deployed to Netlify via the Nitro `netlify` preset.

## Develop

```bash
bun install
bun run dev
```

## Build

```bash
bun run build
```

Static output is written to `dist/`; the SSR server function is written to
`.netlify/functions-internal/`. Both are produced by the `netlify` Nitro preset
configured in [`vite.config.ts`](vite.config.ts).

## Deploy

Netlify config lives in [`../netlify.toml`](../netlify.toml):

- **base:** `client`
- **command:** `bun run build`
- **publish:** `dist`

Pushing to the default branch triggers a Netlify build.
