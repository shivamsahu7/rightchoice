import { pgTable, serial, integer, timestamp } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { customers } from './customers.schema'
import { products } from './products.schema'

export const cart = pgTable('cart', {
  id: serial('id').primaryKey(),
  customerId: integer('customer_id')
    .notNull()
    .references(() => customers.id),
  productId: integer('product_id')
    .notNull()
    .references(() => products.id),
  quantity: integer('quantity').notNull().default(1),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const cartRelations = relations(cart, ({ one }) => ({
  customer: one(customers, {
    fields: [cart.customerId],
    references: [customers.id],
  }),
  product: one(products, {
    fields: [cart.productId],
    references: [products.id],
  }),
}))
