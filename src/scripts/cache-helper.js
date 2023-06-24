const CACHE_NAME = 'my-app-cache-v1';

const CacheHelper = {
    async cachingAppShell(requests) {
        const cache = await this._openCache();
        await cache.addAll(requests);
    },

    async deleteOldCache() {
        const cacheNames = await caches.keys();
        await Promise.all(
            cacheNames
                .filter((name) => name !== CACHE_NAME)
                .map((filteredName) => caches.delete(filteredName)),
        );
    },

    async revalidateCache(request) {
        try {
            const response = await caches.match(request);

            if (response) {
                return response;
            }

            const fetchedResponse = await this._fetchRequest(request);

            if (fetchedResponse && fetchedResponse.status === 200) {
                await this._addCache(request, fetchedResponse.clone());
            }

            return fetchedResponse;
        } catch (error) {
            console.error('Error fetching data from network:', error);
            throw error;
        }
    },

    async _openCache() {
        return caches.open(CACHE_NAME);
    },

    async _fetchRequest(request) {
        try {
            const response = await fetch(request);
            return response;
        } catch (error) {
            console.error('Error fetching request:', error);
            throw error;
        }
    },

    async _addCache(request, response) {
        const cache = await this._openCache();
        cache.put(request, response);
    },
};

export default CacheHelper;
