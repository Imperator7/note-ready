<script setup lang="ts">
const { page, hasMore, hasPrevious } = useNote()
</script>

<template>
  <div class="flex items-center w-full justify-center">
    <button
      @click="page--"
      class="cursor-pointer flex disabled:opacity-50"
      :disabled="!hasPrevious"
    >
      <Icon name="eva:arrow-left-fill" size="30"></Icon>
    </button>
    <p class="leading-none">Page: {{ page }}</p>
    <button
      @click="page++"
      class="cursor-pointer flex disabled:opacity-50"
      :disabled="!hasMore"
    >
      <Icon name="eva:arrow-right-fill" size="30"></Icon>
    </button>
  </div>
</template>
