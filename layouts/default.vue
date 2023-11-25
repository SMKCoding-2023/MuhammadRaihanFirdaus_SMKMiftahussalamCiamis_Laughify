<template>
  <Head>
    <Meta name="description" content="Laughify - Meme Community" />
  </Head>
  <div class="drawer">
    <!-- ? DaisyUI drawer toggle -->
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />

    <div class="drawer-content">
      <Navbar />
      <div class="max-w-4xl mx-auto pt-16">
        <slot />
      </div>
    </div>
    <Drawer />
  </div>
</template>
