<template>
  <div class="flex min-h-screen min-w-full flex-col">
    <header class="sticky mx-auto w-full bg-white shadow">
      <nav class="relative flex justify-center p-5">
        <h1 class="text-3xl font-bold text-primary">Pokedex</h1>
      </nav>
    </header>

    <main class="relative flex-1">
      <div class="absolute inset-0 mx-auto min-h-full min-w-full">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup></script>
