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
                <table  class="min-w-full bg-white divide-y divide-gray-200">
                  <!-- Заголовок -->
                  <thead class="bg-gray-50">
                    <tr>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                      <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">BIKE</th>
                      <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">LOCATION</th>
                    </tr>
                  </thead>

                  <!-- Тело таблицы -->
                  <tbody class="bg-white divide-y divide-gray-200">
                    <!-- Пример строки, можно генерировать в цикле -->
                    <tr v-for="(item, idx) in items" :key="item.id" class="hover:bg-gray-100">
                        <td class="cursor-pointer px-4 py-3 whitespace-nowrap text-sm text-gray-400"><NuxtLink  @click="loading = true" :to="`/booking/${item.id}`">{{item.id}}</NuxtLink></td>
                        <td class="cursor-pointer px-4 py-3 whitespace-nowrap text-sm text-gray-900"><NuxtLink  @click="loading = true" :to="`/booking/${item.id}`">{{item.garage.name}}</NuxtLink></td>
                        <td class="cursor-pointer px-4 py-3 whitespace-nowrap text-sm text-gray-500"><NuxtLink  @click="loading = true" :to="`/booking/${item.id}`">{{item.location}}</NuxtLink></td>
                    </tr>
                  </tbody>
                </table>
                <p v-if="pending" class="mt-4 text-gray-500">Загрузка...</p>
                    <p v-if="error" class="mt-4 text-red-500">Ошибка: {{ error.message }}</p>
            </section>

            <!-- НАВИГАЦИЯ -->
            <section class="mt-auto">
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
const { data, pending, error, refresh } = await useFetch(`${config.public.apiBase}/api/booking/pratamnuk`, {
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



definePageMeta({
  middleware: 'auth',
  requiredRole:  ['STAFF','ADMIN', 'SUPERADMIN'],
})

</script>
