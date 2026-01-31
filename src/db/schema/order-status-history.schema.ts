import { pgTable, serial, integer, varchar, text, timestamp } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { orders } from './orders.schema'

export const orderStatusHistory = pgTable('order_status_history', {
  id: serial('id').primaryKey(),
  orderId: integer('order_id')
    .notNull()
    .references(() => orders.id),
  status: varchar('status', { length: 50 }).notNull(),
  remarks: text('remarks'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export const orderStatusHistoryRelations = relations(orderStatusHistory, ({ one }) => ({
  order: one(orders, {
    fields: [orderStatusHistory.orderId],
    references: [orders.id],
  }),
}))
