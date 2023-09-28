# Personal URLs Shortener

This is a personal URLs shortener built with [Nuxt 3](https://nuxt.com) and [Nuxt UI](https://ui.nuxt.com) on top of [Cloudflare Workers](https://workers.cloudflare.com/) and [Cloudflare KV](https://www.cloudflare.com/products/workers-kv/).

> **Note**
> You can fork this project for your own use.

_Cloudflare KV is not ideal for this use case since data propagation is not instant but it way simpler to setup than a database like D1._

## Setup

Make sure to install the dependencies:

```bash
# pnpm
pnpm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# pnpm
pnpm run dev
```

## Production

Build the application for production:

```bash
# pnpm
pnpm run build
```

Locally preview production build:

```bash
# pnpm
pnpm run preview
```
