var deferredPrompt;

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/serviceworker.js').then(() => {
        console.log('service worker registered');
    });
}

window.addEventListener('beforeinstallprompt', function(event) {
    console.log('beforeinstallprompt fired');
    event.preventDefault();
    deferredPrompt = event;
    return false;
})
