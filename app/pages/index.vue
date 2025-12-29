<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const { loggedIn } = useUserSession()

const sortBy = ref<string>('Newest first')

const { fetchNotes } = useNote()

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
    <NoteCreateForm />
    <NoteList :sort-by="sortBy" />
  </div>
</template>
