export const useNote = () => {
  const route = useRoute()
  const router = useRouter()

  type NoteState = {
    creating: boolean
    fetching: boolean
    notes: Note[]
    meta: {
      totalPages: number
      limit: number
    }
  }

  const noteState = useState<NoteState>('notes-state', () => ({
    creating: false,
    fetching: false,
    notes: [],
    meta: {
      totalPages: 0,
      limit: 10,
    },
  }))

  const page = computed({
    get: () => Number(route.query.page) || 1,
    set: (val) => {
      router.replace({ query: { ...route.query, page: val } })
    },
  })

  const sortBy = computed({
    get: () => (route.query.sortBy as string) || 'Newest',
    set: (val) => router.replace({ query: { ...route.query, sortBy: val } }),
  })

  watch([page, sortBy], () => {
    fetchNotes()
  })

  const hasPrevious = computed(() => page.value > 1)
  const hasMore = computed(() => page.value < noteState.value.meta.totalPages)

  const fetchNotes = async () => {
    noteState.value.fetching = true
    try {
      const response = await $fetch(`/api/notes`, {
        query: {
          page: page.value,
          sortBy: sortBy.value,
        },
      })

      if (!response.meta) {
      }

      noteState.value.notes = response.data
      noteState.value.meta = {
        totalPages: response.meta.total_pages,
        limit: response.meta.per_page,
      }
    } catch (error) {
      console.error(error)
    } finally {
      noteState.value.fetching = false
    }
  }

  const createNote = async (payload: { note: string; category: string }) => {
    noteState.value.creating = true
    try {
      await $fetch('/api/notes', {
        method: 'POST',
        body: payload,
      })

      await fetchNotes()
    } catch (error) {
      console.error(error)
    } finally {
      noteState.value.creating = false
    }
  }

  const removeNoteById = async (payload: { id: string }) => {
    try {
      await $fetch(`/api/notes/${payload.id}`, {
        method: 'DELETE',
      })

      await fetchNotes()
    } catch (error) {
      console.error(error)
    }
  }

  const editNoteById = async (payload: {
    id: string
    note?: string
    category?: string
  }) => {
    try {
      await $fetch(`/api/notes/${payload.id}`, {
        method: 'PATCH',
        body: {
          note: payload.note,
          category: payload.category,
        },
      })

      await fetchNotes()
    } catch (error) {
      console.error(error)
    }
  }

  return {
    noteState,
    fetchNotes,
    createNote,
    removeNoteById,
    editNoteById,
    hasMore,
    hasPrevious,
    page,
    sortBy,
  }
}
