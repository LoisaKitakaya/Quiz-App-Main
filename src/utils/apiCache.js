class ApiCache {
  constructor(cacheName = "api-cache", defaultExpiration = 3600) {
    this.cacheName = cacheName;
    this.defaultExpiration = defaultExpiration;
  }

  async openCache() {
    return await caches.open(this.cacheName);
  }

  async cacheResponse(request, response, maxAge = this.defaultExpiration) {
    const cache = await this.openCache();

    const now = Date.now();

    const expirationTime = now + maxAge * 1000;

    const metadata = new Response(
      JSON.stringify({ expirationTime, url: request.url }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    await cache.put(request.url + ":metadata", metadata);

    await cache.put(request, response.clone());

    return response;
  }

  async getCachedResponse(request) {
    const cache = await this.openCache();

    const metadataResponse = await cache.match(request.url + ":metadata");

    if (!metadataResponse) return null;

    const metadata = await metadataResponse.json();

    const now = Date.now();

    if (now > metadata.expirationTime) {
      await this.deleteCacheEntry(request);

      return null;
    }

    const cachedResponse = await cache.match(request);

    return cachedResponse || null;
  }

  async fetchWithCache(request, maxAge = this.defaultExpiration) {
    const cachedResponse = await this.getCachedResponse(request);

    if (cachedResponse) return cachedResponse;

    const networkResponse = await fetch(request);

    if (networkResponse.ok)
      await this.cacheResponse(request, networkResponse, maxAge);

    return networkResponse;
  }

  async fetchWithoutCache(request, maxAge = this.defaultExpiration) {
    const networkResponse = await fetch(request);

    if (networkResponse.ok)
      await this.cacheResponse(request, networkResponse, maxAge);

    return networkResponse;
  }

  async deleteCacheEntry(request) {
    const cache = await this.openCache();

    await cache.delete(request);

    await cache.delete(request.url + ":metadata");
  }

  async clearCache() {
    return await caches.delete(this.cacheName);
  }

  async listCachedRequests() {
    const cache = await this.openCache();

    const keys = await cache.keys();

    return keys
      .filter((request) => !request.url.endsWith(":metadata"))
      .map((request) => request.url);
  }
}

export default ApiCache;
