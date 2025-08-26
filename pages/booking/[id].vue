
<template>
<!-- eslint-disable -->

    <section class="flex flex-col w-screen h-screen bg-white">
        <Sidebar />
        <section class="flex flex-col h-screen w-screen ">
            <BookingHeader
                :loading="pending"
            />
            <!-- ДАННЫЕ СО СКРОЛОМ-->
            <section class="overflow-y-auto p-4 ">

                <!-- ОБРАБОТЧИК ОШИБОК -->
                <p v-if="pending" class="mt-4 text-gray-500">Загрузка...</p>
                <p v-else-if="error" class="mt-4 text-red-500">Ошибка: {{ error.message }}</p>

                <!-- КОНТЕЙНЕР ЭКРАНОВ -->
                <section v-else class="flex flex-wrap md:flex-nowrap w-full h-full gap-2 mb-2">


                    <!-- 👈🏻👈🏻👈🏻👈🏻 ЛЕВЫЙ БЛОК 👈🏻👈🏻👈🏻👈🏻-->
                    <section class="flex flex-auto min-w-[370px] max-w-[700px] h-[740px] rounded-xl bg-gray-100 ">
                        <!-- БЛОК С ДАННЫМИ -->
                        <div class="flex flex-col w-full p-4 gap-2">
                            <div class="flex gap-4">
                                <!-- <div class="w-20">
                                    <label for="location" class="mb-1 ml-2 text-sm font-medium text-gray-400"></label>
                                    <span @click="goBack" class="flex items-center justify-center h-12 w-full bg-black text-white rounded-xl cursor-pointer">Back</span>
                                </div> -->
                                <div class="w-32">
                                    <label for="location" class="mb-1 ml-2 text-sm font-medium text-gray-400">ID Booking</label>
                                    <span v-copy class="flex items-center justify-center h-12 w-full border-2 border-dashed border-gray-300 rounded-xl">{{booking.id}}</span>
                                </div>
                                <div v-if="!booking.photoContract" class="w-32">
                                    <label for="location" class="mb-1 ml-2 text-sm font-medium text-gray-400">Donwload</label>
                                    <button  class="flex items-center justify-center h-12 w-full border-2 border-dashed border-gray-300 rounded-xl cursor-pointer " @click="showFormContract=true">+ Contract</button>
                                </div>
                                <div v-if="booking.photoContract" class="w-12 ">
                                    <label for="location" class=" ml-2 text-sm font-medium text-gray-400"></label>
                                     <a  :href="booking.photoContract" target="_blank" rel="noopener noreferrer" ><span class="flex items-center justify-center h-12 w-full border-2 border-green-500 rounded-xl overflow-hidden "><img class="h-full w-full"  :src="booking.photoContract" alt=""></span></a>
                                </div>
                                <div v-if="booking.photoContract" class="w-14">
                                    <label for="location" class="mb-1 ml-2 text-sm font-medium text-gray-400"></label>
                                    <button  class="flex items-center justify-center h-12 w-full rounded-xl cursor-pointer bg-red-500" @click="closeProtectionContractDeleteF()">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE --><path class="text-white" fill="currentColor" d="m12 13.4l2.9 2.9q.275.275.7.275t.7-.275t.275-.7t-.275-.7L13.4 12l2.9-2.9q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275L12 10.6L9.1 7.7q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7l2.9 2.9l-2.9 2.9q-.275.275-.275.7t.275.7t.7.275t.7-.275zm0 8.6q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/></svg>
                                    </button>
                                </div>
                            </div>
                            <div class="flex gap-4">
                                <div class="w-full">
                                    <label for="location" class="mb-1 ml-2 text-sm font-medium text-gray-400">Start Rental </label>
                                    <span class="flex items-center justify-center h-12 w-full bg-white rounded-xl">{{new Date(booking.startRental).toLocaleDateString('ru-RU')}}<span v-show="booking.timeRental">, {{booking.timeRental}}</span></span>
                                </div>
                                <div class="w-full">
                                    <label for="location" class="mb-1 ml-2 text-sm font-medium text-gray-400">End Rental</label>
                                    <span class="flex items-center justify-center h-12 w-full bg-white rounded-xl">{{new Date(booking.endRental).toLocaleDateString('ru-RU')}}<span v-show="booking.timeRental">, {{booking.timeRental}}</span></span>
                                </div>
                            </div>
                            <div class="flex gap-4">
                                <div class="w-full">
                                    <label for="location" class="mb-1 ml-2 text-sm font-medium text-gray-400">Location</label>
                                    <span class="flex items-center justify-center h-12 w-full bg-white rounded-xl">{{booking.location}}</span>
                                </div>
                                <div class="w-full">
                                    <label for="location" class="mb-1 ml-2 text-sm font-medium text-gray-400">Fine</label>
                                    <span class="flex items-center justify-center h-12 w-full bg-white rounded-xl">{{booking.fine}}</span>
                                </div>
                            </div>
                            <div class="flex gap-4">
                                <div class="w-full">
                                    <label for="location" class="mb-1 ml-2 text-sm font-medium text-gray-400">Level Gasoline</label>
                                    <span class="flex items-center justify-center h-12 w-full bg-white rounded-xl">{{booking.levelGasoline}}</span>
                                </div>
                                <div class="w-full">
                                    <label for="location" class="mb-1 ml-2 text-sm font-medium text-gray-400">Helmet</label>
                                    <span class="flex items-center justify-center h-12 w-full bg-white rounded-xl">{{booking.helmet}}</span>
                                </div>
                            </div>
                            <div class="flex gap-4">
                                <div class="w-full">
                                    <label for="location" class="mb-1 ml-2 text-sm font-medium text-gray-400">Amount of Rent</label>
                                    <span class="flex items-center justify-center h-12 w-full bg-white rounded-xl">{{booking.paid}}</span>
                                </div>
                                <div class="w-full">
                                    <label for="location" class="mb-1 ml-2 text-sm font-medium text-gray-400">Currency</label>
                                    <span class="flex items-center justify-center h-12 w-full bg-white rounded-xl">{{booking.currencyPaid}}</span>
                                </div>
                            </div>
                            <div class="flex gap-4">
                                <div class="w-full">
                                    <label for="location" class="mb-1 ml-2 text-sm font-medium text-gray-400">Amount of Deposit</label>
                                    <span class="flex items-center justify-center h-12 w-full bg-white rounded-xl">{{booking.deposit}}</span>
                                </div>
                                <div class="w-full">
                                    <label for="location" class="mb-1 ml-2 text-sm font-medium text-gray-400">Currency</label>
                                    <span class="flex items-center justify-center h-12 w-full bg-white rounded-xl">{{booking.currencyDeposit}}</span>
                                </div>
                            </div>
                            <div class="flex gap-4">
                                <div class="w-full">
                                    <label for="location" class="mb-1 ml-2 text-sm font-medium text-gray-400">Amount debt</label>
                                    <span :class="booking.debt > 0 ? 'border-2 border-red-500 text-red-500' : ''" class="flex items-center justify-center h-12 w-full bg-white rounded-xl">{{booking.debt}}</span>
                                </div>
                                <div class="w-full">
                                    <label for="location" class="mb-1 ml-2 text-sm font-medium text-gray-400">Debt comment</label>
                                    <span :class="booking.debt > 0 ? 'border-2 border-red-500 text-red-500' : ''" class="flex items-center justify-center h-12 w-full bg-white rounded-xl">{{booking.debtNote}}</span>
                                </div>
                            </div>
                            <div class="w-full">
                                <label for="location" class="mb-1 ml-2 text-sm font-medium text-gray-400">Comment</label>
                                <span class="px-3 py-2 flex items-start justify-start h-15 w-full bg-white rounded-xl">{{booking.note}}</span>
                            </div>
                        </div>
                    </section>

                    <!-- 👉🏻👉🏻👉🏻👉🏻 ПРАВЫЙ БЛОК 👉🏻👉🏻👉🏻👉🏻-->
                    <section class="flex flex-col flex-auto min-w-[370px] h-[740px] bg-gray-100 rounded-xl p-4 gap-2">

                        <!-- СТАТУСЫ -->
                        <div class="flex gap-1">
                            <div  v-if="booking.isActive" class="w-40">
                                <label for="location" class=" mb-1 ml-2 text-sm font-medium text-gray-400">Global status</label>
                                <div class="flex items-center justify-center h-12 w-full  rounded-xl bg-green-500   text-white relative overflow-hidden font-semibold before:content-[''] before:absolute before:inset-0 before:bg-[repeating-linear-gradient(45deg,#ffffff30,#ffffff30_10px,transparent_10px,transparent_20px)] before:pointer-events-none">Active</div>
                            </div>
                            <div v-if="!booking.isActive" class="w-40">
                                <label for="location" class=" mb-1 ml-2 text-sm font-medium text-gray-400">Global status</label>
                                <div class="flex items-center justify-center h-12 w-full  rounded-xl bg-red-500  text-white relative overflow-hidden font-semibold before:content-[''] before:absolute before:inset-0 before:bg-[repeating-linear-gradient(45deg,#ffffff30,#ffffff30_10px,transparent_10px,transparent_20px)] before:pointer-events-none">Closed</div>
                            </div>
                        </div>


                        <!-- 🆑 КНОПКИ НАВИГАЦИИ 🆑  v-if="booking.garage.isBike"-->
                        <section class="flex w-full h-12 gap-2 mb-4">
                            <!-- Кнопка -->
                            <div class="flex gap-2 mt-2 h-12 w-full">
                                <button @click="addValueToEditFormBooking" class="w-full py-3 cursor-pointer bg-orange-400 text-white rounded-xl hover:bg-orange-600">
                                    Edit Renting
                                </button>
                                <button v-if="booking.garage.isBike"  @click="printContractBike" class="w-full py-3 cursor-pointer bg-purple-400 text-white rounded-xl hover:bg-purple-600">
                                    PDF Bike
                                </button>
                                <button v-if="!booking.garage.isBike" @click="printContractCar" class="w-full py-3 cursor-pointer bg-purple-400 text-white rounded-xl hover:bg-purple-600">
                                    PDF Car
                                </button>
                                <button @click="closeProtectionF" v-show="booking.isActive===true" class="w-full py-3 cursor-pointer bg-red-400 text-white rounded-xl hover:bg-red-600">
                                    Close Renting
                                </button>
                                <!-- <button @click="openProtectionF" v-show="booking.isActive===!false" class="w-full py-3 cursor-pointer bg-green-400 text-white rounded-xl hover:bg-red-600">
                                    Restore booking
                                </button> -->

                                <button v-show="booking.isActive===false" @click="openBooking()" class="flex items-center justify-center gap-3 w-full h-12 rounded-xl  bg-green-500 text-white font-medium cursor-pointer">
                                    <span>Restore renting</span>
                                    <div v-if="loadingRestore"
                                         class="w-5 h-5 border-3 border-white border-t-gray-500 rounded-full animate-spin"
                                         role="status"
                                         aria-label="Loading">
                                    </div>
                                </button>
                            </div>
                        </section>


                        <!-- КАРТОЧКА БАЙКА -->
                        <div class="flex h-fit w-full py-2">
                            <span class="w-28 h-28 overflow-hidden rounded-xl bg-gray-300"><img class="w-full h-full object-cover" :src="booking.garage.photoUrl"  alt=""></span>
                            <span class="ml-4">
                                <p class="text-xs">ID Bike: {{booking.garage.id}} </p>
                                <h1   v-copy class="font-bold md:text-2xl">{{booking.garage.name}}</h1>
                                <h2>Priority: {{booking.garage.priority}}</h2>
                                <span class="flex gap-2 mt-2">
                                    <NuxtLink  @click="loading = true" :to="`/garage/${booking.garage.id}`">
                                    <button class="px-4 py-2  bg-gray-200 rounded-xl cursor-pointer">
                                        Card
                                    </button></NuxtLink>
                                </span>
                            </span>
                        </div>

                        <!-- КАРТОЧКА КЛИЕНТА -->
                        <div class="flex h-fit w-ful py-2">
                            <span class="w-28 h-28 overflow-hidden rounded-xl bg-gray-300"><img   alt=""></span>
                            <span class="ml-4">
                                <p class="text-xs">ID Client: {{booking.client.id}}</p>
                                <h1 v-copy class="font-bold md:text-2xl">{{booking.client.name}}</h1>
                                <h2>Phone: {{booking.client.phoneNumber}}</h2>
                                <span class="flex gap-2 mt-2">
                                    <NuxtLink  @click="loading = true" :to="`/client/${booking.client.id}`">
                                    <button class="px-4 py-2  bg-gray-200 rounded-xl cursor-pointer">
                                        Card
                                    </button></NuxtLink>
                                    <a v-show="!booking.client.phoneWhatsapp" :href="`https://wa.me/${booking.client.phoneNumber}`" target="_blank" rel="noopener noreferrer" >
                                      <button class="px-4 py-2 bg-green-200 rounded-xl cursor-pointer">
                                        WhatsApp
                                      </button>
                                    </a>
                                    <a v-show="booking.client.phoneWhatsapp" :href="`https://wa.me/${booking.client.phoneWhatsapp}`" target="_blank" rel="noopener noreferrer" >
                                      <button class="px-4 py-2 bg-green-200 rounded-xl cursor-pointer">
                                        WhatsApp
                                      </button>
                                    </a>
                                </span>
                            </span>
                        </div>

                        <!-- ИНФО О КЛИЕНТЕ -->
                        <section>
                            <div class="flex gap-4">
                                <div class="w-full">
                                    <label for="location" class="mb-1 ml-2 text-sm font-medium text-gray-400">Address</label>
                                    <span  v-copy class="flex items-center justify-center h-12 w-full bg-white rounded-xl">{{booking.client.address}}</span>
                                </div>
                                <div class="w-full">
                                    <label for="location" class="mb-1 ml-2 text-sm font-medium text-gray-400">Phone</label>
                                    <span v-copy class="flex items-center justify-center h-12 w-full bg-white rounded-xl">{{booking.client.phoneNumber}}</span>
                                </div>
                            </div>
                            <div class="flex gap-4">
                                <div class="w-full">
                                    <label for="location" class="mb-1 ml-2 text-sm font-medium text-gray-400">Passport</label>
                                    <span  v-copy class="flex items-center justify-center h-12 w-full bg-white rounded-xl">{{booking.client.passport}}</span>
                                </div>
                                <div class="w-full">
                                    <label for="location" class="mb-1 ml-2 text-sm font-medium text-gray-400">Nationality</label>
                                    <span  v-copy class="flex items-center justify-center h-12 w-full bg-white rounded-xl">{{booking.client.nationality}}</span>
                                </div>
                            </div>
                        </section>

                    </section>
                </section>
            </section>
        </section>


        <!-- ✏️✏️✏️✏️✏️✏️ РЕДАКТИРОВАНИЕ БРОНИРОВАНИЯ ✏️✏️✏️✏️✏️✏️  -->
        <section @click="addValueToEditFormBooking" v-if="showFormEditBooking" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 w-full">
            <div @click.stop class="w-[500px] bg-white rounded-xl shadow-xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
                  <h1 class="text-2xl font-bold text-center">Edit renting</h1>

                  <!-- АВТОКОМПЛИТ КЛИЕНТОВ -->
                  <div class="w-full">
                      <div class="relative">
                          <label for="client">
                          <span class="text-sm font-medium text-gray-400 ml-2 "> Client | <span class="text-blue-500">ID:{{ form.clientId }}</span></span>
                          <input
                          id="client"
                          type="text"
                          autocomplete="off"
                          disabled
                          :value="clientName"
                          placeholder="Find..."
                          class="mt-1 p-3 w-full rounded-xl border-2 border-gray-300 cursor-no-drop bg-gray-200"
                        /> </label>

                      </div>
                    </div>

                    <!-- АВТОКОМПЛИТ БАЙКОВ -->
                    <div class="w-full">
                        <div class="relative">
                            <label for="bike">
                            <span class="text-sm font-medium text-gray-400 ml-2 "> Bike or Car | <span class="text-blue-500">ID:{{ selectedId ? selectedId:booking.garage.id }}</span> </span>
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
                          v-if="open && options.length"
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



                      <div class="flex gap-5 mb-0">
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
                      </div>

                      <label for="timeRental">
                        <span class="text-sm font-medium text-gray-400 ml-2 "> Time </span>
                      <select  v-model="form.timeRental" class="mt-1 mb-2  p-3 w-full rounded-xl border-2 border-gray-300">
                        <option :value="null" disabled >Select time</option>
                        <option v-for="p in timeRentalArray" :key="p.value" :value="p.value"> {{ p.tag }} </option>
                      </select>
                      </label>

                      <div class="flex gap-5 mb-0">
                  <!-- Выпадающий список локации -->
                  <label class="w-1/2" for="location">
                    <span class="text-sm font-medium text-gray-400 ml-2 "> Location </span>
                  <select  v-model="form.location" class="mt-1 mb-2  p-3 w-full rounded-xl border-2 border-gray-300">
                    <option :value="null" disabled >Select location</option>
                    <option v-for="p in locationArray" :key="p.value" :value="p.value"> {{ p.tag }} </option>
                  </select>
                  </label>


                  <!-- УРОВЕНЬ ТОПЛИВА -->
                  <label class="w-1/2" for="levelGasoline">
                    <span class="text-sm font-medium text-gray-400 ml-2 ">Level Gasoline</span>
                  <select  v-model="form.levelGasoline" class="mt-1 mb-2  p-3 w-full rounded-xl border-2 border-gray-300">
                    <option :value="null" disabled >Select location</option>
                    <option v-for="p in levelGasolineArray" :key="p.value" :value="p.value"> {{ p.tag }} </option>
                  </select>
                  </label>
                      </div>
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
                    <span class="text-sm font-medium text-gray-400 ml-2 ">Fine</span>
                    <input
                    v-model="form.fine"
                      type="number"
                      id="debt"
                      class="mt-1 mb-2 p-3 w-full rounded-xl border-2 border-gray-300 [&::-webkit-outer-spin-button]:hidden [&::-webkit-inner-spin-button]:hidden [&::-moz-appearance:textfield]:appearance-none "
                      autocomplete="off"
                    />
                  </label>

                  <label for="debt" class="w-60">
                    <span class="text-sm font-medium text-gray-400 ml-2 ">Debt</span>
                    <input
                    v-model="form.debt"
                      type="number"
                      id="debt"
                       :class="form.debt > 0 ? 'border-2 border-red-500 text-red-500' : ''"
                      class="mt-1 mb-2 p-3 w-full rounded-xl border-2 border-gray-300 [&::-webkit-outer-spin-button]:hidden [&::-webkit-inner-spin-button]:hidden [&::-moz-appearance:textfield]:appearance-none "
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
                      class="mt-1 mb-2 p-3 w-full rounded-xl border-2 border-gray-300 [&::-webkit-outer-spin-button]:hidden [&::-webkit-inner-spin-button]:hidden [&::-moz-appearance:textfield]:appearance-none "
                      autocomplete="off"
                    />
                  </label>

                  <div class="flex gap-5 ">
                  <label for="paid" class="w-60">
                    <span class="text-sm font-medium text-gray-400 ml-2 ">Paid</span>
                    <input
                    v-model="form.paid"
                      type="number"
                      id="paid"
                      class="mt-1 mb-2 p-3 w-full rounded-xl border-2 border-gray-300 [&::-webkit-outer-spin-button]:hidden [&::-webkit-inner-spin-button]:hidden [&::-moz-appearance:textfield]:appearance-none "
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
                  </div>


                   <div class="flex gap-5 ">
                  <label for="deposit" class="w-60">
                    <span class="text-sm font-medium text-gray-400 ml-2 ">Deposit</span>
                    <input
                    v-model="form.deposit"
                      type="text"
                      id="deposit"
                      class="mt-1 mb-2 p-3 w-full rounded-xl border-2 border-gray-300 [&::-webkit-outer-spin-button]:hidden [&::-webkit-inner-spin-button]:hidden [&::-moz-appearance:textfield]:appearance-none "
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
                      <button @click="submitForm" class="w-full py-3 cursor-pointer bg-green-400 text-white rounded-xl hover:bg-green-600">
                          Save
                      </button>
                      <button @click="addValueToEditFormBooking" class="w-full py-3 cursor-pointer bg-red-400 text-white rounded-xl hover:bg-red-600">
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


        <!-- 🛡️🛡️🛡️🛡️ МОДАЛКА ЗАЩИТА ЗАКРЫТИЯ БРОНИ 🛡️🛡️🛡️🛡️  -->
        <section  v-show="closeProtection" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div @click.stop class="w-[500px] bg-white rounded-xl shadow-xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
                  <h2 class="text-2xl font-bold text-center">Closing the RENTAL. Are you sure?</h2>
                  <div class="flex flex-col gap-2 mt-5">

                      <span :class="closeLocation === '' ? 'border-2 border-red-500' : 'border-2 border-green-500'" class="flex items-center pl-5 h-12 w-full bg-white rounded-xl mb-3 ">
                          <div class="flex gap-6  mb-5 mt-5">
                            <label class="inline-flex items-center cursor-pointer">
                              <input
                                v-model="closeLocation"
                                type="radio"
                                name="currencyPaid"
                                value="MAIN_OFFICE"
                                class="form-radio h-5 w-5 text-blue-600 transition duration-150 ease-in-out cursor-pointer"/>
                              <span class="ml-2 text-sm font-medium text-gray-700">MAIN OFFICE</span>
                            </label>

                            <label class="inline-flex items-center cursor-pointer">
                              <input
                                v-model="closeLocation"
                                type="radio"
                                name="currencyPaid"
                                value="PRATAMNUK"
                                class="form-radio h-5 w-5 text-blue-600 transition duration-150 ease-in-out cursor-pointer"/>
                              <span class="ml-2 text-sm font-medium text-gray-700">PRATAMNUK</span>
                            </label>
                          </div>
                      </span>


                      <div class="flex gap-4">
                        <button v-show="closeLocation !== ''" @click="closeBooking()" :class="closeLocation === '' ? ' bg-gray-500' : 'bg-green-500'" class="w-full py-3 cursor-pointer  text-white rounded-xl">
                            Yes, close!
                        </button>
                        <button @click="closeProtectionF" class="w-full py-3 cursor-pointer bg-red-400 text-white rounded-xl hover:bg-red-600">
                            No
                        </button>
                      </div>
                  </div>
            </div>
        </section>

        <!-- 🛡️🛡️🛡️🛡️ МОДАЛКА ЗАЩИТА DELETE CONTRACT 🛡️🛡️🛡️🛡️  -->
        <section  v-show="closeProtectionContractDelete" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div @click.stop class="w-[500px] bg-white rounded-xl shadow-xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
                  <h2 class="text-2xl font-bold text-center">Delete?</h2>
                  <div class="flex flex-col gap-2 mt-5">


                      <div class="flex gap-4">
                        <button @click="contractDelete()"  class="w-full py-3 cursor-pointer  rounded-xl bg-green-400 text-white">
                            Yes, DELETE!
                        </button>
                        <button @click="closeProtectionContractDeleteF()" class="w-full py-3 cursor-pointer bg-red-400 text-white rounded-xl hover:bg-red-600">
                            No
                        </button>
                      </div>
                  </div>
            </div>
        </section>



        <!-- 📸📸📸📸 ФОРМА ДОБАВЛЕНИЯ ФОТО КОНТРАКТА 📸📸📸📸 -->
        <section @click="showFormContract=false" v-if="showFormContract" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div @click.stop class="w-[500px] bg-white rounded-xl shadow-xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
                  <h2 class="text-xl font-bold text-center">Добавить контракт</h2>

                  <label class="block mb-2">
                    <span class="text-sm font-medium">Upload Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      @change="onFileChange"
                      class="mt-1 block bg-gray-100 py-2 px-2 rounded-xl border border-dashed border-gray-400 cursor-pointer"
                    />
                  </label>
                  <div class="flex gap-2 mt-5">
                      <button v-if="!buttonContract" class="w-full py-3 cursor-no-drop bg-gray-400 text-white rounded-xl ">
                          Whait
                      </button>
                      <button @click="submitFormContract" v-if="buttonContract"class="w-full py-3 cursor-pointer bg-green-400 text-white rounded-xl hover:bg-green-600">
                          Save
                      </button>
                      <button @click="showFormContract=false" class="w-full py-3 cursor-pointer bg-red-400 text-white rounded-xl hover:bg-red-600">
                          Close
                      </button>
                  </div>
            </div>
        </section>

        <!-- 🔄🔄🔄🔄 КОНТЕЙНЕР СПИННЕР 🔄🔄🔄🔄 -->
        <div v-if="printLoader" class="absolute z-60 inset-0 flex items-center justify-center bg-black/50 w-full h-full">
          <div
            class="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"
            role="status"
            aria-label="Loading"
          ></div>
        </div>

        <!-- ✏️✏️✏️✏️✏️✏️ ФОРМА ОБНОВЛЕНИЯ ПРОБЕГА ✏️✏️✏️✏️✏️✏️  -->
        <section @click="" v-if="showFormMileage" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div @click.stop class="w-[500px] bg-white rounded-xl shadow-xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
                  <h2 class="text-xl font-bold text-center">Update mileage<br>Now <span class="text-blue-500">{{booking.garage.mileageNow}}km</span>, change <span class="text-blue-500">{{booking.garage.oilChange}}km</span> </h2>

                  <label for="note">
                    <span class="text-sm font-medium text-gray-400 ml-2 ">New mileage </span>
                    <input
                    v-model="formMileage.mileageNow"
                    type="number"
                      id="note"
                      class="mt-1 mb-2 p-3 w-full rounded-xl border-2 border-gray-300 [&::-webkit-outer-spin-button]:hidden [&::-webkit-inner-spin-button]:hidden [&::-moz-appearance:textfield]:appearance-none "
                      autocomplete="off"
                    />
                  </label>

                  <div class="flex gap-2 mt-5">
                      <button @click="submitFormUpdateMileage" class="w-full py-3 cursor-pointer bg-green-400 text-white rounded-xl hover:bg-green-600">
                          Update
                      </button>
                      <button @click="showFormMileageF" class="w-full py-3 cursor-pointer bg-red-400 text-white rounded-xl hover:bg-red-600">
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

    </section>
</template>

<script setup>

// import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf'PDFName
import Sidebar from '~/components/Sidebar.vue';
import BookingHeader from '~/components/BookingHeader.vue';
import {ref, computed} from 'vue'
import { useRoute } from 'vue-router'
import { saveAs } from 'file-saver'
import { PDFDocument } from 'pdf-lib'
import { useFetch } from '#app'
import fontkit from '@pdf-lib/fontkit'
import debounce from 'lodash.debounce'
// const role = localStorage.getItem('role')
// pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'
const formMileage = ref({ mileageNow: 0})
const showFormMileage = ref(false)

const closeProtectionContractDelete = ref(false)
const filter = ref('')
const open = ref(false)
const options = ref([])
const selectedId = ref(null)

const printLoader = ref(false)
const config = useRuntimeConfig()
const route = useRoute()
// const router = useRouter()
const showFormContract =ref(false)
const showFormEditBooking = ref(false)
const loadingForm = ref(false)
const photoContract = ref('')
const buttonContract = ref(false)
const locationArray = [{ value: 'MAIN_OFFICE', tag: 'Main Office' }, { value: 'PRATAMNUK',   tag: 'PratamNuk' }]
const levelGasolineArray = [ { value: '25%', tag: '25%' }, { value: '50%', tag: '50%' }, { value: '75%', tag: '75%' }, { value: 'Full', tag: 'Full'},]
const id = route.params.id
const form = ref({
  clientId: null,
  garageId: null,
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
  note:'',
  debtNote:'',
  debt:0
})
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

function showFormMileageF(){
  showFormMileage.value = !showFormMileage.value
}
function printLoaderF(){
  printLoader.value = !printLoader.value
}

// ДЕБАУНС ======
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
  form.value.garageId = g.id
}

//МОДАЛКА ОКНА ПРОДАЖИ openProtectionF
const closeProtection = ref(false)
function closeProtectionF(){
  if(closeProtection.value){
    closeProtection.value = false
  } else {
    closeProtection.value = true
  }
}

function closeProtectionContractDeleteF(){
  if(closeProtectionContractDelete.value){
    closeProtectionContractDelete.value = false
  } else {
    closeProtectionContractDelete.value = true
  }
}

//USE FETCH ♻️
const { data, pending, error, refresh } =  useFetch(`${config.public.apiBase}/api/booking/${id}`,{credentials: 'include'})

const booking = computed(() => data.value?.data ?? null)
// console.log(booking.value.clientId)
const garageName = computed(()=>{
  return booking.value?.garage?.name ?? ''
})
filter.value=garageName.value


const clientName = computed(()=>{
  return booking.value.client.name
})

//ПОДСТАВЛЯЕМ ДАННЫЕ В ФОРМУ
function addValueToEditFormBooking() {
  showFormEditBooking.value = !showFormEditBooking.value
    form.value = {
      clientId:       booking.value.client.id,
      garageId:       selectedId.value ? selectedId.value : booking.value.garage.id,
      startRental:    booking.value.startRental ? booking.value.startRental.slice(0,10): '',
      endRental:      booking.value.endRental? booking.value.endRental.slice(0,10): '',
      timeRental:     booking.value.timeRental,
      location:       booking.value.location,
      levelGasoline:  booking.value.levelGasoline,
      helmet:         booking.value.helmet,
      paid:           booking.value.paid,
      currencyPaid:   booking.value.currencyPaid,
      deposit:        booking.value.deposit,
      currencyDeposit:booking.value.currencyDeposit,
      fine:           booking.value.fine,
      note:           booking.value.note,
      debtNote:       booking.value.debtNote,
      debt:           booking.value.debt,
  }
    // console.log('Что подставляет',form.value)
}

// РЕДАКТИРОВАНИЕ ✏️ И ОТПРАВКА ♻️
const submitForm = async () => {
  loadingForm.value = true
  const payload = { ...form.value, id: id}
  console.log('payload:', payload)
  if (payload.startRental) {
    payload.startRental = new Date(payload.startRental).toISOString()
  }
  if (payload.endRental) {
    payload.endRental = new Date(payload.endRental).toISOString()
  }
  // console.log('Что отправляет',payload)
  try {
    const result = await $fetch(`${config.public.apiBase}/api/booking/${id}`, {
      method: 'PUT',
      credentials: 'include',
      body: payload
    })

    await refresh()
    showFormEditBooking.value = false
    console.log('Успешно добавлено:', result)
  } catch (err) {
    console.error('Ошибка при отправке:', err)
  } finally {
    loadingForm.value = false
  }
}

// ЗАГРУЗКА КОНТРАКТА ♻️
const onFileChange = async (e) => {
  const file = e.target.files[0]
  if (!file) return

  const fm = new FormData()
  fm.append('file', file)

  try {
    // отправляем на наш upload-эндпоинт
    const { url } = await $fetch(`${config.public.apiBase}/api/upload/contract`, {
      method: 'POST',
      body: fm
    })
    photoContract.value = url
    buttonContract.value = true
    console.log(url)
  } catch (err) {
    console.error('Upload failed:', err)
  }
}

// ЗАПИСЬ ССЫЛКИ НА КОНТРАКТ ♻️
const submitFormContract = async () => {
  showFormContract.value = false

  const payload = {
    photoContract: photoContract.value,
    id: id,
    clientId: booking.value.clientId,
    garageId:booking.value.garageId,
  }

  try {
    const result = await $fetch(`${config.public.apiBase}/api/booking/helper/${id}`, {
      method: 'PATCH',
      credentials: 'include',
      body: payload
    })

    await refresh()
    console.log('Успешно обновлено:', result)
  } catch (err) {
    console.error('Ошибка при отправке:', err)
  }
}



const closeLocation = ref('')
// ЗАКРЫТИЕ БРОНИРОВАНИЯ ♻️
const closeBooking = async () => {
  printLoaderF()
  closeProtection.value = false
  const payload = {
    isActive: false,
    // location:closeLocation.value,
    id: id,
    clientId: booking.value.clientId,
    garageId:booking.value.garageId,
  }
  console.log('Данные отправлены')
  try {
    const result = await $fetch(`${config.public.apiBase}/api/booking/${id}`, {
      method: 'PATCH',
      credentials: 'include',
      body: payload
    })
    // router.push('/booking/all')
    // refresh()
    await submitFormUpdateLocation(closeLocation.value)
    // showFormMileageF()
    console.log('Успешно обновлено:', result)
  } catch (err) {
    console.error('Ошибка при отправке:', err)
  }
}

// Удаление контракта ♻️
const contractDelete = async () => {
  printLoaderF()
  closeProtectionContractDelete.value = false
  const payload = {
    photoContract: null,
    id: id,
    clientId: booking.value.clientId,
    garageId:booking.value.garageId,
  }
  console.log('Данные отправлены')
  try {
    const result = await $fetch(`${config.public.apiBase}/api/booking/contract-delete/${id}`, {
      method: 'PATCH',
      credentials: 'include',
      body: payload
    })
    // router.push('/booking/all')
    printLoaderF()
    refresh()

    // showFormMileageF()
    console.log('Успешно обновлено:', result)
  } catch (err) {
    console.error('Ошибка при отправке:', err)
  }
}

// ФОРМА ОБНОВЛЕНИЯ ЛОКАЦИИ В ГАРАЖЕ ♻️
const submitFormUpdateLocation = async (locationValue) => {

  const payload = {
       ...formMileage.value,
       location: locationValue,
       garageId: booking.value.garageId,
       bookingId: booking.value.id
     }
  console.log(formMileage.value)
  try {
    const result = await $fetch(`${config.public.apiBase}/api/garage/location/${booking.value.garage.id}`, {
      method: 'PATCH',
      credentials: 'include',
      body: payload
    })
    printLoaderF()
    showFormMileageF()
     // refresh()
     // router.push(`/garage/${booking.value.garage.id}`)
    console.log('Успешно обновлено:', result)
    return result
  } catch (err) {
    console.error('Ошибка при отправке:', err)
  }
}



// ФОРМА ОБНОВЛЕНИЯ ПРОБЕГА ♻️
const submitFormUpdateMileage = async () => {
  // showFormMileageF()
  printLoaderF()
  const payload = {
       ...formMileage.value,
       garageId: booking.value.garageId,
       bookingId: booking.value.id
     }
  console.log(formMileage.value)
  try {
    const result = await $fetch(`${config.public.apiBase}/api/garage/mileage/${booking.value.garage.id}`, {
      method: 'PATCH',
      credentials: 'include',
      body: payload
    })
    printLoaderF()
    showFormMileageF()
     refresh()
     // router.push(`/garage/${booking.value.garage.id}`)
    console.log('Успешно обновлено:', result)
  } catch (err) {
    console.error('Ошибка при отправке:', err)
  }
}

const loadingRestore = ref(false)
// ОТКРЫТИЕ БРОНИРОВАНИЯ ♻️
const openBooking = async () => {
  loadingRestore.value = true
  const payload = {
    isActive: true,
    id: id,
    clientId: booking.value.clientId,
    garageId:booking.value.garageId,
  }
  console.log('Данные отправлены')
  try {
    const result = await $fetch(`${config.public.apiBase}/api/booking/restore/${id}`, {
      method: 'PATCH',
      credentials: 'include',
      body: payload
    })
    // router.push('/booking/all')
    refresh()
    loadingRestore.value = false
    console.log('Успешно обновлено:', result)
  } catch (err) {
    console.error('Ошибка при отправке:', err)
  }
}




// Функция копирования в буфер
// const copy = (eOrText) => {
//   // если передали объект-событие — берём innerText,
// // иначе — используем переданную строку
//   const text =
//     typeof eOrText === 'string'
//       ? eOrText
//       : eOrText.target.innerText

//   navigator.clipboard.writeText(text)
//     .catch(() => {
//       console.error('Не удалось скопировать')
//     })
// }

// const goBack = () => {
//   // Если есть история в браузере — назад, иначе на главную
//   if (window.history.length > 1) {
//     router.back()
//   } else {
//     router.push('/')
//   }
// }


async function printContractBike() {
  printLoader.value = true
  try {
    // 1) Загрузка шаблона
    const existingPdfBytes = await fetch('/contract-template.pdf')
      .then(r => {
        if (!r.ok) throw new Error(`Не удалось загрузить шаблон: ${r.status}`)
        return r.arrayBuffer()
      })

    // 2) Создаём PDF и встраиваем шрифт
    const pdfDoc = await PDFDocument.load(existingPdfBytes)
    pdfDoc.registerFontkit(fontkit)
    const fontBytes = await fetch('/fonts/NotoSans-Regular.ttf')
      .then(r => {
        if (!r.ok) throw new Error(`Не удалось загрузить шрифт: ${r.status}`)
        return r.arrayBuffer()
      })
    const font = await pdfDoc.embedFont(fontBytes, { subset: false })

    // 3) Собираем значения по ключам
    const now         = new Date()
    const dateString  = now.toLocaleDateString('en-GB')
    const timeString  = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
    const startDate   = new Date(booking.value.startRental).toLocaleDateString('en-GB')
    const endDate     = new Date(booking.value.endRental).toLocaleDateString('en-GB')
    const daysCount   = String(Math.floor((new Date(booking.value.endRental) - new Date(booking.value.startRental)) / (1000*60*60*24)))

    const valuesMap = {
      date:           dateString,
      name:           String(booking.value.client.name),
      pasport:        String(booking.value.client.passport),
      nationaly:      String(booking.value.client.nationality),
      address:        String(booking.value.client.address),
      phoneNumber:    String(booking.value.client.phoneNumber),
      bikeName:       String(booking.value.garage.name),
      startRental:    startDate,
      startTime:      timeString,
      endRental:      endDate,
      endTime:        timeString,
      days:           daysCount,
      paid:           String(booking.value.paid),
      deposit:        String(booking.value.deposit),
      helmet:         String(booking.value.helmet),
      levelGasoline:  String(booking.value.levelGasoline),
    }

    // 4) Жёстко задаём координаты (в пунктах) для каждого ключа
    //    Расчёт основан на оригинальных полях формы из шаблона
    const coords = {
      date:          { x: 410.79, y: 710.21 },
      name:          { x:  90.96, y: 612.09 },
      pasport:       { x: 352.41, y: 610.92 },
      nationaly:     { x: 485.79, y: 613.69 },
      address:       { x:  92.96, y: 578.72 },
      phoneNumber:   { x: 442.06, y: 578.22 },
      bikeName:      { x: 265.53, y: 508.04 },
      startRental:   { x: 246.75, y: 471.30 },
      startTime:     { x: 374.64, y: 471.47 },
      endRental:     { x: 442.06, y: 472.51 },
      endTime:       { x:  59.59, y: 436.81 },
      days:          { x: 168.68, y: 436.84 },
      paid:          { x: 323.01, y: 436.61 },
      deposit:       { x: 459.05, y: 435.82 },
      helmet:        { x: 109.85, y: 102.94 },
      levelGasoline: { x: 265.53, y: 103.47 },
    }

    // 5) Рисуем все тексты вручную поверх шаблона
    const page = pdfDoc.getPages()[0]
    Object.entries(coords).forEach(([key, { x, y }]) => {
      const text = valuesMap[key] || ''
      page.drawText(text, {
        x,
        y,
        size: 12,
        font,
      })
    })

    // 6) Сохраняем и скачиваем PDF
    const pdfBytes = await pdfDoc.save()
    const blob     = new Blob([pdfBytes], { type: 'application/pdf' })
    saveAs(blob, `contract-${booking.value.id}.pdf`)

  } catch (e) {
    console.error('Ошибка генерации PDF:', e)
  } finally {
    printLoader.value = false
  }
}


//ФУНКЦИЯ ПЕЧАТИ КОНТРАКТА БАЙКА
// async function printContractBike() {
//   printLoader.value = true
//   try {
//     const existingPdfBytes = await fetch('/contract-template.pdf')
//       .then(r => {
//         if (!r.ok) throw new Error(`Не удалось загрузить шаблон: ${r.status}`)
//         return r.arrayBuffer()
//       })

//     const pdfDoc = await PDFDocument.load(existingPdfBytes)
//     pdfDoc.registerFontkit(fontkit)

//     const fontBytes = await fetch('/fonts/NotoSansThai-Regular.ttf')
//       .then(r => {
//         if (!r.ok) throw new Error(`Не удалось загрузить шрифт: ${r.status}`)
//         return r.arrayBuffer()
//       })
//     const uniFont = await pdfDoc.embedFont(fontBytes, { subset: false })

//     const form = pdfDoc.getForm()

//     const now = new Date()
//     const dateString = now.toLocaleDateString('ru-RU')
//     const timeString = now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
//     const start = new Date(booking.value.startRental); start.setHours(0,0,0,0)
//     const end   = new Date(booking.value.endRental);   end.setHours(0,0,0,0)
//     const days  = Math.floor((end.getTime() - start.getTime())/(1000*60*60*24))

//     form.getTextField('name')        .setText(String(booking.value.client.name))
//     form.getTextField('date')        .setText(dateString)
//     form.getTextField('days')        .setText(String(days))
//     form.getTextField('endTime')     .setText(timeString)
//     form.getTextField('startTime')   .setText(timeString)
//     form.getTextField('pasport')     .setText(String(booking.value.client.passport))
//     form.getTextField('nationaly')   .setText(String(booking.value.client.nationality))
//     form.getTextField('address')     .setText(String(booking.value.client.address))
//     form.getTextField('phoneNumber') .setText(String(booking.value.client.phoneNumber))
//     form.getTextField('bikeName')    .setText(String(booking.value.garage.name))
//     form.getTextField('startRental') .setText(new Date(booking.value.startRental).toLocaleDateString('ru-RU'))
//     form.getTextField('endRental')   .setText(new Date(booking.value.endRental).toLocaleDateString('ru-RU'))
//     form.getTextField('paid')        .setText(String(booking.value.paid))
//     form.getTextField('deposit')     .setText(String(booking.value.deposit))
//     form.getTextField('helmet')      .setText(String(booking.value.helmet))
//     form.getTextField('levelGasoline').setText(String(booking.value.levelGasoline))

//     // 7) Обновляем внешний вид **после** заполнения, чтобы все поля рендерились uniFont
//     form.updateFieldAppearances(uniFont)

//     // 8) Сохраняем и скачиваем PDF
//     const pdfBytes = await pdfDoc.save()
//     const blob     = new Blob([pdfBytes], { type: 'application/pdf' })
//     saveAs(blob, `contract-${booking.value.id}.pdf`)

//   } catch (e) {
//     console.error('Ошибка генерации PDF:', e)
//   } finally {
//     printLoader.value = false
//   }
// }

// //ФУНКЦИЯ ПЕЧАТИ КОНТРАКТА АВТО
// async function printContractCar() {
//   printLoader.value = true
//   try {
//     const existingPdfBytes = await fetch('/contract-template-car.pdf')
//       .then(r => {
//         if (!r.ok) throw new Error(`Не удалось загрузить шаблон: ${r.status}`)
//         return r.arrayBuffer()
//       })

//     const pdfDoc = await PDFDocument.load(existingPdfBytes)
//     pdfDoc.registerFontkit(fontkit)

//     const fontBytes = await fetch('/fonts/NotoSansThai-Regular.ttf')
//       .then(r => {
//         if (!r.ok) throw new Error(`Не удалось загрузить шрифт: ${r.status}`)
//         return r.arrayBuffer()
//       })
//     const uniFont = await pdfDoc.embedFont(fontBytes, { subset: false })

//     const form = pdfDoc.getForm()

//     const now = new Date()
//     const dateString = now.toLocaleDateString('ru-RU')
//     const timeString = now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
//     const start = new Date(booking.value.startRental); start.setHours(0,0,0,0)
//     const end   = new Date(booking.value.endRental);   end.setHours(0,0,0,0)
//     const days  = Math.floor((end.getTime() - start.getTime())/(1000*60*60*24))

//     form.getTextField('name')        .setText(String(booking.value.client.name))
//     form.getTextField('date')        .setText(dateString)
//     form.getTextField('days')        .setText(String(days))
//     form.getTextField('endTime')     .setText(timeString)
//     form.getTextField('startTime')   .setText(timeString)
//     form.getTextField('passport')     .setText(String(booking.value.client.passport))
//     form.getTextField('nationality')   .setText(String(booking.value.client.nationality))
//     form.getTextField('address')     .setText(String(booking.value.client.address))
//     form.getTextField('phoneNumber') .setText(String(booking.value.client.phoneNumber))
//     form.getTextField('bikeName')    .setText(String(booking.value.garage.name))
//     form.getTextField('startRental') .setText(new Date(booking.value.startRental).toLocaleDateString('ru-RU'))
//     form.getTextField('endRental')   .setText(new Date(booking.value.endRental).toLocaleDateString('ru-RU'))
//     form.getTextField('paid')        .setText(String(booking.value.paid))
//     form.getTextField('deposit')     .setText(String(booking.value.deposit))
//     // form.getTextField('helmet')      .setText(String(booking.value.helmet))
//     form.getTextField('levelGasoline').setText(String(booking.value.levelGasoline))

//     // 7) Обновляем внешний вид **после** заполнения, чтобы все поля рендерились uniFont
//     form.updateFieldAppearances(uniFont)
//     form.flatten()
//     // 8) Сохраняем и скачиваем PDF
//     const pdfBytes = await pdfDoc.save()
//     const blob     = new Blob([pdfBytes], { type: 'application/pdf' })
//     saveAs(blob, `contract-${booking.value.id}.pdf`)

//   } catch (e) {
//     console.error('Ошибка генерации PDF:', e)
//   } finally {
//     printLoader.value = false
//   }
// }
async function printContractCar() {
  printLoader.value = true
  try {
    // 1) Загрузка car-шаблона
    const existingPdfBytes = await fetch('/contract-template-car.pdf')
      .then(r => {
        if (!r.ok) throw new Error(`Не удалось загрузить шаблон: ${r.status}`)
        return r.arrayBuffer()
      })

    // 2) Создаём PDF и встраиваем единый латинский шрифт
    const pdfDoc = await PDFDocument.load(existingPdfBytes)
    pdfDoc.registerFontkit(fontkit)
    const fontBytes = await fetch('/fonts/NotoSans-Regular.ttf')
      .then(r => {
        if (!r.ok) throw new Error(`Не удалось загрузить шрифт: ${r.status}`)
        return r.arrayBuffer()
      })
    const font = await pdfDoc.embedFont(fontBytes, { subset: false })

    // 3) Собираем данные
    const now        = new Date()
    const dateString = now.toLocaleDateString('en-GB')
    const timeString = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
    const startDate  = new Date(booking.value.startRental).toLocaleDateString('en-GB')
    const endDate    = new Date(booking.value.endRental).toLocaleDateString('en-GB')
    const daysCount  = String(
      Math.floor(
        (new Date(booking.value.endRental) - new Date(booking.value.startRental)) /
        (1000 * 60 * 60 * 24)
      )
    )

    const valuesMap = {
      date:          dateString,
      name:          String(booking.value.client.name),
      passport:      String(booking.value.client.passport),
      nationality:   String(booking.value.client.nationality),
      address:       String(booking.value.client.address),
      phoneNumber:   String(booking.value.client.phoneNumber),
      bikeName:      String(booking.value.garage.name),       // CAR brand
      startRental:   startDate,
      startTime:     timeString,
      endRental:     endDate,
      endTime:       timeString,
      days:          daysCount,
      paid:          String(booking.value.paid),             // Rental rate
      deposit:       String(booking.value.deposit),
      levelGasoline: String(booking.value.levelGasoline),
    }

    // 4) Точные координаты (в пунктах) для каждого ключа
    const coords = {
      date:           { x: 411.7,  y: 739.1 },
      name:           { x:  93.4,  y: 658.1 },
      passport:       { x: 354.5,  y: 657.2 },
      nationality:    { x: 486.7,  y: 657.8 },
      address:        { x:  95.7,  y: 627.0 },
      phoneNumber:    { x: 441.8,  y: 622.7 },
      bikeName:       { x: 239.5,  y: 556.4 },
      startRental:    { x: 234.1,  y: 516.7 },
      startTime:      { x: 350.5,  y: 516.1 },
      endRental:      { x: 418.7,  y: 516.5 },
      endTime:        { x:  58.8,  y: 483.3 },
      days:           { x: 170.5,  y: 482.4 },
      paid:           { x: 323.0,  y: 483.0 },   // ← добавлено
      deposit:        { x: 454.3,  y: 481.3 },
      levelGasoline:  { x:  84.5,  y:  88.8 },
    }

    // 5) Рисуем каждое значение поверх шаблона
    const page = pdfDoc.getPages()[0]
    Object.entries(coords).forEach(([key, { x, y }]) => {
      page.drawText(valuesMap[key] || '', {
        x,
        y,
        size: 12,
        font,
      })
    })

    // 6) Сохраняем и скачиваем готовый PDF
    const pdfBytes = await pdfDoc.save()
    const blob     = new Blob([pdfBytes], { type: 'application/pdf' })
    saveAs(blob, `contract-${booking.value.id}.pdf`)
  } catch (e) {
    console.error('Ошибка генерации PDF:', e)
  } finally {
    printLoader.value = false
  }
}






definePageMeta({
  middleware: 'auth',
  requiredRole:  ['STAFF','ADMIN', 'SUPERADMIN'],
})

</script>
