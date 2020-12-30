const micromatch = require("micromatch");

const useCache = () => {
  async function setToCache(key, firstValue, secondValue) {
    if (secondValue) {
      throw new Error("Syntax error");
    }
    const cacheObj = await caches.open(key);
    try {
      await cacheObj.add(firstValue);
      return "OK";
    } catch (e) {
      return e;
    }
  }

  async function getFromCache(key, firstValue, secondValue, others) {
    if (key === undefined) {
      throw new Error("wrong number of arguments (given 0, expected 1)");
    } else if (firstValue && secondValue && others) {
      const givenArguments = 3 + others.length;
      throw new Error(
        `wrong number of arguments (given ${givenArguments}, expected 1)`
      );
    } else if (firstValue && secondValue) {
      throw new Error("wrong number of arguments (given 3, expected 1)");
    } else if (firstValue) {
      throw new Error("wrong number of arguments (given 2, expected 1)");
    }
    try {
      const response = caches.has(key).then(async function (keyIsInCache) {
        if (keyIsInCache) {
          const cacheObj = await caches.open(key);
          const requestObj = await cacheObj.keys();
          const keyValue = requestObj[requestObj.length - 1].url
            .toString()
            .split("/")
            .pop();
          return keyValue;
        } else {
          return "(nil)";
        }
      });
      return response;
    } catch (e) {
      return e;
    }
  }

  async function deleteFromCache(key) {
    if (key === undefined) {
      throw new Error("wrong number of arguments for 'del' command");
    }
    try {
      const response = caches.delete(key).then(function (keyIsFoundInCache) {
        if (keyIsFoundInCache) {
          return "1";
        } else {
          return "0";
        }
      });
      return response;
    } catch (e) {
      return e;
    }
  }

  async function existsInCache(key) {
    if (key === undefined) {
      throw new Error("wrong number of arguments for 'exists' command");
    }
    try {
      const response = caches.has(key).then(async function (keyIsInCache) {
        if (keyIsInCache) {
          return "1";
        } else {
          return "0";
        }
      });
      return response;
    } catch (e) {
      return e;
    }
  }

  async function expireCache(key, value) {
    if (key === undefined) {
      throw new Error("wrong number of arguments (given 0, expected 2)");
    } else if (value === undefined) {
      throw new Error("wrong number of arguments (given 1, expected 2)");
    }
    const time = Number(value) * 1000;
    try {
      const response = caches.has(key).then(async function (keyIsInCache) {
        if (keyIsInCache) {
          setTimeout(() => {
            console.log(key);
            caches.delete(key);
          }, time);
          return "1";
        } else {
          return "0";
        }
      });
      return response;
    } catch (e) {
      return e;
    }
  }

  async function keysCache(key, value) {
    if (key === undefined || value) {
      throw new Error("wrong number of arguments for 'keys' command");
    }
    const keysInCache = await caches.keys();
    const searchTerm = key.toString();
    const matchKeys = micromatch(keysInCache, searchTerm);
    try {
      if (matchKeys.length === 0) {
        return "(empty list or set)";
      } else {
        return matchKeys.toString();
      }
    } catch (e) {
      return e;
    }
  }

  return {
    setToCache,
    getFromCache,
    deleteFromCache,
    existsInCache,
    expireCache,
    keysCache,
  };
};

module.exports = useCache;
