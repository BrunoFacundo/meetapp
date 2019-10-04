import RateLimit from 'express-rate-limit';
import Redis from 'ioredis';
import RedisStore from 'rate-limit-redis';

export default function appLimiter() {
    const store = new RedisStore({
        client: new Redis({
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT
        }),
        expiry: 60 * 15
    });

    return new RateLimit({
        store,
        message: 'Você fez muitas requisições. Por favor tente novamente mais tarde.',
        windowMs: 1000 * 60 * 15,
        max: 100
    });
}
