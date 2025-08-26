// plugins/copy.client.js
export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.directive('copy', {
    mounted(el, binding) {
      el.addEventListener('click', () => {
        // Разбираем binding.value
        let text, message
        if (binding.value && typeof binding.value === 'object') {
          text    = binding.value.text ?? el.innerText
          message = binding.value.message ?? 'Copied'
        } else {
          text    = binding.value ?? el.innerText
          message = 'Copied'
        }

        navigator.clipboard.writeText(text).then(() => {
          // Создаём тост
          const toast = document.createElement('div')
          toast.textContent = message
          Object.assign(toast.style, {
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(0,0,0,0.7)',
            color: '#fff',
            padding: '8px 16px',
            borderRadius: '4px',
            zIndex: 9999,
            opacity:  '0',
            transition: 'opacity 0.3s'
          })
          document.body.appendChild(toast)

          // Плавно показать
          requestAnimationFrame(() => {
            toast.style.opacity = '1'
          })

          // Скрыть и удалить через секунду
          setTimeout(() => {
            toast.style.opacity = '0'
            toast.addEventListener('transitionend', () => toast.remove())
          }, 1000)
        }).catch(err => console.error('Не удалось скопировать:', err))
      })
    }
  })
})
