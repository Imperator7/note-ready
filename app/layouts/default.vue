<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-sky-900 text-white h-16 flex items-center p-4">
      <div class="flex justify-between w-full">
        <h1 class="font-medium text-2xl">Note ready</h1>
        <div class="flex gap-4">
          <button
            class="font-medium text-black rounded px-4 py-2 bg-white cursor-pointer"
          >
            Log in
          </button>
          <button
            class="font-medium text-black rounded px-4 py-2 bg-green-400 cursor-pointer"
          >
            Sign up
          </button>
        </div>
      </div>
    </header>
    <main class="flex-1">
      <slot />
    </main>
    <footer>
      <div
        class="bg-sky-900 p-2 text-white font-medium flex justify-center flex-col items-center"
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
