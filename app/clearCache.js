
const unregisterServiceWorker = () => {

    navigator.serviceWorker.getRegistrations()
        .then(registrations => {
            registrations.forEach(registration => {
                registration.unregister();
            })
        });
}

const clearCache = () => {
    if ('caches' in window) {
        caches.keys()
            .then(function (keyList) {

                return Promise.all(keyList.map(function (key) {
                    return caches.delete(key);
                }));
            }).then(() => unregisterServiceWorker())
    }
}

const clearpersist = () => {
    window.addEventListener('error', () => {
        localStorage.removeItem('persist:root')
    })
}

export const clearAllCache = async () => {
    await clearCache();
    clearpersist();
}