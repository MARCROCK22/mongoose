const redis = require('redis');
const { promisify } = require('util');

const clientRedis = redis.createClient();
const setPromise = promisify(clientRedis.set).bind(clientRedis),
    getPromise = promisify(clientRedis.get).bind(clientRedis),
    delPromise = promisify(clientRedis.del).bind(clientRedis);

clientRedis.on('error', (...errors) => {
    console.error(...errors);
}).on('ready', (...xd) => {
    console.log('[REDIS] Ready', ...xd);
}).on('connect', (...xd) => {
    console.log('[REDIS] Connected', ...xd);
}).on('reconnecting', (...xd) => {
    console.log('[REDIS] Reconnecting', ...xd);
}).on('end', (...xd) => {
    console.log('[REDIS] Ended', ...xd);
}).on('warning', (...xd) => {
    console.warn('[REDIS] Warning', ...xd);
});

class RedisManager {

    set(key, value) {
        return setPromise(key, value, 'EX', 60 * 2);

    }

    get(...params) {
        return getPromise(...params);
    }

    del(...params) {
        return delPromise(...params);
    }

    get default() {
        return clientRedis;

    }

}

module.exports = new RedisManager();