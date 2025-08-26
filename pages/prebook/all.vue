<!-- eslint-disable -->

<template>
<!-- eslint-disable -->

    <div class="flex flex-col w-screen h-screen bg-white">
        <Sidebar />
        <section class="flex flex-col h-screen w-screen ">
            <PrebookHeader
              v-model="searchTerm"
              @search="onSearch"
              @add="onAdd"
              :loading="pending ||loading"
            />
            <!-- КОНТЕНТ СО СКРОЛЛОМ-->
            <section class="overflow-y-auto ">


                <!-- ШАПКА С ПОИСКОМ -->
                <div class="flex items-center gap-2 pr-4">
                    <form autocomplete="off" @submit.prevent="onSearch" class="flex space-x-2 items-center  py-2 pl-4 w-fit ">
                        <button v-show="activeTab==='all'&& !hasExtra" @click="onAdd()" type="button" class="h-10 w-18 bg-gray-100 rounded-xl cursor-pointer">Add+</button>
                        <div class="flex gap-2 h-full w-full sm:w-96">
                        <div class="h-full w-full">
                        <input
                        v-model="searchTerm"
                        id="search-input"
                        name="q"
                        type="text"
                        :placeholder="searchType"
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
                    <button @click="searchTypeF()" class="cursor-pointer flex items-center px-4 text-sm bg-gray-100 h-10 w-fit rounded-xl hover:bg-gray-200">
                        <svg class="text-orange-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><!-- Icon from Octicons by GitHub - https://github.com/primer/octicons/blob/main/LICENSE --><path fill="currentColor" d="M5.22 14.78a.75.75 0 0 0 1.06-1.06L4.56 12h8.69a.75.75 0 0 0 0-1.5H4.56l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3a.75.75 0 0 0 0 1.06zm5.56-6.5a.75.75 0 1 1-1.06-1.06l1.72-1.72H2.75a.75.75 0 0 1 0-1.5h8.69L9.72 2.28a.75.75 0 0 1 1.06-1.06l3 3a.75.75 0 0 1 0 1.06z"/></svg>
                        <!-- <span v-if="searchType==='client'">Client</span>
                        <span v-if="searchType==='garage'">Model</span> -->
                    </button>
                </div>


                <!-- ТАБЛИЦА ГЛАВНАЯ -->
                <table  class="min-w-full bg-white divide-y divide-gray-200 mb-20">
                  <!-- Заголовок -->
                  <thead class="bg-gray-50">
                    <tr>
                        <!-- <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th> -->
                      <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name + bike</th>
                      <!-- <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transport</th> -->
                      <!-- <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th> -->
                      <!-- <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End</th> -->
                      <th class="hidden sm:block px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Note</th>
                      <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery</th>

                    </tr>
                  </thead>

                  <!-- Тело таблицы -->
                  <tbody class="bg-white divide-y divide-gray-200">
                    <!-- Пример строки, можно генерировать в цикле -->
                    <tr v-for="(item) in items" :key="item.id" class="hover:bg-gray-100">
                        <!-- <td class="cursor-pointer px-4 py-3 whitespace-nowrap text-sm text-gray-400"><NuxtLink  @click="loading = true" :to="`/prebook/${item.id}`">{{item.id}}</NuxtLink></td> -->
                        <td class="cursor-pointer px-4 py-3 whitespace-nowrap text-sm text-gray-900"><NuxtLink  @click="loading = true" :to="`/prebook/${item.id}`">{{item.clientName}}<br><span class="font-semibold text-base">{{item.garage.name}}</span><br><span class="text-xs"><span class="bg-orange-100 rounded-md p-1">{{new Date(item.startPrebook).toLocaleDateString('ru-RU')}}</span> to <span class="bg-orange-100 rounded-md p-1">{{new Date(item.endPrebook).toLocaleDateString('ru-RU')}}</span></span></NuxtLink></td>
                        <!-- <td class="cursor-pointer px-4 py-3 whitespace-nowrap text-sm text-gray-900"><NuxtLink  @click="loading = true" :to="`/prebook/${item.id}`">{{item.garage.name}}</NuxtLink></td> -->
                        <!-- <td class="cursor-pointer px-4 py-3 whitespace-nowrap text-sm text-gray-900"><NuxtLink  @click="loading = true" :to="`/prebook/${item.id}`">{{new Date(item.startPrebook).toLocaleDateString('ru-RU')}}<br>{{new Date(item.endPrebook).toLocaleDateString('ru-RU')}}</NuxtLink></td> -->
                        <!-- <td class="cursor-pointer px-4 py-3 whitespace-nowrap text-sm text-gray-900"><NuxtLink  @click="loading = true" :to="`/prebook/${item.id}`">{{new Date(item.endPrebook).toLocaleDateString('ru-RU')}}</NuxtLink></td> -->
                        <td class="cursor-pointer px-4 py-3 whitespace-normal break-words text-sm text-gray-900"><NuxtLink  @click="loading = true" :to="`/prebook/${item.id}`"><span class="text-green-500 font-bold">{{item.delivery ? "YES" : ""}}</span><span class="text-red-500 font-bold">{{item.delivery ? "" : "NO"}}</span></NuxtLink></td>
                        <td class="hidden sm:flex cursor-pointer px-4 py-3 whitespace-normal break-words text-sm text-gray-900"><NuxtLink  @click="loading = true" :to="`/prebook/${item.id}`"><span class="flex items-center">{{item.note}}</span></NuxtLink></td>
                        <!-- <td class="cursor-pointer px-4 py-3 whitespace-normal break-words text-sm text-gray-900"><NuxtLink  @click="openModalClosePrebook(item.id)"><span class="bg-gray-200 px-2 py-1 rounded">Close</span></NuxtLink></td> -->



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


            <!-- ✏️✏️✏️✏️✏️✏️ ДОБАВЛЕНИЕ БРОНИРОВАНИЯ ✏️✏️✏️✏️✏️✏️  -->
            <section  v-if="showForm" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div  class="w-[500px] bg-white rounded-xl shadow-xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
                      <h2 class="text-xl font-bold text-center">Add booking</h2>

                      <div class="w-full">
                          <div class="relative">
                              <label for="bike">
                              <span class="text-sm font-medium text-gray-400 ml-2 "> Bike or Car | <span class="text-blue-500">ID:{{ selectedId }}</span> </span>
                              <input
                              id="bike"
                              type="text"
                              autocomplete="off"
                              v-model="filter"
                              @input="onInput"
                              @focus="open = true"
                              placeholder="Find..."
                              class="mt-1   p-3 w-full rounded-xl border-2 border-gray-300"
                            /></label>
                            <ul
                            v-show="open && options.length"
                              class="absolute z-10 w-full bg-white border-2 border-gray-300 rounded-xl max-h-60 overflow-auto mt-1"
                            >
                              <li
                              v-for="item in options"
                                :key="item.id"
                                @click="select(item)"
                                class="p-2 hover:bg-gray-100 cursor-pointer"
                              >
                                {{ item.name }}
                              </li>
                            </ul>
                          </div>
                        </div>

                        <!-- <div class="w-full">
                            <div class="relative">
                                <label for="client">
                                <span class="text-sm font-medium text-gray-400 ml-2 "> Client | <span class="text-blue-500">ID:{{ selectedIdClient }}</span></span>
                                <input
                                id="client"
                                type="text"
                                autocomplete="off"
                                v-model="filterClient"
                                @input="onInputClient"
                                @focus="openClient = true"
                                placeholder="Find..."
                                class="mt-1 p-3 w-full rounded-xl border-2 border-gray-300"
                              /> </label>
                              <ul
                              v-if="openClient && optionsClient.length"
                                class="absolute z-10 w-full bg-white border-2 border-gray-300 rounded-xl max-h-60 overflow-auto mt-1"
                              >
                                <li
                                v-for="item in optionsClient"
                                  :key="item.id"
                                  @click="selectClient(item)"
                                  class="flex justify-between p-2 hover:bg-gray-100 cursor-pointer"
                                >
                                    <span>{{ item.name }} <br> {{ item.phoneNumber }} - <span :class="{ 'text-green-500': item.rating==='GREEN', 'text-yellow-500': item.rating==='ORANGE', 'text-red-500': item.rating==='RED' }">{{ item.rating }}</span></span>
                                    <NuxtLink target="_blank" rel="noopener noreferrer" :to="`/client/${item.id}`"><button @click.stop class="z-20 bg-gray-200 px-3 py-3 my-auto rounded-lg cursor-pointer">Look more</button></NuxtLink>
                                </li>
                              </ul>
                            </div>
                          </div> -->
                          <label for="clientName" class="w-60">
                            <span class="text-sm font-medium text-gray-400 ml-2 ">Client Name</span>
                            <input
                            v-model="form.clientName"
                              type="text"
                              id="clientName"
                              required
                              class="mt-1 mb-2 p-3 w-full rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-0 [&::-webkit-outer-spin-button]:hidden [&::-webkit-inner-spin-button]:hidden [&::-moz-appearance:textfield]:appearance-none "
                              autocomplete="off"
                            />
                          </label>


                      <label for="startRental">
                        <span class="text-sm font-medium text-gray-400 ml-2 ">Start Booking</span>
                        <input
                        v-model="form.startPrebook"
                          type="date"
                          id="startRental"
                          required
                          class="mt-1 mb-2  p-3 w-full rounded-xl border-2 border-gray-300"
                          autocomplete="off"
                        />
                      </label>

                      <label for="endRental">
                        <span class="text-sm font-medium text-gray-400 ml-2 ">End Booking</span>
                        <input
                        v-model="form.endPrebook"
                          type="date"
                          id="endRental"
                          required
                          class="mt-1 mb-2  p-3 w-full rounded-xl border-2 border-gray-300"
                          autocomplete="off"
                        />
                      </label>

                      <div class="flex gap-6 mt-4 ml-2">
                        <label class="inline-flex items-center cursor-pointer">
                          <input
                            v-model="form.delivery"
                            required
                            type="radio"
                            name="currencyPaid"
                            :value="false"
                            class="form-radio h-5 w-5 text-blue-600 transition duration-150 ease-in-out cursor-pointer"/>
                          <span class="ml-2 text-sm font-medium text-gray-700">Delivery NO</span>
                        </label>

                        <label class="inline-flex items-center cursor-pointer">
                          <input
                            v-model="form.delivery"
                            required
                            type="radio"
                            name="currencyPaid"
                            :value="true"
                            class="form-radio h-5 w-5 text-blue-600 transition duration-150 ease-in-out cursor-pointer"/>
                          <span class="ml-2 text-sm font-medium text-gray-700">Delivery YES</span>
                        </label>
                      </div>

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


                      <div class="flex gap-2 mt-5">
                          <button @click="submitForm" class="flex items-center justify-center gap-3 w-full h-12 rounded-xl  bg-green-500 text-white font-medium cursor-pointer">
                              <span>Save</span>
                              <div v-if="loadingCreatePrebook"
                                   class="w-5 h-5 border-3 border-white border-t-gray-500 rounded-full animate-spin"
                                   role="status"
                                   aria-label="Loading">
                              </div>
                          </button>
                          <button @click="onAdd" class="w-full py-3 cursor-pointer bg-red-400 text-white rounded-xl hover:bg-red-600">
                              Close
                          </button>
                      </div>

                      <div v-if="loadingForm" class="absolute inset-0 flex items-center justify-center bg-black/50">
                        <div
                          class="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"
                          role="status"
                          aria-label="Loading"
                        ></div>
                      </div>

                    </div>
            </section>


            <!-- 🛡️🛡️🛡️🛡️ МОДАЛКА ЗАЩИТА 🛡️🛡️🛡️🛡️  -->
            <section @click="openModalClosePrebook()" v-if="closeProtection" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div @click.stop class="w-[500px] bg-white rounded-xl shadow-xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
                      <h2 class="text-2xl font-bold text-center">Closing the booking. Are you sure?</h2>
                      <div class="flex gap-2 mt-5">
                          <button @click="closeBooking()" class="w-full py-3 cursor-pointer bg-green-400 text-white rounded-xl hover:bg-green-600">
                              Yes, close!
                          </button>
                          <button @click="openModalClosePrebook()" class="w-full py-3 cursor-pointer bg-red-400 text-white rounded-xl hover:bg-red-600">
                              No
                          </button>
                      </div>
                </div>
                <!-- КОНТЕЙНЕР СПИННЕР -->
                <div v-if="loadingFormClose" class="absolute inset-0 flex items-center justify-center bg-black/50">
                  <!-- Сам спиннер: кольцо с анимацией вращения -->
                  <div
                    class="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"
                    role="status"
                    aria-label="Loading"
                  ></div>
                </div>
            </section>


        </section>
    </div>
</template>





<script setup>
import Sidebar from '~/components/Sidebar.vue';
import PrebookHeader from '~/components/PrebookHeader.vue';
import {ref, reactive, computed} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import debounce from 'lodash.debounce'

const searchType = ref('garage')
const filter = ref('')
const open = ref(false)
const options = ref([])
const selectedId = ref(null)
// const filterClient = ref('')
// const openClient = ref(false)
// const optionsClient = ref([])
// const selectedIdClient = ref(null)
const config = useRuntimeConfig()
const route = useRoute()
const router = useRouter()
const loadingCreatePrebook = ref('')

const iGlobal = ref(0)
const closeProtection = ref(false)
const loading = ref(false)
const searchTerm = ref('')
const params = reactive({ page: 1, q: '' })
const showForm = ref(false)
const loadingFormClose = ref(false)
const loadingForm = ref(false)
const form = ref({
  startPrebook: '',
  endPrebook: '',
  delivery:false,
  note: '',
  clientName:'',
  garageId: selectedId
})

function searchTypeF() {
  searchType.value = searchType.value === 'garage'
    ? 'client'
    : 'garage'
}
const { data, pending, error, refresh } = await useFetch(`${config.public.apiBase}/api/prebook/all`, { params, suspense: false,credentials: 'include' })

const items = computed(() => data.value?.data || [])
const totalPages = computed(() => data.value?.meta?.last_page || 1)

function onSearch() {
  params.page = 1
  params.q    = searchTerm.value.trim()
  params.search = searchType.value
  router.replace({ query: { q: params.q, search: params.search, page: String(params.page) } })
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
  loadingCreatePrebook.value = true
  const payload = { ...form.value }

  // ✅ Проверка обязательных полей
   if (!payload.clientName || !payload.startPrebook || !payload.endPrebook || payload.delivery === null || payload.delivery === undefined) {
     alert('Please fill in all required fields!')
     loadingCreatePrebook.value = false
     return
   }

  if (payload.startPrebook) {
    payload.startPrebook = new Date(payload.startPrebook).toISOString()
  }
  if (payload.endPrebook) {
    payload.endPrebook = new Date(payload.endPrebook).toISOString()
  }
  console.log(payload)
  try {
    const result = await $fetch(`${config.public.apiBase}/api/prebook`, {
      method: 'POST',
      body: payload,
      credentials: 'include'
    })
    await refresh()
     showForm.value = false
     loadingCreatePrebook.value = false
    console.log('Успешно добавлено:', result)
  } catch (err) {
    console.error('Ошибка при отправке:', err)
  }
}


const openModalClosePrebook = (i) =>{
  iGlobal.value = i
  if (closeProtection.value){
    closeProtection.value = false
  } else {
    closeProtection.value = true
  }
}

// ЗАКРЫТИЕ ПРЕБУКА ♻️
const closeBooking = async () => {
  loadingFormClose.value = true
  try {
    const result = await $fetch(`${config.public.apiBase}/api/prebook/${iGlobal.value}`, {
      method: 'PATCH',
      credentials: 'include',
      body: {
        inPrebook: false
      }
    })
    closeProtection.value = false
    loadingFormClose.value = false
    await refresh()
    console.log('Успешно обновлено:', result)
  } catch (err) {
    console.error('Ошибка при отправке:', err)
  }
}

//ДЕБАУНС
const doSearch = debounce(async () => {
  if (!filter.value.trim()) {
    options.value = []
    return
  }
  options.value = await $fetch(`${config.public.apiBase}/api/garage/search?q=${filter.value}`,{credentials: 'include'})
}, 300)

function onInput() {
  open.value = true
  doSearch()
}

function select(g) {
  selectedId.value = g.id
  filter.value = g.name
  open.value = false
}

// const doSearchClient = debounce(async () => {
//   if (!filterClient.value.trim()) {
//     optionsClient.value = []
//     return
//   }
//   // простой запрос к новому эндпоинту
//   optionsClient.value = await $fetch(`${config.public.apiBase}/api/client/search?q=${filterClient.value}`,{credentials: 'include'})
// }, 300)

// function onInputClient() {
//   openClient.value = true
//   doSearchClient()
// }

// function selectClient(g) {
//   selectedIdClient.value = g.id
//   filterClient.value = g.name
//   openClient.value = false
// }


// ЧЕКАЕМ НА КАКОМ МЫ РОУТЕ
const activeTab = computed(() => {
  const segs = route.path.split('/')
  return segs[2] || 'all'
})
const hasExtra = computed(() => Boolean(route.params.id))


onMounted(() => {
  const { q, search, page } = useRoute().query
  if (q) {
    searchTerm.value   = String(q)
    searchType.value   = String(search || searchType.value)
    params.page        = Number(page) || 1
    params.q           = searchTerm.value
    params.search      = searchType.value
    refresh()
  }
})


definePageMeta({
  middleware: 'auth',
  requiredRole:  ['STAFF', 'MECHANIC', 'ADMIN', 'SUPERADMIN'],
})

</script>
