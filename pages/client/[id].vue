<template>
<!-- eslint-disable -->

    <section class="flex flex-col w-screen h-screen bg-white">
        <Sidebar />
        <section class="flex flex-col h-screen w-screen ">
            <ClientHeader
                @add="onAdd"
                :loading="pending"
            />
            <!-- ДАННЫЕ СО СКРОЛОМ-->
            <section class="overflow-y-auto p-4 ">

                <!-- ОБРАБОТЧИК ОШИБОК -->
                <p v-if="pending" class="mt-4 text-gray-500">Загрузка...</p>
                <p v-else-if="error" class="mt-4 text-red-500">Ошибка: {{ error.message }}</p>

                <!-- КОНТЕЙНЕР ЭКРАНОВ -->
                <section v-else class="flex w-full h-full gap-2 mb-2">

                    <!-- &&&&&&&&&& ЛЕВЫЙ БЛОК &&&&&&&&&&-->
                    <section class="flex flex-col w-full h-[740px] rounded-xl bg-gray-100 ">

                        <!-- БЛОК С ДАННЫМИ -->
                        <div class="flex flex-col w-full p-4 gap-2">
                            <div class="flex gap-2">
                                <!-- ID -->
                                <div class="w-32">
                                    <label for="location" class="mb-1 ml-2 text-sm font-medium text-gray-400">ID Client</label>
                                    <span v-copy class="flex items-center justify-center h-12 w-full border-2 border-dashed border-gray-300 rounded-xl">{{client.id}}</span>
                                </div>
                                <div v-if="client.rating==='GREEN'" class="w-full ">
                                    <label for="location" class=" mb-1 ml-2 text-sm font-medium text-gray-400">Rating</label>
                                    <div class="flex items-center justify-center h-12 w-full  rounded-xl bg-green-500   text-white relative overflow-hidden font-semibold before:content-[''] before:absolute before:inset-0 before:bg-[repeating-linear-gradient(45deg,#ffffff30,#ffffff30_10px,transparent_10px,transparent_20px)] before:pointer-events-none">GREEN</div>
                                </div>
                                <div v-if="client.rating==='ORANGE'" class="w-full ">
                                    <label for="location" class=" mb-1 ml-2 text-sm font-medium text-gray-400">Rating</label>
                                    <div class="flex items-center justify-center h-12 w-full  rounded-xl bg-orange-500   text-white relative overflow-hidden font-semibold before:content-[''] before:absolute before:inset-0 before:bg-[repeating-linear-gradient(45deg,#ffffff30,#ffffff30_10px,transparent_10px,transparent_20px)] before:pointer-events-none">ORANGE</div>
                                </div>
                                <div v-if="client.rating==='RED'" class="w-full ">
                                    <label for="location" class=" mb-1 ml-2 text-sm font-medium text-gray-400">Rating</label>
                                    <div class="flex items-center justify-center h-12 w-full  rounded-xl bg-red-500   text-white relative overflow-hidden font-semibold before:content-[''] before:absolute before:inset-0 before:bg-[repeating-linear-gradient(45deg,#ffffff30,#ffffff30_10px,transparent_10px,transparent_20px)] before:pointer-events-none">RED</div>
                                </div>
                                <!-- КНОПКА -->
                                <div class=" h-12 w-40">
                                    <button @click="onAdd" class="mt-6 w-full py-3 cursor-pointer bg-orange-400 text-white rounded-xl hover:bg-orange-600">
                                        Edit client
                                    </button>
                                </div>
                            </div>
                            <a v-show="!client.phoneWhatsapp" :href="`https://wa.me/${client.phoneNumber}`" target="_blank" rel="noopener noreferrer" >
                              <button class="px-4  h-12 bg-green-200 rounded-xl cursor-pointer">
                                WhatsApp
                              </button>
                            </a>
                            <a v-show="client.phoneWhatsapp" :href="`https://wa.me/${client.phoneWhatsapp}`" target="_blank" rel="noopener noreferrer" >
                              <button class="px-4  h-12 bg-green-200 rounded-xl cursor-pointer">
                                WhatsApp
                              </button>
                            </a>
                            <!-- ИНФО -->
                            <div class="flex gap-4">
                                <div class="w-full">
                                    <label for="location" class="mb-1 ml-2 text-sm font-medium text-gray-400">Name</label>
                                    <span v-copy class="flex items-center justify-center h-12 w-full bg-white rounded-xl">{{client.name}}</span>
                                </div>
                                <div class="w-full">
                                    <label for="location" class="mb-1 ml-2 text-sm font-medium text-gray-400">Passport</label>
                                    <span v-copy class="flex items-center justify-center h-12 w-full bg-white rounded-xl">{{client.passport}}</span>
                                </div>
                            </div>
                            <div class="flex gap-4">
                                <div class="w-full">
                                    <label for="location" class="mb-1 ml-2 text-sm font-medium text-gray-400">Phone Number</label>
                                    <span v-copy class="flex items-center justify-center h-12 w-full bg-white rounded-xl">{{client.phoneNumber}}</span>
                                </div>
                                <div class="w-full">
                                    <label for="location" class="mb-1 ml-2 text-sm font-medium text-gray-400">Whatsapp Number</label>
                                    <span v-copy class="flex items-center justify-center h-12 w-full bg-white rounded-xl">{{client.phoneWhatsapp}}</span>
                                </div>

                            </div>
                            <div class="flex gap-4">
                                <div class="w-full">
                                    <label for="location" class="mb-1 ml-2 text-sm font-medium text-gray-400">Addres</label>
                                    <span v-copy class="flex items-center justify-center h-12 w-full bg-white rounded-xl">{{client.address}}</span>
                                </div>
                                <div class="w-full">
                                    <label for="location" class="mb-1 ml-2 text-sm font-medium text-gray-400">Nationality</label>
                                    <span  v-copy class="flex items-center justify-center h-12 w-full bg-white rounded-xl">{{client.nationality}}</span>
                                </div>
                            </div>
                            <div class="w-full">
                                <label for="location" class="mb-1 ml-2 text-sm font-medium text-gray-400">Comment</label>
                                <span v-copy class="px-3 py-2 flex items-start justify-start h-20 w-full bg-white rounded-xl">{{client.note}}</span>
                            </div>


                            <!-- БРОНИ -->
                            <div class="w-full ">
                                <label for="location" class="mb-1 ml-2 text-sm font-medium text-gray-400">History rental</label>
                                <div class="flex flex-col h-52 w-full bg-white rounded-xl overflow-hidden overflow-y-auto">
                                    <table class="min-w-full bg-white divide-y divide-gray-200">
                                      <thead class="bg-gray-50 ">
                                        <tr >
                                        <!-- <th class=" px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th> -->
                                          <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                          <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                          <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Link</th>
                                        </tr>
                                      </thead>
                                      <tbody class="bg-white divide-y divide-gray-200">
                                        <tr v-for="booking in client.bookings" :key="booking.id" class="hover:bg-gray-100">
                                            <!-- <td class="cursor-pointer px-4 py-3 whitespace-nowrap text-sm text-gray-400">{{booking.id}}</td> -->
                                            <td class="cursor-pointer px-4 py-3 whitespace-nowrap text-sm text-gray-900">{{new Date(booking.startRental).toLocaleDateString('ru-RU')}} to {{new Date(booking.endRental).toLocaleDateString('ru-RU')}}</td>
                                            <td class="cursor-pointer px-4 py-3 whitespace-nowrap text-sm text-gray-900">  <p :class="booking.isActive ? 'text-green-600' : 'text-red-600'" > {{ booking.isActive ? 'Active' : 'Closed' }} </p></td>
                                            <td class="cursor-pointer px-4 py-3 whitespace-nowrap text-sm text-gray-900 "><NuxtLink  @click="loading = true" :to="`/booking/${booking.id}`"><button class="cursor-pointer">Open</button></NuxtLink></td>
                                        </tr>
                                      </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                    </section>

                </section>
            </section>
        </section>


        <!-- ✏️✏️✏️✏️✏️✏️ РЕДАКТИРОВАНИЕ БАЙКА ✏️✏️✏️✏️✏️✏️  -->
        <section @click="onAdd" v-if="showForm" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div @click.stop class="w-[500px] bg-white rounded-xl shadow-xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
                  <h2 class="text-xl font-bold text-center">Edit client</h2>

                  <!-- Выпадающий список партнёров -->
                  <span class="text-sm font-medium text-gray-400 ml-2 ">Rating</span>
                  <select v-model="form.rating" class="mt-1 mb-2  p-3 w-full rounded-xl border-2 border-gray-300">
                    <option :value="null" disabled>Rating</option>
                    <option v-for="p in RatingArray" :key="p.value" :value="p.value"> {{ p.tag }} </option>
                  </select>

                  <label for="name">
                    <span class="text-sm font-medium text-gray-400 ml-2 "> Name</span>
                    <input
                    v-model="form.name"
                      type="text"
                      id="name"
                      class="mt-1 mb-2  p-3 w-full rounded-xl border-2 border-gray-300 "
                      autocomplete="off"
                    />
                  </label>

                  <label for="address">
                    <span class="text-sm font-medium text-gray-400 ml-2 ">Address</span>
                    <input
                    v-model="form.address"
                      type="text"
                      id="address"
                      class="mt-1 mb-2  p-3 w-full rounded-xl border-2 border-gray-300  [&::-webkit-outer-spin-button]:hidden [&::-webkit-inner-spin-button]:hidden [&::-moz-appearance:textfield]:appearance-none"
                      autocomplete="off"
                    />
                  </label>

                  <label for="nationality">
                    <span class="text-sm font-medium text-gray-400 ml-2 ">Nationality</span>
                    <input
                    v-model="form.nationality"
                      type="text"
                      id="nationality"
                      class="mt-1 mb-2  p-3 w-full rounded-xl border-2 border-gray-300  [&::-webkit-outer-spin-button]:hidden [&::-webkit-inner-spin-button]:hidden [&::-moz-appearance:textfield]:appearance-none"
                      autocomplete="off"
                    />
                  </label>

                  <label for="passport">
                    <span class="text-sm font-medium text-gray-400 ml-2 ">Passport</span>
                    <input
                    v-model="form.passport"
                      type="text"
                      id="passport"
                      class="mt-1 mb-2  p-3 w-full rounded-xl border-2 border-gray-300  [&::-webkit-outer-spin-button]:hidden [&::-webkit-inner-spin-button]:hidden [&::-moz-appearance:textfield]:appearance-none"
                      autocomplete="off"
                    />
                  </label>

                  <label for="phoneNumber">
                    <span class="text-sm font-medium text-gray-400 ml-2 ">Phone Number</span>
                    <input
                    v-model="form.phoneNumber"
                      type="text"
                      id="phoneNumber"
                      class="mt-1 mb-2  p-3 w-full rounded-xl border-2 border-gray-300  [&::-webkit-outer-spin-button]:hidden [&::-webkit-inner-spin-button]:hidden [&::-moz-appearance:textfield]:appearance-none"
                      autocomplete="off"
                    />
                  </label>


                  <label for="phoneWhatsapp">
                    <span class="text-sm font-medium text-gray-400 ml-2 "> Phone WhatsApp </span>
                    <input
                    v-model="form.phoneWhatsapp"
                      type="text"
                      id="phoneWhatsapp"
                      class="mt-1 mb-2  p-3 w-full rounded-xl border-2 border-gray-300"
                      autocomplete="off"
                    />
                  </label>

                  <label for="note">
                    <span class="text-sm font-medium text-gray-400 ml-2 ">Note</span>
                    <textarea
                    v-model="form.note"
                      type="text"
                      id="note"
                      class="mt-1 mb-2 h-24 p-3 w-full rounded-xl border-2 border-gray-300  [&::-webkit-outer-spin-button]:hidden [&::-webkit-inner-spin-button]:hidden [&::-moz-appearance:textfield]:appearance-none"
                      autocomplete="off"
                    />
                  </label>



                  <!-- СОХРАНИТЬ И ОТМЕНИТЬ -->
                  <div class="flex gap-2 mt-5">
                      <button @click="submitForm" class="w-full py-3 cursor-pointer bg-green-400 text-white rounded-xl hover:bg-green-600">
                          Save
                      </button>
                      <button @click="onAdd" class="w-full py-3 cursor-pointer bg-red-400 text-white rounded-xl hover:bg-red-600">
                          Close
                      </button>
                  </div>
                  <!-- [][][][] КОНЕЦ ФОРМЫ [][][][][] -->

                  <!-- СПИНЕР -->
                  <div v-if="loadingForm" class="absolute inset-0 flex items-center justify-center bg-black/50">
                    <div
                      class="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"
                      role="status"
                      aria-label="Loading"
                    ></div>
                  </div>

                </div>
        </section>


    </section>
</template>

<script setup>
import Sidebar from '~/components/Sidebar.vue';
import ClientHeader from '~/components/ClientHeader.vue';
import {ref, computed} from 'vue'
import { useRoute } from 'vue-router'
const config = useRuntimeConfig()

const route = useRoute()

// Извлекаем ID из адресной строки
const id = route.params.id

// Получаем данные с сервера
const { data, pending, error, refresh } = await useFetch(`${config.public.apiBase}/api/client/${id}`,{credentials: 'include'})
console.log(data.value.data)
const client = computed(() => data.value?.data ?? null)


// ЗДЕСЬ ПОПАП ФОРМА И ЕЕ ЛОГИКА
// Показ формы
const showForm = ref(false)

//Загрузка формы
const loadingForm = ref(false)

const form = ref({
  name: '',
  address: '',
  nationality: '',
  note: '',
  passport: '',
  phoneNumber: '',
  phoneWhatsapp: '',
  rating: '',
})

function onAdd() {
  showForm.value = !showForm.value
  if (showForm.value && client.value) {
    form.value = {
      name:          client.value.name,
      address:       client.value.address,
      nationality:   client.value.nationality,
      note:          client.value.note,
      passport:      client.value.passport,
      phoneNumber:   client.value.phoneNumber,
      phoneWhatsapp:   client.value.phoneWhatsapp,
      rating:        client.value.rating,
    }
  }
}

const RatingArray = [
  { value: 'GREEN', tag: 'GREEN' },
  { value: 'ORANGE',   tag: 'ORANGE' },
  { value: 'RED',   tag: 'RED' }

]

// Переменные формы


// РЕДАКТИРОВАНИЕ ФОРМЫ И ЕЕ ОТПРАВКА
const submitForm = async () => {
  loadingForm.value = true
  const payload = {
    ...form.value,
    id: id,
    clientId: client.value.id,
  }
  try {
    const result = await $fetch(`${config.public.apiBase}/api/client/${id}`, {
      method: 'PUT',
      credentials: 'include',
      body: payload
    })
      await refresh()
       showForm.value = false
       loadingForm.value = false
    console.log('Успешно добавлено:', result)
  } catch (err) {
    console.error('Ошибка при отправке:', err)
  }
}
definePageMeta({
  middleware: 'auth',
  requiredRole:  ['STAFF', 'ADMIN', 'SUPERADMIN'],
})
</script>
