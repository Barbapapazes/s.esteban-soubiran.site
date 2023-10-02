import type { Config } from 'drizzle-kit'

export default {
  out: './server/db/migrations',
  schema: './server/db/schema.ts',
  breakpoints: true,
} satisfies Config
