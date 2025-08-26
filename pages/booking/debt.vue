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
                <!-- ТАБЛИЦА ГЛАВНАЯ -->
                <table  class="min-w-full bg-white divide-y divide-gray-200 mb-20">
                  <!-- Заголовок -->
                  <thead class="bg-gray-50">
                    <tr>
                        <!-- <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th> -->
                        <!-- <th class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th> -->
                      <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">BIKE and NAME</th>
                      <!-- <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Rental</th> -->
                      <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Overdue</th>
                      <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Debt <span class="text-red-500">{{amountDebt}}฿</span></th>
                      <!-- <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Debt Comment</th> -->
                    </tr>
                  </thead>

                  <!-- Тело таблицы -->
                  <tbody class="bg-white divide-y divide-gray-200">
                    <!-- Пример строки, можно генерировать в цикле -->
                    <tr v-for="(item, idx) in items" :key="item.id" class="hover:bg-gray-100">
                        <!-- <td class="cursor-pointer px-4 py-3 whitespace-nowrap text-sm text-gray-400"><NuxtLink  :to="`/booking/${item.id}`">{{item.id}}</NuxtLink></td> -->
                        <!-- <td class="cursor-pointer px-2 py-3 whitespace-nowrap text-sm text-gray-900"><NuxtLink   :to="`/garage/${item.id}`"><img class="w-8 h-8 rounded" :src="item.garage.photoUrl" alt="" /></NuxtLink></td> -->
                        <td class="cursor-pointer px-4 py-3 whitespace-nowrap text-sm text-gray-900"><NuxtLink  :to="`/booking/${item.id}`"><span class="font-bold">{{item.garage.name}}</span><br>{{ truncateText(item.client.name,18)}}</NuxtLink></td>
                        <!-- <td  class="cursor-pointer px-4 py-3 whitespace-nowrap text-sm "><NuxtLink  :to="`/booking/${item.id}`">{{new Date(item.startRental).toLocaleDateString('ru-RU')}}</NuxtLink></td> -->
                        <td class="cursor-pointer px-4 py-3 whitespace-nowrap text-sm text-gray-500"><NuxtLink  :to="`/booking/${item.id}`">

                            <span class="flex w-fit gap-2 items-center  border px-2 py-1 border-gray-200 rounded-md">
                                <!-- <svg v-show="item.photoContract" viewBox="0 0 24 24"   xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="size-4 text-success-base text-green-500"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM17.4571 9.45711L11 15.9142L6.79289 11.7071L8.20711 10.2929L11 13.0858L16.0429 8.04289L17.4571 9.45711Z"></path></svg> -->
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor"  class="text-gray-400" d="M5 22q-.825 0-1.412-.587T3 20V6q0-.825.588-1.412T5 4h1V3q0-.425.288-.712T7 2t.713.288T8 3v1h8V3q0-.425.288-.712T17 2t.713.288T18 3v1h1q.825 0 1.413.588T21 6v4.675q0 .425-.288.713t-.712.287t-.712-.288t-.288-.712V10H5v10h5.8q.425 0 .713.288T11.8 21t-.288.713T10.8 22zm13 1q-2.075 0-3.537-1.463T13 18t1.463-3.537T18 13t3.538 1.463T23 18t-1.463 3.538T18 23m.5-5.2v-2.3q0-.2-.15-.35T18 15t-.35.15t-.15.35v2.275q0 .2.075.388t.225.337l1.525 1.525q.15.15.35.15t.35-.15t.15-.35t-.15-.35z"/></svg>
                                <span  class=" text-stone-600"> {{ daysUntilEnd(item.startRental)}}</span>
                            </span>

                            <!-- <span  class="text-red-600">{{ daysUntilEnd(item.startRental) }}</span> -->
                        </NuxtLink></td>


                        <td class="cursor-pointer px-4 py-3 whitespace-nowrap text-sm text-gray-500"><NuxtLink  :to="`/booking/${item.id}`">

                            <span v-if="item.debt > 0" class="text-red-600">{{ item.debt }} ฿</span><span v-if="item.debt === 0 ||item.debt === null" class="text-green-600">Clear</span>
                        </NuxtLink></td>


                        <!-- <td class="cursor-pointer px-4 py-3 whitespace-normal break-words text-sm text-gray-500"><NuxtLink  :to="`/booking/${item.id}`"><span v-if="item.debt > 0" class="text-red-600">{{ item.debtNote }}</span></NuxtLink></td> -->
                    </tr>
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
                     <span>{{params.page}} из {{totalPages}}</span>
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
const { data, pending, error, refresh } = useFetch(`${config.public.apiBase}/api/booking/debt`, {
  params,
  credentials: 'include',
    suspense: false
})

// ФУНКЦИЯ ПОИСКА
function onSearch() {
  params.page = 1
  params.q    = searchTerm.value.trim()
  refresh()
}

// СТРАНИЦА НАЗАД
function prevPage() {
  if(params.page>1) params.page--
}
// СТРАНИЦА ВПЕРЕД
function nextPage() {
  if (params.page < totalPages.value) params.page++
}

const items = computed(() => data.value?.data || [])
const totalPages = computed(() => data.value?.meta?.last_page || 1)
const amountDebt = computed (() => items.value.reduce((acc, item) => acc + Number(item.debt), 0))
// console.log(amountDebt.value)
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



router.beforeEach((to, from, next) => {
  loading.value = true
  next()
})
// router.afterEach(() => {
//   loading.value = false
// })
function truncateText(text, maxLength = 20) {
  if (!text) return ''
  return text.length > maxLength ? text.slice(0, maxLength) + '…' : text
}

definePageMeta({
  middleware: 'auth',
  requiredRole:  ['STAFF','ADMIN', 'SUPERADMIN'],
})
</script>
