<template>
<!-- eslint-disable -->

    <div class="flex flex-col w-screen h-screen bg-white">
        <Sidebar />
        <section class="flex flex-col h-screen w-screen ">
            <ServiceHeader
              v-model="searchTerm"
              @search="onSearch"
              @add="onAdd"
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
                      <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NAME</th>
                      <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th class="hidden sm:block px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comment</th>


                    </tr>
                  </thead>

                  <!-- Тело таблицы -->
                  <tbody class="bg-white divide-y divide-gray-200">
                    <!-- Пример строки, можно генерировать в цикле -->
                    <tr v-for="(item) in items" :key="item.id" class="hover:bg-gray-100">
                        <!-- <td class="cursor-pointer px-4 py-3 whitespace-nowrap text-sm text-gray-400">{{item.id}}</td> -->
                        <td class="cursor-pointer px-4 py-3 whitespace-nowrap text-sm text-gray-900"><span class="text-base font-semibold">{{item.garage.name}}</span></td>
                        <td class="cursor-pointer px-4 py-3 whitespace-nowrap text-sm text-gray-900"><p :class="item.inService ? 'text-green-600' : 'text-red-600'" > {{ item.inService ? 'Active' : 'Closed' }} </p></td>
                        <td class="hidden sm:block cursor-pointer px-4 py-3 whitespace-normal break-words text-sm text-gray-900">{{item.note}}</td>
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

            <!-- [][][][] ФОРМА ДОБАВЛЕНИЯ КЛИЕНТА [][][][][] -->
            <section @click="onAdd" v-if="showForm" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div @click.stop class="w-[500px] bg-white rounded-xl shadow-xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
                      <h2 class="text-xl font-bold text-center">Добавить / Редактировать клиента</h2>

                      <label for="name">
                        <span class="text-sm font-medium text-gray-400 ml-2 "> Name</span>
                        <input
                        v-model="form.name"
                          type="text"
                          id="name"
                          class="mt-1 mb-2  p-3 w-full rounded-xl border-2 border-gray-300"
                          autocomplete="off"
                        />
                      </label>

                      <label for="address">
                        <span class="text-sm font-medium text-gray-400 ml-2 "> Address </span>
                        <input
                        v-model="form.address"
                          type="text"
                          id="address"
                          class="mt-1 mb-2  p-3 w-full rounded-xl border-2 border-gray-300"
                          autocomplete="off"
                        />
                      </label>

                      <label for="nationality">
                        <span class="text-sm font-medium text-gray-400 ml-2 "> Nationality </span>
                        <input
                        v-model="form.nationality"
                          type="text"
                          id="nationality"
                          class="mt-1 mb-2  p-3 w-full rounded-xl border-2 border-gray-300"
                          autocomplete="off"
                        />
                      </label>

                      <label for="passport">
                        <span class="text-sm font-medium text-gray-400 ml-2 "> Passport </span>
                        <input
                        v-model="form.passport"
                          type="text"
                          id="passport"
                          class="mt-1 mb-2  p-3 w-full rounded-xl border-2 border-gray-300"
                          autocomplete="off"
                        />
                      </label>

                      <label for="phoneNumber">
                        <span class="text-sm font-medium text-gray-400 ml-2 "> Phone Number </span>
                        <input
                        v-model="form.phoneNumber"
                          type="text"
                          id="phoneNumber"
                          class="mt-1 mb-2  p-3 w-full rounded-xl border-2 border-gray-300"
                          autocomplete="off"
                        />
                      </label>

                      <label for="note">
                        <span class="text-sm font-medium text-gray-400 ml-2 "> Comment </span>
                        <textarea
                        v-model="form.note"
                        type="text"
                          id="note"
                          class="mt-1 mb-2 p-3 w-full rounded-xl border-2 border-gray-300 [&::-webkit-outer-spin-button]:hidden [&::-webkit-inner-spin-button]:hidden [&::-moz-appearance:textfield]:appearance-none "
                          autocomplete="off"
                        />
                      </label>


                      <!-- КНОПКИ ДА НЕТ -->
                      <div class="flex gap-2 mt-5">
                          <button @click="submitForm" class="w-full py-3 cursor-pointer bg-green-400 text-white rounded-xl hover:bg-green-600">
                              Save
                          </button>
                          <button @click="onAdd" class="w-full py-3 cursor-pointer bg-red-400 text-white rounded-xl hover:bg-red-600">
                              Close
                          </button>
                      </div>

                      <!-- КОНТЕЙНЕР СПИННЕР -->
                      <div v-if="loadingForm" class="absolute inset-0 flex items-center justify-center bg-black/50">
                        <!-- Сам спиннер: кольцо с анимацией вращения -->
                        <div
                          class="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"
                          role="status"
                          aria-label="Loading"
                        ></div>
                      </div>

                    </div>
            </section>
        </section>
    </div>
</template>





<script setup>
import Sidebar from '~/components/Sidebar.vue';
import ServiceHeader from '~/components/ServiceHeader.vue';
import {ref, reactive, computed} from 'vue'
import { useRouter } from 'vue-router'
const config = useRuntimeConfig()
const router = useRouter()


const loading = ref(false)
const searchTerm = ref('')
const params = reactive({ page: 1, q: '' })
const showForm = ref(false)
const loadingForm = ref(false)
const form = ref({
name: '',
rating: 'GREEN',
address: '',
nationality: '',
passport: '',
phoneNumber: '',
note: ''
})

const { data, pending, error, refresh } = await useFetch(`${config.public.apiBase}/api/service/all`, { params, suspense: false, credentials: 'include' })

const items = computed(() => data.value?.data || [])
const totalPages = computed(() => data.value?.meta?.last_page || 1)

function onSearch() {
  params.page = 1
  params.q    = searchTerm.value.trim()
  refresh()
}

function prevPage() {
  if(params.page>1) params.page--
}

function nextPage() {
  if (params.page < totalPages.value) params.page++
}

function onAdd() {
  if(showForm.value){
    showForm.value = false
  } else{
    showForm.value = true
  }
}
const submitForm = async () => {
  loadingForm.value = true
  try {
    const result = await $fetch(`${config.public.apiBase}/api/client`, {
      method: 'POST',
      credentials: 'include',
      body: form.value
    })
    await refresh()
     showForm.value = false
     loadingForm.value = false
     router.push(`/client/${result.data.id}`)
    console.log('Успешно добавлено:', result)
  } catch (err) {
    console.error('Ошибка при отправке:', err)
  }
}

definePageMeta({
  middleware: 'auth',
  requiredRole:  ['STAFF', 'MECHANIC', 'ADMIN', 'SUPERADMIN'],
})

</script>
