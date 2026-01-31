import { pgTable, serial, integer, decimal, timestamp, pgEnum } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { customers } from './customers.schema'
import { orderAddresses } from './order-addresses.schema'
import { orderLineItems } from './order-line-items.schema'
import { orderStatusHistory } from './order-status-history.schema'

// Define enums
export const orderStatusEnum = pgEnum('order_status_enum', [
  'pending',
  'confirmed',
  'processing',
  'partially_shipped',
  'shipped',
  'delivered',
  'cancelled'
])

export const paymentMethodEnum = pgEnum('payment_method_enum', [
  'cod',
  'prepaid'
])

export const paymentStatusEnum = pgEnum('payment_status_enum', [
  'pending',
  'paid',
  'failed',
  'refunded'
])

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  customerId: integer('customer_id')
    .notNull()
    .references(() => customers.id),
  orderAddressId: integer('order_address_id')
    .notNull()
    .references(() => orderAddresses.id),
  orderStatus: orderStatusEnum('order_status').notNull().default('pending'),
  paymentMethod: paymentMethodEnum('payment_method').notNull(),
  paymentStatus: paymentStatusEnum('payment_status').notNull().default('pending'),
  totalAmount: decimal('total_amount', { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const ordersRelations = relations(orders, ({ one, many }) => ({
  customer: one(customers, {
    fields: [orders.customerId],
    references: [customers.id],
  }),
  orderAddress: one(orderAddresses, {
    fields: [orders.orderAddressId],
    references: [orderAddresses.id],
  }),
  lineItems: many(orderLineItems),
  statusHistory: many(orderStatusHistory),
}))
