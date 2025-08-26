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

                <form autocomplete="off" @submit.prevent="onSearch" class="flex space-x-2 items-center py-2 px-4 w-full ">
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



                <!-- ТАБЛИЦА ГЛАВНАЯ -->
                <table  class="min-w-full bg-white divide-y divide-gray-200 mb-20">
                  <!-- Заголовок -->
                  <thead class="bg-gray-50">
                    <tr>
                        <!-- <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th> -->
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">INFO</th>
                      <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End rental</th>

                    </tr>
                  </thead>

                  <!-- Тело таблицы -->
                  <tbody class="bg-white divide-y divide-gray-200">
                    <!-- Пример строки, можно генерировать в цикле -->
                    <tr v-for="(item, idx) in items" :key="item.id" class="hover:bg-gray-100">
                        <!-- <td class="cursor-pointer px-4 py-3 whitespace-nowrap text-sm text-gray-400"><NuxtLink  :to="`/booking/${item.id}`">{{item.id}}</NuxtLink></td> -->
                        <td class="cursor-pointer px-2 py-3 whitespace-nowrap text-sm text-gray-900"><NuxtLink   :to="`/garage/${item.id}`"><img class="w-8 h-8 rounded" :src="item.garage.photoUrl" alt="" /></NuxtLink></td>
                        <td class="cursor-pointer px-2 py-3 whitespace-nowrap text-sm text-gray-900"><NuxtLink :to="`/booking/${item.id}`"><span class="font-bold">{{item.garage.name}}</span> <br> <span class="text-gray-500">{{item.client.name}}</span></NuxtLink></td>
                        <td  class="cursor-pointer px-2 py-3 whitespace-nowrap text-sm "><NuxtLink :to="`/booking/${item.id}`"><span class="">{{new Date(item.endRental).toLocaleDateString('ru-RU')}}</span></NuxtLink></td>

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
//СПИНЕР ФОРМЫ
const loading = ref(false)

// ПАГИНАЦИЯ В ЗАПРОС
const searchTerm = ref('')
const params = reactive({
  page: 1,
  q: ''
})

// ЗАПРОС К БД
const { data, pending, error, refresh } = useFetch(`${config.public.apiBase}/api/booking/history`, {
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

// function formatDate(iso) {
//   return iso?.slice(0, 10) || ''
// }

// Решаем, какой класс вернуть
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


// function daysUntilEnd(isoDate) {
//   if (!isoDate) return NaN

//   // сегодняшняя граница дня
//   const today = new Date()
//   today.setHours(0, 0, 0, 0)

//   // граница дня у конечной даты
//   const end = new Date(isoDate)
//   end.setHours(0, 0, 0, 0)

//   // разница в миллисекундах
//   const diffMs = end.getTime() - today.getTime()

//   // переводим в дни
//   return diffMs / (1000 * 60 * 60 * 24)
// }
router.beforeEach((to, from, next) => {
  loading.value = true
  next()
})


definePageMeta({
  middleware: 'auth',
  requiredRole:  ['STAFF','ADMIN', 'SUPERADMIN'],
})

</script>
