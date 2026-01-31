import { pgTable, serial, varchar } from 'drizzle-orm/pg-core'

export const states = pgTable('states', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
})
