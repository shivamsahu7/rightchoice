import { pgTable, serial, varchar } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { customerAddresses } from './customer-addresses.schema'

export const customers = pgTable('customers', {
  id: serial('id').primaryKey(),
  firstName: varchar('first_name', { length: 20 }).notNull(),
  lastName: varchar('last_name', { length: 20 }).notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  phone: varchar('phone', { length: 15 }).notNull().unique(),
})

export const customersRelations = relations(customers, ({ many }) => ({
  addresses: many(customerAddresses),
}))
 