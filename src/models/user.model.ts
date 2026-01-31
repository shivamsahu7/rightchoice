import { db } from '../config/db'
import { users } from '../db/schema'
import { eq } from 'drizzle-orm'

export class UserModel {
  static async findByEmail(email: string) {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1)

    return user[0] || null
  }

  static async findById(id: number) {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1)

    return user[0] || null
  }

  static async create(data: {
    firstName: string
    lastName: string
    email: string
    password: string
    ipAddress?: string
  }) {
    const result = await db
      .insert(users)
      .values({
        ...data,
        status: true,
        invalidLoginAttempts: 0,
      })
      .returning()

    return result[0]
  }

  static async updateLastLogin(id: number, ipAddress?: string) {
    await db
      .update(users)
      .set({
        lastLogin: new Date(),
        ipAddress,
        invalidLoginAttempts: 0,
        updatedAt: new Date(),
      })
      .where(eq(users.id, id))
  }

  static async incrementLoginAttempts(id: number) {
    const user = await this.findById(id)
    if (!user) return

    await db
      .update(users)
      .set({
        invalidLoginAttempts: user.invalidLoginAttempts + 1,
        updatedAt: new Date(),
      })
      .where(eq(users.id, id))
  }
}
