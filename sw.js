---
layout: null
---

var CACHE_VERSION = 1;
var CURRENT_CACHES = {
  offline: '{{ site.title | slugify }}-cache-' + CACHE_VERSION
};
var OFFLINE_URL = 'offline.html';
var CACHE_URLS = [OFFLINE_URL];

{% for file in site.static_files %}
  CACHE_URLS.push('{{ file.path }}');
{% endfor %}

{% for post in site.posts %}
  CACHE_URLS.push('{{ post.url }}');
{% endfor %}

{% for page in site.pages %}
  {% if page.permalink %}
    CACHE_URLS.push('{{ page.permalink }}');
  {% endif %}

  {% if page.url %}
    CACHE_URLS.push('{{ page.url }}');
  {% endif %}
{% endfor %}

self.addEventListener('install', onInstall);
self.addEventListener('activate', onActicate);
self.addEventListener('fetch', onFetch);

function onInstall(event) {
  event.waitUntil(caches.open(CURRENT_CACHES.offline).then(function(cache) {
    return cache.addAll(CACHE_URLS);
  }).catch(function(err) {
    console.log('Install sw error: ', err);
  }));
}

function onActicate(event) {
  var expectedCacheNames = Object.keys(CURRENT_CACHES).map(function(key) {
    return CURRENT_CACHES[key];
  });

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (expectedCacheNames.indexOf(cacheName) === -1) {
            console.log('Delete out of date cache: ', cacheName);
            return caches.delete(cacheName);
          }
        })
      ); 
    })
  );
}

function onFetch(event) {
  event.respondWith(
    caches.open(CURRENT_CACHES.offline).then(function(cache) {
      return cache.match(event.request).then(function(response) {
        return response || fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        }).catch(function(err) {
          console.error('Fetch caches error: ', err);
          return caches.match(OFFLINE_URL);
        })
      });
    })
  )
}

