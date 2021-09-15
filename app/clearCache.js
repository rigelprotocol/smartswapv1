
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
    window.addEventListener('error', () => {
        console.log("smartswap")
        clearAllCache()
        localStorage.removeItem('persist:root')
    })
}

