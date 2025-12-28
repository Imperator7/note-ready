<script setup lang="ts"></script>

<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-sky-900 text-white h-16 flex items-center p-4">
      <div class="flex justify-between w-full">
        <NuxtLink to="/" class="font-medium text-2xl">Note Easy</NuxtLink>
      </div>
    </header>
    <main class="flex-1 flex flex-col">
      <slot />
    </main>
    <footer>
      <div
        class="bg-sky-900 pt-4 pb-8 text-white font-medium flex justify-center flex-col items-center"
      >
        <p>Developed by Rungroj Rungsaranon.</p>
        <p>
          see more projects at
          <NuxtLink
            to="https://rungroj-portfolio.vercel.app/"
            target="_blank"
            class="text-amber-400 hover:underline"
          >
            my portfolio <Icon name="gridicons:external" />
          </NuxtLink>
        </p>
      </div>
    </footer>
  </div>
</template>
