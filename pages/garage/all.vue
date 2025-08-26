<template>
<!-- eslint-disable -->

    <div class="flex flex-col w-screen h-screen bg-white">
        <Sidebar />
        <section class="flex flex-col h-screen w-screen ">
            <GarageHeader
              v-model="searchTerm"
              @search="onSearch"
              @add="onAdd"
              :loading="pending ||loading"
            />
            <!-- КОНТЕНТ СО СКРОЛЛОМ-->
            <section class="overflow-y-auto ">

                <form autocomplete="off" @submit.prevent="onSearch" class="flex space-x-2 items-center  py-2 pl-4 w-fit pr-4">
                    <button v-show="activeTab==='all'&& !hasExtra" @click="onAdd()" type="button" class="h-10 w-18 bg-gray-100 rounded-xl cursor-pointer">Add+</button>
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
                        <th class=" py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                        <th class="px-0 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PRIORITY</th>
                      <!-- <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">LOCATION</th> :class="item.debt > 0 ? 'text-red-500'  : ''"-->
                    </tr>
                  </thead>

                  <!-- Тело таблицы -->
                  <tbody class="bg-white divide-y divide-gray-200">
                    <!-- Пример строки, можно генерировать в цикле -->
                    <tr v-for="(item) in items" :key="item.id" class="hover:bg-gray-100">
                        <!-- <td class="cursor-pointer px-4 py-3 whitespace-nowrap text-sm text-gray-400"><NuxtLink   :to="`/garage/${item.id}`">{{item.id}}</NuxtLink></td> -->
                        <td class="cursor-pointer px-2 py-3 whitespace-nowrap text-sm text-gray-900"><NuxtLink   :to="`/garage/${item.id}`"><img class="w-8 h-8 rounded" :src="item.photoUrl" alt="" /></NuxtLink></td>
                        <td class="cursor-pointer  px-0 py-3 whitespace-nowrap text-sm text-gray-900"><NuxtLink   :to="`/garage/${item.id}`"><span class="font-bold">{{item.name}}</span></NuxtLink></td>
                        <td class="cursor-pointer px-4 py-3 whitespace-nowrap text-xs text-gray-500"><NuxtLink   :to="`/garage/${item.id}`">
                            <span v-show="item.priority === 'PRIORITY_1'" class="bg-orange-100 text-orange-600 p-1 rounded-md">PRIORITY 1</span>
                            <span v-show="item.priority === 'PRIORITY_2'" class="bg-purple-100 text-purple-600 p-1 rounded-md">PRIORITY 2</span>
                            <span v-show="item.priority === 'EMPTY'" class="bg-gray-100 text-gray-600 p-1 rounded-md">{{item.priority}}</span>

                        </NuxtLink></td>
                        <!-- <td class="cursor-pointer px-4 py-3 whitespace-nowrap text-sm text-gray-500"><NuxtLink   :to="`/garage/${item.id}`">{{item.location}}</NuxtLink></td> -->
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

            <!-- ✏️✏️✏️✏️✏️✏️ ФОРМА ДОБАВЛЕНИЯ В БАЙКА ✏️✏️✏️✏️✏️✏️  -->
            <section  v-show="showForm" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div  class="w-[500px] bg-white rounded-xl shadow-xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
                      <h2 class="text-xl font-bold text-center">Add bike/car</h2>

                      <!-- Выпадающий список партнёров -->
                      <select v-model="form.partnerId" class="mt-1 mb-2  p-3 w-full rounded-xl border-2 border-gray-300">
                        <option :value="null" disabled selected>Select owner</option>
                        <option v-for="p in partners" :key="p.id" :value="p.id">
                          {{ p.tag }}
                        </option>
                      </select>

                      <label for="name">
                        <span class="text-sm font-medium text-gray-400 ml-2 "> Name + color + number </span>
                        <input
                        v-model="form.name"
                          type="text"
                          id="name"
                          class="mt-1 mb-2  p-3 w-full rounded-xl border-2 border-gray-300"
                          autocomplete="off"
                        />
                      </label>

                      <label for="mileageStart">
                        <span class="text-sm font-medium text-gray-400 ml-2 "> Mileage Start </span>
                        <input
                        v-model="form.mileageStart"
                          type="number"
                          id="mileageStart"
                          class="mt-1 mb-2  p-3 w-full rounded-xl border-2 border-gray-300  [&::-webkit-outer-spin-button]:hidden [&::-webkit-inner-spin-button]:hidden [&::-moz-appearance:textfield]:appearance-none"
                          autocomplete="off"
                        />
                      </label>

                      <label for="mileageNow">
                        <span class="text-sm font-medium text-gray-400 ml-2 "> Mileage Now </span>
                        <input
                        v-model="form.mileageNow"
                          type="number"
                          id="mileageNow"
                          class="mt-1 mb-2  p-3 w-full rounded-xl border-2 border-gray-300 [&::-webkit-outer-spin-button]:hidden [&::-webkit-inner-spin-button]:hidden [&::-moz-appearance:textfield]:appearance-none "
                          autocomplete="off"
                        />
                      </label>

                      <label for="oilChange">
                        <span class="text-sm font-medium text-gray-400 ml-2 "> Oil Change </span>
                        <input
                        v-model="form.oilChange"
                          type="number"
                          id="oilChange"
                          class="mt-1 mb-2  p-3 w-full rounded-xl border-2 border-gray-300 [&::-webkit-outer-spin-button]:hidden [&::-webkit-inner-spin-button]:hidden [&::-moz-appearance:textfield]:appearance-none "
                          autocomplete="off"
                        />
                      </label>

                      <label for="price">
                        <span class="text-sm font-medium text-gray-400 ml-2 "> Price </span>
                        <input
                        v-model="form.price"
                          type="number"
                          id="price"
                          class="mt-1 mb-2  p-3 w-full rounded-xl border-2 border-gray-300 [&::-webkit-outer-spin-button]:hidden [&::-webkit-inner-spin-button]:hidden [&::-moz-appearance:textfield]:appearance-none "
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

                      <!-- Переключатели -->
                      <div class="flex gap-4">
                        <label for="isBike" class="inline-flex items-center gap-3">
                            <input v-model="form.isBike" type="checkbox" class="size-5 rounded border-gray-300 shadow-sm" id="isBike" />
                            <span class="font-medium text-gray-700"> Is this a bike? </span>
                        </label>
                      </div>

                      <div class="flex mt-2 gap-4">
                        <label for="isGps" class="inline-flex items-center gap-3">
                            <input v-model="form.isGps" type="checkbox" class="size-5 rounded border-gray-300 shadow-sm" id="isGps" />
                            <span class="font-medium text-gray-700"> GPS yes? </span>
                        </label>
                      </div>

                      <div class="flex mt-2 gap-4">
                        <label for="isLoan" class="inline-flex items-center gap-3">
                            <input v-model="loan" type="checkbox" class="size-5 rounded border-gray-300 shadow-sm" id="isLoan" />
                            <span class="font-medium text-gray-700">Loan yes? </span>
                        </label>
                      </div>

                      <label v-if="form.isGps" for="gpsNumber">
                        <span class="text-sm font-medium text-gray-400 ml-2 "> GPS Number </span>
                        <input
                        v-model="form.gpsNumber"
                          type="number"
                          id="gpsNumber"
                          class="mt-1 mb-2  p-3 w-full rounded-xl border-2 border-gray-300 [&::-webkit-outer-spin-button]:hidden [&::-webkit-inner-spin-button]:hidden [&::-moz-appearance:textfield]:appearance-none "
                          autocomplete="off"
                        />
                      </label>

                      <label v-if="loan" for="loanDate">
                        <span class="text-sm font-medium text-gray-400 ml-2 "> Loan Date </span>
                        <input
                        v-model="form.loanDate"
                          type="number"
                          id="loanDate"
                          class="mt-1 mb-2  p-3 w-full rounded-xl border-2 border-gray-300  [&::-webkit-outer-spin-button]:hidden [&::-webkit-inner-spin-button]:hidden [&::-moz-appearance:textfield]:appearance-none "
                          autocomplete="off"
                        />
                      </label>

                      <label v-if="loan" for="loanAmount">
                        <span class="text-sm font-medium text-gray-400 ml-2 "> Loan Amount </span>
                        <input
                        v-model="form.loanAmount"
                          type="number"
                          id="loanAmount"
                          class="mt-1 mb-2  p-3 w-full rounded-xl border-2 border-gray-300 [&::-webkit-outer-spin-button]:hidden [&::-webkit-inner-spin-button]:hidden [&::-moz-appearance:textfield]:appearance-none "
                          autocomplete="off"
                        />
                      </label>

                      <div class="flex items-center">
                      <label class="block mb-2">
                        <span class="text-sm font-medium">Upload Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          @change="onFileChange"
                          class="mt-1 block bg-gray-100 py-2 px-2 rounded-xl border border-dashed border-gray-400 cursor-pointer"
                        />
                      </label>
                      <div
                        v-if="buttonPhotoBike"
                        class="w-8 h-8 border-4 border-gray-200 border-t-red-500 rounded-full animate-spin ml-5 mt-4"
                        role="status"
                        aria-label="Loading"
                      ></div>
                      </div>

                      <!-- <img v-if="form.photoUrl" :src="form.photoUrl" class="w-32 h-32 object-cover rounded" /> -->


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
import GarageHeader from '~/components/GarageHeader.vue';
import {ref, reactive, computed} from 'vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

const config = useRuntimeConfig()
const buttonPhotoBike = ref(null)
const loading = ref(false)
const searchTerm = ref('')
const params = reactive({ page: 1, q: '' })
const showForm = ref(false)
const loan = ref(false)
const loadingForm = ref(false)
const form = ref({
name: '',
licensePlate: '',
mileageStart: 0,
mileageNow: 0,
oilChange: 0,
loanAmount: 0,
gpsNumber:0,
loanDate: 0,
isBike: true,
isGps: false,
isSold: false,
location: 'MAIN_OFFICE',
partnerId: null,
price: 0,
note: '',
photoUrl: ''
})
const partners = [
  { id: 1, tag: 'MARK' },
  { id: 2, tag: 'OLEG' },
  { id: 4, tag: 'URIY' },
  { id: 5, tag: 'DENIS' },
  { id: 6, tag: 'SERGEI' },
  { id: 7, tag: 'ANTON' },
  { id: 8, tag: 'EKATERINA' },
  { id: 10, tag: 'DASHA' },
  { id: 11, tag: 'ANDREI' },
  { id: 12, tag: 'VLADIMIR' },
  { id: 13, tag: 'IGOR' },
  { id: 3, tag: 'OLEG SVOE' },
]

const { data, pending, error, refresh } = await useFetch(`${config.public.apiBase}/api/garage/all`, { params,
  suspense: false,
  credentials: 'include',
  onResponseError({ response }) {
    if (response.status === 401) {
      localStorage.removeItem('token')
      router.push('/login')
    }
  }
})

const items = computed(() => data.value?.data || [])
const totalPages = computed(() => data.value?.meta?.last_page || 1)

function onSearch() {
  params.page = 1
  params.q    = searchTerm.value.trim()
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
  loadingForm.value = true
  try {
    const result = await $fetch(`${config.public.apiBase}/api/garage`, {
      method: 'POST',
      credentials: 'include',
      body: form.value
    })
    await refresh()
     showForm.value = false
     loadingForm.value = false
     router.push(`/garage/${result.data.id}`)
    console.log('Успешно добавлено:', result)
  } catch (err) {
    console.error('Ошибка при отправке:', err)
  }
}

const onFileChange = async (e) => {
  buttonPhotoBike.value = true

  const file = e.target.files[0]
  if (!file) return

  const fm = new FormData()
  fm.append('file', file)

  try {
    const { url } = await $fetch(`${config.public.apiBase}/api/upload/garage`, {
      method: 'POST',
      credentials: 'include',
      body: fm
    })
    form.value.photoUrl = url
    buttonPhotoBike.value = false
    console.log(url)

  } catch (err) {
    console.error('Upload failed:', err)
  }
}


router.beforeEach((to, from, next) => {
  loading.value = true
  next()
})
// router.afterEach(() => {
//   loading.value = false
// })

// ЧЕКАЕМ НА КАКОМ МЫ РОУТЕ
const activeTab = computed(() => {
  const segs = route.path.split('/')
  return segs[2] || 'all'
})
const hasExtra = computed(() => Boolean(route.params.id))

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
