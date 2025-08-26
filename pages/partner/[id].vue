<template>
<!-- eslint-disable -->

    <section class="flex flex-col w-screen h-screen bg-white">
        <Sidebar />
        <section class="flex flex-col h-screen w-screen ">
            <PartnerHeader
                :loading="pending"
            />
            <!-- ДАННЫЕ СО СКРОЛОМ-->
            <section class="overflow-y-auto p-4 ">

                <!-- ОБРАБОТЧИК ОШИБОК -->
                <p v-if="pending" class="mt-4 text-gray-500">Загрузка...</p>
                <p v-else-if="error" class="mt-4 text-red-500">Ошибка: {{ error.message }}</p>

                <!-- КОНТЕЙНЕР ЭКРАНОВ -->
                <section v-else class="flex flex-wrap sm:flex-nowrap w-full h-full gap-2 mb-2">

                    <!-- &&&&&&&&&& ЛЕВЫЙ БЛОК &&&&&&&&&&-->
                    <section class="flex flex-col w-full  h-fit sm:h-[740px] rounded-xl bg-gray-100 ">
                        <div  class="min-w-72 px-4 mt-4">
                            <div class="flex items-center justify-center h-8 w-full  rounded-xl bg-gray-500   text-white relative overflow-hidden font-semibold before:content-[''] before:absolute before:inset-0 before:bg-[repeating-linear-gradient(45deg,#ffffff10,#ffffff10_10px,transparent_10px,transparent_20px)] before:pointer-events-none">
                                Total company revenue</div>
                        </div>
                        <!-- БЛОК С ДАННЫМИ ОбЩЕЕ-->
                        <div class="flex flex-col w-full p-4 gap-2">
                            <div class="flex gap-4">
                                <div class="w-full">
                                    <label for="location" class="mb-1 ml-2 text-sm font-medium text-green-500">In {{currentMonthName}}</label>
                                    <span class="flex items-center justify-center h-12 w-full bg-white rounded-xl">{{Math.round(totalsBike.thisMonth + totalsBikeMark.thisMonthMark + (totalsCar.thisMonth + totalsCarMark.thisMonthMark))}} ฿ </span>
                                </div>
                                <div class="w-full">
                                    <label for="location" class="mb-1 ml-2 text-sm font-medium text-orange-500">In {{prevMonthName}}</label>
                                    <span class="flex items-center justify-center h-12 w-full bg-white rounded-xl">{{Math.round(totalsBike.previousMonth + totalsBikeMark.previousMonthMark + (totalsCar.previousMonth + totalsCarMark.previousMonthMark))}} ฿ </span>
                                </div>
                            </div>
                            <!-- <div v-show="carRevenue.length !== 0" class="flex gap-4">
                                <div class="w-full">
                                    <label for="location" class="mb-1 ml-2 text-sm font-medium text-green-500">Car in {{currentMonthName}}</label>
                                    <span class="flex items-center justify-center h-12 w-full bg-white rounded-xl">{{Math.round(totalsCar.thisMonth + totalsCarMark.thisMonthMark)}} ฿ </span>
                                </div>
                                <div class="w-full">
                                    <label for="location" class="mb-1 ml-2 text-sm font-medium text-orange-500">Car in {{prevMonthName}}</label>
                                    <span class="flex items-center justify-center h-12 w-full bg-white rounded-xl">{{Math.round(totalsCar.previousMonth + totalsCarMark.previousMonthMark)}} ฿ </span>
                                </div>
                            </div> -->
                        </div>

                        <div v-show="partner.tag!=='MARK'" class="w-full px-4 mt-4">
                            <div class="flex items-center justify-center h-8 w-full  rounded-xl bg-gray-500   text-white relative overflow-hidden font-semibold before:content-[''] before:absolute before:inset-0 before:bg-[repeating-linear-gradient(45deg,#ffffff10,#ffffff10_10px,transparent_10px,transparent_20px)] before:pointer-events-none">
                                {{partner.tag}} revenue </div>
                        </div>
                        <!-- БЛОК С ДАННЫМИ ПАРТНЕРА ({{partner.royaltyBike}}%)-->
                        <div v-show="partner.tag!=='MARK'" class="flex flex-col w-full p-4 gap-2">
                            <div class="flex gap-4">
                                <div class="w-full">
                                    <label for="location" class="mb-1 ml-2 text-sm font-medium text-green-500">In {{currentMonthName}}</label>
                                    <span class="flex items-center justify-center h-12 w-full bg-white rounded-xl">{{Math.round(totalsBike.thisMonth +totalsCar.thisMonth)}} ฿ </span>
                                </div>
                                <div class="w-full">
                                    <label for="location" class="mb-1 ml-2 text-sm font-medium text-orange-500">In {{prevMonthName}}</label>
                                    <span class="flex items-center justify-center h-12 w-full bg-white rounded-xl">{{Math.round(totalsBike.previousMonth + totalsCar.previousMonth)}} ฿ </span>
                                </div>
                            </div>
                            <!-- <div v-show="carRevenue.length !== 0" class="flex gap-4">
                                <div class="w-full">
                                    <label for="location" class="mb-1 ml-2 text-sm font-medium text-green-500">Car in {{currentMonthName}}</label>
                                    <span class="flex items-center justify-center h-12 w-full bg-white rounded-xl">{{totalsCar.thisMonth}} ฿ </span>
                                </div>
                                <div class="w-full">
                                    <label for="location" class="mb-1 ml-2 text-sm font-medium text-orange-500">Car in {{prevMonthName}}</label>
                                    <span class="flex items-center justify-center h-12 w-full bg-white rounded-xl">{{totalsCar.previousMonth}} ฿ </span>
                                </div>
                            </div> -->
                        </div>

                        <div v-show="partner.tag!=='MARK'" class="w-full px-4 mt-4">
                            <div class="flex items-center justify-center h-8 w-full  rounded-xl bg-gray-500   text-white relative overflow-hidden font-semibold before:content-[''] before:absolute before:inset-0 before:bg-[repeating-linear-gradient(45deg,#ffffff10,#ffffff10_10px,transparent_10px,transparent_20px)] before:pointer-events-none">
                                Our revenue</div>
                        </div>
                        <!-- БЛОК С ДАННЫМИ ПАРТНЕРА  ({{partner.royaltyBike}}%)-->
                        <div v-show="partner.tag!=='MARK'" class="flex flex-col w-full p-4 gap-2">
                            <div class="flex gap-4">
                                <div class="w-full">
                                    <label for="location" class="mb-1 ml-2 text-sm font-medium text-green-500">In {{currentMonthName}}</label>
                                    <span class="flex items-center justify-center h-12 w-full bg-white rounded-xl">{{Math.round(totalsBikeMark.thisMonthMark + totalsCarMark.thisMonthMark)}} ฿ </span>
                                </div>
                                <div class="w-full">
                                    <label for="location" class="mb-1 ml-2 text-sm font-medium text-orange-500">In {{prevMonthName}}</label>
                                    <span class="flex items-center justify-center h-12 w-full bg-white rounded-xl">{{Math.round(totalsBikeMark.previousMonthMark + totalsCarMark.previousMonthMark)}} ฿ </span>
                                </div>
                            </div>
                            <!-- <div v-show="carRevenue.length !== 0" class="flex gap-4">
                                <div class="w-full">
                                    <label for="location" class="mb-1 ml-2 text-sm font-medium text-green-500">Car in {{currentMonthName}}</label>
                                    <span class="flex items-center justify-center h-12 w-full bg-white rounded-xl">{{totalsCarMark.thisMonthMark}} ฿ </span>
                                </div>
                                <div class="w-full">
                                    <label for="location" class="mb-1 ml-2 text-sm font-medium text-orange-500">Car in {{prevMonthName}}</label>
                                    <span class="flex items-center justify-center h-12 w-full bg-white rounded-xl">{{totalsCarMark.previousMonthMark}} ฿ </span>
                                </div>
                            </div> -->
                        </div>
                    </section>




                    <!-- &&&&&&&&&& ПРАВЫЙ БЛОК &&&&&&&&&&-->
                    <section class="flex flex-col w-full h-[740px] bg-gray-100 rounded-xl p-4 gap-2">

                        <!-- Байки -->
                        <div class="w-full ">
                            <label for="location" class="mb-1 ml-2 text-sm font-medium text-gray-400">BIKE: <span class="text-blue-500">{{bikeRevenue.length}}</span></label>
                            <div class="flex flex-col h-[300px] w-full bg-white rounded-xl overflow-hidden overflow-y-auto">
                                <table class="min-w-full bg-white divide-y divide-gray-200">
                                  <!-- Заголовок -->
                                  <thead class="bg-gray-50 ">
                                    <tr >
                                    <th class=" px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                                      <th class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                      <th class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{currentMonthName}}</th>
                                      <th class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{prevMonthName}}</th>

                                    </tr>
                                  </thead>
                                  <!-- Тело таблицы -->
                                  <tbody class="bg-white divide-y divide-gray-200">
                                    <tr v-for="item in bikeRevenue" :key="item.id" @click="router.push(`/garage/${item.id}`)" class="hover:bg-gray-100">
                                        <td class="cursor-pointer px-2 py-3 whitespace-nowrap text-sm text-gray-400"><NuxtLink   :to="`/garage/${item.id}`">{{item.id}}</NuxtLink></td>
                                        <td class="cursor-pointer px-2 py-3 whitespace-nowrap text-sm "><NuxtLink   :to="`/garage/${item.id}`">{{item.bikeName}}</NuxtLink></td>
                                        <td class="cursor-pointer px-2 py-3 whitespace-nowrap text-sm text-green-500"><NuxtLink   :to="`/garage/${item.id}`">{{ item.thisMonth.toLocaleString('ru-RU')}}</NuxtLink></td>
                                        <td class="cursor-pointer px-2 py-3 whitespace-nowrap text-sm text-orange-500"><NuxtLink   :to="`/garage/${item.id}`">{{ item.previousMonth.toLocaleString('ru-RU')}}</NuxtLink></td>

                                    </tr>
                                  </tbody>
                                </table>
                            </div>
                        </div>

                        <!-- Авто -->
                        <div v-show="carRevenue.length !== 0" class="w-full ">
                            <label for="location" class="mb-1 ml-2 text-sm font-medium text-gray-400">CAR: <span class="text-blue-500">{{carRevenue.length}}</span></label>
                            <div class="flex flex-col h-[300px] w-full bg-white rounded-xl overflow-hidden overflow-y-auto">
                                <table class="min-w-full bg-white divide-y divide-gray-200">
                                  <!-- Заголовок -->
                                  <thead class="bg-gray-50 ">
                                    <tr >
                                    <th class=" px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                                    <th class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{currentMonthName}}</th>
                                    <th class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{prevMonthName}}</th>

                                    </tr>
                                  </thead>
                                  <!-- Тело таблицы -->
                                  <tbody class="bg-white divide-y divide-gray-200">
                                    <tr v-for="item in carRevenue" :key="item.id" @click="router.push(`/garage/${item.id}`)" class="hover:bg-gray-100">
                                        <td class="cursor-pointer px-2 py-3 whitespace-nowrap text-sm text-gray-400"><NuxtLink   :to="`/garage/${item.id}`">{{item.id}}</NuxtLink></td>
                                        <td class="cursor-pointer px-2 py-3 whitespace-nowrap text-sm "><NuxtLink   :to="`/garage/${item.id}`">{{item.bikeName}}</NuxtLink></td>
                                        <td class="cursor-pointer px-2 py-3 whitespace-nowrap text-sm text-green-500"><NuxtLink   :to="`/garage/${item.id}`">{{ item.thisMonth.toLocaleString('ru-RU')}}</NuxtLink></td>
                                        <td class="cursor-pointer px-2 py-3 whitespace-nowrap text-sm text-orange-500"><NuxtLink   :to="`/garage/${item.id}`">{{item.previousMonth.toLocaleString('ru-RU')}}</NuxtLink></td>

                                    </tr>
                                  </tbody>
                                </table>
                            </div>
                        </div>
                    </section>

                </section>
            </section>
        </section>

    </section>
</template>

<script setup>
import Sidebar from '~/components/Sidebar.vue';
import PartnerHeader from '~/components/PartnerHeader.vue';
import { computed} from 'vue'
import { useRoute, useRouter} from 'vue-router'
// const router = useRouter()
const route = useRoute()
const router = useRouter()

const config = useRuntimeConfig()

// Извлекаем ID из адресной строки
const id = route.params.id

// Получаем данные с сервера
const { data, pending, error } = useFetch(`${config.public.apiBase}/api/partner/${id}`,{credentials: 'include'})
// console.log(data.value.data)
const partner = computed(() => data.value?.data ?? null)


function makeRevenue(lines, percent) {
  // percent — строка, например "50" или "75"
  const factor = Number(percent) / 100
  const factor2 = (100 - Number(percent)) / 100

  return lines.map(garage => {
    // текущий месяц
    const now   = new Date()
    const y     = now.getFullYear()
    const m     = now.getMonth()
    // предыдущий
    const pd    = new Date(y, m - 1)
    const py    = pd.getFullYear()
    const pm    = pd.getMonth()
    // свёртка
    const sumFor = (year, month) =>
      garage.bookings
        .filter(b => {
          const d = new Date(b.startRental)
          return d.getFullYear() === year && d.getMonth() === month
        })
        .reduce((s, b) => s + Number(b.paid || 0), 0)

    const rawThis  = sumFor(y, m)
    const rawPrev  = sumFor(py, pm)

    return {
      id:            garage.id,
      bikeName:      garage.name,
      thisMonth:     Math.round(rawThis  * factor) || 0,
      previousMonth: Math.round(rawPrev  * factor)|| 0,
      thisMonthMark:     Math.round(rawThis  * factor2)|| 0,
      previousMonthMark: Math.round(rawPrev  * factor2)|| 0,
    }
  })
}

// массивы «байков» и «авто»
const bikeRevenue = computed(() => {
  if (!partner.value) return []
  const lines = partner.value.garages.filter(g => g.isBike === true)
  return makeRevenue(lines, partner.value.royaltyBike)
})

const carRevenue = computed(() => {
  if (!partner.value) return []
  const lines = partner.value.garages.filter(g => g.isBike === false)
  return makeRevenue(lines, partner.value.royaltyCar)
})
console.log(carRevenue.value)
// общие итоги
const totalsBike = computed(() =>
  bikeRevenue.value.reduce((acc, { thisMonth, previousMonth }) => {
    acc.thisMonth     += thisMonth
    acc.previousMonth += previousMonth
    return acc
  }, { thisMonth: 0, previousMonth: 0 })
)

const totalsCar = computed(() =>
  carRevenue.value.reduce((acc, { thisMonth, previousMonth }) => {
    acc.thisMonth     += thisMonth
    acc.previousMonth += previousMonth
    return acc
  }, { thisMonth: 0, previousMonth: 0 })
)

// общие итоги 2
const totalsBikeMark = computed(() =>
  bikeRevenue.value.reduce((acc, { thisMonthMark, previousMonthMark }) => {
    acc.thisMonthMark     += thisMonthMark
    acc.previousMonthMark += previousMonthMark
    return acc
  }, { thisMonthMark: 0, previousMonthMark: 0 })
)

const totalsCarMark = computed(() =>
  carRevenue.value.reduce((acc, { thisMonthMark, previousMonthMark }) => {
    acc.thisMonthMark     += thisMonthMark
    acc.previousMonthMark += previousMonthMark
    return acc
  }, { thisMonthMark: 0, previousMonthMark: 0 })
)


// const bikeGarages = computed(() => {
//   // если partner ещё не загрузился — возвращаем пустой массив
//   if (!partner.value?.garages) return []
//   return partner.value.garages.filter(g => g.isBike === true)
// })
// console.log(bikeGarages.value)

// // Отфильтрованный список «только авто»
// const carGarages = computed(() => {
//   if (!partner.value?.garages) return []
//   return partner.value.garages.filter(g => g.isBike === false)
// })
// console.log(carGarages.value)















// const garageRevenue = computed(() => {
//   if (!partner.value?.garages) return []

//   const now     = new Date()
//   const year    = now.getFullYear()
//   const month   = now.getMonth()      // 0 = январь … 11 = декабрь
//   // предыдущий месяц:
//   const prevDate  = new Date(year, month - 1)
//   const prevYear  = prevDate.getFullYear()
//   const prevMonth = prevDate.getMonth()

//   return partner.value.garages.map(garage => {
//     const sumFor = (y, m) =>
//       garage.bookings
//         .filter(b => {
//           const d = new Date(b.startRental)
//           return d.getFullYear() === y && d.getMonth() === m
//         })
//         .reduce((s, b) => s + Number(b.paid || 0), 0)

//     return {
//       bikeName:         garage.name,
//       thisMonth:        sumFor(year, month),
//       previousMonth:    sumFor(prevYear, prevMonth),
//     }
//   })
// })

// // console.log(garageRevenue.value)

// const totals = computed(()=>{
//   return garageRevenue.value.reduce(
//     (acc, {thisMonth, previousMonth})=>{
//       acc.thisMonth += thisMonth
//       acc.previousMonth += previousMonth
//       return acc
//     },
//     { thisMonth: 0, previousMonth: 0 }

//   )
// })
// // console.log(totals.value)


const now = new Date()

// текущий
const currentMonthName = now.toLocaleString('en-US', { month: 'long' })

// предыдущий
const prevDate        = new Date(now.getFullYear(), now.getMonth() - 1)
const prevMonthName   = prevDate.toLocaleString('en-US', { month: 'long' })


definePageMeta({
  middleware: 'auth',
  requiredRole:  ['ADMIN', 'SUPERADMIN'],
})

</script>
