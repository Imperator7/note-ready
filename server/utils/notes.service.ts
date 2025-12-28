let notes: Note[] = [
  {
    id: '3b50a434-7c70-4c79-b5c8-73be09131c08',
    author: 'John Doe',
    note: 'ล้างจาน',
    history: [],
    createdAt: 1766957514544,
    category: 'chore',
  },
  {
    id: '701258c8-7ff3-4af6-a5ef-da1ef8b6c430',
    author: 'John Doe',
    note: 'เรียน pagination เเละ auth',
    history: [
      {
        note: 'เรียน pagination',
        category: 'study',
        createdAt: 1766957524842,
      },
      {
        note: 'เรียน pagination\nเรียน auth',
        category: 'study',
        createdAt: 1766957574043,
      },
    ],
    createdAt: 1766957590830,
    category: 'study',
  },
]

export const useNoteService = () => {
  return {
    get: (id: string) => notes.find((note) => note.id === id),
    getAll: (): Note[] => notes,
    create: (note: string, category: string, author: string): Note => {
      const newNote = {
        id: crypto.randomUUID(),
        author: author,
        note: note,
        history: [],
        createdAt: Date.now(),
        category: category,
      }

      notes.push(newNote)

      return newNote
    },
    update: (id: string, category?: string, note?: string): Note => {
      if (!category && !note) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Bad Request',
        })
      }

      const targetNoteIndex = notes.findIndex((note) => note.id === id)

      if (targetNoteIndex === -1) {
        throw createError({ statusCode: 404, statusMessage: 'Not found' })
      }

      const lastHistory = {
        note: notes[targetNoteIndex].note,
        category: notes[targetNoteIndex].category,
        createdAt: notes[targetNoteIndex].createdAt,
      }

      const editedNote: Note = {
        ...notes[targetNoteIndex],
        history: [...notes[targetNoteIndex].history, lastHistory],
        note: note ?? notes[targetNoteIndex].note,
        category: category ?? notes[targetNoteIndex].category,
        createdAt: Date.now(),
      }

      notes[targetNoteIndex] = editedNote

      return editedNote
    },
    remove: (id: string) => {
      notes = notes.filter((note) => note.id !== id)
    },
  }
}
