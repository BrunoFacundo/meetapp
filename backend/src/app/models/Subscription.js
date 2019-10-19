import { Model } from 'sequelize';
import Cache from '../../lib/Cache';

class Subscription extends Model {
    static init(sequelize) {
        super.init(
            {},
            {
                sequelize
            }
        );
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
        this.belongsTo(models.Meetup, { foreignKey: 'meetup_id', as: 'meetup' });
    }

    static hook() {
        const invalidateCache = async subscription => {
            await Cache.invalidate(`user:${subscription.user_id}:subscriptions`);
            await Cache.invalidatePrefix('meetups');
        };

        this.addHook('beforeCreate', invalidateCache);
        this.addHook('beforeDestroy', invalidateCache);
    }
}

export default Subscription;
