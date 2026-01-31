import { pgTable, serial, varchar, text, integer } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { media } from './media.schema'

export const brands = pgTable('brands', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  mediaId: integer('media_id').references(() => media.id),
  seoTitle: text('seo_title'),
  seoDescription: text('seo_description'),
  metaKeywords: text('meta_keywords'),
})

export const brandsRelations = relations(brands, ({ one }) => ({
  media: one(media, {
    fields: [brands.mediaId],
    references: [media.id],
  }),
}))
