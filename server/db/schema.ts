import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const redirects = sqliteTable('redirects', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique(),
  url: text('url').notNull(),
})

export const activities = sqliteTable('activities', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  redirectId: integer('redirect_id', { mode: 'number' }).references(() => redirects.id, { onDelete: 'cascade' }).notNull(),
  usedAt: integer('used_at', { mode: 'timestamp' }).notNull(),
})
