<template>
<!-- eslint-disable -->

    <div class="flex flex-col w-screen h-screen bg-white">
        <Sidebar />
        <section class="flex flex-col h-screen w-screen ">
            <GarageHeader
            :loading="pending"/>
            <!-- КОНТЕНТ -->
            <section class="overflow-y-auto ">
                <table class="min-w-full bg-white divide-y divide-gray-200 mb-20">
                  <!-- Заголовок -->
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                      <th class="px-0 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NAME</th>
                      <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <!-- <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comment</th> -->
                    </tr>
                  </thead>

                  <!-- Тело таблицы -->
                  <tbody class="bg-white divide-y divide-gray-200">
                    <!-- Пример строки, можно генерировать в цикле -->
                    <tr v-for="(item, idx) in items" :key="item.id" class="hover:bg-gray-100">
                        <td class="cursor-pointer px-2 py-3 whitespace-nowrap text-sm text-gray-900"><NuxtLink   :to="`/garage/${item.id}`"><img class="w-8 h-8 rounded" :src="item.photoUrl" alt="" /></NuxtLink></td>
                      <td class="cursor-pointer px-0 py-3 whitespace-nowrap text-sm text-gray-900"><NuxtLink   :to="`/garage/${item.id}`"><span class="font-bold">{{item.name}}</span></NuxtLink></td>
                      <td class="cursor-pointer px-4 py-3 whitespace-nowrap text-sm text-gray-500"><NuxtLink   :to="`/garage/${item.id}`"><p class="flex justify-center text-xs w-fit px-2" :class="item.service[0].inService ? 'bg-indigo-100 text-indigo-600 p-1 rounded-md' : ''" > {{ item.service[0].inService ? 'Fixing' : 'Closed' }} </p></NuxtLink></td>
                      <!-- <td class="cursor-pointer px-4 py-3 whitespace-nowrap text-sm text-gray-500"><NuxtLink   :to="`/garage/${item.id}`">{{item.service[0].note}}</NuxtLink></td> -->
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
import {reactive, computed} from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const loading = ref(false)
const config = useRuntimeConfig()



const params = reactive({
  page: 1,
  q: ''
})


const { data, pending, error } = await useFetch(`${config.public.apiBase}/api/garage/service`,{params, credentials: 'include'})

function prevPage() {
  if(params.page>1) params.page--
}

function nextPage() {
  if (params.page < totalPages.value) params.page++
}

const items = computed(() => data.value?.data || [])
const totalPages = computed(() => data.value?.meta?.last_page || 1)
// console.log(items.value.id)

router.beforeEach((to, from, next) => {
  loading.value = true
  next()
})


definePageMeta({
  middleware: 'auth',
  requiredRole:  ['STAFF', 'MECHANIC', 'ADMIN', 'SUPERADMIN'],
})
</script>
