export default defineEventHandler(async (event) => {
  if (!event.path.startsWith('/api')) {
    return
  }

  const publicPaths = ['/api/auth/login', '/api/auth/register']

  if (publicPaths.some((path) => event.path.startsWith(path))) {
    return
  }

  const session = await getUserSession(event)
  if (!session.user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized request, please login and try again',
    })
  }
})
