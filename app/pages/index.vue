<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})
</script>

<template>
  <div
    class="min-h-screen flex flex-col justify-center items-center gap-6 bg-gray-50"
  >
    <h1 class="text-4xl font-extrabold text-gray-800 tracking-tight">
      Welcome to Note Easy
    </h1>
    <button
      class="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 cursor-pointer"
      @click="navigateTo('/notes?page=1')"
    >
      Start noting now
    </button>
  </div>
</template>
