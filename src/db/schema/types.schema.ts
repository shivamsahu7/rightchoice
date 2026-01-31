import { pgTable, serial, varchar, text, integer } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { media } from './media.schema'

export const types = pgTable('types', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  mediaId: integer('media_id').references(() => media.id),
  seoTitle: text('seo_title'),
  seoDescription: text('seo_description'),
  metaKeywords: text('meta_keywords'),
})

export const typesRelations = relations(types, ({ one }) => ({
  media: one(media, {
    fields: [types.mediaId],
    references: [media.id],
  }),
}))
