<script setup lang="ts">
import { ref } from 'vue'
import NoteCard from '~/components/NoteCard.vue'

export interface Note {
  id: string
  author: string
  note: string
  createdAt: number
  category: string
}

let id = 0

const newNote = ref<string>('')

const notes = ref<Note[]>([
  {
    id: (id++).toString(),
    author: 'A',
    note: 'วันนี้หิวจัง',
    createdAt: Date.now(),
    category: 'งาน',
  },
  {
    id: (id++).toString(),
    author: 'A',
    note: 'วันนี้หิวจัง',
    createdAt: Date.now(),
    category: 'งาน',
  },
  {
    id: (id++).toString(),
    author: 'A',
    note: 'วันนี้หิวจัง',
    createdAt: Date.now(),
    category: 'งาน',
  },
])

const addNote = () => {
  notes.value.push({
    id: (id++).toString(),
    author: 'A',
    note: newNote.value,
    createdAt: Date.now(),
    category: 'งาน',
  })

  newNote.value = ''
}

const editNoteById = (id: string, newNote: string) => {
  notes.value = notes.value.map((note) =>
    note.id === id
      ? {
          ...note,
          note: newNote,
        }
      : note
  )
}

const removeNote = (noteId: string) => {
  notes.value = notes.value.filter((n) => noteId !== n.id)
}
</script>

<template>
  <div class="w-[clamp(400px, 50%, 600px)] p-4 flex flex-col gap-4">
    <h2 class="text-xl font-bold">Notes</h2>
    <ul class="flex flex-col gap-2">
      <li v-for="note in notes">
        <NoteCard
          :note="note"
          :remove-note="() => removeNote(note.id)"
          :edit-note="(newNote: string) => editNoteById( note.id, newNote)"
        />
      </li>
    </ul>
  </div>
</template>
