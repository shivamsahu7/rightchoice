import { pgTable, serial, integer, decimal, text } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { inventory } from './inventory.schema'
import { brands } from './brands.schema'
import { categories } from './categories.schema'
import { types } from './types.schema'

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  inventoryId: integer('inventory_id')
    .notNull()
    .references(() => inventory.id),
  brandId: integer('brand_id')
    .notNull()
    .references(() => brands.id),
  categoryId: integer('category_id')
    .notNull()
    .references(() => categories.id),
  typeId: integer('type_id')
    .notNull()
    .references(() => types.id),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  seoTitle: text('seo_title'),
  seoDescription: text('seo_description'),
  metaKeywords: text('meta_keywords'),
})

export const productsRelations = relations(products, ({ one }) => ({
  inventory: one(inventory, {
    fields: [products.inventoryId],
    references: [inventory.id],
  }),
  brand: one(brands, {
    fields: [products.brandId],
    references: [brands.id],
  }),
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  type: one(types, {
    fields: [products.typeId],
    references: [types.id],
  }),
}))
