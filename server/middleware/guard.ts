export default defineEventHandler(async (event) => {
  if (!event.path.startsWith('/api')) {
    return
  }

  const publicPaths = ['/api/auth/login', '/api/auth/register']

  if (publicPaths.some((path) => event.path.startsWith(path))) {
    return
  }

  await requireUserSession(event)
})
