
function unregisterServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready
            .then((registration) => {
                registration.unregister();
            })
            .catch((error) => {
                console.error(error.message);
            });
    }
}

const clearCache = () => {
    console.log("cl")
    if ('caches' in window) {
        caches.keys()
            .then(function (keyList) {

                return Promise.all(keyList.map(function (key) {
                    return caches.delete(key);
                }));
            }).then(() => unregisterServiceWorker())
            .catch((error) => {
                console.log(error.message)
            })
    }
}

export const clearpersistCache = () => {
    clearCache()
    console.log("smartswap")
    window.localStorage.removeItem('persist:root')
    window.addEventListener('error', () => {
        window.localStorage.removeItem('persist:root')


    })
}

