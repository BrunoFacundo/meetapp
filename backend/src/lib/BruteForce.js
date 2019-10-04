import Brute from 'express-brute';
import BruteRedis from 'express-brute-redis';

class BruteForce extends Brute {
    constructor() {
        const store = new BruteRedis({
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT
        });
        super(store);
    }
}

export default new BruteForce();
