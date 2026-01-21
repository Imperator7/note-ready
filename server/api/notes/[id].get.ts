export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event)
  const session = await requireUserSession(event)

  const { getById: getNoteById } = useNoteService(session.user)

  return {
    success: true,
    status: 200,
    data: getNoteById(id),
  }
})
