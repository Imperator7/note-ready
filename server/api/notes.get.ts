import z from 'zod'

export default defineEventHandler(async (event) => {
  const { getAll: getNotes, getByPage, getMeta } = useNoteService()

  const querySchema = z.object({
    page: z.coerce.number().int().positive().optional(),
  })

  const { page } = await getValidatedQuery(event, querySchema.parse)

  if (page) {
    return {
      success: true,
      status: 200,
      data: getByPage(page),
      meta: getMeta(page),
    }
  }

  return { success: true, status: 200, data: getNotes() }
})
