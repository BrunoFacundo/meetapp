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

        this.init();
        this.associate();
        this.hook();
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

    hook() {
        models.forEach(model => {
            if (model.hook) {
                model.hook();
            }
        });
    }
}

export default new Database();
