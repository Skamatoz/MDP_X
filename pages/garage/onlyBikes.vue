<template>
<!-- eslint-disable -->

    <div class="flex flex-col w-screen h-screen bg-white">
        <Sidebar />
        <section class="flex flex-col h-screen w-screen ">
            <GarageHeader
            :loading="pending"/>
            <!-- КОНТЕНТ -->
            <section class="overflow-y-auto ">

                <form autocomplete="off" @submit.prevent="onSearch" class="flex space-x-2 items-center  py-2 px-4 w-full ">
                    <div class="flex gap-2 h-full w-full sm:w-96">
                    <div class="h-full w-full">
                    <input
                      v-model="searchTerm"
                      id="search-input"
                      name="q"
                      type="text"
                      placeholder="Bike or Car name..."
                      class="p-2 px-4 border border-gray-200 rounded-xl w-full "/>
                  </div>
                  <button type="submit" class="bg-gray-100 h-11 w-22 rounded-xl hover:bg-gray-200">
                      <span class="flex items-center justify-center">
                          <div v-if="pending" class="h-6 w-6 border-4 border-gray-200 border-t-gray-500 rounded-full animate-spin" role="status" aria-label="Loading"></div>
                      </span>
                      <span v-if="!pending">GO</span>
                  </button>
                    </div>
                </form>


                <table class="min-w-full bg-white divide-y divide-gray-200 mb-20">
                  <!-- Заголовок -->
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                      <th class="px-0 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NAME</th>
                      <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PRIORITY</th>
                      <!-- <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Дата</th> -->
                    </tr>
                  </thead>

                  <!-- Тело таблицы -->
                  <tbody class="bg-white divide-y divide-gray-200">
                    <!-- Пример строки, можно генерировать в цикле -->
                    <tr v-for="(item) in items" :key="item.id" class="hover:bg-gray-100">
                        <td class="cursor-pointer px-2 py-3 whitespace-nowrap text-sm text-gray-900"><NuxtLink   :to="`/garage/${item.id}`"><img class="w-8 h-8 rounded" :src="item.photoUrl" alt="" /></NuxtLink></td>
                      <td class="cursor-pointer px-0 py-3 whitespace-nowrap text-sm text-gray-900"><NuxtLink   :to="`/garage/${item.id}`"><span class="font-bold">{{item.name}}</span></NuxtLink></td>
                      <td class="cursor-pointer px-4 py-3 whitespace-nowrap text-xs text-gray-500"><NuxtLink   :to="`/garage/${item.id}`">
                          <span v-show="item.priority === 'PRIORITY_1'" class="bg-orange-100 text-orange-600 p-1 rounded-md">PRIORITY 1</span>
                          <span v-show="item.priority === 'PRIORITY_2'" class="bg-purple-100 text-purple-600 p-1 rounded-md">PRIORITY 2</span>
                          <span v-show="item.priority === 'EMPTY'" class="bg-gray-100 text-gray-600 p-1 rounded-md">{{item.priority}}</span>

                      </NuxtLink></td>                      <!-- <td class="cursor-pointer px-4 py-3 whitespace-nowrap text-sm text-gray-500"><NuxtLink   :to="`/garage/${item.id}`">{{item.location}}</NuxtLink></td> -->
                    </tr>
                  </tbody>
                </table>
                <p v-if="pending" class="mt-4 text-gray-500">Загрузка...</p>
                    <p v-if="error" class="mt-4 text-red-500">Ошибка: {{ error.message }}</p>
            </section>

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
import GarageHeader from '~/components/GarageHeader.vue';
import { reactive, computed} from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const loading = ref(false)
const config = useRuntimeConfig()
const searchTerm = ref('')

const params = reactive({
  page: 1,
  q: ''
})


const { data, pending, error,refresh } = await useFetch(`${config.public.apiBase}/api/garage/onlybikes`, {
  params, credentials: 'include'
})

function prevPage() {
  if(params.page>1) params.page--
}

function nextPage() {
  if (params.page < totalPages.value) params.page++
}

function onSearch() {
  params.page = 1
  params.q    = searchTerm.value.trim()
  router.replace({ query: { q: params.q, search: params.search, page: String(params.page) } })
    refresh()
}

const items = computed(() => data.value?.data || [])
const totalPages = computed(() => data.value?.meta?.last_page || 1)

router.beforeEach((to, from, next) => {
  loading.value = true
  next()
})

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
  requiredRole:  ['STAFF', 'MECHANIC', 'ADMIN', 'SUPERADMIN'],
})
</script>
