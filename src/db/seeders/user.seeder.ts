import { db } from '../../config/db'
import { users } from '../schema'
import { eq } from 'drizzle-orm'
import { hashPassword } from '../../utils/auth.helper'

export async function seedUsers() {
  try {
    console.log('Seeding users...')

    // Check if admin user already exists
    const existingAdmin = await db
      .select()
      .from(users)
      .where(eq(users.email, 'admin@yopmail.com'))
      .limit(1)

    if (existingAdmin.length > 0) {
      console.log('Admin user already exists, skipping seed...')
      return
    }

    // Create admin user
    const hashedPassword = await hashPassword('Admin@123')

    await db.insert(users).values([
      {
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@yopmail.com',
        password: hashedPassword,
        status: true,
        invalidLoginAttempts: 0,
      }
    ])

    console.log('✅ Admin user seeded successfully')
  } catch (error) {
    console.error('❌ Error seeding users:', error)
    throw error
  }
}
