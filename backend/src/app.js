import * as Sentry from '@sentry/node';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import path from 'path';
import Youch from 'youch';
import sentryConfig from './config/sentry';
import './database';
import routes from './routes';

class App {
    constructor() {
        this.server = express();

        Sentry.init(sentryConfig);

        this.server.use(Sentry.Handlers.requestHandler());
        this.middlewares();
        this.routes();
        this.server.use(Sentry.Handlers.errorHandler());
        this.exceptionHandler();
    }

    middlewares() {
        this.server.use(helmet());
        this.server.use(cors());
        this.server.use(express.json());
        this.server.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')));
    }

    routes() {
        this.server.use(routes);
    }

    exceptionHandler() {
        this.server.use(async (err, req, res, next) => {
            if (err.isBoom) {
                return res.status(err.output.statusCode).json({ error: err.message, ...err.data });
            }

            if (process.env.NODE_ENV === 'development') {
                const errors = await new Youch(err, req).toJSON();

                return res.status(500).json(errors);
            }

            return res.status(500).json({ error: 'Internal server error' });
        });
    }
}

export default new App().server;
