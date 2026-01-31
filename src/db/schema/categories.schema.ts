import { pgTable, serial, varchar, text, integer } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { media } from './media.schema'

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  mediaId: integer('media_id').references(() => media.id),
  seoTitle: text('seo_title'),
  seoDescription: text('seo_description'),
  metaKeywords: text('meta_keywords'),
})

export const categoriesRelations = relations(categories, ({ one }) => ({
  media: one(media, {
    fields: [categories.mediaId],
    references: [media.id],
  }),
}))
