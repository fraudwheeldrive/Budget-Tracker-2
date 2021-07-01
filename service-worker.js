//array for cached files // need to cache JS and and HTML 

const APP_PREFIX = 'Budget-Tracker-2';
const VERSION = 'version_01';
const CACHE_NAME = APP_PREFIX + VERSION;

const FILES_TO_CACHE= [
    "./public/html/index.html",
    "./public/css/style.css.",

]




self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            console.log('installing cache : ' + CACHE_NAME)
            return cache.addAll(Files_To_CACHE)
        })
    )
})
