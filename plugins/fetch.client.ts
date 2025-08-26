export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:created', () => {
    // Глобально обрабатываем 401
    nuxtApp.$fetch = $fetch.create({
      onResponseError({ response }) {
        if (response.status === 401) {
          // Очистка токенов/куков
          localStorage.removeItem('token')
          // можно также вызвать logout в Pinia

          // Редирект на логин
          navigateTo('/login')
        }
      }
    })
  })
})
