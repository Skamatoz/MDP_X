<template>
<!-- eslint-disable -->

    <section class="flex flex-col w-screen h-screen bg-white">
        <Sidebar />
        <section class="flex flex-col h-screen w-screen ">
            <GarageHeader
                @add="onAdd"
                :loading="pending"
            />
            <!-- ДАННЫЕ СО СКРОЛОМ-->
            <section class="overflow-y-auto p-4 ">

                <!-- ОБРАБОТЧИК ОШИБОК -->
                <p v-if="pending" class="mt-4 text-gray-500">Загрузка...</p>
                <p v-else-if="error" class="mt-4 text-red-500">Ошибка: {{ error.message }}</p>

                <!-- КОНТЕЙНЕР ЭКРАНОВ -->
                <section v-else>
                    <section  class="flex flex-wrap sm:flex-nowrap w-full h-full gap-2 mb-2">
                    <!-- 👈🏻👈🏻👈🏻👈🏻 ЛЕВЫЙ БЛОК 👈🏻👈🏻👈🏻👈🏻-->
                        <section class="flex flex-col min-w-[320px] w-full h-[740px] rounded-xl bg-gray-100 ">

                            <!-- ЛОКАЦИЯ И ПРИОРИТЕТ -->
                            <div class=" flex h-fit w-full p-4 gap-4 ">
                                <div class="w-full">
                                    <label for="location" class="mb-1 ml-2 text-sm font-medium text-gray-400">Location</label>
                                    <span v-if="bike.location==='MAIN_OFFICE'" class="flex items-center justify-center h-12 w-full bg-white rounded-xl">MAIN OFFICE</span>
                                    <span v-else-if="bike.location==='PRATAMNUK'" class="flex items-center justify-center h-12 w-full bg-white rounded-xl">{{bike.location}}</span>

                                </div>
                                <div class="w-full">
                                    <label for="location" class="mb-1 ml-2 text-sm font-medium text-gray-400">Priority</label>
                                    <span v-if="bike.priority==='EMPTY'" class="flex items-center justify-center h-12 w-full bg-white rounded-xl">NO PRIORITY</span>
                                    <span v-else-if="bike.priority==='PRIORITY_1'" class="flex items-center justify-center h-12 w-full bg-white rounded-xl">PRIORITY 1</span>
                                    <span v-else-if="bike.priority==='PRIORITY_2'" class="flex items-center justify-center h-12 w-full bg-white rounded-xl">PRIORITY 2</span>
                                </div>
                            </div>

                            <!-- КАРТОЧКА БАЙКА -->
                            <div class="flex h-fit w-full px-4 py-2">
                                <span class="w-30 h-30 overflow-hidden rounded-xl bg-gray-300"><img class="w-full h-full object-cover" :src="bike.photoUrl" alt=""></span>
                                <span class="ml-4">
                                    <p class="text-xs">ID {{bike.id}}</p>
                                    <h1 v-copy class="font-bold md:text-2xl ">{{bike.name}}</h1>
                                    <h2>Owner: {{bike.partner.tag}}</h2>
                                    <!-- СТАТУСЫ -->
                                    <div class="flex gap-1 mt-2">
                                        <div v-if="isBooked" class="w-fit">
                                            <div class="px-4 flex items-center justify-center h-10 w-full  rounded-xl bg-red-500  text-white relative overflow-hidden font-semibold before:content-[''] before:absolute before:inset-0 before:bg-[repeating-linear-gradient(45deg,#ffffff30,#ffffff30_10px,transparent_10px,transparent_20px)] before:pointer-events-none">Rented</div>
                                        </div>
                                        <div v-if="isRepair" class="w-fit">
                                            <div class="px-4 flex items-center justify-center h-10 w-full  rounded-xl bg-orange-500  text-white relative overflow-hidden font-semibold before:content-[''] before:absolute before:inset-0 before:bg-[repeating-linear-gradient(45deg,#ffffff30,#ffffff30_10px,transparent_10px,transparent_20px)] before:pointer-events-none">Repair</div>
                                        </div>
                                        <div v-if="!isBooked & !isRepair " class="w-fit">
                                            <div class="px-4 flex items-center justify-center h-10 w-full  rounded-xl bg-blue-500  text-white relative overflow-hidden font-semibold before:content-[''] before:absolute before:inset-0 before:bg-[repeating-linear-gradient(45deg,#ffffff30,#ffffff30_10px,transparent_10px,transparent_20px)] before:pointer-events-none">Free</div>
                                        </div>
                                        <div v-if="isPrebooks" class="w-fit">
                                            <div class="px-4 flex items-center justify-center h-10 w-full  rounded-xl bg-purple-500  text-white relative overflow-hidden font-semibold before:content-[''] before:absolute before:inset-0 before:bg-[repeating-linear-gradient(45deg,#ffffff30,#ffffff30_10px,transparent_10px,transparent_20px)] before:pointer-events-none">Pre-booking</div>
                                        </div>
                                    </div>
                                    <!-- <span class="flex gap-2 mt-2">
                                        <button @click.stop="onAdd" class="px-4 bg-gray-200 rounded-xl text-3xl cursor-pointer">
                                            ✏️
                                        </button>
                                        <button class="px-4 bg-gray-200 rounded-xl text-3xl cursor-pointer">
                                            💬
                                        </button>
                                    </span> -->
                                </span>
                            </div>

                            <!-- БЛОК С ДАННЫМИ -->
                            <div class="flex flex-col w-full p-4 gap-2">
                                <div class="flex gap-4">
                                    <div class="w-full">
                                        <label for="location" class="mb-1 ml-2 text-sm font-medium text-gray-400">loan Amount</label>
                                        <span class="flex items-center justify-center h-12 w-full bg-white rounded-xl">{{bike.loanAmount}}</span>
                                    </div>
                                    <div class="w-full">
                                        <label for="location" class="mb-1 ml-2 text-sm font-medium text-gray-400">loan Date</label>
                                        <span class="flex items-center justify-center h-12 w-full bg-white rounded-xl">{{bike.loanDate}}</span>
                                    </div>
                                </div>
                                <div class="flex gap-4">
                                    <div class="w-full">
                                        <label for="location" class="mb-1 ml-2 text-sm font-medium text-gray-400">GPS</label>
                                        <span class="flex items-center justify-center h-12 w-full bg-white rounded-xl">{{bike.isGps}}</span>
                                    </div>
                                    <div class="w-full">
                                        <label for="location" class="mb-1 ml-2 text-sm font-medium text-gray-400">GPS Number</label>
                                        <span class="flex items-center justify-center h-12 w-full bg-white rounded-xl">{{bike.gpsNumber}}</span>
                                    </div>
                                </div>
                                <div class="flex gap-4">
                                    <div class="w-full">
                                        <label for="location" class="mb-1 ml-2 text-sm font-medium text-gray-400">Mileage Now</label>
                                        <span class="flex items-center justify-center h-12 w-full bg-white rounded-xl">{{bike.mileageNow}} km</span>
                                    </div>
                                    <div class="w-full">
                                        <label for="location" class="mb-1 ml-2 text-sm font-medium text-gray-400">Oil Change</label>
                                        <span class="flex items-center justify-center h-12 w-full bg-white rounded-xl">{{bike.oilChange}} km</span>
                                    </div>
                                </div>
                                <div class="flex gap-4">
                                    <div class="w-full">
                                        <label for="location" class="mb-1 ml-2 text-sm font-medium text-gray-400">Mileage Start</label>
                                        <span class="flex items-center justify-center h-12 w-full bg-white rounded-xl">{{bike.mileageStart}} km</span>
                                    </div>
                                    <div class="w-full">
                                        <label for="location" class="mb-1 ml-2 text-sm font-medium text-gray-400">Price</label>
                                        <span class="flex items-center justify-center h-12 w-full bg-white rounded-xl">{{bike.price}} ฿</span>
                                    </div>
                                </div>
                                <div class="w-full">
                                    <label for="location" class="mb-1 ml-2 text-sm font-medium text-gray-400">Comment</label>
                                    <span class="px-3 py-2 flex items-start justify-start h-20 w-full bg-white rounded-xl">{{bike.note}}</span>
                                </div>
                            </div>
                        </section>

                        <!-- 👉🏻👉🏻👉🏻👉🏻 ПРАВЫЙ БЛОК 👉🏻👉🏻👉🏻👉🏻-->
                        <section class="flex flex-col min-w-[320px] w-full h-[740px] bg-gray-100 rounded-xl p-4 gap-2">
                            <section class="flex w-full h-12 gap-2 mb-5">
                                <!-- Кнопка -->
                                <div class="flex gap-2 mt-2 h-12 w-full">
                                    <button @click="onAdd" class="w-full py-3 cursor-pointer bg-orange-400 text-white rounded-xl hover:bg-orange-600">
                                        Edit Bike
                                    </button>
                                    <button @click="repairProtectionF" v-show="!isRepair" class="w-full py-3 cursor-pointer bg-black text-white rounded-xl hover:bg-black">
                                        Start Repair
                                    </button>
                                    <button @click="submitFormRepairEnd" v-show="isRepair" class="w-full py-3 cursor-pointer  text-white rounded-xl relative overflow-hidden px-6 font-semibold bg-black before:content-[''] before:absolute before:inset-0 before:bg-[repeating-linear-gradient(45deg,#ffffff30,#ffffff30_10px,transparent_10px,transparent_20px)] before:pointer-events-none">
                                        End Repair
                                    </button>
                                    <button @click="saleProtectionF" v-if=" role==='ADMIN' ||  role==='SUPERADMIN'" class="w-full py-3 cursor-pointer bg-red-400 text-white rounded-xl hover:bg-red-600">
                                        SALE GO
                                    </button>
                                </div>
                            </section>

                            <!-- ПРЕБУК -->
                            <div class="w-full ">
                                <label for="location" class="mb-1 ml-2 text-sm font-medium text-gray-400">Prebook</label>
                                <div class="flex flex-col h-40 w-full bg-white rounded-xl overflow-hidden overflow-y-auto">
                                    <table class="min-w-full bg-white divide-y divide-gray-200">
                                    <!-- Заголовок -->
                                    <thead class="bg-gray-50 ">
                                        <tr >
                                        <th class=" px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Link</th>
                                        </tr>
                                    </thead>
                                    <!-- Тело таблицы -->
                                    <tbody class="bg-white divide-y divide-gray-200">
                                        <tr v-for="prebook in bike.prebooks" :key="prebook.id" class="hover:bg-gray-100">
                                            <td class="cursor-pointer px-4 py-3 whitespace-nowrap text-sm text-gray-400">{{prebook.id}}</td>
                                            <td class="cursor-pointer px-4 py-3 whitespace-nowrap text-sm text-gray-900">{{new Date(prebook.startPrebook).toLocaleDateString('ru-RU')}} to {{new Date(prebook.endPrebook).toLocaleDateString('ru-RU')}}</td>
                                            <td class="cursor-pointer px-4 py-3 whitespace-nowrap text-sm text-gray-900">  <p :class="prebook.inPrebook ? 'text-green-600' : 'text-red-600'" > {{ prebook.inPrebook ? 'Active' : 'Closed' }} </p></td>
                                            <td class="cursor-pointer px-4 py-3 whitespace-nowrap text-sm text-gray-900 "><button class="cursor-pointer">Open</button></td>
                                        </tr>
                                    </tbody>
                                    </table>
                                </div>
                            </div>

                            <!-- БРОНИ -->
                            <div class="w-full ">
                                <label for="location" class="mb-1 ml-2 text-sm font-medium text-gray-400">Booking</label>
                                <div class="flex flex-col h-40 w-full bg-white rounded-xl overflow-hidden overflow-y-auto">
                                    <table class="min-w-full bg-white divide-y divide-gray-200">
                                    <!-- Заголовок -->
                                    <thead class="bg-gray-50 ">
                                        <tr >
                                        <th class=" px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Link</th>
                                        </tr>
                                    </thead>
                                    <!-- Тело таблицы -->
                                    <tbody class="bg-white divide-y divide-gray-200">
                                        <tr v-for="booking in bike.bookings" :key="booking.id" class="hover:bg-gray-100">
                                            <td class="cursor-pointer px-2 md:px-4 py-3 whitespace-nowrap text-sm text-gray-400">{{booking.id}}</td>
                                            <td class="cursor-pointer px-2 md:px-4 py-3 whitespace-nowrap text-sm text-gray-900">{{new Date(booking.startRental).toLocaleDateString('ru-RU')}} <br class="md:hidden" /> to {{new Date(booking.endRental).toLocaleDateString('ru-RU')}}</td>
                                            <td class="cursor-pointer px-2 md:px-4 py-3 whitespace-nowrap text-sm text-gray-900">  <p :class="booking.isActive ? 'text-green-600' : 'text-red-600'" > {{ booking.isActive ? 'Active' : 'Closed' }} </p></td>
                                            <td class="cursor-pointer px-2 md:px-4 py-3 whitespace-nowrap text-sm text-gray-900 "><NuxtLink  @click="loading = true" :to="`/booking/${booking.id}`"><button class="cursor-pointer">Open</button></NuxtLink></td>
                                        </tr>
                                    </tbody>
                                    </table>
                                </div>
                            </div>

                            <!-- РЕМОНТ -->
                            <div class="w-full ">
                                <label for="location" class="mb-1 ml-2 text-sm font-medium text-gray-400">History service</label>
                                <div class="flex flex-col h-40 w-full bg-white rounded-xl overflow-hidden overflow-y-auto">
                                    <table class="min-w-full bg-white divide-y divide-gray-200">
                                    <!-- Заголовок -->
                                    <thead class="bg-gray-50 ">
                                        <tr >
                                        <th class=" px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comment</th>
                                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Link</th>
                                        </tr>
                                    </thead>
                                    <!-- Тело таблицы -->
                                    <tbody class="bg-white divide-y divide-gray-200">
                                        <tr v-for="service in bike.service" :key="service.id" class="hover:bg-gray-100">
                                            <td class="cursor-pointer px-4 py-3 whitespace-nowrap text-sm text-gray-400">{{service.id}}</td>
                                            <td class="cursor-pointer px-4 py-3 whitespace-nowrap text-sm text-gray-900">{{new Date(service.createdAt).toLocaleDateString('ru-RU')}}</td>
                                            <td class="cursor-pointer px-4 py-3 whitespace-nowrap text-sm text-gray-900">  <p :class="service.inService ? 'text-green-600' : 'text-red-600'" > {{ service.inService ? 'Active' : 'Closed' }} </p></td>
                                            <td class="cursor-pointer px-4 py-3 whitespace-nowrap text-sm text-gray-400">{{service.note}}</td>
                                            <td class="cursor-pointer px-4 py-3 whitespace-nowrap text-sm text-gray-900 "><button class="cursor-pointer">Open</button></td>
                                        </tr>
                                    </tbody>
                                    </table>
                                </div>
                            </div>
                        </section>
                    </section>

                    <!-- <section class="flex  w-full h-[740px] rounded-xl bg-gray-100 ">
                        <div class="p-4">
                            <div class="bg-white rounded-xl w-full h-52"></div>
                        </div>

                    </section> -->


                </section>
            </section>
        </section>


        <!-- ✏️✏️✏️✏️✏️✏️ РЕДАКТИРОВАНИЕ БАЙКА ✏️✏️✏️✏️✏️✏️  -->
        <section @click="onAdd" v-if="showForm" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div @click.stop class="w-[500px] bg-white rounded-xl shadow-xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
                  <h2 class="text-xl font-bold text-center">Edit bike/car</h2>

                  <!-- Выпадающий список партнёров -->
                  <select v-model="form.partnerId" class="mt-1 mb-2  p-3 w-full rounded-xl border-2 border-gray-300">
                    <option :value="null" disabled selected>Select owner</option>
                    <option v-for="p in partners" :key="p.id" :value="p.id"> {{ p.tag }} </option>
                  </select>

                  <!-- Выпадающий список приоритета -->
                  <label for="priority">
                    <span class="text-sm font-medium text-gray-400 ml-2 "> Priority </span>
                  <select v-model="form.priority" class="mt-1 mb-2  p-3 w-full rounded-xl border-2 border-gray-300">
                    <option :value="null" disabled >Select priority</option>
                    <option v-for="p in priorityArray" :key="p.value" :value="p.value"> {{ p.tag }} </option>
                  </select>
                  </label>

                  <!-- Выпадающий список локации -->
                  <label for="location">
                    <span class="text-sm font-medium text-gray-400 ml-2 "> Location </span>
                  <select  v-model="form.location" class="mt-1 mb-2  p-3 w-full rounded-xl border-2 border-gray-300">
                    <option :value="null" disabled >Select location</option>
                    <option v-for="p in locationArray" :key="p.value" :value="p.value"> {{ p.tag }} </option>
                  </select>
                  </label>


                  <label for="name">
                    <span class="text-sm font-medium text-gray-400 ml-2 "> Name + color + number </span>
                    <input
                    v-model="form.name"
                      type="text"
                      id="name"
                      class="mt-1 mb-2  p-3 w-full rounded-xl border-2 border-gray-300 "
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

                  <div class="flex items-center ">
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

        <!-- ✏️✏️✏️✏️✏️✏️ ФОРМА ДОБАВЛЕНИЯ В РЕМОНТ ✏️✏️✏️✏️✏️✏️  -->
        <section @click="" v-if="showFormRepair" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div @click.stop class="w-[500px] bg-white rounded-xl shadow-xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
                  <h2 class="text-xl font-bold text-center">Send for repair</h2>

                  <label for="note">
                    <span class="text-sm font-medium text-gray-400 ml-2 "> Comment </span>
                    <textarea
                    v-model="formRepair.note"
                    type="text"
                      id="note"
                      class="mt-1 mb-2 p-3 w-full rounded-xl border-2 border-gray-300 [&::-webkit-outer-spin-button]:hidden [&::-webkit-inner-spin-button]:hidden [&::-moz-appearance:textfield]:appearance-none "
                      autocomplete="off"
                    />
                  </label>

                  <div class="flex gap-2 mt-5">
                      <button @click="submitFormRepair" class="w-full py-3 cursor-pointer bg-green-400 text-white rounded-xl hover:bg-green-600">
                          Save
                      </button>
                      <button @click="" class="w-full py-3 cursor-pointer bg-red-400 text-white rounded-xl hover:bg-red-600">
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

        <!-- ✏️✏️✏️✏️✏️✏️ ФОРМА ОБНОВЛЕНИЯ ПРОБЕГА ✏️✏️✏️✏️✏️✏️  -->
        <!-- <section @click="" v-if="showFormMileage" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div @click.stop class="w-[500px] bg-white rounded-xl shadow-xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
                  <h2 class="text-xl font-bold text-center">Send for repair</h2>

                  <label for="note">
                    <span class="text-sm font-medium text-gray-400 ml-2 "> Comment </span>
                    <input
                    v-model="formMileage.mileageNow"
                    type="number"
                      id="note"
                      class="mt-1 mb-2 p-3 w-full rounded-xl border-2 border-gray-300 [&::-webkit-outer-spin-button]:hidden [&::-webkit-inner-spin-button]:hidden [&::-moz-appearance:textfield]:appearance-none "
                      autocomplete="off"
                    />
                  </label>

                  <div class="flex gap-2 mt-5">
                      <button @click="submitFormRepair" class="w-full py-3 cursor-pointer bg-green-400 text-white rounded-xl hover:bg-green-600">
                          Save
                      </button>
                      <button @click="" class="w-full py-3 cursor-pointer bg-red-400 text-white rounded-xl hover:bg-red-600">
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
        </section> -->


        <!-- 🛡️🛡️🛡️🛡️ МОДАЛКА ЗАЩИТА 🛡️🛡️🛡️🛡️  -->
        <section @click="saleProtectionF" v-if="saleProtection" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div @click.stop class="w-[500px] bg-white rounded-xl shadow-xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
                  <h2 class="text-xl font-bold text-center">Are you sure?</h2>
                  <div class="flex gap-2 mt-5">
                      <button @click="submitFormSold()" class="w-full py-3 cursor-pointer bg-green-400 text-white rounded-xl hover:bg-green-600">
                          Yes
                      </button>
                      <button  class="w-full py-3 cursor-pointer bg-red-400 text-white rounded-xl hover:bg-red-600">
                          No
                      </button>
                  </div>
            </div>
        </section>

    </section>
</template>

<script setup>
import Sidebar from '~/components/Sidebar.vue';
import GarageHeader from '~/components/GarageHeader.vue';
import {ref, computed} from 'vue'
import { useRoute } from 'vue-router'
const role = localStorage.getItem('role')
const config = useRuntimeConfig()
const buttonPhotoBike = ref(null)
const route = useRoute()
const id = Number(route.params.id)
const router = useRouter()
const showForm = ref(false)
const loan = ref(false)
const loadingForm = ref(false)
// const isDisabled = ref(true)
const formRepair = ref({ inService: true, note: '', garageId: id })


const showFormRepair = ref(false)

const form = ref({
  name: '',
  licensePlate: '',
  mileageStart: 0,
  mileageNow: 0,
  oilChange: 0,
  loanAmount: 0,
  loanDate: '',
  isBike: true,
  isGps: false,
  isSold: false,
  location: 'MAIN_OFFICE',
  partnerId: null,
  price: 0,
  note: '',
  photoUrl: '',
  priority:''
})

//Защита продажи
const saleProtection = ref(false)
function saleProtectionF(){
  if(saleProtection.value){
    saleProtection.value = false
  } else {
    saleProtection.value = true
  }
}



// Получаем данные с сервера ♻️
const { data, pending, error, refresh } = await useFetch(`${config.public.apiBase}/api/garage/${id}`,{credentials: 'include'})
console.log(data.value.data)
const bike = computed(() => data.value?.data ?? null)

//Вычисляем статус БРОНИ
const isBooked = computed(() => {
  if (!bike.value) return false
  const bookings = bike.value.bookings || []
  return bookings.some(b => b.isActive === true)
})

//Вычисляем статус РЕМОНТА
const isRepair = computed(() => {
  if (!bike.value) return false
  const repair = bike.value.service || []
  return repair.some(r => r.inService === true)
})

//Вычисляем ID
const repairId = computed(() => {
  if (!bike.value) return null
  const services = bike.value.service || []
  const inFlight = services.find(r => r.inService === true)
  return inFlight ? inFlight.id : null
})

//Вычисляем статус ПРЕДБРОНИ
const isPrebooks = computed(() => {
  if (!bike.value) return false
  const repair = bike.value.prebooks || []
  return repair.some(r => r.inPrebook === true)
})


//ПОДСТАВЛЯЕМ ДАННЫЕ В ФОРМУ
function onAdd() {
  showForm.value = !showForm.value
  // при открытии — заполняем form из bike
  if (showForm.value && bike.value) {
    form.value = {
      name:          bike.value.name,
      licensePlate:  bike.value.licensePlate,
      mileageStart:  bike.value.mileageStart,
      mileageNow:    bike.value.mileageNow,
      oilChange:     bike.value.oilChange,
      loanAmount:    bike.value.loanAmount,
      loanDate:      bike.value.loanDate,
      isBike:        bike.value.isBike,
      isGps:         bike.value.isGps,
      isSold:        bike.value.isSold,
      location:      bike.value.location,
      partnerId:     bike.value.partnerId,
      price:         bike.value.price,
      note:          bike.value.note,
      photoUrl:      bike.value.photoUrl,
      priority:      bike.value.priority,
    }
  }
}

//ВРЕМЕННЫЕ МАССИВЫ
const locationArray = [
  { value: 'MAIN_OFFICE', tag: 'Main Office' },
  { value: 'PRATAMNUK',   tag: 'Pratam Nuk' }
]
const priorityArray = [
  { value: 'EMPTY',      tag: 'No Priority' },
  { value: 'PRIORITY_1', tag: 'Priority 1' },
  { value: 'PRIORITY_2', tag: 'Priority 2' }
]
const partners = [
  { id: 1, tag: 'MARK' },
  { id: 2, tag: 'OLEG' },
  { id: 4, tag: 'URIY' },
  { id: 5, tag: 'DENIS' },
  { id: 6, tag: 'SERGEI' },
  { id: 7, tag: 'ANTON' },
  { id: 8, tag: 'EKATERINA' },
  { id: 9, tag: 'EVGENII' },
  { id: 10, tag: 'DASHA' },
  { id: 11, tag: 'ANDREI' },
  { id: 12, tag: 'VLADIMIR' },
  { id: 13, tag: 'IGOR' },
  { id: 3, tag: 'OLEG SVOE' },
  { id: 14, tag: 'OLEG CBR' }
]

// РЕДАКТИРОВАНИЕ ФОРМЫ И ЕЕ ОТПРАВКА ♻️
const submitForm = async () => {
  loadingForm.value = true
  try {

    const payload = {
         ...form.value,  // все поля формы
         garageId: id    // добавили сюда
       }

    const result = await $fetch(`${config.public.apiBase}/api/garage/${id}`, {
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

// ПРОДАЖА БАЙКА ♻️
const submitFormSold = async () => {
  saleProtection.value = false
  try {

    const payload = {
          isSold:   true,
          garageId: id    // <-- докинули сюда
        }

    const response = await fetch(
      `${config.public.apiBase}/api/garage/${id}`,
      {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }
    )

    // if (response.status === 403) {
    //   alert('Insufficient access rights!')
    //   return
    // }

    if (!response.ok) {
      throw new Error(`Ошибка ${response.status}`)
    }

    const result = await response.json()
    await refresh()
    router.push('/garage/all')
    console.log('Успешно обновлено:', result)
  } catch (err) {
    console.error('Ошибка при отправке:', err)
    alert('Ошибка соединения с сервером')
  }
}


// ЗАГРУЗКА ИЗОБРАЖЕНИЯ ♻️
const onFileChange = async (e) => {
  buttonPhotoBike.value=true
  const file = e.target.files[0]
  if (!file) return

  const fm = new FormData()
  fm.append('file', file)

  try {
    // отправляем на наш upload-эндпоинт
    const { url } = await $fetch(`${config.public.apiBase}/api/upload/garage`, {
      method: 'POST',
      body: fm
    })
    form.value.photoUrl = url
    buttonPhotoBike.value=false
    console.log(url)
  } catch (err) {
    console.error('Upload failed:', err)
  }
}

//Защита ремонта
function repairProtectionF(){
  if(showFormRepair.value){
    showFormRepair.value = false
  } else {
    showFormRepair.value = true
  }
}

// ФОРМА ОТПРАВКИ В РЕМОНТ ♻️
const submitFormRepair = async () => {
  loadingForm.value = true

  const payload = {
       ...formRepair.value,
       userId: id
     }

  try {
    const result = await $fetch(`${config.public.apiBase}/api/service`, {
      method: 'POST',
      credentials: 'include',
      body: payload
    })

    await refresh()
     showFormRepair.value = false
     loadingForm.value = false
     // router.push(`/garage/${result.data.id}`)
    console.log('Успешно добавлено:', result)
  } catch (err) {
    console.error('Ошибка при отправке:', err)
  }
}

// ФОРМА ЗАКРЫТИЯ РЕМОНТА ♻️
const submitFormRepairEnd = async () => {
  try {
    const result = await $fetch(`${config.public.apiBase}/api/service/${repairId.value}`, {
      method: 'PATCH',
      credentials: 'include',
      body: {
        inService: false,
        garageId: id,
        repairIdLog: repairId.value
      }
    })

    await refresh()
    // router.push('/garage/all')
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
