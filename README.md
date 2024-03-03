# Personal URLs Shortener

This is a personal URLs shortener built with [Nuxt 3](https://nuxt.com), [Nuxt Hub](https://hub.nuxt.com)  , and [Nuxt UI Pro](https://ui.nuxt.com/pro) on top of [Cloudflare Workers](https://workers.cloudflare.com/) and [Cloudflare D1](https://developers.cloudflare.com/d1/).

> **Note**
> You can fork this project for your own use but this is more like a demo app than a production-ready app.

## Setup

Make sure to install the dependencies:

```bash
bun install
```

You must also create a `.env` file with the following environment variables:

```bash
NUXT_BASIC_AUTH_USERNAME=<username>
NUXT_BASIC_AUTH_PASSWORD=<password>
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
bun run dev
```

## Production

Build the application for production:

```bash
bun run build
```

Locally preview production build:

```bash
bun run preview
```
