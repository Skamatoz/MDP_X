<template>
<!-- eslint-disable -->

    <section class="flex flex-col w-screen h-screen bg-white">
        <Sidebar />
        <!-- <p v-if="pending" class="mt-4 text-gray-500">Загрузка...</p> -->
            <p v-if="error" class="mt-4 text-red-500">Ошибка: {{ error.message }}</p>
            <section class="bg-gray-100 py-8">
              <div class="max-w-6xl mx-auto px-4">
                  <div class="flex h-fit w-full bg-gray-200 p-2 gap-2 rounded-xl mb-5">
                      <button :class="changeMonth==='this'? 'bg-gray-300': 'bg-gray-200'" @click="paramsF()" class="px-4 py-3  rounded-xl w-full">This month</button>
                      <button :class="changeMonth==='previous'? 'bg-gray-300': 'bg-gray-200'"  @click="paramsF('previous')" class="px-4 py-3 rounded-xl w-full">Previous month</button>
                  </div>

                <!-- Bikes & Cars row -->
                <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <!-- Total Revenue -->
                    <div class="bg-white p-6 rounded-lg text-center">
                      <h3 class="text-gray-700 font-semibold">Total Amount</h3>
                      <p class="mt-2 text-3xl font-bold text-green-600">{{ (monthlyStats.revenueThisMonth.allGarage * gaverment).toLocaleString('ru-RU')}}</p>
                    </div>
                  <div class="bg-white p-6 rounded-lg text-center">
                    <h4 class="text-gray-700 font-semibold">Total Bikes</h4>
                    <p class="mt-2 text-3xl font-bold text-green-600">{{ (monthlyStats.revenueThisMonth.allBike * gaverment).toLocaleString('ru-RU') }}</p>
                  </div>
                  <div class="bg-white p-6 rounded-lg text-center">
                    <h4 class="text-gray-700 font-semibold">Total Cars</h4>
                    <p class="mt-2 text-3xl font-bold text-green-600">{{ (monthlyStats.revenueThisMonth.allCar * gaverment).toLocaleString('ru-RU') }}</p>
                  </div>
                  <!-- Monthly Bookings -->
                  <!-- <div class="bg-white p-6 rounded-lg text-center">
                    <h3 class="text-gray-700 font-semibold">Total Rentals</h3>
                    <p class="mt-2 text-3xl font-bold text-indigo-600">{{ monthlyStats.bookingsThisMonthCount.toLocaleString('ru-RU') }}</p>
                  </div> -->
                </div>

                <!-- Partners & MDP split -->
                <!-- <div class="mt-8 bg-white p-6 rounded-lg">
                  <h4 class="text-lg font-semibold mb-4">All</h4>
                  <div class="space-y-3">
                    <div class="flex justify-between">
                      <span>Partners (Total)</span>
                      <span class="font-medium">{{ formatNumber(monthlyStats.revenueThisMonth.allPartners) }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span>Partner Bikes</span>
                      <span class="font-medium">{{ formatNumber(monthlyStats.revenueThisMonth.partnersBikeAfterPercentage) }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span>Partner Cars</span>
                      <span class="font-medium">{{ formatNumber(monthlyStats.revenueThisMonth.partnersCarAfterPercentage) }}</span>
                    </div>
                    <hr class="my-2 border-gray-200" />
                    <div class="flex justify-between">
                      <span>MDP Total</span>
                      <span class="font-medium">{{ formatNumber(monthlyStats.revenueThisMonth.allMdp) }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span>MDP Bikes</span>
                      <span class="font-medium">{{ formatNumber(monthlyStats.revenueThisMonth.mdpBikeAndPartnersBike) }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span>MDP Cars</span>
                      <span class="font-medium">{{ formatNumber(monthlyStats.revenueThisMonth.mdpCarAndPartnersCar) }}</span>
                    </div>
                    <hr class="my-2 border-gray-200" />
                    <div class="flex justify-between">
                      <span>MARK own Total</span>
                      <span class="font-medium">{{ formatNumber(monthlyStats.revenueThisMonth.mdpFleet) }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span>MARK own Total Bikes</span>
                      <span class="font-medium">{{ formatNumber(monthlyStats.revenueThisMonth.mdpBikePersonal) }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span>MARK own Total Cars</span>
                      <span class="font-medium">{{ formatNumber(monthlyStats.revenueThisMonth.mdpCarPersonal) }}</span>
                    </div>
                  </div>
                </div> -->

                <!-- Partners & MDP split -->
                <!-- <div class="mt-8 bg-white p-6 rounded-lg">
                  <h1 class=" text-lg font-semibold mb-8 ">Partners' Share</h1>
                  <div class="space-y-3">
                    <div class="flex justify-between">
                      <span>MARK</span>
                      <span class="font-medium"><span >{{ formatNumber(monthlyStats.revenueThisMonth.partnerMARK) }}</span></span>
                    </div>
                    <hr class="my-2 border-gray-200" />

                    <div class="flex justify-between">
                      <span>OLEG</span>
                      <span class="font-medium">{{ formatNumber(monthlyStats.revenueThisMonth.partnerOLEG) }}</span>
                    </div>
                    <hr class="my-2 border-gray-200" />

                    <div class="flex justify-between">
                      <span>URIY</span>
                      <span class="font-medium">{{ formatNumber(monthlyStats.revenueThisMonth.partnerURIY) }}</span>
                    </div>
                    <hr class="my-2 border-gray-200" />

                    <div class="flex justify-between">
                      <span>DENIS</span>
                      <span class="font-medium">{{ formatNumber(monthlyStats.revenueThisMonth.partnerDENIS) }}</span>
                    </div>
                    <hr class="my-2 border-gray-200" />

                    <div class="flex justify-between">
                      <span>SERGEI</span>
                      <span class="font-medium">{{ formatNumber(monthlyStats.revenueThisMonth.partnerSERGEI) }}</span>
                    </div>
                    <hr class="my-2 border-gray-200" />

                    <div class="flex justify-between">
                      <span>ANTON</span>
                      <span class="font-medium">{{ formatNumber(monthlyStats.revenueThisMonth.partnerANTON) }}</span>
                    </div>
                    <hr class="my-2 border-gray-200" />

                    <div class="flex justify-between">
                      <span>EKATERINA</span>
                      <span class="font-medium">{{ formatNumber(monthlyStats.revenueThisMonth.partnerEKATERINA) }}</span>
                    </div>
                    <hr class="my-2 border-gray-200" />

                    <div class="flex justify-between">
                      <span>EVGENII</span>
                      <span class="font-medium">{{ formatNumber(monthlyStats.revenueThisMonth.partnerEVGENII) }}</span>
                    </div>
                    <hr class="my-2 border-gray-200" />

                    <div class="flex justify-between">
                      <span>DASHA</span>
                      <span class="font-medium">{{ formatNumber(monthlyStats.revenueThisMonth.partnerDASHA) }}</span>
                    </div>
                    <hr class="my-2 border-gray-200" />

                    <div class="flex justify-between">
                      <span>ANDREI</span>
                      <span class="font-medium">{{ formatNumber(monthlyStats.revenueThisMonth.partnerANDREI) }}</span>
                    </div>
                    <hr class="my-2 border-gray-200" />

                    <div class="flex justify-between">
                      <span>VLADIMIR</span>
                      <span class="font-medium">{{ formatNumber(monthlyStats.revenueThisMonth.partnerVLADIMIR) }}</span>
                    </div>
                    <hr class="my-2 border-gray-200" />

                    <div class="flex justify-between">
                      <span>IGOR</span>
                      <span class="font-medium">{{ formatNumber(monthlyStats.revenueThisMonth.partnerIGOR) }}</span>
                    </div>
                    <hr class="my-2 border-gray-200" />

                    <div class="flex justify-between">
                      <span>OLEGSVOE</span>
                      <span class="font-medium">{{ formatNumber(monthlyStats.revenueThisMonth.partnerOLEGSVOE) }}</span>
                    </div>
                    <hr class="my-2 border-gray-200" />


                  </div>
                </div> -->

                <!-- Daily Stats -->
                            <div v-show="changeMonth==='this'" class="mt-8  gap-6">
                              <div class="bg-white p-6 rounded-lg">
                                <h4 class="text-lg font-semibold mb-3">Today</h4>
                                <div class="space-y-2">
                                    <div>Revenue: <strong class="text-green-600">{{ todayStats.paidToday.total.toLocaleString('ru-RU') }}</strong></div>
                                    <div>– Main: <strong class="text-green-600">{{ todayStats.paidToday.mainOffice.toLocaleString('ru-RU') }}</strong></div>
                                    <div>– Pratam: <strong class="text-green-600">{{ todayStats.paidToday.pratamnak.toLocaleString('ru-RU') }}</strong></div>

                                  <div>Rentals: <strong>{{ todayStats.bookingsTodayCount }}</strong></div>
                                  <div>– Main: <strong>{{ todayStats.bookingsToday.mainOffice }}</strong></div>
                                  <div>– Pratam: <strong>{{ todayStats.bookingsToday.pratamnak }}</strong></div>

                                  <div>Returns: <strong>{{ returnsStats.returnsToday.total }}</strong></div>
                                  <div>– Main: <strong>{{ returnsStats.returnsToday.mainOffice }}</strong></div>
                                  <div>– Pratam: <strong>{{ returnsStats.returnsToday.pratamnak }}</strong></div>
                                </div>
                              </div>
                              <!-- <div class="bg-white p-6 rounded-lg">
                                <h4 class="text-lg font-semibold mb-3">Yesterday</h4>
                                <div class="space-y-2">
                                    <div>Revenue: <strong class="text-green-600">{{ todayStats.paidYesterday.total.toLocaleString('ru-RU') }}</strong></div>
                                    <div>– Main: <strong class="text-green-600">{{ todayStats.paidYesterday.mainOffice.toLocaleString('ru-RU') }}</strong></div>
                                    <div>– Pratam: <strong class="text-green-600">{{ todayStats.paidYesterday.pratamnak.toLocaleString('ru-RU') }}</strong></div>

                                  <div>Rentals: <strong>{{ todayStats.bookingsYesterdayCount }}</strong></div>
                                  <div>– Main: <strong>{{ todayStats.bookingsYesterday.mainOffice }}</strong></div>
                                  <div>– Pratam: <strong>{{ todayStats.bookingsYesterday.pratamnak }}</strong></div>

                                  <div>Returns: <strong>{{ returnsStats.returnsYesterday.total }}</strong></div>
                                  <div>– Main: <strong>{{ returnsStats.returnsYesterday.mainOffice }}</strong></div>
                                  <div>– Pratam: <strong>{{ returnsStats.returnsYesterday.pratamnak }}</strong></div>
                                </div>
                              </div> -->
                            </div>

                            <!-- Fleet & Active Bookings -->

                              <div v-show="changeMonth==='this'" class="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

                                  <!-- Total Debt -->
                                  <div class="bg-white p-6 rounded-lg text-center">
                                    <h3 class="text-gray-700 font-semibold">Total Debts</h3>
                                    <p class="mt-2 text-3xl font-bold text-red-600">{{ bookingStats.debtSum.toLocaleString('ru-RU') }}</p>
                                  </div>

                                  <!-- Debtors -->
                                  <div class="bg-white p-6 rounded-lg text-center">
                                    <h3 class="text-gray-700 font-semibold">Debtors</h3>
                                    <p class="mt-2 text-3xl font-bold text-red-600">{{ bookingStats.debtCount.toLocaleString('ru-RU') }}</p>
                                  </div>



                                <!-- <div class="bg-white rounded-lg p-6 flex flex-col items-center">
                                  <p class="text-sm uppercase text-gray-700 font-semibold">Active Rentals</p>
                                  <p class="mt-3 text-3xl font-semibold text-indigo-600">{{ bookingStats.total }}</p>
                                </div>
                                <div class="bg-white rounded-lg p-6 flex flex-col items-center">
                                  <p class="text-sm uppercase text-gray-700 font-semibold">Total Vehicles</p>
                                  <p class="mt-3 text-3xl font-semibold text-indigo-600">{{ fleetStats.transport.total }}</p>
                                </div> -->

                                <!-- <div class="flex bg-white rounded-lg p-6 justify-between">
                                    <span class="flex flex-col gap-2 justify-center">
                                  <p class="text-sm uppercase text-gray-500">Rented</p>
                                  <div class="mt-3 text-3xl font-semibold text-yellow-600">{{ fleetStats.transport.inRental.allOffice }}</div>
                                    </span>
                                    <span class="flex flex-col gap-2 justify-center">
                                  <p class="text-sm uppercase text-gray-500">Main</p>
                                  <div class="mt-3 text-3xl font-semibold text-yellow-600">{{ fleetStats.transport.inRental.mainOffice }}</div>
                                    </span>
                                    <span class="flex flex-col gap-2 justify-center">
                                  <p class="block text-sm uppercase text-gray-500">Pratam</p>
                                  <div class="mt-3 text-3xl font-semibold text-yellow-600">{{ fleetStats.transport.inRental.pratamnuk }}</div>
                                    </span>
                                </div> -->

                                <!-- <div class="flex bg-white rounded-lg p-6 justify-between">
                                    <span class="flex flex-col gap-2 justify-center">
                                  <p class="text-sm uppercase text-gray-500">On Office</p>
                                  <div class="mt-3 text-3xl font-semibold text-yellow-600">{{ fleetStats.transport.inOffices.allOffice }}</div>
                                    </span>
                                    <span class="flex flex-col gap-2 justify-center">
                                  <p class="text-sm uppercase text-gray-500">Main</p>
                                  <div class="mt-3 text-3xl font-semibold text-yellow-600">{{ fleetStats.transport.inOffices.mainOffice }}</div>
                                    </span>
                                    <span class="flex flex-col gap-2 justify-center">
                                  <p class="block text-sm uppercase text-gray-500">Pratam</p>
                                  <div class="mt-3 text-3xl font-semibold text-yellow-600">{{ fleetStats.transport.inOffices.pratamnuk }}</div>
                                    </span>
                                </div> -->

                                <div @click="duplicate" class="bg-white p-6 rounded-lg text-center cursor-pointer">
                                  <h3 class="flex justify-center gap-2 text-gray-700 font-semibold">
                                    Duplicate
                                    <div
                                      v-show="loadingCheckDuplicate"
                                      class="w-5 h-5 border-3 border-white border-t-gray-500 rounded-full animate-spin"
                                      role="status"
                                      aria-label="Loading"
                                    ></div>
                                  </h3>

                                  <p
                                    v-for="(item, i) in bookingDuplicate"
                                    v-if="bookingDuplicate.length"
                                    :key="i"
                                    class="mt-2 text-xs font-bold text-red-600"
                                  >
                                    {{ item.name }}
                                  </p>

                                  <p v-if="!bookingDuplicate.length" class="mt-2 text-gray-400 text-sm">
                                    Click to check
                                  </p>
                                </div>


                                <!-- <div @click="duplicate()" class="bg-white p-6 rounded-lg text-center cursor-pointer">
                                  <h3 class="flex  justify-center  gap-2 text-gray-700 font-semibold">Duplicate
                                      <div v-show="loadingCheckDuplicate"
                                           class="w-5 h-5 border-3 border-white border-t-gray-500 rounded-full animate-spin"
                                           role="status"
                                           aria-label="Loading">
                                      </div>
                                  </h3>

                                  <p v-if="bookingDuplicate" class="mt-2 text-xl font-bold text-red-600">
                                      {{ bookingDuplicate.name }}
                                    </p>
                                    <p v-else class="mt-2 text-gray-400 text-sm">Click to check</p>
                                </div> -->

                              </div>
                            </div>

                          </section>

    </section>
</template>

<script setup>

import { computed} from 'vue'
const loadingCheckDuplicate = ref(false)
const config = useRuntimeConfig()
const gaverment = 0.5

const changeMonth = ref('this')
const params = reactive({
  period: '',
})

function paramsF(p = 'this') {
  if (p === 'previous') {
    params.period = 'previous'
    changeMonth.value = 'previous'
  } else {
    params.period = ''
    changeMonth.value = 'this'
  }
  refresh()
}
const formatNumber = (num) => Number(num || 0).toLocaleString('ru-RU')


// ЗАПРОС К БРОНИРОВАНИЯМ ПЕРВЫЙ
const { data, error, refresh } =  useFetch(`${config.public.apiBase}/api/booking/dashboard/oneMonth`, {
  params,
  suspense: false,
  credentials: 'include'
})
const items = computed(() => data.value?.data || [])

// ДОПОЛНЕНИЕ МАССИВА ВЛОЖЕНИЯМИ
const newArray = computed(() =>
  items.value.map(item => ({
    ...item,
    isBike: item.garage.isBike,
    owner: item.garage.partner.tag,
    royaltyBike: item.garage.partner.royaltyBike,
    royaltyCar: item.garage.partner.royaltyCar,
  }))
)

const monthlyStats = computed(() =>
  newArray.value.reduce((acc, item) => {
    const paid       = Number(item.paid)
    const factorBike = Number(item.royaltyBike) / 100
    const factorCar  = Number(item.royaltyCar)  / 100

    // 1) Общие счётчики
    acc.bookingsThisMonthCount++
    acc.revenueThisMonth.allGarage += paid
    if (item.isBike) acc.revenueThisMonth.allBike += paid
    else             acc.revenueThisMonth.allCar  += paid

    // 2) Распределение по партнёрам
    // Собираем ключ вида 'partnerTAG' без пробелов
    const rawTag = item.garage.partner.tag     // например 'OLEG CBR'
    const key    = 'partner' + rawTag.replace(/\s/g, '')  // → 'partnerOLEGCBR'
    if (acc.revenueThisMonth[key] !== undefined) {
      // вычисляем долю партнёра в зависимости от типа транспорта
      const share = item.isBike ? paid * factorBike : paid * factorCar
      acc.revenueThisMonth[key] += share
    }

    // 3) Старая логика MDP / partnersBeforeAfter…
    if (item.isBike && item.owner === 'MARK')   acc.revenueThisMonth.mdpBikePersonal += paid
    if (!item.isBike && item.owner === 'MARK')  acc.revenueThisMonth.mdpCarPersonal  += paid

    if (item.isBike && item.owner !== 'MARK')   acc.revenueThisMonth.partnersBikeBeforePercentage += paid
    if (!item.isBike && item.owner !== 'MARK')  acc.revenueThisMonth.partnersCarBeforePercentage  += paid

    if (item.isBike && item.owner !== 'MARK')   acc.revenueThisMonth.partnersBikeAfterPercentage += paid * factorBike
    if (!item.isBike && item.owner !== 'MARK')  acc.revenueThisMonth.partnersCarAfterPercentage  += paid * factorCar

    acc.revenueThisMonth.partnersBikeMdpShare =
      acc.revenueThisMonth.partnersBikeBeforePercentage -
      acc.revenueThisMonth.partnersBikeAfterPercentage

    acc.revenueThisMonth.partnersCarMdpShare =
      acc.revenueThisMonth.partnersCarBeforePercentage -
      acc.revenueThisMonth.partnersCarAfterPercentage

    acc.revenueThisMonth.allPartners =
      acc.revenueThisMonth.partnersBikeAfterPercentage +
      acc.revenueThisMonth.partnersCarAfterPercentage

    acc.revenueThisMonth.mdpFleet =
      acc.revenueThisMonth.mdpBikePersonal +
      acc.revenueThisMonth.mdpCarPersonal

    acc.revenueThisMonth.mdpFleetAndPartnersFleet =
      acc.revenueThisMonth.partnersBikeMdpShare +
      acc.revenueThisMonth.partnersCarMdpShare

    acc.revenueThisMonth.allMdp =
      acc.revenueThisMonth.mdpFleet +
      acc.revenueThisMonth.mdpFleetAndPartnersFleet

    acc.revenueThisMonth.mdpBikeAndPartnersBike =
      acc.revenueThisMonth.partnersBikeMdpShare +
      acc.revenueThisMonth.mdpBikePersonal

    acc.revenueThisMonth.mdpCarAndPartnersCar =
      acc.revenueThisMonth.partnersCarMdpShare +
      acc.revenueThisMonth.mdpCarPersonal

    acc.revenueThisMonth.ratioBike = acc.revenueThisMonth.allBike * 100 / acc.revenueThisMonth.allGarage
    acc.revenueThisMonth.ratioCar = acc.revenueThisMonth.allCar * 100 / acc.revenueThisMonth.allGarage

    return acc
  }, {
    bookingsThisMonthCount: 0,
    revenueThisMonth: {
      allGarage: 0,
      allBike:   0,
      allCar:    0,

      mdpBikePersonal: 0,
      mdpCarPersonal:  0,

      partnersBikeBeforePercentage: 0,
      partnersCarBeforePercentage: 0,
      partnersBikeAfterPercentage:  0,
      partnersCarAfterPercentage:   0,
      partnersBikeMdpShare: 0,
      partnersCarMdpShare:  0,

      allPartners:              0,
      mdpFleet:                 0,
      mdpFleetAndPartnersFleet: 0,
      allMdp:                   0,
      mdpBikeAndPartnersBike:   0,
      mdpCarAndPartnersCar:     0,
      ratioBike:0,
      ratioCar:0,

      // Разметь здесь поля под каждого партнёра:
      partnerMARK:       0,
      partnerOLEG:       0,
      partnerURIY:       0,
      partnerDENIS:      0,
      partnerSERGEI:     0,
      partnerANTON:      0,
      partnerEKATERINA:  0,
      partnerDASHA:      0,
      partnerANDREI:     0,
      partnerVLADIMIR:   0,
      partnerIGOR:       0,
      partnerOLEGSVOE:   0,
    }
  })
)


// const todayStats = computed(() => {
//   const today = new Date()
//     .toLocaleDateString('en-CA', { timeZone: 'Asia/Bangkok' });
//   const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000)
//     .toLocaleDateString('en-CA', { timeZone: 'Asia/Bangkok' });

//   // инициализируем структуру, добавив поля для «вчера»
//   const stats = {
//     bookingsTodayCount:     0,
//     bookingsYesterdayCount: 0,

//     bookingsToday: {
//       mainOffice: 0,
//       pratamnak:  0
//     },
//     bookingsYesterday: {
//       mainOffice: 0,
//       pratamnak:  0
//     },

//     paidToday: {
//       total:      0,
//       mainOffice: 0,
//       pratamnak:  0
//     },
//     paidYesterday: {
//       total:      0,
//       mainOffice: 0,
//       pratamnak:  0
//     },

//     returnsToday: {
//       total:      0,
//       mainOffice: 0,
//       pratamnak:  0
//     },
//     returnsYesterday: {
//       total:      0,
//       mainOffice: 0,
//       pratamnak:  0
//     }
//   };

//   newArray.value.forEach(item => {
//     const paid = Number(item.paid);
//     const loc  = item.location === 'MAIN_OFFICE' ? 'mainOffice' : 'pratamnak';

//     const startDate = new Date(item.startRental)
//       .toLocaleDateString('en-CA', { timeZone: 'Asia/Bangkok' });
//     // Сегодняшние брони и paid
//     if (startDate === today) {
//       stats.bookingsTodayCount++;
//       stats.bookingsToday[loc]++;
//       stats.paidToday.total += paid;
//       stats.paidToday[loc]  += paid;
//     }
//     // Вчерашние брони и paid
//     if (startDate === yesterday) {
//       stats.bookingsYesterdayCount++;
//       stats.bookingsYesterday[loc]++;
//       stats.paidYesterday.total += paid;
//       stats.paidYesterday[loc]  += paid;
//     }

//     if (item.endRental) {
//       const endDate = new Date(item.endRental)
//         .toLocaleDateString('en-CA', { timeZone: 'Asia/Bangkok' });

//       // Сегодняшние возвраты
//       if (endDate === today) {
//         stats.returnsToday.total++;
//         stats.returnsToday[loc]++;
//       }
//       // Вчерашние возвраты
//       if (endDate === yesterday) {
//         stats.returnsYesterday.total++;
//         stats.returnsYesterday[loc]++;
//       }
//     }
//   });

//   return stats;
// });

// const todayStats = computed(() => {
//   // единый форматтер под Бангкок
//   const fmt = new Intl.DateTimeFormat('en-CA', {
//     timeZone: 'Asia/Bangkok',
//     year: 'numeric',
//     month: '2-digit',
//     day: '2-digit'
//   })

//   const today     = fmt.format(new Date())
//   const yesterday = fmt.format(new Date(Date.now() - 86400000))

//   const stats = {
//     bookingsTodayCount:     0,
//     bookingsYesterdayCount: 0,

//     bookingsToday:     { mainOffice: 0, pratamnak: 0 },
//     bookingsYesterday: { mainOffice: 0, pratamnak: 0 },

//     paidToday:     { total: 0, mainOffice: 0, pratamnak: 0 },
//     paidYesterday: { total: 0, mainOffice: 0, pratamnak: 0 },

//     returnsToday:     { total: 0, mainOffice: 0, pratamnak: 0 },
//     returnsYesterday: { total: 0, mainOffice: 0, pratamnak: 0 }
//   }

//   // ⬇️ как было: брони/оплаты считаем из месячной выборки
//   newArray.value.forEach(item => {
//     const paid = Number(item.paid || 0)
//     const loc  = item.location === 'MAIN_OFFICE' ? 'mainOffice' : 'pratamnak'

//     if (item.startRental) {
//       const startStr = fmt.format(new Date(item.startRental))
//       if (startStr === today) {
//         stats.bookingsTodayCount++
//         stats.bookingsToday[loc]++
//         stats.paidToday.total += paid
//         stats.paidToday[loc]  += paid
//       }
//       if (startStr === yesterday) {
//         stats.bookingsYesterdayCount++
//         stats.bookingsYesterday[loc]++
//         stats.paidYesterday.total += paid
//         stats.paidYesterday[loc]  += paid
//       }
//     }
//   })

//   // ⬇️ ВОЗВРАТЫ: считаем по endRental ИЗ ПОЛНОГО СПИСКА, без фильтров
//   itemsAllBooking.value.forEach(b => {
//     if (!b.endRental) return
//     const loc    = b.location === 'MAIN_OFFICE' ? 'mainOffice' : 'pratamnak'
//     const endStr = fmt.format(new Date(b.endRental))

//     if (endStr === today) {
//       stats.returnsToday.total++
//       stats.returnsToday[loc]++
//     } else if (endStr === yesterday) {
//       stats.returnsYesterday.total++
//       stats.returnsYesterday[loc]++
//     }
//   })

//   return stats
// })
const todayStats = computed(() => {
  const fmt = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Bangkok',
    year: 'numeric', month: '2-digit', day: '2-digit'
  })

  const today     = fmt.format(new Date())
  const yesterday = fmt.format(new Date(Date.now() - 86400000))

  const stats = {
    bookingsTodayCount:     0,
    bookingsYesterdayCount: 0,

    bookingsToday:     { mainOffice: 0, pratamnak: 0 },
    bookingsYesterday: { mainOffice: 0, pratamnak: 0 },

    paidToday:     { total: 0, mainOffice: 0, pratamnak: 0 },
    paidYesterday: { total: 0, mainOffice: 0, pratamnak: 0 },
  }

  for (const item of newArray.value) {
    const paid = Number(item.paid || 0)
    const loc  = item.location === 'MAIN_OFFICE' ? 'mainOffice' : 'pratamnak'
    if (!item.startRental) continue

    const startStr = fmt.format(new Date(item.startRental))
    if (startStr === today) {
      stats.bookingsTodayCount++
      stats.bookingsToday[loc]++
      stats.paidToday.total += paid
      stats.paidToday[loc]  += paid
    } else if (startStr === yesterday) {
      stats.bookingsYesterdayCount++
      stats.bookingsYesterday[loc]++
      stats.paidYesterday.total += paid
      stats.paidYesterday[loc]  += paid
    }
  }

  return stats
})








const { data: dataReturns } = useFetch(
  `${config.public.apiBase}/api/booking/returns/daily`,
  { credentials: 'include', suspense: false }
)

// аккуратно приводим к нужному формату и даём дефолты
const returnsStats = computed(() => {
  const empty = { total: 0, mainOffice: 0, pratamnak: 0 }
  const src = dataReturns.value || {}
  return {
    returnsToday:     src.today     || empty,
    returnsYesterday: src.yesterday || empty,
  }
})







//СКОЛЬКО БРОНЕЙ В БУКИНГ ЭНДПОИНТЕ

const { data: dataAllBooking } =  useFetch(`${config.public.apiBase}/api/booking/dashboard/all`, { suspense: false, credentials: 'include' })


const itemsAllBooking = computed(() => dataAllBooking.value?.data || [])

// const activeBookingsCount = computed(() => itemsAllBooking.value.length)

const bookingStats = computed(() => {
  const total = itemsAllBooking.value.length
  let debtCount = 0
  let debtSum   = 0

  for (const booking of itemsAllBooking.value) {
    const d = Number(booking.debt)
    if (d > 0) {
      debtCount++
      debtSum += d
    }
  }

  return { total, debtCount, debtSum }
})


const { data: dataAllGarage } =  useFetch(`${config.public.apiBase}/api/garage/dashboard/all`, { suspense: false, credentials: 'include' })


const itemsAllGarage = computed(() => dataAllGarage.value?.data || [])

const fleetStats = computed(() => {
  const fleetStatsInner = {
    transport: {
      total:      0,
      inOffices:  { allOffice: 0, mainOffice: 0,   pratamnuk:  0 },
      inRental:    { allOffice: 0, mainOffice: 0,   pratamnuk:  0 },
    },

    transportReturned: {
      mainOffice: 0,
      pratamnuk:  0
    }
  }

  itemsAllGarage.value.forEach(item => {
    //Всего в гараже
    fleetStatsInner.transport.total++

    // ФИльтруем по активным
    if (item.bookings?.some(b => b.isActive === true)) {
      fleetStatsInner.transport.inRental.allOffice ++

      if(item.location === 'MAIN_OFFICE') {
        fleetStatsInner.transport.inRental.mainOffice ++
      } else {
        fleetStatsInner.transport.inRental.pratamnuk ++
      }
    } else {
      fleetStatsInner.transport.inOffices.allOffice ++

      if(item.location === 'MAIN_OFFICE') {
        fleetStatsInner.transport.inOffices.mainOffice ++
      } else {
        fleetStatsInner.transport.inOffices.pratamnuk ++
      }
    }
  })

  return fleetStatsInner
})

const bookingDuplicate = ref([]) // сразу как массив

const duplicate = () => {
  loadingCheckDuplicate.value = true

  $fetch(`${config.public.apiBase}/api/garage/duplicates`, {
    credentials: 'include'
  })
    .then((response) => {
      bookingDuplicate.value = response?.data ?? []
      loadingCheckDuplicate.value = false
    })
    .catch((err) => {
      console.error('❌ Ошибка при получении дубликатов:', err)
      loadingCheckDuplicate.value = false
    })
}



definePageMeta({
  middleware: 'auth',
  requiredRole:  ['ADMIN', 'SUPERADMIN'],
})


 </script>
