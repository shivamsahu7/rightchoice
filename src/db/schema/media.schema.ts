import { pgTable, serial, varchar, integer } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { mediaDirectories } from './media-directories.schema'

export const media = pgTable('media', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  path: varchar('path').notNull(),
  mediaDirectoryId: integer('media_directory_id')
    .notNull()
    .references(() => mediaDirectories.id),
})

export const mediaRelations = relations(media, ({ one }) => ({
  directory: one(mediaDirectories, {
    fields: [media.mediaDirectoryId],
    references: [mediaDirectories.id],
  }),
}))
