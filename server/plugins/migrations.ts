import { consola } from 'consola'

export default defineNitroPlugin(async () => {
  if (!import.meta.dev)
    return

  onHubReady(async () => {
    const migrationsStorage = useStorage('root/server/database/migrations')
    let migrationFiles = await migrationsStorage.getKeys()
    migrationFiles = migrationFiles.filter(key => key.endsWith('.sql'))

    const database = hubDatabase()

    for (const file of migrationFiles) {
      consola.info(`Applying database migrations from ${file}...`)
      const migration = (await migrationsStorage.getItem<string>(file)) || ''
      const statements = migration.split('--> statement-breakpoint')
      for (let stmt of statements) {
        stmt = stmt
          .replace('CREATE TABLE', 'CREATE TABLE IF NOT EXISTS')
          .replace('CREATE INDEX', 'CREATE INDEX IF NOT EXISTS')
          .replace('CREATE UNIQUE INDEX', 'CREATE UNIQUE INDEX IF NOT EXISTS')
        await database.prepare(stmt).run()
      }
    }
    consola.success('Database migrations done')
  })
})
