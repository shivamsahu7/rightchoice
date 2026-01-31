import { t } from 'elysia'

export const createMediaDirectorySchema = t.Object({
  name: t.String({
    minLength: 2,
    maxLength: 255,
    error: 'Name must be between 2 and 255 characters',
  }),
  path: t.String({
    minLength: 1,
    maxLength: 500,
    error: 'Path must be between 1 and 500 characters',
  }),
})
