<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const { user, loggedIn } = useUserSession()

const newNote = ref<string>('')
const category = ref<string>('work')
const sortBy = ref<string>('Newest first')

const { fetchNotes, createNote } = useNote()

const addNote = () => {
  createNote({
    note: newNote.value,
    author: user.value?.name,
    category: category.value,
  })

  newNote.value = ''
  category.value = 'work'
}

onMounted(() => {
  fetchNotes()
})
</script>

<template>
  <div
    v-if="loggedIn"
    class="w-[clamp(400px, 50%, 600px)] p-4 flex flex-col gap-4"
  >
    <div class="flex gap-4">
      <h2 class="text-xl font-bold">Notes</h2>
      <select
        name="category"
        class="border rounded px-1 cursor-pointer"
        v-model="sortBy"
      >
        <option>Newest first</option>
        <option>Oldest first</option>
      </select>
    </div>
    <form v-show="loggedIn" class="flex gap-4" @submit.prevent="addNote">
      <input
        type="text"
        v-model="newNote"
        class="border p-2 rounded"
        placeholder="Type here..."
        required
      />
      <select
        name="category"
        class="border rounded px-1 cursor-pointer"
        v-model="category"
      >
        <option>work</option>
        <option>study</option>
        <option>rest</option>
        <option>quote</option>
        <option>chore</option>
      </select>
      <div class="flex gap-2 items-center">
        <button
          class="p-2 bg-green-400 rounded cursor-pointer flex items-center"
          type="submit"
        >
          <Icon name="material-symbols:check-rounded" size="20" />
        </button>
        <button
          class="p-2 bg-red-400 rounded cursor-pointer flex items-center"
          @click="() => (newNote = '')"
        >
          <Icon name="material-symbols-light:close-rounded" size="20" />
        </button>
      </div>
    </form>
    <NoteList :sort-by="sortBy" />
  </div>
</template>
