<!-- eslint-disable -->

<template>

    <div class="flex flex-col w-screen h-screen bg-white">
        <Sidebar />
        <section class="flex flex-col h-screen w-screen ">
            <BookingHeader
              v-model="searchTerm"
              @search="onSearch"
              :loading="pending ||loading"
            />
            <!-- КОНТЕНТ СО СКРОЛЛОМ-->
            <section class="overflow-y-auto ">
                <!-- <table  class="min-w-full bg-white divide-y divide-gray-200 mb-20">
                  <thead class="bg-gray-50">
                    <tr>
                        <th class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                        <th class="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Info</th>
                        <th class="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>

                  <tbody class="bg-white divide-y divide-x-2 divide-gray-200">
                    <tr v-for="(item, idx) in items" :key="item.id" class="hover:bg-gray-100">
                        <td class="cursor-pointer px-2 py-3 whitespace-nowrap text-sm text-gray-900"><NuxtLink   :to="`/garage/${item.id}`"><img class="w-8 h-8 rounded" :src="item.garage.photoUrl" alt="" /></NuxtLink></td>
                        <td class="cursor-pointer px-1 py-3 whitespace-nowrap text-sm text-gray-900"><NuxtLink  :to="`/booking/${item.id}`">{{item.location}}<br><span class="font-bold">{{item.garage.name}}</span><br> {{item.client.name}} / <span>{{ Math.round(daysUntilEnd(item.endRental)+ 1) }}</span></NuxtLink></td>
                        <td class="cursor-pointer px-1 py-3 whitespace-normal break-words text-sm"><NuxtLink  :to="`/booking/${item.id}`"><span class="font-bold text-xl sm:text-base">{{new Date(item.endRental).toLocaleDateString('ru-RU')}}</span></NuxtLink></td>
                    </tr>
                  </tbody>
                </table> -->



                <form autocomplete="off" @submit.prevent="onSearch" class="flex space-x-2 items-center  py-2 px-4 w-full ">
                    <div class="flex gap-2 h-full w-full sm:w-96">
                    <div class="h-full w-full">
                    <input
                      v-model="searchTerm"
                      id="search-input"
                      name="q"
                      type="text"
                      placeholder="Bike or Car name..."
                      class="h-10 p-2 px-4 border border-gray-200 rounded-xl w-full "/>
                  </div>
                  <button type="submit" class="bg-gray-100 h-10 w-22 rounded-xl hover:bg-gray-200">
                      <span class="flex items-center justify-center">
                          <div v-if="pending" class="h-6 w-6 border-4 border-gray-200 border-t-gray-500 rounded-full animate-spin" role="status" aria-label="Loading"></div>
                      </span>
                      <span v-if="!pending">GO</span>
                  </button>
                    </div>
                </form>


                <table class="min-w-full mb-20">

                  <tbody>
                    <!-- пробегаем по группам -->
                    <template v-for="group in groupsByDate" :key="group.date">
                      <!-- заголовок-группа -->
                      <tr class="bg-gray-100">
                          <td  colspan="4" class="px-4 py-2 font-bold"  :class="getDateClass(group.date)">{{ new Date(group.date).toLocaleDateString('ru-RU') }}<span class="text-gray-400 font-normal">[{{ group.items.length }}]</span></td>
                      </tr>
                      <!-- сами записи этой даты <span v-if="item.debt > 0" class="text-red-600">{{ item.debt }} ฿</span><span v-if="item.debt <= 0 ||item.debt === null" class="text-green-600">Clear</span>-->
                      <tr v-for="item in group.items" :key="item.id" class="hover:bg-gray-50" >
                        <td class="px-2 py-3 whitespace-nowrap text-sm text-gray-900"> <NuxtLink :to="`/booking/${item.id}`"> <img class="w-8 h-8 rounded" :src="item.garage.photoUrl" /> </NuxtLink> </td>
                        <td class="px-1 py-3 whitespace-nowrap text-sm text-gray-900"><NuxtLink :to="`/booking/${item.id}`">{{ item.location }}<br><span class="font-bold">{{ item.garage.name }}</span><br>{{ item.client.name }} / {{ Math.round(daysUntilEnd(item.endRental) + 1) }}</NuxtLink></td>
                        <td class="px-1 py-3 whitespace-nowrap text-sm text-gray-900 "><NuxtLink :to="`/booking/${item.id}`">
                            <span class="flex w-fit gap-2 items-center  border px-2 py-1 border-gray-200 rounded-md">
                                <svg v-show="item.debt <= 0" viewBox="0 0 24 24"  :class="item.debt <= 0 ? 'text-green-500'  : ''" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="size-4 text-success-base"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM17.4571 9.45711L11 15.9142L6.79289 11.7071L8.20711 10.2929L11 13.0858L16.0429 8.04289L17.4571 9.45711Z"></path></svg>
                                <svg v-show="item.debt > 0" viewBox="0 0 24 24"   :class="item.debt > 0 ? 'text-red-500'  : ''"xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class=" size-4 shrink-0 text-error-base"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z"></path></svg>
                                <span v-show="item.debt <= 0" class=" text-stone-600">Clear</span>
                                <span v-show="item.debt > 0" class=" text-stone-600">Debt</span>
                            </span></NuxtLink></td>
                        <td class="hidden sm:block cursor-pointer px-2 py-3 whitespace-normal break-words text-xs text-gray-500">
                          <NuxtLink :to="`/booking/${item.id}`">{{ item.note }}</NuxtLink>
                        </td>
                      </tr>
                    </template>
                  </tbody>
                </table>




                <p v-if="pending" class="mt-4 text-gray-500">Загрузка...</p>
                    <p v-if="error" class="mt-4 text-red-500">Ошибка: {{ error.message }}</p>
            </section>

            <!-- НАВИГАЦИЯ -->
            <section class="pb-3 fixed bottom-0 z-20 bg-white w-full border-t border-gray-200">
                <!-- Навигация постранично -->
                   <nav class="flex items-center mt-4 space-x-1">
                     <button @click="prevPage" class=" cursor-pointer px-4 py-2 bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200">
                       Previous
                     </button>

                     <button @click="nextPage" class=" cursor-pointer px-4 py-2 bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200" >
                       Next
                     </button>
                     <!-- <span>{{params.page}} из {{totalPages}}</span> -->
                   </nav>
            </section>


        </section>
    </div>
</template>





<script setup>
import Sidebar from '~/components/Sidebar.vue';
import BookingHeader from '~/components/BookingHeader.vue';
import {ref, reactive, computed} from 'vue'
import { useRouter } from 'vue-router'


const router = useRouter()
const config = useRuntimeConfig()
const loading = ref(false)
const searchTerm = ref('')
const params = reactive({
  page: 1,
  q: ''
})

// ЗАПРОС К БД
const { data, pending, error, refresh } = useFetch(`${config.public.apiBase}/api/booking/endtoday`, {
  params,
  credentials: 'include',
    suspense: false
})

// ФУНКЦИЯ ПОИСКА
function onSearch() {
  params.page = 1
  params.q    = searchTerm.value.trim()
  router.replace({ query: { q: params.q, search: params.search, page: String(params.page) } })
    refresh()
}


function prevPage() {
  if (params.page > 1) {
    params.page--;
    refresh();
  }
}
function nextPage() {
  if (params.page < totalPages.value) {
    params.page++;
    refresh();
  }
}



// // СТРАНИЦА НАЗАД
// function prevPage() {
//   if(params.page>1) params.page--
// }
// // СТРАНИЦА ВПЕРЕД
// function nextPage() {
//   if (params.page < totalPages.value) params.page++
// }

// const items = computed(() => data.value?.data || [])
const items = computed(() => data.value?.data || []);
// const items = computed(() => {
//   const seen = new Set()
//   return (data.value?.data || []).filter(item => {
//     if (seen.has(item.id)) return false
//     seen.add(item.id)
//     return true
//   })
// })

const totalPages = computed(() => data.value?.meta?.last_page || 1)











function formatDateKey(isoDate) {
  const fmt = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Bangkok', year: 'numeric', month: '2-digit', day: '2-digit'
  })
  return fmt.format(new Date(isoDate))          // YYYY-MM-DD под Asia/Bangkok
}

const groupsByDate = computed(() => {
  // стабильная сортировка как на бэке
  const sorted = [...items.value].sort((a, b) => {
    const aEnd = new Date(a.endRental).getTime()
    const bEnd = new Date(b.endRental).getTime()
    if (aEnd !== bEnd) return aEnd - bEnd
    return a.id - b.id
  })

  const map = new Map()
  const seenInGroup = new Set() // защита от случайных дублей по id

  for (const item of sorted) {
    const key = formatDateKey(item.endRental)
    if (!map.has(key)) map.set(key, [])
    if (seenInGroup.has(item.id)) continue
    seenInGroup.add(item.id)
    map.get(key).push(item)
  }

  return Array.from(map, ([date, items]) => ({ date, items }))
})




// function formatDateKey(isoDate) {
//   const d = new Date(isoDate)
//   // Берём локальное время, а не UTC
//   const year  = d.getFullYear()
//   const month = String(d.getMonth() + 1).padStart(2, '0')
//   const day   = String(d.getDate()).padStart(2, '0')
//   return `${year}-${month}-${day}`
// }

// const groupsByDate = computed(() => {
//   const sorted = [...items.value].sort(
//     (a, b) => new Date(a.endRental) - new Date(b.endRental)
//   )

//   const map = new Map()
//   for (const item of sorted) {
//     const key = formatDateKey(item.endRental) // теперь без UTC-сдвига
//     if (!map.has(key)) map.set(key, [])
//     map.get(key).push(item)
//   }

//   return Array.from(map, ([date, items]) => ({ date, items }))
// })






// const groupsByDate = computed(() => {
//   // 1) Склонировали items в новый массив и отсортировали его
//   const sorted = [...items.value].sort(
//     (a, b) => new Date(a.endRental) - new Date(b.endRental)
//   )

//   // 2) Группируем отсортированный массив
//   const map = new Map()
//   for (const item of sorted) {
//     const dateKey = new Date(item.endRental).toLocaleDateString('ru-RU')
//     if (!map.has(dateKey)) map.set(dateKey, [])
//     map.get(dateKey).push(item)
//   }

//   // 3) Превращаем Map в массив групп
//   return Array.from(map, ([date, items]) => ({ date, items }))
// })
// function formatDate(iso) {
//   return iso?.slice(0, 10) || ''
// }

// // Решаем, какой класс вернуть
// function getDateClass(iso) {
//   if (!iso) return ''

//   const today = new Date()
//   today.setHours(0,0,0,0)

//   const d = new Date(iso)
//   d.setHours(0,0,0,0)

//   const diff = (d - today) / (1000*60*60*24)

//   if (diff === 0) return 'text-red-600'     // сегодня
//   if (diff === 1) return 'text-orange-400'  // завтра

//   return ''                                 // все остальные
// }


function daysUntilEnd(isoDate) {
  if (!isoDate) return NaN

  // сегодняшняя граница дня
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // граница дня у конечной даты
  const end = new Date(isoDate)
  end.setHours(0, 0, 0, 0)

  // разница в миллисекундах
  const diffMs = end.getTime() - today.getTime()

  // переводим в дни
  return diffMs / (1000 * 60 * 60 * 24)
}

function getDateClass(iso) {
  if (!iso) return 'text-black'

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // iso у тебя в виде '2025-08-20'
  const d = new Date(iso)
  d.setHours(0, 0, 0, 0)

  const diff = (d - today) / (1000 * 60 * 60 * 24)

  if (diff === 0) return 'text-green-600'   // сегодня
  return 'text-black'
}


router.beforeEach((to, from, next) => {
  loading.value = true
  next()
})
// router.afterEach(() => {
//   loading.value = false
// })

onMounted(() => {
  const { q, page } = useRoute().query
  if (q) {
    searchTerm.value   = String(q)
    params.page        = Number(page) || 1
    params.q           = searchTerm.value
    refresh()
  }
})

definePageMeta({
  middleware: 'auth',
  requiredRole:  ['STAFF','ADMIN', 'SUPERADMIN'],
})
</script>
