import { z } from 'zod'

const bodySchema = z.object({
  email: z.email(),
  password: z.string().min(8),
})

const userSchema = z.object({
  userId: z.uuid(),
  name: z.string(),
  email: z.email(),
  password: z.string(),
})

type User = z.infer<typeof userSchema>

const users: User[] = [
  {
    userId: '2edbd5ea-cfd0-40f5-b946-656fceee8380',
    name: 'John Doe',
    email: 'admin@admin.com',
    password:
      '$scrypt$n=16384,r=8,p=1$PsEGkJYQUOC9ihcNRdbLlQ$4z5YhtBvnfugU85tMPyXrDyPqIoaltPnEqEJ9dW01PrUCVTMY+P80KU3WcELEJy6u5/J08q+vTTXvWD9AgqEqA',
  },
]

export default defineEventHandler(async (event) => {
  const { email, password } = await readValidatedBody(event, bodySchema.parse)

  const user = users.find((user) => user.email === email)

  if (!user) {
    throw createError({
      status: 401,
      message: 'Bad credentials',
    })
  }

  const isValid = await verifyPassword(user.password, password)

  if (isValid) {
    await setUserSession(event, {
      user: {
        name: user.name,
        userId: user.userId,
      },
    })

    return { success: true }
  }

  throw createError({
    status: 401,
    message: 'Bad credentials',
  })
})
