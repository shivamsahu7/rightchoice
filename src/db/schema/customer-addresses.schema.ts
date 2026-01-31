import { pgTable, serial, varchar, integer } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { customers } from './customers.schema'
import { states } from './states.schema'

export const customerAddresses = pgTable('customer_addresses', {
  id: serial('id').primaryKey(),
  customerId: integer('customer_id')
    .notNull()
    .references(() => customers.id),
  name: varchar('name', { length: 100 }).notNull(),
  phone: varchar('phone', { length: 10 }).notNull(),
  pincode: varchar('pincode', { length: 6 }).notNull(),
  locality: varchar('locality', { length: 255 }).notNull(),
  address: varchar('address', { length: 255 }).notNull(),
  city: varchar('city', { length: 20 }).notNull(),
  stateId: integer('state_id')
    .notNull()
    .references(() => states.id),
  landmark: varchar('landmark', { length: 255 }),
  alternatePhone: varchar('alternate_phone', { length: 10 }),
})

export const customerAddressesRelations = relations(customerAddresses, ({ one }) => ({
  customer: one(customers, {
    fields: [customerAddresses.customerId],
    references: [customers.id],
  }),
  state: one(states, {
    fields: [customerAddresses.stateId],
    references: [states.id],
  }),
}))
