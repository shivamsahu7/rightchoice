import { pgTable, serial, varchar, integer } from 'drizzle-orm/pg-core'

export const inventory = pgTable('inventory', {
  id: serial('id').primaryKey(),
  description: varchar('description'),
  quantity: integer('quantity').notNull().default(0),
})
