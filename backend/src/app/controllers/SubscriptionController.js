import { Op } from 'sequelize';
import Queue from '../../lib/Queue';
import SubscriptionMail from '../jobs/SubscriptionMail';
import File from '../models/File';
import Meetup from '../models/Meetup';
import Subscription from '../models/Subscription';
import User from '../models/User';

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
        const user = await User.findByPk(req.userId);
        const meetup = await Meetup.findByPk(req.params.meetupId, {
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name', 'email']
                }
            ]
        });

        if (!meetup) {
            return res.status(400).json({ error: 'Meetup não existe.' });
        }

        if (meetup.user_id === req.userId) {
            return res.status(400).json({ error: 'Não é possível se inscrever na sua própria meetup' });
        }

        if (meetup.past) {
            return res.status(400).json({ error: 'Não é possível se inscrever em meetup passsada' });
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
            return res.status(400).json({
                error: 'Não é possível se inscrever em duas meetup ao mesmo tempo'
            });
        }

        const subscription = await Subscription.create({
            user_id: user.id,
            meetup_id: meetup.id
        });

        await Queue.add(SubscriptionMail.key, {
            meetup,
            user
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
            return res.status(400).json({ error: 'Você não estar inscrito nessa meetup.' });
        }

        await subscription.destroy();

        return res.json({ message: 'OK' });
    }
}

export default new SubscriptionController();
