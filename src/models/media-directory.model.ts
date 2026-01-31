import { db } from '../config/db'
import { mediaDirectories } from '../db/schema'
import { eq, count } from 'drizzle-orm'

export class MediaDirectoryModel {
  static async findAll(limit: number, offset: number) {
    return await db
      .select()
      .from(mediaDirectories)
      .limit(limit)
      .offset(offset)
  }

  static async findByName(name: string) {
    const result = await db
      .select()
      .from(mediaDirectories)
      .where(eq(mediaDirectories.name, name))
      .limit(1)

    return result[0] || null
  }

  static async create(data: { name: string; path: string }) {
    const result = await db
      .insert(mediaDirectories)
      .values(data)
      .returning()

    return result[0]
  }

  static async count() {
    const result = await db
      .select({ total: count() })
      .from(mediaDirectories)

    return result[0].total
  }
}
