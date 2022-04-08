importScripts('js/sw-acces.js');

const STATIC_CACHE = 'static-v4';
const DYNAMIC_CACHE = 'dynamic-v2';
const INMUTABLE_CACHE = 'inmutable-v1';
const APP_SHELL = [
"index.html",
"css/style.css",
"images/icons/icon-128x128.png",
"js/app.js",
"js/sw-acces.js",
"http://www.croop.cl/UI/twitter/images/doug.jpg",
"http://www.croop.cl/UI/twitter/images/carl.jpg",
"http://www.croop.cl/UI/twitter/images/russel.jpg",
"http://www.croop.cl/UI/twitter/images/carl.jpg"

];
const APP_SHELL_INMUTABLE = [
"https://fonts.googleapis.com/css?family=Quicksand:300,400",
"https://fonts.googleapis.com/css?family=Lato:400,300",
"https://netdna.bootstrapcdn.com/font-awesome/3.1.1/css/font-awesome.css",
"css/animate.css",
"js/jquery.js"
];

self.addEventListener('install', evento => {
const cacheStatic = caches.open( STATIC_CACHE ).then(cache =>
cache.addAll( APP_SHELL ));
const cacheInmutable = caches.open( INMUTABLE_CACHE ).then(cache =>
cache.addAll( APP_SHELL_INMUTABLE ));
evento.waitUntil( Promise.all([ cacheStatic, cacheInmutable ]) );
});

self.addEventListener('activate', evento => {
const respuesta = caches.keys().then( keys => {
keys.forEach( key => {
if ( key !== STATIC_CACHE && key.includes('static') ) {
return caches.delete(key);
}
if ( key !== DYNAMIC_CACHE && key.includes('dynamic') ) {
return caches.delete(key);
}
});
});
evento.waitUntil( respuesta );
});


self.addEventListener( 'fetch', evento => {
const respuesta = caches.match( e.request ).then( res => {

if ( res ) {
return res;
} else {
return fetch( evento.request ).then( newRes => {
return actualizaCacheDinamico( DYNAMIC_CACHE, evento.request, newRes );
});



}



});





evento.respondWith( respuesta );



});