<template>
<!-- eslint-disable -->

    <section class="flex flex-col w-screen h-screen bg-white">
        <Sidebar />
        <section class="flex flex-col h-screen w-screen ">
            <PrebookHeader
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
                    <section class="flex flex-col w-full flex-auto min-w-[350px] h-[740px] rounded-xl bg-gray-100 ">
                        <div class="flex flex-col w-full p-4 gap-2">
                            <div class="flex gap-2">
                                <div class="w-36">
                                    <label for="location" class="mb-1 ml-2 text-sm font-medium text-gray-400">ID booking</label>
                                    <span class="flex items-center justify-center h-12 w-28 border-2 border-dashed border-gray-300 rounded-xl">{{prebook.id}}</span>
                                </div>

                                <!-- СТАТУСЫ -->
                                <div v-show="prebook.inPrebook" class="w-full ">
                                    <label for="location" class=" mb-1 ml-2 text-sm font-medium text-gray-400">Global status</label>
                                    <div class="flex items-center justify-center h-12 w-full  rounded-xl bg-green-500   text-white relative overflow-hidden font-semibold before:content-[''] before:absolute before:inset-0 before:bg-[repeating-linear-gradient(45deg,#ffffff30,#ffffff30_10px,transparent_10px,transparent_20px)] before:pointer-events-none">ACTIVE</div>
                                </div>
                                <div v-show="!prebook.inPrebook" class="w-full ">
                                    <label for="location" class=" mb-1 ml-2 text-sm font-medium text-gray-400">Global status</label>
                                    <div class="flex items-center justify-center h-12 w-full  rounded-xl bg-red-500   text-white relative overflow-hidden font-semibold before:content-[''] before:absolute before:inset-0 before:bg-[repeating-linear-gradient(45deg,#ffffff30,#ffffff30_10px,transparent_10px,transparent_20px)] before:pointer-events-none">CLOSED</div>
                                </div>
                            </div>
                            <!-- КНОПКИ -->
                            <div class="flex gap-2">
                                <div class="h-12">
                                    <button @click="onAdd" class=" w-28 py-3 cursor-pointer bg-orange-400 text-white rounded-xl hover:bg-orange-600">
                                        Edit prebook
                                    </button>
                                </div>
                                <div class="h-12">
                                    <button @click="openModalClosePrebook()" class=" w-32 py-3 cursor-pointer bg-red-400 text-white rounded-xl hover:bg-orange-600">
                                        Close prebook
                                    </button>
                                </div>
                            </div>

                            <!-- ДАННЫЕ -->
                            <div class="flex gap-4">
                                <div class="w-full">
                                    <label for="location" class="mb-1 ml-2 text-sm font-medium text-gray-400">Date start</label>
                                    <span class="flex items-center justify-center h-12 w-full bg-white rounded-xl">{{new Date(prebook.startPrebook).toLocaleDateString('ru-RU')}}</span>
                                </div>
                                <div class="w-full">
                                    <label for="location" class="mb-1 ml-2 text-sm font-medium text-gray-400">Date end</label>
                                    <span class="flex items-center justify-center h-12 w-full bg-white rounded-xl">{{new Date(prebook.endPrebook).toLocaleDateString('ru-RU')}}</span>
                                </div>
                            </div>

                            <!-- КАРТОЧКА БАЙКА -->
                            <div class="flex h-fit w-full py-2">
                                <span class="w-30 h-30 overflow-hidden rounded-xl bg-gray-300"><img  :src="prebook.garage.photoUrl"  alt=""></span>
                                <span class="ml-4">
                                    <p class="text-xs">ID Bike: {{prebook.garage.id}}</p>
                                    <h1   v-copy class="font-bold md:text-2xl">{{prebook.garage.name}}</h1>
                                    <h2>Priority: {{prebook.garage.priority}}</h2>
                                    <span class="flex gap-2 mt-2">
                                        <NuxtLink  :to="`/garage/${prebook.garage.id}`">
                                        <button class="px-6 py-2  bg-gray-200 rounded-xl cursor-pointer">
                                            Open Card
                                        </button></NuxtLink>
                                    </span>
                                </span>
                            </div>

                            <!-- КАРТОЧКА КЛИЕНТА -->
                            <div class="flex h-fit w-ful py-2">
                                <span class="w-30 h-30 overflow-hidden rounded-xl bg-gray-300"><img   alt=""></span>
                                <span class="ml-4">
                                    <!-- <p class="text-xs">ID Client: {{prebook.client.id}}</p> -->
                                    <h1 class="font-bold md:text-2xl">{{prebook.clientName}}</h1>
                                    <!-- <h2>Phone: {{prebook.client.phoneNumber}}</h2> -->
                                    <span class="flex gap-2 mt-2">
                                        <!-- <NuxtLink  :to="`/client/${prebook.client.id}`">
                                        <button class="px-6 py-2  bg-gray-200 rounded-xl cursor-pointer">
                                            Open Card
                                        </button></NuxtLink> -->
                                    </span>
                                </span>
                            </div>

                            <!-- ДАННЫЕ -->
                            <div class="w-full">
                                <label for="location" class="mb-1 ml-2 text-sm font-medium text-gray-400">Comment</label>
                                <span class="px-3 py-2 flex items-start justify-start h-20 w-full bg-white rounded-xl">{{prebook.note}}</span>
                            </div>
                        </div>
                    </section>
                </section>
            </section>
        </section>

        <!-- ✏️✏️✏️✏️✏️✏️ РЕДАКТИРОВАНИЕ БРОНИРОВАНИЯ ✏️✏️✏️✏️✏️✏️  -->
        <section @click="onAdd" v-show="showFormEditBooking" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 w-full">
            <div @click.stop class="w-[500px] bg-white rounded-xl shadow-xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
                  <h1 class="text-2xl font-bold text-center">Edit booking</h1>


                    <!-- АВТОКОМПЛИТ БАЙКОВ -->
                    <div class="w-full">
                        <div class="relative">
                            <label for="bike">
                            <span class="text-sm font-medium text-gray-400 ml-2 "> Bike or Car | <span class="text-blue-500">ID:{{ form.garageId }}</span> </span>
                            <input
                            v-model="form.garageId"
                            id="bike"
                            type="text"
                            disabled
                            autocomplete="off"
                            placeholder="Find..."
                            class="mt-1   p-3 w-full rounded-xl border-2 border-gray-300 cursor-no-drop bg-gray-200"
                          /></label>
                        </div>
                      </div>

                      <label for="clientName" class="w-60">
                        <span class="text-sm font-medium text-gray-400 ml-2 ">Client Name</span>
                        <input
                        v-model="form.clientName"
                          type="text"
                          id="clientName"
                          class="mt-1 mb-2 p-3 w-full rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-0 [&::-webkit-outer-spin-button]:hidden [&::-webkit-inner-spin-button]:hidden [&::-moz-appearance:textfield]:appearance-none "
                          autocomplete="off"
                        />
                      </label>

                  <label for="startPrebook">
                    <span class="text-sm font-medium text-gray-400 ml-2 ">Start prebook</span>
                    <input
                    v-model="form.startPrebook"
                      type="date"
                      id="startPrebook"
                      class="mt-1 mb-2  p-3 w-full rounded-xl border-2 border-gray-300"
                      autocomplete="off"
                    />
                  </label>

                  <label for="endPrebook">
                    <span class="text-sm font-medium text-gray-400 ml-2 ">End prebook</span>
                    <input
                    v-model="form.endPrebook"
                      type="date"
                      id="endPrebook"
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
                      class="mt-1 mb-2 p-3 w-full h-28 rounded-xl border-2 border-gray-300 [&::-webkit-outer-spin-button]:hidden [&::-webkit-inner-spin-button]:hidden [&::-moz-appearance:textfield]:appearance-none "
                      autocomplete="off"
                    />
                  </label>


                  <!-- КНОПКИ ДА НЕТ -->
                  <div class="flex gap-2 mt-5">
                      <button @click="submitForm" class="flex items-center justify-center gap-3 w-full h-12 rounded-xl  bg-green-500 text-white font-medium cursor-pointer">
                          <span>Save</span>
                          <div v-show="loadingEditPrebook"
                               class="w-5 h-5 border-3 border-white border-t-gray-500 rounded-full animate-spin"
                               role="status"
                               aria-label="Loading">
                          </div>
                      </button>
                      <button @click="onAdd" class="w-full py-3 cursor-pointer bg-red-400 text-white rounded-xl hover:bg-red-600">
                          Close
                      </button>
                  </div>

                  <!-- КОНТЕЙНЕР СПИННЕР -->
                  <!-- <div v-show="loadingForm" class="absolute inset-0 flex items-center justify-center bg-black/50">
                    <div
                      class="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"
                      role="status"
                      aria-label="Loading"
                    ></div>
                  </div> -->

                </div>
        </section>

        <!-- 🛡️🛡️🛡️🛡️ МОДАЛКА ЗАЩИТА 🛡️🛡️🛡️🛡️  -->
        <section @click="openModalClosePrebook()" v-show="closeProtection" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div @click.stop class="w-[500px] bg-white rounded-xl shadow-xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
                  <h2 class="text-2xl font-bold text-center">Closing the booking. Are you sure?</h2>
                  <div class="flex gap-2 mt-5">
                      <button @click="closeBooking()" class="flex items-center justify-center gap-3 w-full h-12 rounded-xl  bg-green-500 text-white font-medium cursor-pointer">
                          <span>Yes, close!</span>
                          <div v-show="loadingClosePrebook"
                               class="w-5 h-5 border-3 border-white border-t-gray-500 rounded-full animate-spin"
                               role="status"
                               aria-label="Loading">
                          </div>
                      </button>
                      <button @click="openModalClosePrebook()" class="w-full py-3 cursor-pointer bg-red-400 text-white rounded-xl hover:bg-red-600">
                          No
                      </button>
                  </div>
            </div>
            <!-- КОНТЕЙНЕР СПИННЕР -->
            <!-- <div v-if="loadingFormClose" class="absolute inset-0 flex items-center justify-center bg-black/50">
              <div
                class="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"
                role="status"
                aria-label="Loading"
              ></div>
            </div> -->
        </section>


    </section>
</template>

<script setup>
import Sidebar from '~/components/Sidebar.vue';
import PrebookHeader from '~/components/PrebookHeader.vue';
import {ref, computed} from 'vue'
import { useRoute } from 'vue-router'

const config = useRuntimeConfig()
const closeProtection = ref(false)
const route = useRoute()
// const loadingFormClose = ref(false)
const id = route.params.id
// const showForm = ref(false)
// const loadingForm = ref(false)
const loadingClosePrebook = ref('')
const loadingEditPrebook = ref('')

const showFormEditBooking = ref(false)


// Получаем данные с сервера
const { data, pending, error, refresh } = await useFetch(`${config.public.apiBase}/api/prebook/${id}`,{credentials: 'include'})
console.log(data.value.data)
const prebook = computed(() => data.value?.data ?? null)

//ПОДСТАВЛЯЕМ ДАННЫЕ В ФОРМУ
function onAdd() {
  showFormEditBooking.value = !showFormEditBooking.value
  if (showFormEditBooking.value && prebook.value) {
    form.value = {
      startPrebook:   prebook.value.startPrebook ? prebook.value.startPrebook.slice(0,10): '',
      endPrebook:     prebook.value.endPrebook ? prebook.value.endPrebook.slice(0,10): '',
      note:           prebook.value.note,
      clientName:      prebook.value.clientName,
      garageId:       prebook.value.garageId,
    }
  }
}
// Переменные формы
const form = ref({
  startPrebook: '',
  endPrebook: '',
  note: '',
  clientName: '',
  garageId: ''
})

// РЕДАКТИРОВАНИЕ ✏️ И ОТПРАВКА ♻️
const submitForm = async () => {
  loadingEditPrebook.value = true

  const payload = { ...form.value, id: id}

  if (payload.startPrebook) {
    payload.startPrebook = new Date(payload.startPrebook).toISOString()
  }
  if (payload.endPrebook) {
    payload.endPrebook = new Date(payload.endPrebook).toISOString()
  }
  try {
    const result = await $fetch(`${config.public.apiBase}/api/prebook/${id}`, {
      method: 'PUT',
      credentials: 'include',
      body: payload
    })
    loadingEditPrebook.value = false
    showFormEditBooking.value = false
    await refresh()
    console.log('Успешно добавлено:', result)
  } catch (err) {
    console.error('Ошибка при отправке:', err)
  }
}


// ОКНО ПРЕБУКА
const openModalClosePrebook = () =>{
  if (closeProtection.value){
    closeProtection.value = false
  } else {
    closeProtection.value = true
  }
}

// ЗАКРЫТИЕ ПРЕБУКА ♻️
const closeBooking = async () => {
  loadingClosePrebook.value = true

  const payload = {
    inPrebook: false,
    id: id,
    clientId: prebook.value.clientId,
    garageId:prebook.value.garageId
  }
  try {
    const result = await $fetch(`${config.public.apiBase}/api/prebook/${id}`, {
      method: 'PATCH',
      credentials: 'include',
      body: payload
    })
    loadingClosePrebook.value = false
    closeProtection.value = false

    await refresh()
    console.log('Успешно обновлено:', result)
  } catch (err) {
    console.error('Ошибка при отправке:', err)
  }
}

definePageMeta({
  middleware: 'auth',
  requiredRole:  ['STAFF', 'MECHANIC', 'ADMIN', 'SUPERADMIN'],
})
</script>
