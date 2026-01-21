<script setup lang="ts">
const { user, loggedIn } = useUserSession()
const { createNote } = useNote()

const newNote = ref<string>('')
const category = ref<string>('work')

const addNote = () => {
  if (!user.value) {
    console.error('User is not authenticated')
    return
  }

  createNote({
    note: newNote.value,
    category: category.value,
  })

  newNote.value = ''
  category.value = 'work'
}
</script>
<template>
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
        class="py-2 px-4 bg-sky-700 text-white font-medium rounded cursor-pointer flex items-center hover:-translate-y-0.5 transition duration-75 ease active:translate-y-1 active:bg-sky-500"
        type="submit"
      >
        Create
      </button>
    </div>
  </form>
</template>
