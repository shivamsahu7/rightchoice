import { pgTable, serial, varchar, text, boolean, integer, timestamp } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  firstName: varchar('first_name', { length: 50 }).notNull(),
  lastName: varchar('last_name', { length: 50 }).notNull(),
  email: varchar('email', { length: 50 }).notNull().unique(),
  password: text('password').notNull(),
  resetPasswordToken: text('reset_password_token'),
  resetPasswordExpires: timestamp('reset_password_expires'),
  status: boolean('status').notNull().default(true),
  invalidLoginAttempts: integer('invalid_login_attempts').notNull().default(0),
  lastPasswordChangedOn: timestamp('last_password_changed_on'),
  ipAddress: varchar('ip_address', { length: 45 }),
  lastLogin: timestamp('last_login'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})
