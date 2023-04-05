enum CacheType {
  LocalCache,
  SessionCache
}

class StorageCache {
  storage: Storage
  constructor(cacheType: CacheType) {
    this.storage = cacheType === CacheType.LocalCache ? localStorage : sessionStorage
  }

  setCache(key: string, value: any) {
    console.log(value)
    this.storage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value))
  }

  getCache(key: string) {
    return this.storage.getItem(key)
  }

  removeCache(key: string) {
    this.storage.removeItem(key)
  }

  clear() {
    this.storage.clear()
  }
}

export const localCache = new StorageCache(CacheType.LocalCache)
export const sessionCache = new StorageCache(CacheType.SessionCache)