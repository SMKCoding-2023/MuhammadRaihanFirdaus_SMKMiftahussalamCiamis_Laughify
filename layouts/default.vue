<template>
  <Head>
    <Meta name="description" content="Laughify - Meme Community" />
  </Head>
  <div class="drawer">
    <!-- ? DaisyUI drawer toggle -->
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />

    <div class="drawer-content">
      <Navbar />
      <div class="max-w-4xl mx-auto pt-16 flex">
        <main class="w-full min-h-[calc(100vh-64px)] block md:ml-60 overflow-hidden py-8 px-12">
          <slot />
        </main>
        <div class="sidebar hidden md:block overflow-auto fixed h-[calc(100vh-64px)]">
          <Sidebar />
        </div>
      </div>
    </div>
    <Drawer />
  </div>
</template>

<style scoped>
.sidebar::-webkit-scrollbar {
  display: none;
}
.sidebar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
