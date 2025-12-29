<script setup lang="ts">
const { user, loggedIn, clear } = useUserSession()

const handleLogOut = () => {
  clear()
  navigateTo('/auth/login')
}

const name = user.value?.name ?? 'user'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-sky-900 text-white h-16 flex items-center p-4">
      <div class="flex justify-between w-full">
        <NuxtLink to="/" class="font-medium text-2xl">Note Easy</NuxtLink>
        <div v-show="!loggedIn" class="flex gap-4">
          <NuxtLink
            class="font-medium text-black rounded px-2 py-2 bg-white cursor-pointer"
            to="/auth/login"
          >
            Log in
          </NuxtLink>
          <NuxtLink
            class="font-medium text-black rounded px-2 py-2 bg-green-600 cursor-pointer pointer-events-none"
            to="/auth/register"
          >
            Sign up
          </NuxtLink>
        </div>
        <div v-show="loggedIn" class="flex items-baseline gap-2">
          <p class="font-semibold">hey, {{ name }}!</p>
          <button
            class="font-medium text-black rounded px-2 py-2 bg-green-400 cursor-pointer"
            @click="handleLogOut"
          >
            Log out
          </button>
        </div>
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
