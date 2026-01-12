import z from 'zod'

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)

  const { create: createNote } = useNoteService(session.user)

  const postBodySchema = z.object({
    note: z.string().min(1),
    category: z.string().min(1),
  })

  const { note, category } = await readValidatedBody(
    event,
    postBodySchema.parse
  )

  return {
    success: true,
    status: 201,
    data: createNote(note, category),
  }
})
