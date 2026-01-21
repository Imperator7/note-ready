<script setup lang="ts">
interface Props {
  note: Note
}
const props = defineProps<Props>()

const isEditing = ref<boolean>(false)
const showHistory = ref<boolean>(false)
const editingNote = ref<string>('')

const { loggedIn } = useUserSession()

const { removeNoteById, editNoteById } = useNote()

const timeSince = (date: number): string => {
  const lastForSecond = (Date.now() - date) / 1000

  if (lastForSecond < 60) {
    return `${Math.floor(lastForSecond)}s ago`
  } else if (lastForSecond < 3600) {
    return `${Math.floor(lastForSecond / 60)}m ago`
  } else if (lastForSecond < 86400) {
    return `${Math.floor(lastForSecond / 3600)}h ago`
  } else {
    return `${Math.floor(lastForSecond / 86400)}d ago`
  }
}

const editNote = (newNote?: string, category?: string) => {
  editNoteById({ id: props.note.id, note: newNote, category: category })
}

const removeNote = () => {
  removeNoteById({ id: props.note.id })
}

const toggleHistory = () => {
  showHistory.value = !showHistory.value
}

const startEditing = () => {
  editingNote.value = props.note.note
  isEditing.value = true
}

const stopEditing = () => {
  editingNote.value = props.note.note
  isEditing.value = false
}

const confirmEditing = () => {
  editNote(editingNote.value, undefined)
  isEditing.value = false
}
</script>

<template>
  <div class="bg-gray-200 rounded px-4 py-2">
    <div class="flex justify-between">
      <div v-show="!isEditing" class="flex gap-2 items-center">
        <p class="px-2 max-w-[50vw] wrap-break-word">
          {{ note.note }}
        </p>
        <button v-show="loggedIn" class="cursor-pointer" @click="startEditing">
          <Icon name="material-symbols:edit-outline" />
        </button>
      </div>
      <div v-show="isEditing" class="flex gap-2 items-center">
        <textarea
          v-model="editingNote"
          type="text"
          placeholder="edit here"
          class="px-2 field-sizing-content min-w-12.5 border rounded max-w-[50vw] wrap-break-word"
        />
        <button class="cursor-pointer" @click="confirmEditing">
          <Icon name="material-symbols:check" /></button
        ><button class="cursor-pointer" @click="stopEditing">
          <Icon name="material-symbols:close" />
        </button>
      </div>

      <div class="flex gap-2 items-center">
        <p class="bg-white px-2 py-1 rounded font-medium">
          {{ note.category }}
        </p>
        <button
          v-show="!showHistory"
          @click="toggleHistory"
          class="cursor-pointer"
        >
          <Icon name="material-symbols:keyboard-arrow-down" color="red-500" />
        </button>
        <button
          v-show="showHistory"
          @click="toggleHistory"
          class="cursor-pointer"
        >
          <Icon name="material-symbols:keyboard-arrow-up" color="red-500" />
        </button>
        <button v-show="loggedIn" @click="removeNote()" class="cursor-pointer">
          <Icon name="material-symbols:close" color="red-500" />
        </button>
      </div>
    </div>
    <div
      :class="
        [[showHistory ? 'p-4' : 'hidden'], 'bg-white m-2 p-2 rounded'].join(' ')
      "
    >
      <div class="p-2 bg-blue-100 rounded">
        <p class="font-medium">Note history:</p>
        <ul v-if="note.history.length > 0" class="px-2">
          <li v-for="pastNote in note.history" :key="pastNote.createdAt">
            {{ timeSince(pastNote.createdAt) }}: {{ pastNote.note }}
          </li>
        </ul>
        <p v-else>No edits yet</p>
      </div>

      <p class="rounded font-light">author: {{ note.author }}</p>
      <p class="rounded font-light">
        timestamp:
        {{ new Date(note.createdAt).toLocaleTimeString() }}
        {{ new Date(note.createdAt).toLocaleDateString() }}
      </p>
    </div>
  </div>
</template>
