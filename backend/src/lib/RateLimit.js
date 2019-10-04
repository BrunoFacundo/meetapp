import ExpressRateLimit from 'express-rate-limit';
import RateLimitRedis from 'rate-limit-redis';
import redis from 'redis';

class RateLimit extends ExpressRateLimit {
    constructor() {
        const store = new RateLimitRedis({
            client: redis.createClient({
                host: process.env.REDIS_HOST,
                port: process.env.REDIS_PORT
            })
        });
        super({ store, windowMs: 1000 * 60 * 15, max: 100 });
    }
}

export default new RateLimit();
