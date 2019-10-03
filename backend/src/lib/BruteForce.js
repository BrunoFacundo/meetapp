import Brute from 'express-brute';
import BruteRedis from 'express-brute-redis';

class BruteForce extends Brute {
    constructor() {
        const bruteStore = new BruteRedis({
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT
        });
        super(bruteStore);
    }
}

export default new BruteForce();
