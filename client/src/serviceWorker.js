if(true) {
  var CACHE_NAME = 'cache-v1.3.0';

  importScripts('build/js/sw-toolbox.js');

  toolbox.options.debug = true;
  //toolbox.options.cache.name = CACHE_NAME;

  toolbox.router.get(
    '/(.*)',
    toolbox.cacheFirst,
    {
      cache: {
        name: CACHE_NAME
      }
    }
  );
}
