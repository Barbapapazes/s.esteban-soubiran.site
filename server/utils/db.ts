import process from 'node:process'
import { type DrizzleD1Database, drizzle as drizzleD1 } from 'drizzle-orm/d1'
import type { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { join } from 'pathe'
import Database from 'better-sqlite3'

export * as tables from '../db/schema'

// Be careful, SQLite3 is sync but Drizzle is async
let _db: BetterSQLite3Database | DrizzleD1Database | null = null

export function useDb() {
  if (!_db) {
    if (process.env.DB) {
      _db = drizzleD1(process.env.DB)
    }
    else {
      const dbPath = join('./server/db', './db.sqlite')
      const sqlite = new Database(dbPath)
      _db = drizzle(sqlite)
    }
  }

  return _db
}
