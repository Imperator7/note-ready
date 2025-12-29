<script setup lang="ts">
interface Props {
  note: Note
}
const props = defineProps<Props>()

const isEditing = ref<boolean>(false)
const showHistory = ref<boolean>(false)
const editingNote = ref<string>(props.note.note)

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
</script>

<template>
  <div class="bg-gray-200 rounded px-4 py-2">
    <div class="flex justify-between">
      <div v-show="!isEditing" class="flex gap-2 items-center">
        <p class="px-2 max-w-[50vw] wrap-break-word">
          {{ note.note }}
        </p>
        <v-btn
          v-show="loggedIn"
          class="cursor-pointer"
          @click="
            () => {
              isEditing = true
            }
          "
        >
          <Icon name="material-symbols:edit-outline" />
        </v-btn>
      </div>
      <div v-show="isEditing" class="flex gap-2 items-center">
        <textarea
          v-model="editingNote"
          type="text"
          placeholder="edit here"
          class="px-2 field-sizing-content min-w-12.5 border rounded max-w-[50vw] wrap-break-word"
          ref="editingNoteInput"
        />
        <v-btn
          class="cursor-pointer"
          @click="
            () => {
              editNote(editingNote, undefined)
              isEditing = false
            }
          "
        >
          <Icon name="material-symbols:check" /> </v-btn
        ><v-btn
          class="cursor-pointer"
          @click="
            () => {
              editingNote = note.note
              isEditing = false
            }
          "
        >
          <Icon name="material-symbols:close" />
        </v-btn>
      </div>

      <div class="flex gap-2 items-center">
        <p class="bg-white px-2 py-1 rounded font-medium">
          {{ note.category }}
        </p>
        <v-btn
          v-show="!showHistory"
          @click="toggleHistory"
          class="cursor-pointer"
          ><Icon name="material-symbols:keyboard-arrow-down" color="red-500"
        /></v-btn>
        <v-btn
          v-show="showHistory"
          @click="toggleHistory"
          class="cursor-pointer"
          ><Icon name="material-symbols:keyboard-arrow-up" color="red-500"
        /></v-btn>
        <v-btn v-show="loggedIn" @click="removeNote()" class="cursor-pointer"
          ><Icon name="material-symbols:close" color="red-500"
        /></v-btn>
      </div>
    </div>
    <div
      :class="
        [[showHistory ? 'p-4' : 'hidden'], 'bg-white m-2 p-2 rounded'].join(' ')
      "
    >
      <div class="p-2 bg-blue-100 rounded">
        <p class="font-medium">Note history:</p>
        <ul class="px-2">
          <li v-if="note.history.length > 0" v-for="pastNote in note.history">
            {{ timeSince(pastNote.createdAt) }}: {{ pastNote.note }}
          </li>
          <p v-else>No edits yet</p>
        </ul>
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
