import { z } from 'zod'

const bodySchema = z.object({
  email: z.email(),
  password: z.string().min(8),
})

export default defineEventHandler(async (event) => {
  const { email, password } = await readValidatedBody(event, bodySchema.parse)

  if (email === 'admin@admin.com' && password === 'password') {
    await setUserSession(event, {
      user: {
        name: 'John Doe',
        id: '0',
      },
    })

    return { success: true }
  }

  throw createError({
    status: 401,
    message: 'Bad credentials',
  })
})
