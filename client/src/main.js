import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

const render = () => {
    createApp(App).mount('#app');
}


if ('serviceWorker' in navigator) {
    navigator.serviceWorker
    .register('./sw.js')
    .then((reg) => {
      if (reg.installing) {
        const sw = reg.installing || reg.waiting
        sw.onstatechange = () => {
          if (sw.state === 'activated') {
            render()
          }
        }
      } else {
        render()
      }
    })
    .catch(console.error)
} else {
    render();
}