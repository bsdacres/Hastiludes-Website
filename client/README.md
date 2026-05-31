# Hastiludes Website

A [SolidStart](https://start.solidjs.com) 1.x site (vinxi), deployed to Netlify
via the Nitro `netlify` preset.

## Develop

```bash
bun install
bun run dev
```

## Build

```bash
bun run build
```

All routes are prerendered to static HTML in `dist/` (see the `prerender`
config in [`app.config.ts`](app.config.ts)); an SSR fallback function for any
non-prerendered path is written to `.netlify/functions-internal/`.

## Deploy

Netlify config lives in [`../netlify.toml`](../netlify.toml):

- **base:** `client`
- **command:** `bun run build`
- **publish:** `dist`

Pushing to the default branch triggers a Netlify build.
