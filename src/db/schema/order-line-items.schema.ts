import { pgTable, serial, integer, decimal, varchar } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { orders } from './orders.schema'
import { products } from './products.schema'

export const orderLineItems = pgTable('order_line_items', {
  id: serial('id').primaryKey(),
  orderId: integer('order_id')
    .notNull()
    .references(() => orders.id),
  productId: integer('product_id')
    .notNull()
    .references(() => products.id),
  quantity: integer('quantity').notNull().default(1),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  trackingId: varchar('tracking_id', { length: 100 }),
  itemStatus: varchar('item_status', { length: 50 }).notNull().default('pending'), // 'pending', 'confirmed', 'shipped', 'delivered', 'returned', 'replaced', 'cancelled'
})

export const orderLineItemsRelations = relations(orderLineItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderLineItems.orderId],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [orderLineItems.productId],
    references: [products.id],
  }),
}))
