export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event)
  const session = await requireUserSession(event)

  const { remove: deleteNote, getById: getNoteById } = useNoteService(
    session.user,
  )

  deleteNote(id)

  const targetNote = getNoteById(id)

  if (targetNote) {
    return {
      success: false,
      status: 500,
      data: targetNote,
    }
  }

  return {
    success: true,
    status: 204,
  }
})
