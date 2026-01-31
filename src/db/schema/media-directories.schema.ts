import { pgTable, serial, varchar } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { media } from './media.schema'

export const mediaDirectories = pgTable('media_directories', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  path: varchar('path').notNull(),
})

export const mediaDirectoriesRelations = relations(mediaDirectories, ({ many }) => ({
  mediaFiles: many(media),
}))
