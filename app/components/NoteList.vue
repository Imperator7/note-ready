<script setup lang="ts">
interface NoteListProps {
  sortBy: string
}

const props = defineProps<NoteListProps>()

const { notes } = useNote()

const sortedNotes = computed(() => {
  return [...notes.value].sort((a, b) => {
    if (props.sortBy === 'Newest first') {
      return b.createdAt - a.createdAt
    } else {
      return a.createdAt - b.createdAt
    }
  })
})
</script>

<template>
  <ul v-if="notes.length !== 0" class="flex flex-col gap-2">
    <li v-for="note in sortedNotes">
      <NoteCard :note="note" />
    </li>
  </ul>
  <p v-else>No note for now</p>
</template>
