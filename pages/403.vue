<!-- pages/login.vue -->
<!-- eslint-disable -->

<template>
  <div class="login-page w-full h-full bg-white">

      <div class="w-full h-screen flex items-center justify-center">
          <div class="h-fit w-96 bg-[#F7F7F8] rounded-2xl p-6 flex flex-col gap-y-10 pb-10">
                <div><h1 class="w-full flex items-center justify-center text-xl text-red-500 mt-6  text-center">You do not have sufficient rights to visit this page</h1></div>
                <div>
                    <NuxtLink to="/booking/all" ><button type="submit" class="flex items-center justify-center gap-3  w-full h-12 rounded-xl  bg-[#1F0B31] text-white font-medium cursor-pointer">
                        <span>Go to Renting</span>
                    </button></NuxtLink>
                        <NuxtLink to="/garage/all" ><button type="submit" class="flex items-center justify-center gap-3 mt-5 w-full h-12 rounded-xl  bg-[#1F0B31] text-white font-medium cursor-pointer">
                        <span>Go to Garage</span>
                    </button></NuxtLink>
                </div>
          </div>
      </div>

  </div>
</template>

<script setup>

</script>
