<!-- eslint-disable -->
<template>


    <section class="w-full bg-white">
        <!-- Меню десктоп -->
        <div class="flex sm:justify-between items-center border-b border-gray-100 bg-black">
            <div class="px-4 py-4  hidden sm:flex">
                <ul class="flex space-x-1">
                    <li v-if="role!=='MECHANIC'">
                         <NuxtLink to="/booking/all" ><a href="#" :class="[ activeSection==='booking' ? ' text-gray-900 bg-orange-300' : '' ]"  class="block rounded-lg px-2  py-3 text-sm font-medium text-gray-500 hover:bg-gray-200 hover:text-gray-700" >Renting</a></NuxtLink>
                    </li>

                    <li>
                        <NuxtLink to="/garage/all" ><a href="#" :class="[ activeSection==='garage' ? ' text-gray-900 bg-orange-300' : '' ]" class="block rounded-lg px-2  py-3 text-sm font-medium text-gray-500 hover:bg-gray-200 hover:text-gray-700" >Garage</a></NuxtLink>
                    </li>

                    <li v-if="role!=='MECHANIC'">
                        <NuxtLink to="/client/all" ><a href="#" :class="[ activeSection==='client' ? ' text-gray-900 bg-orange-300' : '' ]" class="block rounded-lg px-2  py-3 text-sm font-medium text-gray-500 hover:bg-gray-200 hover:text-gray-700" >Client</a></NuxtLink>
                    </li>

                    <li>
                        <NuxtLink to="/prebook/all" ><a href="#" :class="[ activeSection==='prebook' ? ' text-gray-900 bg-orange-300' : '' ]" class="block rounded-lg px-2  py-3 text-sm font-medium text-gray-500 hover:bg-gray-200 hover:text-gray-700" >Booking</a></NuxtLink>
                    </li>

                    <li v-if="role!=='STAFF'">
                        <NuxtLink to="/service/all" ><a href="#" :class="[ activeSection==='service' ? ' text-gray-900 bg-orange-300' : '' ]" class="block rounded-lg px-2  py-3 text-sm font-medium text-gray-500 hover:bg-gray-200 hover:text-gray-700" >Service</a></NuxtLink>
                    </li>

                    <!-- <li v-if="role!=='MECHANIC' && role!=='STAFF'">
                        <NuxtLink to="/partner/all" ><a href="#" :class="[ activeSection==='partner' ? ' text-gray-900 bg-gray-300' : '' ]" class="block rounded-lg px-2  py-3 text-sm font-medium text-gray-500 hover:bg-gray-200 hover:text-gray-700" >Partner</a></NuxtLink>
                    </li> -->

                    <li v-if="role!=='MECHANIC' && role!=='STAFF'">
                         <NuxtLink to="/dashboard" ><a href="#"  :class="[ activeSection==='dashboard' ? ' text-gray-900 bg-orange-300' : '' ]"class="block rounded-lg px-2 md:px-4 py-3 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700" >Dashboard</a></NuxtLink>
                    </li>

                </ul>
            </div>

            <div class="items-center justify-center gap-4 border-gray-100 px-5 hidden sm:flex">
                <p class="text-xs ">
                    <strong class="block font-medium">{{name}}</strong>
                    <span> {{email}} </span>
                </p>
                <button
                @click="logout"
                class="flex items-center justify-center gap-3 px-3 w-22 h-10 rounded-xl text-xs bg-[#1F0B31] text-white font-medium cursor-pointer"> Log out</button>
            </div>
        </div>

        <!-- МЕНЮ  мобилка-->
        <div class="flex sm:hidden items-center gap-1 h-11 my-1">

            <!-- Меню мобилка -->
            <div class="  bg-white">
                <button @touchstart="" @click="goBack" class="bg-gray-100 border-gray-400 h-fit w-fit rounded-xl cursor-pointer flex flex-col p-2 px-3 pr-4 gap-[6px] active:bg-gray-300 active:scale-85 transition duration-300 ease-in-out">
                    <!-- <div class="w-6 border-1 border-gray-400"></div>
                    <div class="w-6 border-1 border-gray-400"></div>
                    <div class="w-6 border-1 border-gray-400"></div> -->
                    <svg  xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path class="text-gray-400" fill="currentColor" d="M16 22L6 12L16 2l1.775 1.775L9.55 12l8.225 8.225z"/></svg>
                </button>

                <div v-show="showMenu" class="p-4 right-0 top-0 bg-white w-72 h-fit absolute rounded-xl z-10 mt-13 mr-2 transition-opacity duration-300 ease-in-out shadow-2xl ">
                    <ul class="flex flex-col space-y-1">
                        <li v-if="role!=='MECHANIC'">
                            <NuxtLink @click="showMenuF" to="/booking/all" ><a href="#" :class="[ activeSection==='booking' ? ' text-gray-900 bg-gray-300' : '' ]"  class="block rounded-lg px-2 md:px-4  py-3 text-sm font-medium text-gray-500 hover:bg-gray-200 hover:text-gray-700" >Renting</a></NuxtLink>
                        </li>

                        <li>
                            <NuxtLink @click="showMenuF" to="/garage/all" ><a href="#" :class="[ activeSection==='garage' ? ' text-gray-900 bg-gray-300' : '' ]" class="block rounded-lg px-2 md:px-4  py-3 text-sm font-medium text-gray-500 hover:bg-gray-200 hover:text-gray-700" >Garage</a></NuxtLink>
                        </li>

                        <li v-if="role!=='MECHANIC'">
                            <NuxtLink @click="showMenuF" to="/client/all" ><a href="#" :class="[ activeSection==='client' ? ' text-gray-900 bg-gray-300' : '' ]" class="block rounded-lg px-2 md:px-4  py-3 text-sm font-medium text-gray-500 hover:bg-gray-200 hover:text-gray-700" >Client</a></NuxtLink>
                        </li>

                        <li>
                            <NuxtLink @click="showMenuF"  to="/prebook/all" ><a href="#" :class="[ activeSection==='prebook' ? ' text-gray-900 bg-gray-300' : '' ]" class="block rounded-lg px-2 md:px-4  py-3 text-sm font-medium text-gray-500 hover:bg-gray-200 hover:text-gray-700" >Booking</a></NuxtLink>
                        </li>

                        <li>
                            <NuxtLink @click="showMenuF" to="/service/all" ><a href="#" :class="[ activeSection==='service' ? ' text-gray-900 bg-gray-300' : '' ]" class="block rounded-lg px-2 md:px-4  py-3 text-sm font-medium text-gray-500 hover:bg-gray-200 hover:text-gray-700" >Service</a></NuxtLink>
                        </li>

                        <!-- <li v-if="role!=='MECHANIC' && role!=='STAFF'">
                            <NuxtLink @click="showMenuF" to="/partner/all" ><a href="#" :class="[ activeSection==='partner' ? ' text-gray-900 bg-gray-300' : '' ]" class="block rounded-lg px-2 md:px-4  py-3 text-sm font-medium text-gray-500 hover:bg-gray-200 hover:text-gray-700" >Partner</a></NuxtLink>
                        </li> -->

                        <li v-if="role!=='MECHANIC' && role!=='STAFF'">
                             <NuxtLink @click="showMenuF" to="/dashboard" ><a href="#" :class="[ activeSection==='dashboard' ? ' text-gray-900 bg-gray-300' : '' ]" class="block rounded-lg px-2 md:px-4 py-3 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700" >Dashboard</a></NuxtLink>
                        </li>

                    </ul>

                    <div class="flex items-center justify-between gap-4 border-gray-100 p-2">
                        <p class="text-xs">
                            <strong class="block font-medium"
                                >{{name}}</strong>
                            <span> {{email}} </span>
                        </p>
                        <button
                        @click="logout"
                        class="flex items-center justify-center gap-3 px-3 w-22 h-10 rounded-xl text-xs bg-[#1F0B31] text-white font-medium cursor-pointer"> Log out</button>
                    </div>
                </div>
            </div>

            <!--  Динамический заголовок -->
            <div class="flex w-full h-full items-center bg-black rounded-xl">
                <div v-show="activeTab==='booking'" class="sm:hidden flex w-full">
                    <h1 class="flex w-full justify-center text-white">Renting</h1>
                    <!-- <span class="w-12"></span> -->
                </div>

                <div v-show="activeTab==='garage'" class="sm:hidden flex w-full">
                    <h1 class="flex w-full justify-center text-white">Garage</h1>
                    <!-- <span class="w-12"></span> -->
                </div>

                <div v-show="activeTab==='client'" class="sm:hidden flex w-full">
                    <h1 class="flex w-full justify-center text-white">Client</h1>
                    <!-- <span class="w-12"></span> -->
                </div>

                <div v-show="activeTab==='prebook'" class="sm:hidden flex w-full">
                    <h1 class="flex w-full justify-center text-white">Booking</h1>
                    <!-- <span class="w-12"></span> -->
                </div>

                <div v-show="activeTab==='service'" class="sm:hidden flex w-full">
                    <h1 class="flex w-full justify-center text-white">Service</h1>
                    <!-- <span class="w-12"></span> -->
                </div>

                <div v-show="activeTab==='partner'" class="sm:hidden flex w-full">
                    <h1 class="flex w-full justify-center text-white">Partner</h1>
                    <!-- <span class="w-12"></span> -->
                </div>
                <div v-show="activeTab==='dashboard'" class="sm:hidden flex w-full">
                    <h1 class="flex w-full justify-center text-white">Dashboard</h1>
                    <!-- <span class="w-12"></span> -->
                </div>
            </div>
            <button @click="showMenuF" class="flex flex-col items-center bg-gray-100 border-gray-400 h-full w-fit rounded-xl cursor-pointer p-4 py-3 gap-[6px]">
                <div class="w-6 border-1 border-gray-400"></div>
                <div class="w-6 border-1 border-gray-400"></div>
                <div class="w-6 border-1 border-gray-400"></div>
            </button>
        </div>
        <!-- <nav class="fixed inset-x-0 bottom-0 bg-white border-t border-gray-200 z-20 sm:hidden">
           <ul class="flex justify-around items-center h-12">
             <li class="flex-1 text-center"><NuxtLink to="/1" class="w-full h-full flex flex-col items-center justify-center text-xs text-gray-600 "><svg  xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path class="text-gray-400" fill="currentColor" d="M16 22L6 12L16 2l1.775 1.775L9.55 12l8.225 8.225z"/></svg></NuxtLink></li>
             <li class="flex-1 text-center"><NuxtLink to="/2" class="w-full h-full flex flex-col items-center justify-center text-xs text-gray-600 "><svg  xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path class="text-gray-400" fill="currentColor" d="M16 22L6 12L16 2l1.775 1.775L9.55 12l8.225 8.225z"/></svg></NuxtLink></li>
             <li class="flex-1 text-center"><NuxtLink to="/3" class="w-full h-full flex flex-col items-center justify-center text-xs text-gray-600 "><svg  xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path class="text-gray-400" fill="currentColor" d="M16 22L6 12L16 2l1.775 1.775L9.55 12l8.225 8.225z"/></svg></NuxtLink></li>
             <li class="flex-1 text-center"><NuxtLink to="/4" class="w-full h-full flex flex-col items-center justify-center text-xs text-gray-600 "><svg  xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path class="text-gray-400" fill="currentColor" d="M16 22L6 12L16 2l1.775 1.775L9.55 12l8.225 8.225z"/></svg></NuxtLink></li>
             <li class="flex-1 text-center"><NuxtLink to="/5" class="w-full h-full flex flex-col items-center justify-center text-xs text-gray-600 "><svg  xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path class="text-gray-400" fill="currentColor" d="M16 22L6 12L16 2l1.775 1.775L9.55 12l8.225 8.225z"/></svg></NuxtLink></li>
             <li class="flex-1 text-center"><NuxtLink to="/6" class="w-full h-full flex flex-col items-center justify-center text-xs text-gray-600 "><svg  xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path class="text-gray-400" fill="currentColor" d="M16 22L6 12L16 2l1.775 1.775L9.55 12l8.225 8.225z"/></svg></NuxtLink></li>
             <li class="flex-1 text-center"><NuxtLink to="/7" class="w-full h-full flex flex-col items-center justify-center text-xs text-gray-600 "><svg  xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path class="text-gray-400" fill="currentColor" d="M16 22L6 12L16 2l1.775 1.775L9.55 12l8.225 8.225z"/></svg></NuxtLink></li>
           </ul>
         </nav> -->
    </section>

</template>
<script setup>

import { useRoute, useRouter } from 'vue-router'
const config = useRuntimeConfig()
const email = localStorage.getItem('email')
const name = localStorage.getItem('userName')
const role = localStorage.getItem('role')
const id = localStorage.getItem('id')
const showMenu = ref(false)
function showMenuF(){
  showMenu.value = !showMenu.value
}
const router = useRouter()
const route = useRoute()

const activeTab = computed(() => {
  const segs = route.path.split('/')
  // если URL "/garage" — ставим 'all'
  return segs[1]
})

async function logout() {
  // 1) Сообщаем бэку, чтобы удалил cookie
  // await fetch(`${config.public.apiBase}/api/auth/logout`, {
  //   method: 'POST',
  //   credentials: 'include',
  //   headers: {'Content-Type': 'application/json'},
  //     body: JSON.stringify({ user: id })
  // })
  fetch(`${config.public.apiBase}/api/auth/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: id }),
      keepalive: true
    }).catch(err => console.error('Logout log failed:', err))

    localStorage.removeItem('role')
    localStorage.removeItem('email')
    localStorage.removeItem('userName')
    localStorage.removeItem('auth')

    router.push('/login')
}

const activeSection = computed(() => {
  const segs = route.path.split('/')
  return segs[1] || ''
})


function goBack() {
  // если есть вложенные состояния истории, уходим назад
  if (window.history.length > 1) {
    window.history.back()
  } else {
    // иначе можно явно редиректить на главную
    router.push('/')
  }
}
</script>
