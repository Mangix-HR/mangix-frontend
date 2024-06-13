export default class LocalStorage {
  static store(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static storeWithExpiry(key, value, ttl = 300_000) {
    localStorage.setItem(
      key,
      JSON.stringify({
        value,
        timestamp: new Date().getTime() + ttl,
      })
    );
  }

  static getOrExpire(key) {
    const jsonData = localStorage.getItem(key);
    if (!jsonData) return null;

    const { value, timestamp } = JSON.parse(jsonData);

    if (compareTime(timestamp)) {
      localStorage.removeItem(key);
      return null;
    }

    return value;
  }

  static get(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  static remove(key) {
    localStorage.removeItem(key);
  }
}

function compareTime(time) {
  const nowTime = new Date().getTime();

  return nowTime > time;
}
