// название кеша
// для инвалидации кеша достаточно изменить это название,
// например, на my-app_images-v2
const CACHE_NAME = 'my-app_images-v1'

// обработка активации нового СВ
// удаляем старый кеш - кеш с другими названиями (например, предыдущей версии)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          // не трогаем не наш кеш
          if (key.includes('my-app-images') && key !== CACHE_NAME) {
            return caches.delete(key)
          }
        })
      )
    )
  )
  self.clients.claim()
})

// обрабатываем выполнение запроса из приложения (перехват запроса)
self.addEventListener('fetch', (event) => {
  // извлекаем путь из объекта запроса
  const { url } = event.request
  // извлекаем название пути из разобранного пути запроса
  const { pathname } = new URL(url)

  // если название пути включает слово `imgproxy`
  if (pathname.includes('imgproxy')) {
    console.log(pathname)
    // возвращаем ответ
    event.respondWith(
      caches
        // проверяем наличие в кеше ответа для данного названия пути
        .match(pathname)
        .then(async (response) => {
          // если такой ответ имеется
          if (response) {
            console.log('Image from cache')
            // возвращаем его
            return response
          }
          // если ответа в кеше для данного названия пути нет
          // выполняем запрос к `imgproxy`
          return fetch(event.request, {
            mode: 'cors',
            credentials: 'omit'
          }).then((response) =>
            // открываем наш кеш
            caches.open(CACHE_NAME).then((cache) => {
                console.log(response);
                if (response.ok) {
                    cache.put(pathname, response.clone())
                  }
              return response
            })
          )
        })
        .catch(console.error)
    )
  }
})