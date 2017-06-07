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
    console.log('Error in install handler: ', err);
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
        if (response) {
          console.log('Found response in cache: ', response);
          return response;
        }
        console.log('No response for %s found in cache. About to fetch from network...', event.request.url);

        return fetch(event.request.clone()).then(function(response) {
          console.log('Response for %s from network is: %0', event.request.url, response);
          if (response.status < 400) {
            console.log('Caching the response to: ', event.request.url);
            cache.put(event.request, response.clone());
          } else {
            console.log('The response status code is not under 400, not caching the response to', event.request.url);
          }
          return response;
        }).catch(function(error) {
          console.log('Error in fetch handler: ', error);
        })
        // return response || fetch(event.request).then(function(response) {
        //   cache.put(event.request, response.clone());
        //   return response;
        // }).catch(function(err) {
        //   console.log('Fetch caches error: ', err);
        //   return caches.match(OFFLINE_URL);
        // })
      });
    })
  )
}

