<script setup lang="ts">
const { noteState } = useNote()
</script>

<template>
  <ul v-if="noteState.notes.length !== 0" class="flex flex-col gap-2">
    <li v-for="note in noteState.notes" :key="note.id">
      <NoteCard :note="note" />
    </li>
  </ul>
  <p v-else>No note for now</p>
</template>
