<script setup lang="ts">
interface Props {
  note: Note
}
const props = defineProps<Props>()

const now = ref(Date.now())
const isEditing = ref<boolean>(false)
const showHistory = ref<boolean>(false)
const editingNote = ref<string>('')

const { loggedIn } = useUserSession()

const { removeNoteById, editNoteById } = useNote()

const timeSince = (date: number): string => {
  const lastForSecond = (now.value - date) / 1000

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

let timer: NodeJS.Timeout | undefined

onMounted(() => {
  timer = setInterval(() => {
    now.value = Date.now()
  }, 1000)
})

onUnmounted(() => clearInterval(timer))
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
      class="grid transition-[grid-template-rows] duration-500 ease-out"
      :class="showHistory ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
    >
      <div class="overflow-hidden">
        <div class="bg-white m-2 p-4 rounded border border-gray-100 shadow-sm">
          <div class="p-2 bg-blue-100 rounded mb-2">
            <p class="font-medium mb-1">Note history:</p>

            <ClientOnly>
              <ul v-if="note.history?.length" class="px-2 list-disc ml-4">
                <li v-for="pastNote in note.history" :key="pastNote.createdAt">
                  <span class="font-mono text-sm text-gray-600">
                    {{ timeSince(pastNote.createdAt) }}:
                  </span>
                  {{ pastNote.note }}
                </li>
              </ul>

              <p v-else class="text-gray-500 text-sm">No edits yet</p>

              <template #fallback>
                <p class="text-gray-400 text-sm">Loading editing history...</p>
              </template>
            </ClientOnly>
          </div>

          <p class="text-xs text-gray-500">Author: {{ note.author }}</p>
          <p class="text-xs text-gray-500">
            Created: {{ new Date(note.createdAt).toLocaleString() }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
