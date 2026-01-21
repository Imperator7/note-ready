<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const { loggedIn } = useUserSession()

const { fetchNotes, sortBy } = useNote()

onMounted(() => {
  fetchNotes()
})
</script>

<template>
  <div v-if="loggedIn" class="w-full max-w-200 mx-auto p-4 flex flex-col gap-4">
    <div class="flex gap-4">
      <h2 class="text-xl font-bold">Notes</h2>
      <select
        name="category"
        class="border rounded px-1 cursor-pointer"
        v-model="sortBy"
      >
        <option value="Newest">Newest first</option>
        <option value="Oldest">Oldest first</option>
      </select>
    </div>
    <NoteCreateForm />
    <NoteList />
    <NotePaginationBar />
  </div>
</template>
