import mongoose from 'mongoose';
import Sequelize from 'sequelize';
import File from '../app/models/File';
import Meetup from '../app/models/Meetup';
import Subscription from '../app/models/Subscription';
import User from '../app/models/User';
import databaseConfig from '../config/database';

const models = [User, File, Meetup, Subscription];

class Database {
    constructor() {
        this.connection = new Sequelize(databaseConfig);

        const { MONGO_HOST, MONGO_PORT, MONGO_NAME } = process.env;

        const mongoURI = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_NAME}`;

        this.mongoConnection = mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useFindAndModify: true
        });

        this.init();
        this.associate();
    }

    init() {
        models.forEach(model => model.init(this.connection));
    }

    associate() {
        models.forEach(model => {
            if (model.associate) {
                model.associate(this.connection.models);
            }
        });
    }
}

export default new Database();
