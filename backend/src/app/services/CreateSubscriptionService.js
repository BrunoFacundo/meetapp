import Boom from '@hapi/boom';
import Queue from '../../lib/Queue';
import SubscriptionMail from '../jobs/SubscriptionMail';
import Meetup from '../models/Meetup';
import Subscription from '../models/Subscription';
import User from '../models/User';

class CreateSubscriptionService {
    async run({ userId, meetupId }) {
        const user = await User.findByPk(userId);
        const meetup = await Meetup.findByPk(meetupId, {
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name', 'email']
                }
            ]
        });

        if (!meetup) {
            throw Boom.badRequest('Meetup não encontrada.');
        }

        if (meetup.user_id === userId) {
            throw Boom.badRequest('Não é possível se inscrever na sua própria meetup.');
        }

        if (meetup.past) {
            throw Boom.badRequest('Não é possível se inscrever em meetup que já passaram.');
        }

        const checkDate = await Subscription.findOne({
            where: {
                user_id: user.id
            },
            include: [
                {
                    model: Meetup,
                    as: 'meetup',
                    where: {
                        date: meetup.date
                    }
                }
            ]
        });

        if (checkDate) {
            throw Boom.badRequest('Não é possível se inscrever em duas meetup ao mesmo tempo.');
        }

        const subscription = await Subscription.create({
            user_id: user.id,
            meetup_id: meetup.id
        });

        await Queue.add(SubscriptionMail.key, {
            meetup,
            user
        });

        return {
            subscription,
            meetup,
            user
        };
    }
}

export default new CreateSubscriptionService();
