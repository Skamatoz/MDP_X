<template>
<!-- eslint-disable -->

    <div class="flex flex-col w-screen h-screen bg-white">
        <Sidebar />
        <section class="flex flex-col h-screen w-screen ">
            <BookingHeader
              v-model="searchTerm"
              @search="onSearch"
              @add="onAdd"
              :loading="pending ||loading"
            />
            <!-- КОНТЕНТ СО СКРОЛЛОМ-->
            <section class="overflow-y-auto mb-20 ">

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
                            <div v-show="pending" class="h-6 w-6 border-4 border-gray-200 border-t-gray-500 rounded-full animate-spin" role="status" aria-label="Loading"></div>
                        </span>
                        <span v-show="!pending">GO</span>
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
                <table  class="w-full bg-white divide-y divide-gray-200 mb-20">
                  <tbody>
                    <template v-for="group in groupsByDate" :key="group.date">
                      <!-- Заголовок группы -->
                      <tr class="bg-gray-100">
                        <td  colspan="4" class="px-4 py-2 font-bold"  :class="getDateClass(group.iso)">{{ group.date }}<span class="text-gray-400 font-normal">[{{ group.items.length }}]</span></td>
                      </tr>

                      <!-- Элементы внутри группы -->
                      <tr v-for="item in group.items" :key="item.id" class="hover:bg-gray-100">
                        <td class="cursor-pointer px-2 py-3 whitespace-nowrap text-sm text-gray-900">
                          <NuxtLink :to="`/garage/${item.id}`"><img class="w-8 h-8 rounded" :src="item.garage.photoUrl" /></NuxtLink>
                        </td>
                        <td class="cursor-pointer px-2 py-3 whitespace-nowrap text-sm text-gray-900 ">
                          <NuxtLink :to="`/booking/${item.id}`"><span class="font-bold">{{ item.garage.name }}</span><br><span class="text-gray-500 ">{{ truncateText(item.client.name, 22) }}</span></NuxtLink>
                        </td>
                        <td  class="cursor-pointer px-2 py-3 whitespace-nowrap text-sm">
                          <NuxtLink :to="`/booking/${item.id}`">
                              <span class="flex w-fit gap-2 items-center  border px-2 py-1 border-gray-200 rounded-md">
                                  <!-- <svg v-show="item.photoContract" viewBox="0 0 24 24"   xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="size-4 text-success-base text-green-500"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM17.4571 9.45711L11 15.9142L6.79289 11.7071L8.20711 10.2929L11 13.0858L16.0429 8.04289L17.4571 9.45711Z"></path></svg> -->
                                  <svg v-show="item.photoContract" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" class="text-green-500" d="m23.5 17l-5 5l-3.5-3.5l1.5-1.5l2 2l3.5-3.5zM6 2a2 2 0 0 0-2 2v16c0 1.11.89 2 2 2h7.81c-.36-.62-.61-1.3-.73-2H6V4h7v5h5v4.08c.33-.05.67-.08 1-.08c.34 0 .67.03 1 .08V8l-6-6M8 12v2h8v-2m-8 4v2h5v-2Z"/></svg>
                                  <!-- <svg v-show="!item.photoContract" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class=" size-4 shrink-0 text-error-base text-red-500"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z"></path></svg> -->
                                  <svg v-show="!item.photoContract" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" class="text-red-500" d="M23 18h-8v2h8M6 2a2 2 0 0 0-2 2v16c0 1.11.89 2 2 2h7.81c-.36-.62-.61-1.3-.73-2H6V4h7v5h5v4.08c.33-.05.67-.08 1-.08c.34 0 .67.03 1 .08V8l-6-6M8 12v2h8v-2m-8 4v2h5v-2Z"/></svg>
                                  <span v-show="item.photoContract" class=" text-stone-600">Loaded</span>
                                  <span v-show="!item.photoContract" class=" text-stone-600">Empty</span>
                              </span>
                          </NuxtLink>
                        </td>

                        <td class="hidden sm:block cursor-pointer px-2 py-3 whitespace-normal break-words text-xs text-gray-500">
                          <NuxtLink :to="`/booking/${item.id}`">{{ item.note }}</NuxtLink>
                        </td>
                      </tr>
                    </template>
                  </tbody>
                  <!-- <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="(item, idx) in items" :key="item.id" class="hover:bg-gray-100">
                        <td class="cursor-pointer px-2 py-3 whitespace-nowrap text-sm text-gray-900"><NuxtLink   :to="`/garage/${item.id}`"><img class="w-8 h-8 rounded" :src="item.garage.photoUrl" alt="" /></NuxtLink></td>
                        <td class="cursor-pointer px-2 py-3 whitespace-nowrap text-sm text-gray-900"><NuxtLink :to="`/booking/${item.id}`"><span class="font-bold">{{item.garage.name}}</span> <br> <span class="text-gray-500">{{item.client.name}}</span></NuxtLink></td>
                        <td :class="getDateClass(item.startRental)" class="cursor-pointer px-2 py-3 whitespace-nowrap text-sm "><NuxtLink :to="`/booking/${item.id}`"><span class="">{{new Date(item.startRental).toLocaleDateString('ru-RU')}}</span></NuxtLink></td>
                        <td class="hidden sm:block cursor-pointer px-2 py-3 whitespace-normal break-words text-xs text-gray-500"><NuxtLink :to="`/booking/${item.id}`">{{item.note}}</NuxtLink></td>
                    </tr>
                  </tbody> -->
                </table>
                <p v-if="pending" class="mt-4 text-gray-500">Загрузка...</p>
                <p v-if="error" class="mt-4 text-red-500">Ошибка: {{ error.message }}</p>
            </section>

            <!-- НАВИГАЦИЯ -->
            <section class="pb-3 fixed bottom-0 z-20 bg-white w-full border-t border-gray-200">
                <!-- Навигация постранично -->
                   <nav class="flex items-center mt-3 space-x-1">
                     <button @click="prevPage" class=" cursor-pointer px-4 py-2 bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200">
                       Previous
                     </button>

                     <button @click="nextPage" class=" cursor-pointer px-4 py-2 bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200" >
                       Next
                     </button>
                     <!-- <span>{{params.page}} из {{totalPages}}</span> -->
                   </nav>
            </section>

            <!-- ✏️✏️✏️✏️✏️✏️ ДОБАВЛЕНИЕ БРОНИРОВАНИЯ ✏️✏️✏️✏️✏️✏️ @click="onAdd" -->
            <section  v-show="showForm" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div  class="w-[500px] bg-white rounded-xl shadow-xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
                      <h2 class="text-xl font-bold text-center">Add renting</h2>

                      <!-- АВТОКОМПЛИТ БАЙКОВ -->
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
                                  <div class="flex items-center gap-5">
                                  <span>
                                      {{ item.name }}
                                  </span>
                                  <span class="flex w-fit gap-2 items-center  border px-2 py-1 border-gray-200 rounded-md">
                                      <svg v-show="!item.hasActiveBooking" viewBox="0 0 24 24"  :class="!item.hasActiveBooking ? 'text-green-500'  : ''" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="size-4 text-success-base"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM17.4571 9.45711L11 15.9142L6.79289 11.7071L8.20711 10.2929L11 13.0858L16.0429 8.04289L17.4571 9.45711Z"></path></svg>
                                      <svg v-show="item.hasActiveBooking" viewBox="0 0 24 24"   :class="item.hasActiveBooking ? 'text-red-500'  : ''"xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class=" size-4 shrink-0 text-error-base"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z"></path></svg>
                                      <span v-show="!item.hasActiveBooking" class=" text-stone-600">Free</span>
                                      <span v-show="item.hasActiveBooking" class=" text-stone-600">Busy</span>
                                  </span>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <!-- АВТОКОМПЛИТ КЛИЕНТОВ -->
                        <div class="w-full">
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
                              v-show="openClient && optionsClient.length"
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
                          </div>

                      <label for="startRental">
                        <span class="text-sm font-medium text-gray-400 ml-2 ">Start Rental</span>
                        <input
                        v-model="form.startRental"
                          type="date"
                          id="startRental"
                          class="mt-1 mb-2  p-3 w-full rounded-xl border-2 border-gray-300"
                          autocomplete="off"
                        />
                      </label>

                      <label for="endRental">
                        <span class="text-sm font-medium text-gray-400 ml-2 ">End Rental</span>
                        <input
                        v-model="form.endRental"
                          type="date"
                          id="endRental"
                          class="mt-1 mb-2  p-3 w-full rounded-xl border-2 border-gray-300"
                          autocomplete="off"
                        />
                      </label>

                      <label for="timeRental">
                        <span class="text-sm font-medium text-gray-400 ml-2 "> Time </span>
                      <select  v-model="form.timeRental" class="mt-1 mb-2  p-3 w-full rounded-xl border-2 border-gray-300">
                        <option :value="null" disabled >Select time</option>
                        <option v-for="p in timeRentalArray" :key="p.value" :value="p.value"> {{ p.tag }} </option>
                      </select>
                      </label>

                      <label for="location">
                        <span class="text-sm font-medium text-gray-400 ml-2 "> Location </span>
                      <select  v-model="form.location" class="mt-1 mb-2  p-3 w-full rounded-xl border-2 border-gray-300">
                        <option :value="null" disabled >Select location</option>
                        <option v-for="p in locationArray" :key="p.value" :value="p.value"> {{ p.tag }} </option>
                      </select>
                      </label>




                      <!-- УРОВЕНЬ ТОПЛИВА -->
                      <label for="levelGasoline">
                        <span class="text-sm font-medium text-gray-400 ml-2 ">Level Gasoline</span>
                      <select  v-model="form.levelGasoline" class="mt-1 mb-2  p-3 w-full rounded-xl border-2 border-gray-300">
                        <option :value="null" disabled >Select location</option>
                        <option v-for="p in levelGasolineArray" :key="p.value" :value="p.value"> {{ p.tag }} </option>
                      </select>
                      </label>

                      <label for="helmet">
                        <span class="text-sm font-medium text-gray-400 ml-2 ">Helmet</span>
                        <input
                        v-model="form.helmet"
                          type="text"
                          id="helmet"
                          class="mt-1 mb-2  p-3 w-full rounded-xl border-2 border-gray-300 [&::-webkit-outer-spin-button]:hidden [&::-webkit-inner-spin-button]:hidden [&::-moz-appearance:textfield]:appearance-none "
                          autocomplete="off"
                        />
                      </label>

                      <label for="debt" class="w-60">
                        <span class="text-sm font-medium text-gray-400 ml-2 ">Debt</span>
                        <input
                        v-model="form.debt"
                          type="number"
                          id="debt"
                          class="mt-1 mb-2 p-3 w-full rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-0 [&::-webkit-outer-spin-button]:hidden [&::-webkit-inner-spin-button]:hidden [&::-moz-appearance:textfield]:appearance-none "
                          :class="form.debt > 0 ? 'border-2 border-red-500 text-red-500' : ''"
                          autocomplete="off"
                        />
                      </label>

                      <label for="debtNote" class="w-60">
                        <span class="text-sm font-medium text-gray-400 ml-2 ">Debt Comment</span>
                        <input
                        v-model="form.debtNote"
                          type="text"
                          id="debtNote"
                          :class="form.debt > 0 ? 'border-2 border-red-500 text-red-500' : ''"
                          class="mt-1 mb-2 p-3 w-full rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-0 [&::-webkit-outer-spin-button]:hidden [&::-webkit-inner-spin-button]:hidden [&::-moz-appearance:textfield]:appearance-none "
                          autocomplete="off"
                        />
                      </label>

                      <label for="paid">
                        <span class="text-sm font-medium text-gray-400 ml-2 ">Paid</span>
                        <input
                        v-model="form.paid"
                          type="number"
                          id="paid"
                          class="mt-1 mb-2  p-3 w-full rounded-xl border-2 border-gray-300 [&::-webkit-outer-spin-button]:hidden [&::-webkit-inner-spin-button]:hidden [&::-moz-appearance:textfield]:appearance-none "
                          autocomplete="off"
                        />
                      </label>

                      <div class="flex gap-6 mt-4 ml-2">
                        <label class="inline-flex items-center cursor-pointer">
                          <input
                            v-model="form.currencyPaid"
                            type="radio"
                            name="currencyPaid"
                            value="Bath(฿)"
                            class="form-radio h-5 w-5 text-blue-600 transition duration-150 ease-in-out cursor-pointer"/>
                          <span class="ml-2 text-sm font-medium text-gray-700">Baht</span>
                        </label>

                        <label class="inline-flex items-center cursor-pointer">
                          <input
                            v-model="form.currencyPaid"
                            type="radio"
                            name="currencyPaid"
                            value="Rubl(₽)"
                            class="form-radio h-5 w-5 text-blue-600 transition duration-150 ease-in-out cursor-pointer"/>
                          <span class="ml-2 text-sm font-medium text-gray-700">Ruble</span>
                        </label>
                      </div>


                      <label for="deposit">
                        <span class="text-sm font-medium text-gray-400 ml-2 ">Deposit</span>
                        <input
                        v-model="form.deposit"
                          type="text"
                          id="deposit"
                          class="mt-1 mb-2  p-3 w-full rounded-xl border-2 border-gray-300 [&::-webkit-outer-spin-button]:hidden [&::-webkit-inner-spin-button]:hidden [&::-moz-appearance:textfield]:appearance-none "
                          autocomplete="off"
                        />
                      </label>

                      <div class="flex gap-6 mt-4 ml-2">
                        <label class="inline-flex items-center cursor-pointer">
                          <input
                            v-model="form.currencyDeposit"
                            type="radio"
                            name="currencyDeposit"
                            value="Bath(฿)"
                            class="form-radio h-5 w-5 text-blue-600 transition duration-150 ease-in-out cursor-pointer"/>
                          <span class="ml-2 text-sm font-medium text-gray-700">Baht</span>
                        </label>

                        <label class="inline-flex items-center cursor-pointer">
                          <input
                            v-model="form.currencyDeposit"
                            type="radio"
                            name="currencyDeposit"
                            value="Rubl(₽)"
                            class="form-radio h-5 w-5 text-blue-600 transition duration-150 ease-in-out cursor-pointer"/>
                          <span class="ml-2 text-sm font-medium text-gray-700">Ruble</span>
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


                      <!-- КНОПКИ ДА НЕТ -->
                      <div class="flex gap-2 mt-5">
                          <!-- <button @click="submitForm" class="w-full py-3 cursor-pointer bg-green-400 text-white rounded-xl hover:bg-green-600">
                              Save
                          </button> -->
                          <button @click="submitForm" class="flex items-center justify-center gap-3 w-full h-12 rounded-xl  bg-green-500 text-white font-medium cursor-pointer">
                              <span>Save</span>
                              <div v-show="loadingCreateRenting"
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
                      <div v-show="loadingForm" class="absolute inset-0 flex items-center justify-center bg-black/50">
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
import BookingHeader from '~/components/BookingHeader.vue';
import {ref, reactive, computed} from 'vue'
import debounce from 'lodash.debounce'
import { useRouter, useRoute } from 'vue-router'

const searchTerm = ref('')
const searchType = ref('garage')
const route = useRoute()
const loadingCreateRenting = ref('')
const config = useRuntimeConfig()
const router = useRouter()
const filter = ref('')
const open = ref(false)
const options = ref([])
const selectedId = ref(null)
const filterClient = ref('')
const openClient = ref(false)
const optionsClient = ref([])
const selectedIdClient = ref(null)
const showForm = ref(false)
const loadingForm = ref(false)
const loading = ref(false)
const form = ref({
  clientId: selectedIdClient,
  garageId: selectedId,
  startRental: '',
  endRental: '',
  timeRental: '',
  location: '',
  levelGasoline: '',
  helmet: '',
  paid: 0,
  currencyPaid: '',
  deposit: '',
  currencyDeposit: '',
  fine:0,
  debtNote:'',
  debt:0,
  note:''
})

function truncateText(text, maxLength = 20) {
  if (!text) return ''
  return text.length > maxLength ? text.slice(0, maxLength) + '…' : text
}


// ПОДСТАНОВКА В ФОРМУ БАЙКИ
const doSearch = debounce(async () => {
  if (!filter.value.trim()) {
    options.value = []
    return
  }
  options.value = await $fetch(`${config.public.apiBase}/api/garage/search?q=${filter.value}`,
    {credentials: 'include',})
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

// ПОДСТАНОВКА В ФОРМУ КЛИЕНТЫ
const doSearchClient = debounce(async () => {
  if (!filterClient.value.trim()) {
    optionsClient.value = []
    return
  }
  // простой запрос к новому эндпоинту
  optionsClient.value = await $fetch(`${config.public.apiBase}/api/client/search?q=${filterClient.value}`,{credentials: 'include'})
}, 300)

function onInputClient() {
  openClient.value = true
  doSearchClient()
}

function selectClient(g) {
  selectedIdClient.value = g.id
  filterClient.value = g.name
  openClient.value = false
}

// ПАГИНАЦИЯ В ЗАПРОС
const params = reactive({
  page: 1,
  q: '',
  search: searchType.value
})

// ЗАПРОС К БД
const { data, pending, error, refresh } = useFetch(`${config.public.apiBase}/api/booking/all`, {
  params,
    suspense: false,
    credentials: 'include',
    onResponseError({ response }) {
      if (response.status === 401) {
        localStorage.removeItem('token')
        router.push('/login')
      }
    }

})



function formatDateKeyLocal(isoDate) {
  const d = new Date(isoDate)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}` // YYYY-MM-DD локального дня
}

const groupsByDate = computed(() => {
  // сортируем, как и на бэке: startRental desc
  const sorted = [...items.value].sort(
    (a, b) => new Date(b.startRental) - new Date(a.startRental)
  )

  const map = new Map()
  for (const item of sorted) {
    const key = formatDateKeyLocal(item.startRental)
    if (!map.has(key)) {
      map.set(key, {
        iso: key,
        date: new Date(key).toLocaleDateString('ru-RU'),
        items: []
      })
    }
    map.get(key).items.push(item)
  }
  return Array.from(map.values())
})



// const groupsByDate = computed(() => {
//   const sorted = [...items.value].sort(
//     (a, b) => new Date(b.startRental) - new Date(a.startRental)
//   )

//   const map = new Map()
//   for (const item of sorted) {
//     const d = new Date(item.startRental)
//     d.setHours(0,0,0,0)

//     const iso = d.toISOString().slice(0,10)        // для getDateClass
//     const display = d.toLocaleDateString('ru-RU')  // для отображения

//     if (!map.has(iso)) map.set(iso, { iso, date: display, items: [] })
//     map.get(iso).items.push(item)
//   }

//   return Array.from(map.values())
// })
// const groupsByDate = computed(() => {
//   // console.log(data)
//   // 1) Сортируем по дате начала аренды
//   const sorted = [...items.value].sort(
//     (a, b) => new Date(b.startRental) - new Date(a.startRental)
//   )

//   // 2) Группируем
//   const map = new Map()
//   for (const item of sorted) {
//     const dateKey = new Date(item.startRental).toLocaleDateString('ru-RU')
//     if (!map.has(dateKey)) map.set(dateKey, [])
//     map.get(dateKey).push(item)
//   }

//   // 3) Возвращаем массив групп
//   return Array.from(map, ([date, items]) => ({ date, items }))
// })

// ФУНКЦИЯ ПОИСКА
function onSearch() {
  params.page = 1
  params.q    = searchTerm.value.trim()
  params.search = searchType.value     // <-- вот он, тип поиска

  router.replace({ query: { q: params.q, search: params.search, page: String(params.page) } })
    refresh()
}

// ПЕРКЛЮЧАТЕЛЬ ПОИСКА
function searchTypeF() {
  if (searchType.value === 'garage') {
    searchType.value = 'client';
  } else if (searchType.value === 'client') {
    searchType.value = 'comment';
  } else {
    searchType.value = 'garage';
  }
  console.log(searchType.value);
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

// ОТКРЫТИЕ ФОРМЫ ДОБАВЛЕНИЯ
function onAdd() {
  if(showForm.value){
    showForm.value = false
  } else{
    showForm.value = true
  }
}

const submitForm = async () => {
  loadingCreateRenting.value = true
  try {
    const result = await $fetch(`${config.public.apiBase}/api/booking`, {
      method: 'POST',
      credentials: 'include',
      body: form.value
    })

    await refresh()
    showForm.value = false
    loadingCreateRenting.value = false
    router.push(`/booking/${result.data.id}`)
    console.log('Успешно добавлено:', result)

  } catch (err) {
    loadingCreateRenting.value = false

    // 👉 Пробуем извлечь текст ошибки
    const message = err?.data?.error || 'Ошибка при создании бронирования'

    console.error('Ошибка при отправке:', message)

    // 👉 Показываем ошибку пользователю (пример через alert, можешь заменить на toast/notification)
    alert(message)
  }
}


// // ОТПРАВКА ФОРМЫ
// const submitForm = async () => {
//   loadingCreateRenting.value = true
//   try {
//     const result = await $fetch(`${config.public.apiBase}/api/booking`, {
//       method: 'POST',
//       credentials: 'include',
//       body: form.value
//     })
//     await refresh()
//      showForm.value = false
//      loadingCreateRenting.value = false
//      router.push(`/booking/${result.data.id}`)
//     console.log('Успешно добавлено:', result)

//   } catch (err) {
//     console.error('Ошибка при отправке:', err)
//   }
// }

//ВРЕМЕННЫЕ МАССИВЫ
const locationArray = [
  { value: 'MAIN_OFFICE', tag: 'Main Office' },
  { value: 'PRATAMNUK',   tag: 'Pratam Nuk' }
]

const levelGasolineArray = [
  { value: '25%', tag: '25%' },
  { value: '50%', tag: '50%' },
  { value: '75%', tag: '75%' },
  { value: 'FULL', tag: 'FULL'},
]

const timeRentalArray = [
  { value: '10:00', tag: '10:00' },
  { value: '11:00', tag: '11:00' },
  { value: '12:00', tag: '12:00' },
  { value: '13:00', tag: '13:00'},
  { value: '14:00', tag: '14:00'},
  { value: '15:00', tag: '15:00'},
  { value: '16:00', tag: '16:00'},
  { value: '17:00', tag: '17:00'},
  { value: '18:00', tag: '18:00'},
  { value: '19:00', tag: '19:00'},
  { value: '20:00', tag: '20:00'},
]


function getDateClass(iso) {
  if (!iso) return 'text-black'

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [y, m, d] = iso.split('-').map(Number)   // 'YYYY-MM-DD'
  const dt = new Date(y, m - 1, d)
  dt.setHours(0, 0, 0, 0)

  const diffDays = (dt - today) / (1000 * 60 * 60 * 24)

  if (diffDays === 0) return 'text-green-600'     // сегодня
  return 'text-black'
}


// function getDateClass(iso) {
//   if (!iso) return 'text-black'

//   const today = new Date()
//   today.setHours(0, 0, 0, 0)

//   const [y, m, d] = iso.split('-').map(Number)
//   const dt = new Date(y, m - 1, d)
//   dt.setHours(0, 0, 0, 0)

//   const diff = (dt - today) / (1000 * 60 * 60 * 24)
//   if (diff === 0) return 'text-green-600'
//   return 'text-black'
// }


// // ДИНАМИЧЕСКИЙ КЛАСС ДЛЯ ПОДСВЕТКИ ДАТЫ
// function getDateClass(iso) {
//   if (!iso) return 'text-black'

//   const today = new Date()
//   today.setHours(0, 0, 0, 0)

//   // iso приходит как '19.08.2025'
//   const [day, month, year] = iso.split('.')
//   const d = new Date(year, month - 1, day) // ✅ правильное преобразование
//   d.setHours(0, 0, 0, 0)

//   const diff = (d - today) / (1000 * 60 * 60 * 24)

//   if (diff === 0) return 'text-green-600'   // сегодня
//   return 'text-black'
// }


router.beforeEach((to, from, next) => {
  loading.value = true
  next()
})

// ЧЕКАЕМ НА КАКОМ МЫ РОУТЕ
const activeTab = computed(() => {
  const segs = route.path.split('/')
  return segs[2] || 'all'
})
const hasExtra = computed(() => Boolean(route.params.id))

definePageMeta({
  middleware: 'auth',
  requiredRole:  ['STAFF','ADMIN', 'SUPERADMIN'],
})

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
</script>
