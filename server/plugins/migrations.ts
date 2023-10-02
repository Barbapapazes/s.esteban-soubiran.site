import process from 'node:process'
import { migrate } from 'drizzle-orm/better-sqlite3/migrator'
import { join } from 'pathe'
import type { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3'

export default defineNitroPlugin(async () => {
  if (!process.env.DB)
    migrate(useDb() as BetterSQLite3Database, { migrationsFolder: join('./server/db', './migrations') })
})
