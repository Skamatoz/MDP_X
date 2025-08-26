// stores/garage.js
import { defineStore } from 'pinia'

export const useGarageStore = defineStore('garage', {
  state: () => ({
    buttonActive: false
  }),
  actions: {
    toggleButton() {
      this.buttonActive = !this.buttonActive
    }
  }
})
