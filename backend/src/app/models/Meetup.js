import { isBefore } from 'date-fns';
import Sequelize, { Model } from 'sequelize';
import Cache from '../../lib/Cache';
import Subscription from './Subscription';

class Meetup extends Model {
    static init(sequelize) {
        super.init(
            {
                title: Sequelize.STRING,
                description: Sequelize.STRING,
                location: Sequelize.STRING,
                date: Sequelize.DATE,
                past: {
                    type: Sequelize.VIRTUAL,
                    get() {
                        return isBefore(this.date, new Date());
                    }
                }
            },
            {
                sequelize
            }
        );
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
        this.belongsTo(models.File, { foreignKey: 'file_id', as: 'file' });
    }

    static hook() {
        const invalidateCache = async (meetup, hasSubscriptions) => {
            await Cache.invalidatePrefix('meetups');
            await Cache.invalidate(`user:${meetup.user_id}:organizing`);

            if (hasSubscriptions) {
                const subscriptions = await Subscription.findAll({
                    where: {
                        meetup_id: meetup.id
                    }
                });
                await Promise.all(
                    subscriptions.map(subscription => Cache.invalidate(`user:${subscription.user_id}:subscriptions`))
                );
            }
        };

        this.addHook('beforeCreate', meetup => invalidateCache(meetup, false));
        this.addHook('beforeUpdate', meetup => invalidateCache(meetup, true));
        this.addHook('beforeDestroy', meetup => invalidateCache(meetup, true));
    }
}

export default Meetup;
