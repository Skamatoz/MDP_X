<!-- eslint-disable -->

<template>

    <section class="border-b border-gray-100 bg-white">
    <section class=" flex-none h-12 justify-between items-center mb-2 hidden">
        <div class=" sm:gap-5 items-center hidden">
            <!-- <span><h1 class="hidden sm:block text-3xl">Booking</h1></span> -->
            <!-- <button v-if="activeTab==='all'" @click="$emit('add')" class="p-2 px-4 bg-gray-100 rounded-xl cursor-pointer">Add+</button> -->
        </div>

            <!-- <form autocomplete="off" @submit.prevent="onSubmit"  class="flex space-x-2 items-center" action="/search" method="GET">

                <div v-if="props.loading"
                     class="w-8 h-8 border-4 border-gray-200 border-t-gray-500 rounded-full animate-spin"
                     role="status"
                     aria-label="Loading">
                </div>

                <div class="h-full w-52 ">
                    <input class="p-2 px-4 bg-gray-100 rounded-xl w-full"
                    :class="[ activeTab==='booked' ||activeTab==='inGarage' ||activeTab==='changeOil' ||activeTab==='onlyBikes' ||activeTab==='onlyCars' ? ' cursor-no-drop' : '' ]"
                    :value="props.modelValue"
                      @input="onInput"
                      :disabled="isDisabled"
                        id="search-input"
                        name="q"
                        type="text"
                        placeholder="Client name...">
                </div>
                <button type="submit" class="bg-gray-100 py-2 px-6 rounded-xl cursor-pointer hover:bg-gray-200 ">GO</button>
            </form> -->


    </section>
    <!-- <section class=" flex flex-wrap w-fit h-fit  rounded gap-2 mb-2 ">
           <NuxtLink to="/prebook/all" ><button :class="[ activeTab==='all' ? ' bg-gray-100 text-gray-900 font-medium' : '' ]" class="h-12 text-gray-600 border border-gray-100 px-10 rounded-xl hover:bg-gray-100 cursor-pointer">All Booking</button></NuxtLink>

    </section> -->
    </section>
</template>

<script setup>
// import { useRoute} from 'vue-router'
// import { computed } from 'vue'


// объявляем, что принимаем prop modelValue (v-model)
// const props = defineProps({
//   modelValue: {
//     type: String,
//     default: ''
//   },

//    loading: {
//      type: Boolean,
//      default: false
//    }
// })
// const emit = defineEmits(['update:modelValue','search','add'])

// хелпер для v-model
// function onInput(e) {
//   emit('update:modelValue', e.target.value)
// }
// function onSubmit() {
//   emit('search')
// }

// const route = useRoute()

// const activeTab = computed(() => {
//   const segs = route.path.split('/')
//   // если URL "/garage" — ставим 'all'
//   return segs[2] || 'all'
// })
// const isDisabled = computed(() => activeTab.value === 'booked'||activeTab.value === 'inGarage'||activeTab.value === 'changeOil'||activeTab.value === 'onlyBikes'||activeTab.value === 'onlyCars')


</script>
