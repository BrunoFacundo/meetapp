import Boom from '@hapi/boom';
import { Op } from 'sequelize';
import File from '../models/File';
import Meetup from '../models/Meetup';
import Subscription from '../models/Subscription';
import User from '../models/User';
import CreateSubscriptionService from '../services/CreateSubscriptionService';

class SubscriptionController {
    async index(req, res) {
        const subscriptions = await Subscription.findAll({
            where: {
                user_id: req.userId
            },
            include: [
                {
                    model: Meetup,
                    as: 'meetup',
                    where: {
                        date: {
                            [Op.gt]: new Date()
                        }
                    },
                    include: [
                        {
                            model: User,
                            as: 'user',
                            attributes: ['id', 'name']
                        },
                        {
                            model: File,
                            as: 'file',
                            attributes: ['id', 'url', 'path']
                        }
                    ]
                }
            ],
            order: [
                [
                    {
                        model: Meetup,
                        as: 'meetup'
                    },
                    'date',
                    'DESC'
                ]
            ]
        });

        return res.json(
            subscriptions.map(subscription => ({
                id: subscription.meetup.id,
                title: subscription.meetup.title,
                description: subscription.meetup.description,
                location: subscription.meetup.location,
                date: subscription.meetup.date,
                file: {
                    id: subscription.meetup.file.id,
                    url: subscription.meetup.file.url
                },
                user: {
                    id: subscription.meetup.user.id,
                    name: subscription.meetup.user.name
                }
            }))
        );
    }

    async store(req, res) {
        const { subscription, meetup, user } = await CreateSubscriptionService.run({
            userId: req.userId,
            meetupId: req.params.meetupId
        });

        return res.json({
            id: subscription.id,
            meetup: {
                id: meetup.id,
                title: meetup.title,
                date: meetup.date
            },
            user: {
                id: user.id,
                name: user.name
            }
        });
    }

    async delete(req, res) {
        const subscription = await Subscription.findOne({
            where: {
                user_id: req.userId,
                meetup_id: req.params.meetupId
            }
        });

        if (!subscription) {
            throw Boom.badRequest('Você não estar inscrito nessa meetup.');
        }

        await subscription.destroy();

        return res.send();
    }
}

export default new SubscriptionController();
