/* eslint-disable @typescript-eslint/no-explicit-any */
enum cacheType {
  local = 'local',
  session = 'session',
}

class Wycatch {
  storage: Storage
  constructor(type: cacheType) {
    this.storage = type === cacheType.local ? localStorage : sessionStorage
  }
  setCache(key: string, value: any) {
    if (value) {
      this.storage.setItem(key, JSON.stringify(value))
    }
  }
  getCache(key: string) {
    const value = this.storage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }
  deleteCache(key: string) {
    this.storage.removeItem(key)
  }
  clearcache() {
    this.storage.clear()
  }
}

const localCache = new Wycatch(cacheType.local)
const sessionCache = new Wycatch(cacheType.session)

export { localCache, sessionCache }
